import axios from 'axios'

const API_BASE = 'http://localhost:5000/api';

export async function generateTestCases(requirement: string, provider: string) {
  try {
    const response = await axios.post(`${API_BASE}/generate-testcases`, {
      requirement,
      provider
    });
    return response.data.testCases;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to generate test cases');
  }
}

export async function getLLMSettings() {
  const settings = localStorage.getItem('llmSettings');
  return settings ? JSON.parse(settings) : {};
}
