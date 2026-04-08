import { useState, useEffect } from 'react';
import { dbOps } from '../lib/db';

export function useTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedThemeObj = await dbOps.get('settings', 'theme');
      if (savedThemeObj) {
        setTheme(savedThemeObj.value);
        applyTheme(savedThemeObj.value);
      } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = isDark ? 'dark' : 'light';
        setTheme(initialTheme);
        applyTheme(initialTheme);
      }
    };
    loadTheme();
  }, []);

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    await dbOps.put('settings', { key: 'theme', value: newTheme });
  };

  return { theme, toggleTheme };
}
