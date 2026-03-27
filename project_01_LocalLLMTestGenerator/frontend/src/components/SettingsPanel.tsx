import React from 'react'

export default function SettingsPanel() {
  const [settings, setSettings] = React.useState(() => {
    const saved = localStorage.getItem('llmSettings');
    return saved ? JSON.parse(saved) : {
      ollama_url: 'http://localhost:11434',
      groq_api_key: '',
      openai_api_key: '',
      claude_api_key: ''
    };
  });

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('llmSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <h1>⚙️ LLM Settings</h1>
      </div>

      <div className="settings-form">
        <div className="setting-group">
          <label htmlFor="ollama-url">Ollama Setting</label>
          <input
            id="ollama-url"
            type="text"
            value={settings.ollama_url}
            onChange={(e) => handleChange('ollama_url', e.target.value)}
            placeholder="http://localhost:11434"
          />
          <small>Local Ollama server URL</small>
        </div>

        <div className="setting-group">
          <label htmlFor="groq-key">Groq Setting</label>
          <input
            id="groq-key"
            type="password"
            value={settings.groq_api_key}
            onChange={(e) => handleChange('groq_api_key', e.target.value)}
            placeholder="Enter your Groq API key"
          />
          <small>Get it from groq.com</small>
        </div>

        <div className="setting-group">
          <label htmlFor="openai-key">OpenAI Setting</label>
          <input
            id="openai-key"
            type="password"
            value={settings.openai_api_key}
            onChange={(e) => handleChange('openai_api_key', e.target.value)}
            placeholder="Enter your OpenAI API key"
          />
          <small>Get it from openai.com</small>
        </div>

        <div className="setting-group">
          <label htmlFor="claude-key">Claude/Anthropic Setting</label>
          <input
            id="claude-key"
            type="password"
            value={settings.claude_api_key}
            onChange={(e) => handleChange('claude_api_key', e.target.value)}
            placeholder="Enter your Claude API key"
          />
          <small>Get it from anthropic.com</small>
        </div>

        <button onClick={handleSave} className="save-btn">
          💾 Save Settings
        </button>
      </div>
    </div>
  )
}
