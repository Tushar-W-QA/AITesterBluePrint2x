import { jobsDb, resumesDb, settingsDb, activityLogDb } from './db';

export const exportData = async () => {
  const jobs = await jobsDb.getAll();
  const resumes = await resumesDb.getAll();
  const settings = [
    { key: 'theme', value: await settingsDb.get('theme') },
    { key: 'weeklyGoal', value: await settingsDb.get('weeklyGoal') },
    { key: 'onboardingComplete', value: await settingsDb.get('onboardingComplete') },
  ];

  const data = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    jobs,
    resumes,
    settings,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `job-assistant-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data.jobs || !Array.isArray(data.jobs)) {
          throw new Error('Invalid backup file');
        }

        // Merge jobs
        for (const job of data.jobs) {
          await jobsDb.put(job);
        }

        // Merge resumes
        if (data.resumes) {
          for (const resume of data.resumes) {
            await resumesDb.put(resume);
          }
        }

        // Merge settings
        if (data.settings) {
          for (const setting of data.settings) {
            if (setting.value) {
              await settingsDb.put(setting);
            }
          }
        }

        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.readAsText(file);
  });
};

export const exportCSV = async () => {
  const jobs = await jobsDb.getAll();
  if (jobs.length === 0) return;

  const headers = ['Company', 'Role', 'Status', 'Priority', 'Date Applied', 'Location', 'Salary', 'Resume Used', 'Rating'];
  const rows = jobs.map(j => [
    j.company,
    j.role,
    j.status,
    j.priority,
    j.dateApplied,
    j.location || '',
    j.salary || '',
    j.resume || '',
    j.rating || 0
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.map(v => `"${v}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `job-assistant-export-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
