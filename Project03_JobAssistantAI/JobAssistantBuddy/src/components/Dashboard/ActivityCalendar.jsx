import React from 'react';
import { Calendar } from 'lucide-react';

export const ActivityCalendar = ({ jobs }) => {
  const today = new Date();
  const weeks = 20; // Show last 20 weeks
  const totalDays = weeks * 7;
  
  const dates = jobs.map(j => j.dateApplied.split('T')[0]);
  const activityMap = dates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const days = [];
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      count: activityMap[dateStr] || 0,
      dayOfWeek: d.getDay()
    });
  }

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800';
    if (count === 1) return 'bg-blue-200 dark:bg-blue-900/40';
    if (count < 3) return 'bg-blue-400 dark:bg-blue-700/60';
    return 'bg-blue-600 dark:bg-blue-500';
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        Application Activity
      </h3>
      
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex flex-wrap gap-1 min-w-[600px]">
          {days.map((day, i) => (
            <div 
              key={i}
              title={`${day.date}: ${day.count} applications`}
              className={`w-3.5 h-3.5 rounded-sm ${getColor(day.count)} transition-colors hover:ring-1 hover:ring-primary/40`}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-slate-400">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800" />
        <div className="w-3 h-3 rounded-sm bg-blue-200 dark:bg-blue-900/40" />
        <div className="w-3 h-3 rounded-sm bg-blue-400 dark:bg-blue-700/60" />
        <div className="w-3 h-3 rounded-sm bg-blue-600 dark:bg-blue-500" />
        <span>More</span>
      </div>
    </div>
  );
};
