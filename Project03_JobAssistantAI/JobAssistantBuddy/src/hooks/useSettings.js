import { useState, useEffect } from 'react';
import { settingsDb } from '../lib/db';

const DEFAULT_SETTINGS = {
  weeklyGoal: 5,
  sortPreference: 'newest',
  columnOrder: null,
  onboardingComplete: false,
};

export const useSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const theme = await settingsDb.get('theme');
        const weeklyGoal = await settingsDb.get('weeklyGoal');
        const onboarding = await settingsDb.get('onboardingComplete');
        
        setSettings(prev => ({
          ...prev,
          theme: theme?.value || 'light',
          weeklyGoal: weeklyGoal?.value || 5,
          onboardingComplete: onboarding?.value || false,
        }));
      } catch (err) {
        console.error('Failed to fetch settings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSetting = async (key, value) => {
    try {
      await settingsDb.put({ key, value });
      setSettings(prev => ({ ...prev, [key]: value }));
    } catch (err) {
      console.error('Failed to update setting', err);
    }
  };

  return { settings, updateSetting, loading };
};
