import axios from 'axios';

interface GenerateOptions {
  requirements: string;
  provider: string; // 'ollama', 'lmstudio', 'groq', 'openai', 'claude', 'gemini'
  model?: string;
  apiUrl?: string;
  apiKey?: string;
}

const SYSTEM_PROMPT = `You are a QA Test Engineer. Your task is to generate Functional and Non-Functional test cases strictly in Jira requirement format based on the given user requirements.
Format your output cleanly in Markdown, using tables or clear headings for Jira fields such as:
- Test Case ID
- Summary
- Preconditions
- Test Steps
- Expected Results
- Priority
- Labels (Functional/Non-Functional)

Do not add extra conversational text. Return only the test cases.`;

export async function generateTests(options: GenerateOptions): Promise<string> {
  const { requirements, provider, model, apiUrl, apiKey } = options;

  switch (provider.toLowerCase()) {
    case 'ollama':
      return callOllama(requirements, model || 'llama3', apiUrl || 'http://localhost:11434');
    case 'lmstudio':
      return callOpenAICompatible(requirements, model || 'local-model', apiUrl || 'http://localhost:1234/v1', apiKey || '');
    case 'groq':
      return callOpenAICompatible(requirements, model || 'llama3-8b-8192', apiUrl || 'https://api.groq.com/openai/v1', apiKey || '');
    case 'openai':
      return callOpenAICompatible(requirements, model || 'gpt-4o', apiUrl || 'https://api.openai.com/v1', apiKey || '');
    case 'claude':
        return callClaude(requirements, model || 'claude-3-5-sonnet-20240620', apiUrl || 'https://api.anthropic.com/v1/messages', apiKey || '');
    case 'gemini':
        return callGemini(requirements, model || 'gemini-1.5-pro', apiUrl || 'https://generativelanguage.googleapis.com/v1beta/models/', apiKey || '');
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

async function callOllama(prompt: string, model: string, baseUrl: string) {
  const response = await axios.post(`${baseUrl}/api/generate`, {
    model,
    prompt: `${SYSTEM_PROMPT}\n\nRequirements:\n${prompt}`,
    stream: false,
  });
  return response.data.response;
}

async function callOpenAICompatible(prompt: string, model: string, baseUrl: string, apiKey: string) {
  const response = await axios.post(
    `${baseUrl}/chat/completions`,
    {
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.choices[0].message.content;
}

async function callClaude(prompt: string, model: string, baseUrl: string, apiKey: string) {
    const response = await axios.post(
        baseUrl,
        {
          model,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 4096
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
        }
      );
      return response.data.content[0].text;
}

async function callGemini(prompt: string, model: string, baseUrl: string, apiKey: string) {
    const fullUrl = `${baseUrl}${model}:generateContent?key=${apiKey}`;
    const response = await axios.post(
      fullUrl,
      {
        contents: [
            { role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\n\nRequirements:\n${prompt}` }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.candidates[0].content.parts[0].text;
}
