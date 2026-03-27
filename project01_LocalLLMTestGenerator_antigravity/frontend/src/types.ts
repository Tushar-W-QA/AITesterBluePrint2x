export interface SettingsConfig {
  activeProvider: string;
  ollama: {
    apiUrl: string;
    model: string;
  };
  lmstudio: {
    apiUrl: string;
    model: string;
  };
  groq: {
    apiKey: string;
    model: string;
  };
  openai: {
    apiKey: string;
    model: string;
  };
  claude: {
    apiKey: string;
    model: string;
  };
  gemini: {
    apiKey: string;
    model: string;
  };
}

export const defaultSettings: SettingsConfig = {
  activeProvider: 'ollama',
  ollama: { apiUrl: 'http://localhost:11434', model: 'llama3' },
  lmstudio: { apiUrl: 'http://localhost:1234/v1', model: 'local-model' },
  groq: { apiKey: '', model: 'llama3-8b-8192' },
  openai: { apiKey: '', model: 'gpt-4o' },
  claude: { apiKey: '', model: 'claude-3-5-sonnet-20240620' },
  gemini: { apiKey: '', model: 'gemini-1.5-pro' }
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
