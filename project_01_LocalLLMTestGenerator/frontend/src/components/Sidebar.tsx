import React from 'react'

interface SidebarProps {
  view: 'generator' | 'settings';
  setView: (view: 'generator' | 'settings') => void;
  history: any[];
}

export default function Sidebar({ view, setView, history }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>History</h2>
      </div>
      
      <div className="sidebar-nav">
        <button 
          className={`nav-btn ${view === 'generator' ? 'active' : ''}`}
          onClick={() => setView('generator')}
        >
          ➕ New Generation
        </button>
        <button 
          className={`nav-btn ${view === 'settings' ? 'active' : ''}`}
          onClick={() => setView('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <p className="empty-history">No history yet</p>
        ) : (
          history.map((item, index) => (
            <div key={item.id} className="history-item">
              <span className="history-number">#{history.length - index}</span>
              <span className="history-preview">{item.requirement?.substring(0, 30)}...</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
