import { OllamaService } from './ollamaService';
import { GroqService } from './groqService';
import { OpenAIService } from './openaiService';
import { ClaudeService } from './claudeService';

export class TestCaseGeneratorService {
  async generate(requirement: string, provider: string): Promise<any[]> {
    let response: string;

    switch (provider.toLowerCase()) {
      case 'ollama':
        const ollamaService = new OllamaService();
        response = await ollamaService.generateTestCases(requirement);
        break;

      case 'groq':
        const groqService = new GroqService();
        response = await groqService.generateTestCases(requirement);
        break;

      case 'openai':
        const openaiService = new OpenAIService();
        response = await openaiService.generateTestCases(requirement);
        break;

      case 'claude':
        const claudeService = new ClaudeService();
        response = await claudeService.generateTestCases(requirement);
        break;

      default:
        throw new Error(`Unknown provider: ${provider}`);
    }

    return this.parseTestCases(response);
  }

  private parseTestCases(response: string): any[] {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const testCases = JSON.parse(jsonMatch[0]);

      if (!Array.isArray(testCases)) {
        throw new Error('Response is not an array');
      }

      return testCases.map((tc, index) => ({
        id: tc.id || `TC-${String(index + 1).padStart(3, '0')}`,
        summary: tc.summary || '',
        preConditions: tc.preConditions || '',
        steps: tc.steps || '',
        expectedResult: tc.expectedResult || '',
        status: tc.status || 'New'
      }));
    } catch (error: any) {
      throw new Error(`Failed to parse test cases: ${error.message}`);
    }
  }
}
