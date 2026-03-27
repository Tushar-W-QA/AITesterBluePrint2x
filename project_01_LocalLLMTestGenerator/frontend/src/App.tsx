import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MainPanel from './components/MainPanel'
import SettingsPanel from './components/SettingsPanel'

export const AppContext = React.createContext<any>(null);

function App() {
  const [view, setView] = React.useState<'generator' | 'settings'>('generator');
  const [history, setHistory] = React.useState<any[]>(() => {
    const saved = localStorage.getItem('testCaseHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToHistory = (entry: any) => {
    const updated = [...history, { ...entry, id: Date.now() }];
    setHistory(updated);
    localStorage.setItem('testCaseHistory', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider value={{ history, setHistory, saveToHistory }}>
      <div className="app-container">
        <Sidebar view={view} setView={setView} history={history} />
        <div className="main-content">
          {view === 'generator' && <MainPanel />}
          {view === 'settings' && <SettingsPanel />}
        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App
