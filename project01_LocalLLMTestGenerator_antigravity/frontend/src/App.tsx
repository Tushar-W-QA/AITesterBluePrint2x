import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Send, TerminalSquare, MessageSquare } from 'lucide-react';
import axios from 'axios';
import type { SettingsConfig, ChatMessage } from './types';
import { defaultSettings } from './types';
import SettingsModal from './components/SettingsModal';
import ReactMarkdown from 'react-markdown';
import './index.css';

function App() {
  const [settings, setSettings] = useState<SettingsConfig>(defaultSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const saved = localStorage.getItem('llmSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const saveSettings = (newSettings: SettingsConfig) => {
    setSettings(newSettings);
    localStorage.setItem('llmSettings', JSON.stringify(newSettings));
    setIsSettingsOpen(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const activeProvider = settings.activeProvider as Exclude<keyof SettingsConfig, 'activeProvider'>;
      const providerConfig = settings[activeProvider] as any;

      const response = await axios.post('http://localhost:3001/api/generate', {
        requirements: userMessage.content,
        provider: activeProvider,
        apiUrl: providerConfig?.apiUrl,
        apiKey: providerConfig?.apiKey,
        model: providerConfig?.model
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.testCases
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.message;
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: `**Error generating test cases:** ${errorMessage}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="flex items-center gap-2">
            <TerminalSquare size={24} color="#6366f1" />
            <span className="sidebar-title">TestGen AI</span>
          </div>
        </div>
        
        <div className="sidebar-content">
           <h3 className="text-sm text-[var(--text-secondary)] mb-3 px-2">Recent Requirements</h3>
           {messages.filter(m => m.role === 'user').map(m => (
             <div key={m.id} className="history-item">
               <div className="flex items-center gap-2">
                 <MessageSquare size={14} />
                 <span className="truncate">{m.content.substring(0, 30)}...</span>
               </div>
             </div>
           ))}
        </div>

        <div className="sidebar-footer">
          <button className="settings-btn" onClick={() => setIsSettingsOpen(true)}>
            <SettingsIcon size={18} />
            LLM Settings
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-area">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-[var(--text-secondary)] opacity-50">
              <TerminalSquare size={64} className="mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">LocalLLM Test Generator</h2>
              <p>Paste your Jira requirements below to automatically generate functional and non-functional test cases.</p>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`message ${msg.role}`}>
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="markdown-body">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="input-container">
            <textarea
              className="requirement-input"
              placeholder="Paste your Jira requirements here (Shift+Enter for newline)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button 
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal 
          settings={settings} 
          onSave={saveSettings} 
          onClose={() => setIsSettingsOpen(false)} 
        />
      )}
    </div>
  );
}

export default App;
