import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ onAdd, onSearch, onToggleTheme, onToggleDashboard, onToggleBoard, onSave }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // N for new job
      if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onAdd();
      }
      
      // / or Cmd+F for search
      if ((e.key === '/' || (e.key.toLowerCase() === 'f' && (e.ctrlKey || e.metaKey))) && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onSearch();
      }

      // D for Dark Mode
      if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        onToggleTheme();
      }

      // Cmd+Enter to save
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        onSave();
      }

      // Escape to close modals (handled by browsers mostly, but for internal state)
      if (e.key === 'Escape') {
        // Handled by individual components
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAdd, onSearch, onToggleTheme, onToggleDashboard, onToggleBoard, onSave]);
};
