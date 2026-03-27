import axios from 'axios';

export class OllamaService {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.OLLAMA_BASE_URL || 'http://localhost:11434') {
    this.baseUrl = baseUrl;
  }

  async generateTestCases(requirement: string, model: string = 'mistral'): Promise<string> {
    const prompt = this.buildPrompt(requirement);

    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model,
        prompt,
        stream: false
      });

      return response.data.response;
    } catch (error: any) {
      throw new Error(`Ollama API error: ${error.message}`);
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
