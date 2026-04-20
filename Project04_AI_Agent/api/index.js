import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ─── Helper: Jira Auth Header ─────────────────────────
function jiraAuth(emailId, jiraApiToken) {
  return 'Basic ' + Buffer.from(`${emailId}:${jiraApiToken}`).toString('base64');
}

// ─── Helper: Convert Jira ADF to plain text ──────────
function adfToText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.type === 'text') return node.text || '';
  if (node.content && Array.isArray(node.content)) {
    return node.content.map(adfToText).join('\n');
  }
  return '';
}

// ─── POST /api/jira/test-connection ────────────────────
app.post('/api/jira/test-connection', async (req, res) => {
  const { jiraUrl, emailId, jiraApiToken } = req.body;
  if (!jiraUrl || !emailId || !jiraApiToken)
    return res.status(400).json({ success: false, message: 'Missing credentials' });

  try {
    const response = await axios.get(`${jiraUrl}/rest/api/3/myself`, {
      headers: { Authorization: jiraAuth(emailId, jiraApiToken), Accept: 'application/json' },
    });
    res.json({ success: true, message: `Connected as ${response.data.displayName || response.data.emailAddress}` });
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    res.status(200).json({ success: false, message: msg });
  }
});

// ─── GET /api/jira/ticket/:ticketId ────────────────────
app.get('/api/jira/ticket/:ticketId', async (req, res) => {
  const { ticketId } = req.params;
  const { jiraUrl, emailId, jiraApiToken } = req.query;

  if (!jiraUrl || !emailId || !jiraApiToken)
    return res.status(400).json({ success: false, message: 'Missing Jira credentials in query params' });

  try {
    const response = await axios.get(`${jiraUrl}/rest/api/3/issue/${ticketId}`, {
      headers: { Authorization: jiraAuth(emailId, jiraApiToken), Accept: 'application/json' },
    });

    const f = response.data.fields;
    const acceptanceCriteria =
      adfToText(f['customfield_10014'] || f['customfield_10016'] || f['customfield_10034'] || null) || '';

    const ticketData = {
      key: response.data.key,
      summary: f.summary || '',
      description: adfToText(f.description),
      acceptanceCriteria,
      issueType: f.issuetype?.name || '',
      priority: f.priority?.name || '',
      status: f.status?.name || '',
      labels: f.labels || [],
      components: (f.components || []).map(c => c.name),
      reporter: f.reporter?.displayName || '',
      assignee: f.assignee?.displayName || '',
    };

    res.json({ success: true, data: ticketData });
  } catch (error) {
    const msg = error.response?.data?.errorMessages?.join(', ') || error.message;
    res.status(200).json({ success: false, message: msg });
  }
});

// ─── POST /api/llm/test-connection ─────────────────────
app.post('/api/llm/test-connection', async (req, res) => {
  const { provider, apiUrl, apiKey } = req.body;
  try {
    if (provider === 'ollama') {
      const resp = await axios.get(`${apiUrl || 'http://localhost:11434'}/api/tags`, { timeout: 5000 });
      const models = (resp.data.models || []).map(m => m.name);
      return res.json({ success: true, message: `Ollama running. ${models.length} model(s) found.`, models });
    } else if (provider === 'groq') {
      const resp = await axios.get('https://api.groq.com/openai/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` }, timeout: 8000,
      });
      return res.json({ success: true, message: 'GROQ Connected', models: resp.data.data?.map(m => m.id) });
    } else if (provider === 'grok') {
      const resp = await axios.get('https://api.x.ai/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` }, timeout: 8000,
      });
      return res.json({ success: true, message: 'Grok Connected', models: resp.data.data?.map(m => m.id) });
    } else if (provider === 'openai') {
      const resp = await axios.get('https://api.openai.com/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` }, timeout: 8000,
      });
      return res.json({ success: true, message: 'OpenAI Connected', models: resp.data.data?.map(m => m.id) });
    }
    res.json({ success: false, message: 'Unknown provider' });
  } catch (err) {
    const msg = err.response?.data?.error?.message || err.message;
    res.status(200).json({ success: false, message: msg });
  }
});

// ─── POST /api/generate-test-plan ──────────────────────
app.post('/api/generate-test-plan', async (req, res) => {
  const { ticket, additionalContext = '', llm } = req.body;
  if (!ticket) return res.status(400).json({ success: false, message: 'Missing ticket data' });

  const systemPrompt = `You are a Senior QA Engineer. Create a professional test plan. Structure: 
1. Overview 2. Scope 3. Objectives 4. Strategy 5. Test Cases Table 6. Entry/Exit 7. Risks 8. Dependencies 9. Sign-off. 
Output clean Markdown.`;

  const userPrompt = `Generate a test plan for: ${ticket.key} | ${ticket.summary}. 
Description: ${ticket.description}. 
Criteria: ${ticket.acceptanceCriteria}. 
Context: ${additionalContext}`;

  try {
    let responseText = '';
    if (llm.provider === 'ollama') {
      const baseUrl = llm.baseUrl || 'http://localhost:11434';
      const resp = await axios.post(`${baseUrl}/api/chat`, {
        model: llm.model || 'llama3',
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        stream: false,
      }, { timeout: 120000 });
      responseText = resp.data.message?.content || '';
    } else {
      const endpointMap = {
        groq: 'https://api.groq.com/openai/v1/chat/completions',
        grok: 'https://api.x.ai/v1/chat/completions',
        openai: 'https://api.openai.com/v1/chat/completions',
      };
      const endpoint = endpointMap[llm.provider] || 'https://api.openai.com/v1/chat/completions';
      const resp = await axios.post(endpoint, {
        model: llm.model,
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }],
        temperature: 0.3,
        max_tokens: 4096,
      }, {
        headers: { Authorization: `Bearer ${llm.apiKey}`, 'Content-Type': 'application/json' },
        timeout: 90000,
      });
      responseText = resp.data.choices?.[0]?.message?.content || '';
    }
    if (!responseText) return res.json({ success: false, message: 'LLM empty response.' });
    res.json({ success: true, testPlan: responseText });
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    res.status(200).json({ success: false, message: msg });
  }
});

export default app;
