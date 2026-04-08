import React from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Layers,
  Building2,
  FileText
} from 'lucide-react';
import { STATUS } from '../../lib/constants';

import { ActivityCalendar } from './ActivityCalendar';
import { Badge } from '../UI/Button';

export const Dashboard = ({ jobs }) => {
  const stats = [
    { 
      label: 'Total Applications', 
      value: jobs.length, 
      icon: Briefcase, 
      color: 'text-blue-500', 
      bg: 'bg-blue-50 dark:bg-blue-500/10' 
    },
    { 
      label: 'Active Pipeline', 
      value: jobs.filter(j => ['applied', 'screening', 'interview', 'offer'].includes(j.status)).length, 
      icon: TrendingUp, 
      color: 'text-indigo-500', 
      bg: 'bg-indigo-50 dark:bg-indigo-500/10' 
    },
    { 
      label: 'Interviews', 
      value: jobs.filter(j => j.status === 'interview').length, 
      icon: Calendar, 
      color: 'text-purple-500', 
      bg: 'bg-purple-50 dark:bg-purple-500/10' 
    },
    { 
      label: 'Offers Received', 
      value: jobs.filter(j => j.status === 'offer' || j.status === 'accepted').length, 
      icon: CheckCircle2, 
      color: 'text-emerald-500', 
      bg: 'bg-emerald-50 dark:bg-emerald-500/10' 
    },
  ];

  const interviewRate = jobs.length > 0 
    ? ((jobs.filter(j => ['interview', 'offer', 'accepted'].includes(j.status)).length / jobs.length) * 100).toFixed(1)
    : 0;

  const funnelData = [
    { label: 'Wishlist', count: jobs.filter(j => j.status === STATUS.WISHLIST).length },
    { label: 'Applied', count: jobs.filter(j => j.status === STATUS.APPLIED).length },
    { label: 'Interview', count: jobs.filter(j => j.status === STATUS.INTERVIEW).length },
    { label: 'Offer', count: jobs.filter(j => j.status === STATUS.OFFER).length },
    { label: 'Accepted', count: jobs.filter(j => j.status === STATUS.ACCEPTED).length },
  ];

  const maxCount = Math.max(...funnelData.map(d => d.count), 1);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <ActivityCalendar jobs={jobs} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Application Funnel
            </h3>
            <Badge variant="default" className="bg-primary/10 text-primary">
              Interview Rate: {interviewRate}%
            </Badge>
          </div>
          
          <div className="space-y-4">
            {funnelData.map((stage, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{stage.label}</span>
                  <span className="text-slate-500">{stage.count}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${(stage.count / maxCount) * 100}%`,
                      opacity: 1 - (i * 0.15)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-primary" />
              Top Companies
            </h3>
            <div className="space-y-4">
              {Object.entries(jobs.reduce((acc, job) => {
                acc[job.company] = (acc[job.company] || 0) + 1;
                return acc;
              }, {}))
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([company, count], i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{company}</span>
                    <Badge variant="default">{count} jobs</Badge>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-primary" />
              Resumes Used
            </h3>
            <div className="space-y-4">
              {Object.entries(jobs.reduce((acc, job) => {
                if (job.resume) acc[job.resume] = (acc[job.resume] || 0) + 1;
                return acc;
              }, {}))
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([resume, count], i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-mono text-slate-600 dark:text-slate-400">{resume}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
