import React, { useContext, useState } from 'react'
import { AppContext } from '../App'
import TestCaseTable from './TestCaseTable'
import { generateTestCases } from '../services/testCaseService'

export default function MainPanel() {
  const { saveToHistory } = useContext(AppContext);
  const [requirement, setRequirement] = useState('');
  const [llmProvider, setLlmProvider] = useState('ollama');
  const [testCases, setTestCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!requirement.trim()) {
      setError('Please enter a requirement');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const cases = await generateTestCases(requirement, llmProvider);
      setTestCases(cases);
      saveToHistory({ requirement, testCases: cases, provider: llmProvider, timestamp: new Date() });
    } catch (err: any) {
      setError(err.message || 'Failed to generate test cases');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-panel">
      <div className="panel-header">
        <h1>Test case Generator with Ollama, Groq and openAI</h1>
      </div>

      <div className="input-section">
        <label htmlFor="requirement">Ask Any questions related to requirement</label>
        <textarea
          id="requirement"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="Enter your requirement here..."
          rows={6}
          className="requirement-input"
        />

        <div className="controls">
          <div className="llm-selector">
            <label htmlFor="llm-select">LLM Provider:</label>
            <select 
              id="llm-select"
              value={llmProvider} 
              onChange={(e) => setLlmProvider(e.target.value)}
            >
              <option value="ollama">Ollama (Local)</option>
              <option value="groq">Groq</option>
              <option value="openai">OpenAI</option>
              <option value="claude">Claude</option>
            </select>
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="generate-btn"
          >
            {loading ? 'Generating...' : '✨ Generate Test Cases'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {testCases.length > 0 && (
        <div className="output-section">
          <h2>Generated Test Cases</h2>
          <TestCaseTable testCases={testCases} onUpdate={setTestCases} />
        </div>
      )}
    </div>
  )
}
