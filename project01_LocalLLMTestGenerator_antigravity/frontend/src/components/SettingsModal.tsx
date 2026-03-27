import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { SettingsConfig } from '../types';

interface Props {
  settings: SettingsConfig;
  onSave: (settings: SettingsConfig) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState<SettingsConfig>(settings);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalSettings(prev => ({ ...prev, activeProvider: e.target.value }));
  };

  const handleInputChange = (provider: keyof SettingsConfig, field: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [provider]: {
        ...(prev[provider as keyof SettingsConfig] as any),
        [field]: value
      }
    }));
  };

  const providers = ['ollama', 'lmstudio', 'groq', 'openai', 'claude', 'gemini'];

  const renderProviderSettings = () => {
    const active = localSettings.activeProvider as Exclude<keyof SettingsConfig, 'activeProvider'>;
    const config = localSettings[active] as any;

    return (
      <div className="setting-group">
        <h4 className="font-semibold text-[var(--text-primary)] mb-4">{active.toUpperCase()} Configuration</h4>
        
        {config.apiUrl !== undefined && (
          <div className="mb-4">
            <label>API URL</label>
            <input 
              type="text" 
              className="setting-input" 
              value={config.apiUrl} 
              onChange={e => handleInputChange(active, 'apiUrl', e.target.value)}
            />
          </div>
        )}

        {config.apiKey !== undefined && (
          <div className="mb-4">
            <label>API Key</label>
            <input 
              type="password" 
              className="setting-input" 
              placeholder="Enter your API Key"
              value={config.apiKey} 
              onChange={e => handleInputChange(active, 'apiKey', e.target.value)}
            />
          </div>
        )}

        <div>
          <label>Model Name</label>
          <input 
            type="text" 
            className="setting-input" 
            value={config.model} 
            onChange={e => handleInputChange(active, 'model', e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">LLM Settings</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <label className="block text-sm text-[var(--text-secondary)] mb-2">Active LLM Provider</label>
          <select 
            className="setting-select" 
            value={localSettings.activeProvider}
            onChange={handleProviderChange}
          >
            {providers.map(p => (
              <option key={p} value={p}>{p.toUpperCase()}</option>
            ))}
          </select>

          {renderProviderSettings()}

          <div className="p-4 bg-[rgba(16,185,129,0.1)] border border-[var(--success-color)] rounded-lg mt-4">
            <p className="text-sm text-[var(--success-color)]">
              Your test cases will be generated in a Jira-friendly format based on the requirements you provide in the main chat.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(localSettings)}>Save Configuration</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
