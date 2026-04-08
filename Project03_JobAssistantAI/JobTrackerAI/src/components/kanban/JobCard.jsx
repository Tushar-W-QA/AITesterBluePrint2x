import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Briefcase, Calendar, Linkedin, Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const priorityColors = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

export const JobCard = ({ job, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: job.id, data: job });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const daysApplied = job.dateApplied ? formatDistanceToNow(new Date(job.dateApplied), { addSuffix: true }) : 'N/A';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 relative group cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${isDragging ? 'opacity-50 ring-2 ring-blue-500' : ''}`}
    >
       <div className="flex justify-between items-start mb-2">
         <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate pr-10">{job.jobTitle}</h3>
         <div className="absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
           <button onClick={(e) => { e.stopPropagation(); onEdit(job); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
             <Edit2 size={14} />
           </button>
           <button onClick={(e) => { e.stopPropagation(); onDelete(job.id); }} onPointerDown={(e) => e.stopPropagation()} className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded text-red-500">
             <Trash2 size={14} />
           </button>
         </div>
       </div>

       <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
         <Briefcase size={14} className="mr-1" />
         <span className="truncate">{job.companyName}</span>
       </div>

       <div className="flex flex-wrap gap-2 mb-3">
         {job.priority && (
           <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[job.priority]}`}>
             {job.priority} Priority
           </span>
         )}
         {job.resumeUsed && (
           <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium truncate max-w-[100px]">
             📝 {job.resumeUsed}
           </span>
         )}
       </div>

       <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
         <div className="flex items-center">
           <Calendar size={12} className="mr-1" />
           {daysApplied}
         </div>
         {job.linkedinUrl && (
           <a 
             href={job.linkedinUrl} 
             target="_blank" 
             rel="noreferrer" 
             className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
             onClick={(e) => e.stopPropagation()}
             onPointerDown={(e) => e.stopPropagation()}
           >
             <Linkedin size={14} />
           </a>
         )}
       </div>
    </div>
  );
};
