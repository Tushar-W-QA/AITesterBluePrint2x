import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

export const Column = ({ id, title, color, count, children, onAdd }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: 'column',
      status: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex-shrink-0 w-[280px] sm:w-[320px] flex flex-col h-full rounded-xl transition-all ${
        isOver ? 'bg-slate-100 dark:bg-slate-800/50 ring-2 ring-primary/20' : ''
      }`}
    >
      <div className="flex items-center justify-between p-3 mb-2 sticky top-0 bg-white dark:bg-slate-800 z-10 rounded-t-xl border-b border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">
            {title}
          </h3>
          <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center">
            {count}
          </span>
        </div>
        <button 
          onClick={onAdd}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-1 pb-4 min-h-[150px] no-scrollbar">
        {count === 0 ? (
          <div className="h-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center p-4">
            <p className="text-xs text-slate-400 text-center">No jobs here yet</p>
          </div>
        ) : (
          children
        )}
      </div>
      
      {isOver && (
        <div className="absolute inset-0 bg-primary/5 border-2 border-primary border-dashed rounded-xl z-0 pointer-events-none" />
      )}
    </div>
  );
};
