import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MapPin, Briefcase, ExternalLink, Star, Bell, MoreHorizontal, Trash2, Edit3 } from 'lucide-react';
import { Badge } from '../UI/Button';
import { daysSince, getDateColor } from '../../lib/utils';
import { PRIORITY_COLORS } from '../../lib/constants';

export const JobCard = ({ job, onClick, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: job.id,
    data: {
      type: 'job',
      job,
    }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColor = PRIORITY_COLORS[job.priority] || '#cbd5e1';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-grab active:cursor-grabbing ${isDragging ? 'z-50 ring-2 ring-primary/50' : ''}`}
      onClick={(e) => {
        if (e.target.closest('button')) return;
        onClick();
      }}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-slate-900 dark:text-white truncate">{job.company}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{job.role}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: priorityColor }} />
          <div className="flex items-center text-slate-300 dark:text-slate-600">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-3 h-3 ${star <= (job.rating || 0) ? 'fill-amber-400 text-amber-400' : 'fill-current'}`} 
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {job.location && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-700/50 px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3" />
            {job.location}
          </div>
        )}
        {job.workMode && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {job.workMode}
          </Badge>
        )}
        {job.resume && (
          <div className="text-[10px] font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
            {job.resume}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-3">
          <span className={`font-medium ${getDateColor(job.dateApplied)}`}>
            {daysSince(job.dateApplied)}
          </span>
          {job.followUpDate && (
            <Bell className={`w-3.5 h-3.5 ${new Date(job.followUpDate) <= new Date() ? 'text-red-500 animate-pulse' : 'text-slate-400'}`} />
          )}
        </div>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {job.linkedinUrl && (
            <a 
              href={job.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-400 hover:text-blue-500"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Hidden tags indicator if many */}
      {job.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {job.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-slate-400">
              #{tag}
            </span>
          ))}
          {job.tags.length > 2 && (
            <span className="text-[9px] px-1.5 py-0.5 text-slate-400">+{job.tags.length - 2} more</span>
          )}
        </div>
      )}
    </div>
  );
};
