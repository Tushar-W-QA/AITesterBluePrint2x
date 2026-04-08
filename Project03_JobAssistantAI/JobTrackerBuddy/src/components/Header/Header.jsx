import React from 'react';
import { Sun, Moon, Plus, LayoutDashboard, KanbanSquare, Download, FileText } from 'lucide-react';
import { combineClasses } from '../../lib/utils';
import Badge from '../UI/Badge';

export default function Header({ theme, toggleTheme, onAddJob, currentView, setCurrentView, jobs, onOpenResumes }) {
  const exportData = () => {
    if (!jobs) return;
    const backup = { jobs, settings: { theme }, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `job-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // Weekly Goal logic (5 applications per week)
  const currentWeekApps = jobs ? jobs.filter(j => j.dateApplied && new Date(j.dateApplied) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length : 0;
  const goal = 5;
  const goalProgress = Math.min((currentWeekApps / goal) * 100, 100);
  return (
    <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white dark:bg-[#111110]">
      <div className="font-bold text-lg cursor-pointer flex items-center gap-2">
        <span className="text-[#1D4ED8] dark:text-blue-400">🎯</span>
        Job Tracker Buddy
      </div>
      
      <div className="flex items-center gap-4">
        {setCurrentView && (
          <div className="hidden sm:flex bg-gray-100 dark:bg-[#1C1C1A] p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
             <button 
               onClick={() => setCurrentView('board')}
               className={combineClasses("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative", currentView === 'board' ? 'bg-white dark:bg-[#2A2A28] shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300')}
             >
                <KanbanSquare size={16} /> Board
             </button>
             <button 
               onClick={() => setCurrentView('dashboard')}
               className={combineClasses("flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors relative", currentView === 'dashboard' ? 'bg-white dark:bg-[#2A2A28] shadow-sm text-gray-900 dark:text-gray-100' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300')}
             >
                <LayoutDashboard size={16} /> Dashboard
                <span className="absolute -top-1.5 -right-1"><Badge type="info">New</Badge></span>
             </button>
          </div>
        )}

        <div className="hidden lg:flex flex-col w-32 justify-center mx-4 gap-1">
           <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <span>Goal</span>
              <span className={currentWeekApps >= goal ? "text-green-500" : ""}>{currentWeekApps}/{goal}</span>
           </div>
           <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{width: `${goalProgress}%`}}></div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative group" 
            onClick={onOpenResumes}
            title="Manage Resumes"
        >
          <FileText size={18} />
        </button>
        <button 
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 relative group" 
            onClick={exportData}
            title="Download JSON Backup"
        >
          <Download size={18} />
          <span className="absolute -top-1.5 -right-1 hidden group-hover:block"><Badge type="success">Export</Badge></span>
        </button>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1"></div>
        <button 
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800" 
            onClick={toggleTheme}
            title="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button 
          onClick={onAddJob}
          className="bg-[#1D4ED8] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium hover:bg-blue-800 transition-colors"
        >
          <Plus size={16} /> Add Job
        </button>
      </div>
    </header>
  );
}
