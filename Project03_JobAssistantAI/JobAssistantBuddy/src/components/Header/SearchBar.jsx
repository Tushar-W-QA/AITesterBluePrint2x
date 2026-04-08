import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button, Badge } from '../UI/Button';

export const SearchBar = ({ 
  query, 
  setQuery, 
  onOpenFilters,
  onClear, 
  activeCount,
  resultsCount,
  totalCount 
}) => {
  return (
    <div className="sticky top-14 z-30 w-full border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-6 py-2 flex items-center gap-4 flex-wrap">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search company, role, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400"
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Button variant="secondary" size="sm" className="gap-2 flex-shrink-0" onClick={onOpenFilters}>
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeCount > 0 && <Badge variant="default" className="bg-primary text-white ml-1">{activeCount}</Badge>}
        </Button>

        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} className="text-xs text-slate-500">
            Clear all
          </Button>
        )}

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
        
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {resultsCount === totalCount ? `Showing all ${totalCount} jobs` : `Showing ${resultsCount} of ${totalCount} jobs`}
        </span>
      </div>
    </div>
  );
};
