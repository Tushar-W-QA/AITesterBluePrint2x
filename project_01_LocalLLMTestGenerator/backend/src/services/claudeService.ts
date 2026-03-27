import axios from 'axios';

export class ClaudeService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string = process.env.ANTHROPIC_API_KEY || '') {
    if (!apiKey) {
      throw new Error('Claude API key not configured');
    }
    this.apiKey = apiKey;
  }

  async generateTestCases(requirement: string): Promise<string> {
    const prompt = this.buildPrompt(requirement);

    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        },
        {
          headers: {
            'x-api-key': this.apiKey,
            'anthropic-version': '2023-06-01',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.content[0].text;
    } catch (error: any) {
      throw new Error(`Claude API error: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  private buildPrompt(requirement: string): string {
    return `You are a QA test case expert. Based on the following requirement, generate exactly 5 test cases in JSON format with these fields: id, summary, preConditions, steps, expectedResult, status.

Requirement: ${requirement}

Return ONLY valid JSON array, no additional text:
[
  {
    "id": "TC-001",
    "summary": "Test case summary",
    "preConditions": "Pre-conditions here",
    "steps": "Step 1, Step 2, Step 3",
    "expectedResult": "Expected result",
    "status": "New"
  }
]`;
  }
}
