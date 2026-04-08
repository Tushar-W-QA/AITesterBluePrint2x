import React, { useState, useEffect } from 'react';
import { Moon, Sun, Briefcase, LayoutDashboard, Settings } from 'lucide-react';

import { SettingsModal } from '../../features/settings/SettingsModal';

export const Layout = ({ children }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center space-x-2">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Briefcase size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">JobTracker</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium">
            <LayoutDashboard size={18} />
            <span>Board</span>
          </a>
          <button onClick={() => setIsSettingsOpen(true)} className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-400 font-medium transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
