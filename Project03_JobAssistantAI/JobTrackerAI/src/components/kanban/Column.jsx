import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { JobCard } from './JobCard';

export const Column = ({ column, jobs, onEdit, onDelete }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 shrink-0 mx-2 first:ml-4 last:mr-4 h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center shrink-0">
          <div className={`w-3 h-3 rounded-full mr-2 ${column.color}`} />
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">{column.title}</h2>
          <span className="ml-2 text-xs font-medium text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full">
            {jobs.length}
          </span>
        </div>
      </div>
      
      <div 
        ref={setNodeRef}
        className="flex-1 bg-gray-100/50 dark:bg-gray-800/20 shadow-inner rounded-xl p-2 md:p-3 overflow-y-auto min-h-[150px]"
      >
        <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 min-h-full">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};
