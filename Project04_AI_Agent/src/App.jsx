import React, { useState, useEffect } from 'react';
import './index.css';

const API_BASE = '';

// ---- Utility: convert Jira ADF content to plain text ----
function adfToText(adf) {
  if (!adf) return '';
  if (typeof adf === 'string') return adf;
  try {
    const walk = (node) => {
      if (!node) return '';
      if (node.type === 'text') return node.text || '';
      if (node.content) return node.content.map(walk).join('');
      return '';
    };
    return walk(adf);
  } catch {
    return JSON.stringify(adf);
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // ---- Jira Config State ----
  const [jiraUrl, setJiraUrl] = useState(() => localStorage.getItem('jiraUrl') || '');
  const [emailId, setEmailId] = useState(() => localStorage.getItem('emailId') || '');
  const [jiraApiToken, setJiraApiToken] = useState(() => localStorage.getItem('jiraApiToken') || '');
  const [jiraStatus, setJiraStatus] = useState(null);
  const [jiraLoading, setJiraLoading] = useState(false);

  // ---- LLM Config State ----
  const [llmProvider, setLlmProvider] = useState(() => localStorage.getItem('llmProvider') || 'ollama');
  const [llmToken, setLlmToken] = useState(() => localStorage.getItem('llmToken') || '');
  const [llmModel, setLlmModel] = useState(() => localStorage.getItem('llmModel') || 'llama3');
  const [llmBaseUrl, setLlmBaseUrl] = useState(() => localStorage.getItem('llmBaseUrl') || 'http://localhost:11434');
  const [llmStatus, setLlmStatus] = useState(null);
  const [llmLoading, setLlmLoading] = useState(false);

  // ---- Ticket State ----
  const [ticketId, setTicketId] = useState('');
  const [boardName, setBoardName] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [fetchingTicket, setFetchingTicket] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');

  // ---- History State ----
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('blast_history') || '[]'); } catch { return []; }
  });

  // ---- Model options per provider ----
  const modelOptions = {
    ollama: ['llama3', 'llama3.2', 'mistral', 'gemma2', 'phi3', 'codellama'],
    groq: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'llama-guard-3-8b'],
    grok: ['grok-2', 'grok-2-latest', 'grok-3'],
    openai: ['gpt-4o', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  };

  // ---- Jira: Save & Test ----
  const saveJira = () => {
    localStorage.setItem('jiraUrl', jiraUrl);
    localStorage.setItem('emailId', emailId);
    localStorage.setItem('jiraApiToken', jiraApiToken);
    setJiraStatus('saved');
  };

  const testJiraConnection = async () => {
    setJiraLoading(true); setJiraStatus(null);
    try {
      const resp = await fetch(`${API_BASE}/api/jira/test-connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jiraUrl, emailId, jiraApiToken }),
      });
      const data = await resp.json();
      setJiraStatus(data.success ? 'success' : 'error');
    } catch {
      setJiraStatus('error');
    }
    setJiraLoading(false);
  };

  // ---- LLM: Save & Test ----
  const saveLlm = () => {
    localStorage.setItem('llmProvider', llmProvider);
    localStorage.setItem('llmToken', llmToken);
    localStorage.setItem('llmModel', llmModel);
    localStorage.setItem('llmBaseUrl', llmBaseUrl);
    setLlmStatus('saved');
  };

  const testLlmConnection = async () => {
    setLlmLoading(true); setLlmStatus(null);
    try {
      const resp = await fetch(`${API_BASE}/api/llm/test-connection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: llmProvider, apiUrl: llmBaseUrl, apiKey: llmToken }),
      });
      const data = await resp.json();
      setLlmStatus(data.success ? 'success' : 'error');
    } catch {
      setLlmStatus('error');
    }
    setLlmLoading(false);
  };

  // ---- Fetch Ticket ----
  const fetchTicket = async () => {
    if (!ticketId.trim()) return;
    setFetchingTicket(true); setPreviewData(null);
    try {
      const params = new URLSearchParams({ jiraUrl, emailId, jiraApiToken });
      const resp = await fetch(`${API_BASE}/api/jira/ticket/${encodeURIComponent(ticketId)}?${params}`);
      const data = await resp.json();
      if (data.success) {
        setPreviewData({ ...data.data, description: adfToText(data.data.description) });
      } else { setPreviewData({ error: data.message }); }
    } catch (e) { setPreviewData({ error: e.message }); }
    setFetchingTicket(false);
  };

  // ---- Generate Report ----
  const generateReport = async () => {
    if (!previewData || previewData.error) return;
    setGenerating(true); setGeneratedPlan('');
    try {
      const resp = await fetch(`${API_BASE}/api/generate-test-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ticket: previewData,
          additionalContext,
          llm: { provider: llmProvider, apiKey: llmToken, model: llmModel, baseUrl: llmBaseUrl },
        }),
      });
      const data = await resp.json();
      if (data.success) {
        setGeneratedPlan(data.testPlan);
        const entry = { id: Date.now(), ticketId: previewData.key, summary: previewData.summary, generatedAt: new Date().toISOString(), plan: data.testPlan };
        const newHistory = [entry, ...history].slice(0, 20);
        setHistory(newHistory);
        localStorage.setItem('blast_history', JSON.stringify(newHistory));
      } else { setGeneratedPlan(`Error: ${data.message}`); }
    } catch (e) { setGeneratedPlan(`Error: ${e.message}`); }
    setGenerating(false);
  };

  const downloadPlan = () => {
    if (!generatedPlan) return;
    const blob = new Blob([generatedPlan], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    const filename = `TestPlan_${ticketId || 'Generated'}_${new Date().getTime()}.md`;
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    
    // Give the browser time to trigger the download before cleaning up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="app-container">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">⚡ AIBuddy</div>
        {[
          { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
          { id: 'jira', icon: '🔗', label: 'Jira Config' },
          { id: 'llm', icon: '🤖', label: 'LLM Setting' },
          { id: 'ticket', icon: '🎫', label: 'Jira Ticket' },
          { id: 'generate', icon: '📋', label: 'Generate Report' },
          { id: 'history', icon: '🕓', label: 'History' },
          { id: 'setting', icon: '⚙️', label: 'Settings' },
        ].map(item => (
          <div key={item.id} className={`nav-item ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
            <span className="nav-icon">{item.icon}</span> {item.label}
          </div>
        ))}
        <div className="sidebar-footer">B.L.A.S.T. v1.0</div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* ---- DASHBOARD ---- */}
        {activeTab === 'dashboard' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>Welcome to <span className="gradient-text">AIBuddy</span></h1>
              <p className="subtitle">Your intelligent, B.L.A.S.T.-powered Test Plan creator.</p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎫</div>
                <div className="stat-label">Reports Generated</div>
                <div className="stat-value">{history.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🔗</div>
                <div className="stat-label">Jira Status</div>
                <div className={`stat-value ${jiraStatus === 'success' ? 'text-success' : 'text-muted'}`}>
                  {jiraStatus === 'success' ? 'Connected' : 'Not Tested'}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🤖</div>
                <div className="stat-label">LLM Status</div>
                <div className={`stat-value ${llmStatus === 'success' ? 'text-success' : 'text-muted'}`}>
                  {llmStatus === 'success' ? `${llmProvider} Ready` : 'Not Tested'}
                </div>
              </div>
            </div>
            <div className="card how-it-works">
              <h3 className="card-title">🚀 How It Works</h3>
              <div className="steps-grid">
                <div className="step"><span className="step-num">1</span><b>Configure Jira</b><p>Add your Jira URL, Email and API Token and test the connection.</p></div>
                <div className="step"><span className="step-num">2</span><b>Set Up LLM</b><p>Choose Ollama, GROQ, Grok or OpenAI and verify connectivity.</p></div>
                <div className="step"><span className="step-num">3</span><b>Enter Ticket ID</b><p>Paste a Jira ticket ID to fetch the user story and preview it.</p></div>
                <div className="step"><span className="step-num">4</span><b>Generate Plan</b><p>Click Generate Report to create a structured, template-based test plan.</p></div>
              </div>
            </div>
          </div>
        )}

        {/* ---- JIRA CONFIG ---- */}
        {activeTab === 'jira' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>🔗 Jira Configuration</h1>
              <p className="subtitle">Connect to your Jira Cloud workspace.</p>
            </div>
            <div className="card">
              <div className="form-group">
                <label>Jira URL</label>
                <input id="jira-url" type="text" placeholder="https://your-domain.atlassian.net" value={jiraUrl} onChange={e => setJiraUrl(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email ID</label>
                <input id="jira-email" type="email" placeholder="you@domain.com" value={emailId} onChange={e => setEmailId(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Jira API Token <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noreferrer" className="help-link">How to get?</a></label>
                <input id="jira-token" type="password" placeholder="Paste your API Token here" value={jiraApiToken} onChange={e => setJiraApiToken(e.target.value)} />
              </div>
              <div className="btn-container">
                <button id="jira-save-btn" className="btn-secondary" onClick={saveJira}>💾 Save</button>
                <button id="jira-test-btn" className="btn-primary" onClick={testJiraConnection} disabled={jiraLoading}>
                  {jiraLoading ? <span className="spinner" /> : '🔌 Test Connection'}
                </button>
                {jiraStatus === 'success' && <span className="status-badge status-success">✅ Connected</span>}
                {jiraStatus === 'error' && <span className="status-badge status-error">❌ Failed</span>}
                {jiraStatus === 'saved' && <span className="status-badge status-info">💾 Saved</span>}
              </div>
            </div>
          </div>
        )}

        {/* ---- LLM SETTING ---- */}
        {activeTab === 'llm' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>🤖 LLM Settings</h1>
              <p className="subtitle">Configure your local or cloud AI provider.</p>
            </div>
            <div className="card">
              <div className="two-col">
                <div className="form-group">
                  <label>Provider</label>
                  <select id="llm-provider" value={llmProvider} onChange={e => setLlmProvider(e.target.value)}>
                    <option value="ollama">🦙 Ollama (Local)</option>
                    <option value="groq">⚡ GROQ</option>
                    <option value="grok">𝕏 Grok (xAI)</option>
                    <option value="openai">🌐 OpenAI GPT</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Model / Version</label>
                  <input id="llm-model" type="text" placeholder="e.g. llama3, gpt-4o, etc." value={llmModel} onChange={e => setLlmModel(e.target.value)} />
                </div>
              </div>
              {llmProvider !== 'ollama' && (
                <div className="form-group">
                  <label>API Key / Token</label>
                  <input id="llm-token" type="password" placeholder={`Paste your ${llmProvider.toUpperCase()} API key`} value={llmToken} onChange={e => setLlmToken(e.target.value)} />
                </div>
              )}
              {llmProvider === 'ollama' && (
                <div className="form-group">
                  <label>Ollama Base URL</label>
                  <input id="llm-base-url" type="text" value={llmBaseUrl} onChange={e => setLlmBaseUrl(e.target.value)} />
                </div>
              )}
              <div className="btn-container">
                <button id="llm-save-btn" className="btn-secondary" onClick={saveLlm}>💾 Save</button>
                <button id="llm-test-btn" className="btn-primary" onClick={testLlmConnection} disabled={llmLoading}>
                  {llmLoading ? <span className="spinner" /> : '🔌 Test Connection'}
                </button>
                {llmStatus === 'success' && <span className="status-badge status-success">✅ Connected</span>}
                {llmStatus === 'error' && <span className="status-badge status-error">❌ Failed</span>}
                {llmStatus === 'saved' && <span className="status-badge status-info">💾 Saved</span>}
              </div>
            </div>
          </div>
        )}

        {/* ---- JIRA TICKET ---- */}
        {activeTab === 'ticket' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>🎫 Jira Ticket</h1>
              <p className="subtitle">Fetch a Jira user story to use as the test plan source.</p>
            </div>
            <div className="two-col">
              <div className="card">
                <h3 className="card-title">Fetch Ticket</h3>
                <div className="form-group">
                  <label>Jira Ticket ID</label>
                  <input id="ticket-id-input" type="text" placeholder="e.g. PROJ-123" value={ticketId} onChange={e => setTicketId(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchTicket()} />
                </div>
                <div className="form-group">
                  <label>Board Name (Optional)</label>
                  <input id="board-name-input" type="text" placeholder="Sprint Board" value={boardName} onChange={e => setBoardName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Additional Context</label>
                  <textarea id="additional-context" placeholder="Any extra context to add to the test plan generation…" value={additionalContext} onChange={e => setAdditionalContext(e.target.value)} rows={4} />
                </div>
                <div className="btn-container">
                  <button id="fetch-ticket-btn" className="btn-primary" onClick={fetchTicket} disabled={fetchingTicket}>
                    {fetchingTicket ? <span className="spinner" /> : '🔍 Fetch Preview'}
                  </button>
                </div>
              </div>

              <div className="card">
                <h3 className="card-title">Preview</h3>
                {previewData && !previewData.error ? (
                  <div className="ticket-preview">
                    <div className="ticket-key">{previewData.key}</div>
                    <h4 className="ticket-summary">{previewData.summary}</h4>
                    <div className="ticket-meta">
                      <span className="tag">{previewData.issueType}</span>
                      <span className="tag tag-priority">{previewData.priority}</span>
                      <span className="tag tag-status">{previewData.status}</span>
                    </div>
                    <div className="ticket-description">{previewData.description || 'No description provided.'}</div>
                    <button id="generate-from-ticket-btn" className="btn-primary" style={{marginTop: '1rem', width: '100%'}} onClick={() => setActiveTab('generate')}>
                      📋 Go to Generate Report →
                    </button>
                  </div>
                ) : previewData?.error ? (
                  <div className="empty-state error-state">❌ {previewData.error}</div>
                ) : (
                  <div className="empty-state">Enter a Ticket ID and click Fetch Preview.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---- GENERATE REPORT ---- */}
        {activeTab === 'generate' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>📋 Generate Test Plan</h1>
              <p className="subtitle">Let the AI generate a structured test plan from the fetched ticket.</p>
            </div>
            {!previewData || previewData.error ? (
              <div className="card empty-state">⚠️ Please fetch a Jira ticket first from the <b>Jira Ticket</b> tab.</div>
            ) : (
              <>
                <div className="card" style={{marginBottom: '1rem'}}>
                  <div className="ticket-meta" style={{marginBottom: '0.5rem'}}>
                    <span className="tag">{previewData.key}</span>
                    <span className="tag">{llmProvider} → {llmModel}</span>
                  </div>
                  <b>{previewData.summary}</b>
                </div>
                <button id="generate-plan-btn" className="btn-primary btn-lg" onClick={generateReport} disabled={generating}>
                  {generating ? <><span className="spinner" /> Generating Test Plan…</> : '⚡ Generate Test Plan'}
                </button>

                {generatedPlan && (
                  <div className="card" style={{marginTop: '1.5rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                      <h3 style={{margin: 0}}>Generated Test Plan</h3>
                      <button id="download-plan-btn" className="btn-secondary" onClick={downloadPlan}>⬇ Download .md</button>
                    </div>
                    <pre className="plan-output">{generatedPlan}</pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ---- HISTORY ---- */}
        {activeTab === 'history' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>🕓 History</h1>
              <p className="subtitle">Previously generated test plans.</p>
            </div>
            {history.length === 0 ? (
              <div className="card empty-state">No history yet. Generate a report to see it here.</div>
            ) : (
              history.map(entry => (
                <div className="card history-card" key={entry.id}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <span className="tag">{entry.ticketId}</span>
                      <b style={{marginLeft: '0.75rem'}}>{entry.summary}</b>
                    </div>
                    <div className="text-muted" style={{fontSize: '0.8rem'}}>{new Date(entry.generatedAt).toLocaleString()}</div>
                  </div>
                  <details style={{marginTop: '0.75rem'}}>
                    <summary style={{cursor: 'pointer', color: 'var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span>View Plan</span>
                      <button className="btn-secondary" style={{padding: '0.2rem 0.5rem', fontSize: '0.7rem'}} 
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const blob = new Blob([entry.plan], { type: 'text/markdown' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.style.display = 'none';
                                a.href = url;
                                a.download = `TestPlan_${entry.ticketId}_${entry.id}.md`;
                                document.body.appendChild(a);
                                a.click();
                                setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 100);
                              }}>
                        ⬇ Download
                      </button>
                    </summary>
                    <pre className="plan-output" style={{marginTop: '0.75rem'}}>{entry.plan}</pre>
                  </details>
                </div>
              ))
            )}
          </div>
        )}

        {/* ---- SETTINGS ---- */}
        {activeTab === 'setting' && (
          <div className="page-fade">
            <div className="page-header">
              <h1>⚙️ Settings</h1>
              <p className="subtitle">Manage application preferences.</p>
            </div>
            <div className="card">
              <h3 className="card-title">Data Management</h3>
              <p className="text-muted">All credentials and settings are stored locally in your browser's localStorage. They never leave your machine.</p>
              <button id="clear-storage-btn" className="btn-secondary" style={{borderColor: 'var(--danger)', color: 'var(--danger)'}} onClick={() => { localStorage.clear(); window.location.reload(); }}>
                🗑 Clear All Saved Data
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
