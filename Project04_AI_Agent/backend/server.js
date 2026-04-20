require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3001;

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
    // Try common custom fields for acceptance criteria
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

  const systemPrompt = `You are a Senior QA Engineer with 10+ years of experience. Your task is to create comprehensive, professional test plans based on Jira user stories.

Always structure the test plan with these exact sections:
1. **Test Plan Overview** - Brief summary of what is being tested
2. **Scope** - In Scope and Out of Scope items  
3. **Test Objectives** - Clear, measurable testing goals
4. **Test Strategy** - Approach, types of testing (functional, regression, boundary, negative, etc.)
5. **Test Cases** Table - At minimum 8-10 test cases with: Test Case ID | Title | Steps | Expected Result | Priority | Type
6. **Entry Criteria** - Conditions that must be met before testing begins
7. **Exit Criteria** - Conditions that mark testing as complete
8. **Risks & Mitigations** - Potential risks with mitigation strategies
9. **Dependencies** - Tools, environments, or external factors
10. **Sign-off** - Placeholder for QA Lead, Dev Lead, Product Owner

Be specific, professional, and use the ticket details directly. Output clean Markdown.`;

  const userPrompt = `Generate a complete test plan for the following Jira ticket:

**Ticket ID:** ${ticket.key}
**Summary:** ${ticket.summary}
**Issue Type:** ${ticket.issueType}
**Priority:** ${ticket.priority}
**Status:** ${ticket.status}
**Labels:** ${ticket.labels?.join(', ') || 'None'}
**Components:** ${ticket.components?.join(', ') || 'None'}
**Reporter:** ${ticket.reporter}

**Description:**
${ticket.description || 'Not provided'}

**Acceptance Criteria:**
${ticket.acceptanceCriteria || 'Not provided'}

**Additional Context from QA:**
${additionalContext || 'None'}

Please generate the full test plan now.`;

  try {
    let responseText = '';

    if (llm.provider === 'ollama') {
      const baseUrl = llm.baseUrl || 'http://localhost:11434';
      const resp = await axios.post(`${baseUrl}/api/chat`, {
        model: llm.model || 'llama3',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        stream: false,
      }, { timeout: 120000 });
      responseText = resp.data.message?.content || '';

    } else {
      // OpenAI-compatible: GROQ, Grok, OpenAI
      const endpointMap = {
        groq: 'https://api.groq.com/openai/v1/chat/completions',
        grok: 'https://api.x.ai/v1/chat/completions',
        openai: 'https://api.openai.com/v1/chat/completions',
      };
      const endpoint = endpointMap[llm.provider] || 'https://api.openai.com/v1/chat/completions';

      const resp = await axios.post(endpoint, {
        model: llm.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }, {
        headers: { Authorization: `Bearer ${llm.apiKey}`, 'Content-Type': 'application/json' },
        timeout: 90000,
      });
      responseText = resp.data.choices?.[0]?.message?.content || '';
    }

    if (!responseText)
      return res.json({ success: false, message: 'LLM returned empty response.' });

    res.json({ success: true, testPlan: responseText });
  } catch (error) {
    const msg = error.response?.data?.error?.message || error.message;
    console.error('Generate error:', msg);
    res.status(200).json({ success: false, message: msg });
  }
});

app.listen(PORT, () => {
  console.log(`✅ AIBuddy Backend running on http://localhost:${PORT}`);
});
