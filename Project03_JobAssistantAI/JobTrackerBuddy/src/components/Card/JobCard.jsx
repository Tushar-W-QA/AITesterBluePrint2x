import React from 'react';
import { Calendar, MapPin, Building2, ExternalLink } from 'lucide-react';
import { combineClasses, daysSince } from '../../lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Badge from '../UI/Badge';

export default function JobCard({ job, onClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id, data: { type: 'Job', job } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.3 : 1
  };

  const daysApplied = daysSince(job.dateApplied);

  const getDaysColor = (d) => {
    if (d === null) return 'text-gray-500';
    if (d < 7) return 'text-green-600 dark:text-green-400';
    if (d <= 30) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-500 dark:text-red-400';
  };

  const preventClick = (e) => e.stopPropagation();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(job)}
      className="bg-white dark:bg-[#1C1C1A] border border-gray-100 dark:border-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col gap-2 relative group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-tight">
            {job.company}
            {job.linkedinUrl && (
               <a href={job.linkedinUrl} onClick={preventClick} target="_blank" rel="noopener noreferrer" className="inline-block ml-1 text-blue-500 hover:text-blue-700">
                  <ExternalLink size={12} />
               </a>
            )}
          </h4>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-0.5">{job.role}</p>
        </div>
        {job.priority && (
          <div className="flex items-center">
            <span className={combineClasses(
              "w-2 h-2 rounded-full",
              job.priority === 'High' ? 'bg-red-500' : job.priority === 'Medium' ? 'bg-amber-400' : 'bg-gray-400'
            )} title={`Priority: ${job.priority}`}></span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
        {job.location && (
          <div className="flex items-center gap-1.5">
             <MapPin size={12} /> {job.location} {job.workMode && `· ${job.workMode}`}
          </div>
        )}
        <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span className={getDaysColor(daysApplied)}>
                    {daysApplied !== null ? `${daysApplied}d ago` : 'Date N/A'}
                </span>
            </div>
            {job.resume && <Badge type="purple">{job.resume}</Badge>}
        </div>
      </div>
      
      {job.tags && job.tags.length > 0 && (
         <div className="flex gap-1.5 mt-1 flex-wrap">
            {job.tags.slice(0, 3).map((tag, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md">
                    {tag}
                </span>
            ))}
            {job.tags.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-md">
                    +{job.tags.length - 3}
                </span>
            )}
         </div>
      )}
    </div>
  );
}
