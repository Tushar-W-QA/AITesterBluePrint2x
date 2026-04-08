import React, { useMemo } from 'react';
import { COLUMNS } from '../../lib/constants';
import { daysSince } from '../../lib/utils';

export default function Dashboard({ jobs }) {
  const stats = useMemo(() => {
    const total = jobs.length;
    const wishlist = jobs.filter(j => j.status === 'wishlist').length;
    const applied = jobs.filter(j => j.status === 'applied').length;
    const interviews = jobs.filter(j => j.status === 'interview').length;
    const offers = jobs.filter(j => j.status === 'offer').length;
    const accepted = jobs.filter(j => j.status === 'accepted').length;

    const activePipeline = jobs.filter(j => ['applied', 'screening', 'interview'].includes(j.status)).length;
    const interviewRate = applied > 0 ? Math.round((interviews / applied) * 100) : 0;
    const offerRate = interviews > 0 ? Math.round((offers / interviews) * 100) : 0;

    const activeJobsWithDate = jobs.filter(j => ['applied', 'screening', 'interview'].includes(j.status) && j.dateApplied);
    const totalDays = activeJobsWithDate.reduce((sum, j) => {
       const ds = daysSince(j.dateApplied);
       return ds !== null ? sum + ds : sum;
    }, 0);
    const avgDaysActive = activeJobsWithDate.length > 0 ? Math.round(totalDays / activeJobsWithDate.length) : 0;

    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const weeklyApps = [0, 0, 0, 0];
    jobs.forEach(j => {
      if (j.dateApplied) {
        const diff = now - new Date(j.dateApplied).getTime();
        if (diff >= 0 && diff < oneWeek) weeklyApps[3]++;
        else if (diff >= oneWeek && diff < 2 * oneWeek) weeklyApps[2]++;
        else if (diff >= 2 * oneWeek && diff < 3 * oneWeek) weeklyApps[1]++;
        else if (diff >= 3 * oneWeek && diff < 4 * oneWeek) weeklyApps[0]++;
      }
    });

    return { total, activePipeline, interviewRate, offerRate, avgDaysActive, weeklyApps, funnel: { wishlist, applied, interviews, offers, accepted } };
  }, [jobs]);

  const maxFunnel = Math.max(stats.funnel.wishlist, stats.funnel.applied, stats.funnel.interviews, stats.funnel.offers, stats.funnel.accepted, 1);

  return (
    <div className="p-8 max-w-6xl mx-auto flex flex-col gap-8 h-full overflow-y-auto w-full custom-scrollbar">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overview Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Saved Jobs" value={stats.total} />
        <StatCard title="Active Pipeline" value={stats.activePipeline} />
        <StatCard title="Avg. Days Active" value={`${stats.avgDaysActive}d`} />
        <StatCard title="Interview Rate" value={`${stats.interviewRate}%`} />
        <StatCard title="Offer Rate (from Interview)" value={`${stats.offerRate}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
           <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">Application Funnel</h3>
           <div className="flex flex-col gap-5">
              <FunnelBar label="Wishlist" count={stats.funnel.wishlist} total={maxFunnel} color="bg-indigo-500" />
              <FunnelBar label="Applied" count={stats.funnel.applied} total={maxFunnel} color="bg-blue-500" />
              <FunnelBar label="Interview" count={stats.funnel.interviews} total={maxFunnel} color="bg-purple-500" />
              <FunnelBar label="Offer" count={stats.funnel.offers} total={maxFunnel} color="bg-emerald-500" />
              <FunnelBar label="Accepted" count={stats.funnel.accepted} total={maxFunnel} color="bg-green-500" />
           </div>
         </div>

         <div className="bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">Applications Past 4 Weeks</h3>
            <div className="flex items-end justify-around h-48 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
               <VerticalBar label="3w ago" count={stats.weeklyApps[0]} max={Math.max(...stats.weeklyApps, 5)} />
               <VerticalBar label="2w ago" count={stats.weeklyApps[1]} max={Math.max(...stats.weeklyApps, 5)} />
               <VerticalBar label="last week" count={stats.weeklyApps[2]} max={Math.max(...stats.weeklyApps, 5)} />
               <VerticalBar label="this week" count={stats.weeklyApps[3]} max={Math.max(...stats.weeklyApps, 5)} />
            </div>
         </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm flex flex-col gap-1 hover:-translate-y-0.5 transition-transform">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
      <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}

function FunnelBar({ label, count, total, color }) {
  const width = Math.max((count / total) * 100, 2); // 2% minimum width so bar is always visible
  return (
    <div className="flex items-center gap-4">
      <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-300 text-right">{label}</div>
      <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative group">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-out flex items-center px-3`}
          style={{ width: `${count === 0 ? 0 : width}%` }}
        >
        </div>
      </div>
      <div className="w-8 text-sm font-bold text-gray-900 dark:text-gray-100">{count}</div>
    </div>
  )
}

function VerticalBar({ label, count, max }) {
  const height = Math.max((count / max) * 100, 4); // 4% minimum so bar is visible
  return (
    <div className="flex flex-col items-center gap-3">
       <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{count}</span>
       <div className="w-12 h-32 bg-gray-100 dark:bg-gray-800 rounded-md relative flex items-end overflow-hidden group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <div className="w-full bg-[#1D4ED8] dark:bg-blue-500 transition-all duration-1000 ease-out flex items-start justify-center pt-2" style={{ height: `${count === 0 ? 0 : height}%` }}>
             {/* optional inner glow or styling */}
          </div>
       </div>
       <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{label}</span>
    </div>
  )
}
