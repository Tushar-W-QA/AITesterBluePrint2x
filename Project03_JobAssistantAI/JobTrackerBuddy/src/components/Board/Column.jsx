import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import JobCard from '../Card/JobCard';

export default function Column({ column, jobs, onAddJob, onCardClick }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id, data: { type: 'Column', column } });

  return (
    <div className="flex flex-col flex-shrink-0 w-[280px] h-full bg-white dark:bg-[#151515] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden relative shadow-sm">
      <div 
         className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800"
         style={{ borderTop: `4px solid ${column.color}`, backgroundColor: `${column.color}0A` }}
      >
        <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-gray-200 leading-none flex items-center gap-1.5">{column.icon} {column.label}</span>
            <span className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold px-2 py-0.5 rounded-full leading-none">{jobs.length}</span>
        </div>
        <button 
           onClick={() => onAddJob(column.id)}
           className="text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div 
         ref={setNodeRef} 
         className={`flex-1 p-3 overflow-y-auto flex flex-col gap-3 transition-colors ${isOver ? 'bg-gray-50/50 dark:bg-white/5' : ''}`}
      >
        <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map(job => (
             <JobCard key={job.id} job={job} onClick={onCardClick} />
          ))}
        </SortableContext>
        
        {jobs.length === 0 && (
            <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-24 flex items-center justify-center text-xs text-gray-400 dark:text-gray-500 text-center px-4">
               No jobs here yet — drag one here or click + Add
            </div>
        )}
      </div>
    </div>
  );
}
