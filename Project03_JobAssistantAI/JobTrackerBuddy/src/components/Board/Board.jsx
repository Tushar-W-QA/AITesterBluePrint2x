import React, { useState } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { COLUMNS } from '../../lib/constants';
import Column from './Column';
import JobCard from '../Card/JobCard';

export default function Board({ jobs, onJobUpdateStatus, onAddJob, onCardClick }) {
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const draggingJob = jobs.find(j => j.id === active.id);
    if (draggingJob) setActiveJob(draggingJob);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;
    
    // Find the real column id (could be over a column or over a card)
    let newStatus = over.id;
    if (over.data.current?.type === 'Job') {
       newStatus = over.data.current.job.status;
    }

    const job = jobs.find(j => j.id === active.id);
    if (job && job.status !== newStatus) {
       onJobUpdateStatus(job.id, newStatus);
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full overflow-x-auto w-full px-6 py-6 custom-scrollbar items-start">
        {COLUMNS.map(col => (
          <Column 
            key={col.id} 
            column={col} 
            jobs={jobs.filter(j => j.status === col.id)} 
            onAddJob={onAddJob}
            onCardClick={onCardClick}
          />
        ))}
      </div>
      <DragOverlay>
        {activeJob ? (
           <div className="opacity-90 transform scale-105 shadow-xl rotate-1 cursor-grabbing">
              <JobCard job={activeJob} onClick={() => {}} />
           </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
