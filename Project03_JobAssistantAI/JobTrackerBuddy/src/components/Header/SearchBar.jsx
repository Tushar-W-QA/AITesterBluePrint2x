import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { COLUMNS, PRIORITIES, WORK_MODES } from '../../lib/constants';

export default function SearchBar({ 
  searchTerm, setSearchTerm, filters, setFilters, resetFilters, activeFilterCount, totalFiltered, totalJobs 
}) {
  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full bg-white dark:bg-[#111110] border-b border-gray-200 dark:border-gray-800 px-6 py-2 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
      
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input 
           type="text" 
           placeholder="Search company, role, tags..." 
           value={searchTerm}
           onChange={e => setSearchTerm(e.target.value)}
           className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 transition-colors"
        />
        {searchTerm && (
           <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
             <X size={14} />
           </button>
        )}
      </div>

      <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mr-2">
           <Filter size={14} />
           <span className="font-medium">Filters</span>
           {activeFilterCount > 0 && (
              <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs px-1.5 rounded-full font-bold">
                 {activeFilterCount}
              </span>
           )}
        </div>

        <select name="status" value={filters.status} onChange={handleFilterChange} className="bg-gray-50 dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500">
           <option value="">Any Status</option>
           {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>

        <select name="priority" value={filters.priority} onChange={handleFilterChange} className="bg-gray-50 dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500">
           <option value="">Any Priority</option>
           {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        <select name="workMode" value={filters.workMode} onChange={handleFilterChange} className="bg-gray-50 dark:bg-[#1C1C1A] border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-md px-2 py-1 outline-none focus:ring-1 focus:ring-blue-500">
           <option value="">Any Work Mode</option>
           {WORK_MODES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>

        {(activeFilterCount > 0 || searchTerm) && (
           <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 whitespace-nowrap hidden sm:block ml-2">
             Clear all
           </button>
        )}

        <div className="text-xs text-gray-400 whitespace-nowrap ml-auto pl-4 border-l border-gray-200 dark:border-gray-800">
           Showing {totalFiltered} of {totalJobs}
        </div>
      </div>

    </div>
  );
}
