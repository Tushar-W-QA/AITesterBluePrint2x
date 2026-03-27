import axios from 'axios';

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string = process.env.OPENAI_API_KEY || '') {
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }
    this.apiKey = apiKey;
  }

  async generateTestCases(requirement: string): Promise<string> {
    const prompt = this.buildPrompt(requirement);

    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      throw new Error(`OpenAI API error: ${error.response?.data?.error?.message || error.message}`);
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
