import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column } from './Column';
import { JobCard } from './JobCard';
import { useJobStore } from '../../store/jobStore';

export const COLUMNS = [
  { id: 'wishlist', title: 'Wishlist', color: 'bg-gray-400' },
  { id: 'applied', title: 'Applied', color: 'bg-blue-500' },
  { id: 'follow-up', title: 'Follow-up', color: 'bg-purple-500' },
  { id: 'interview', title: 'Interview', color: 'bg-yellow-500' },
  { id: 'offer', title: 'Offer', color: 'bg-green-500' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-500' }
];

export const Board = ({ onEditJob, searchQuery = '' }) => {
  const { jobs, updateJob, deleteJob } = useJobStore();
  
  const filteredJobs = jobs.filter(job => 
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [activeJob, setActiveJob] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const job = jobs.find((j) => j.id === active.id);
    setActiveJob(job);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const activeJobId = active.id;
    const overId = over.id;

    // Target can be either a column directly, or another job card in a column
    let newStatus;
    const overColumn = COLUMNS.find((col) => col.id === overId);
    if (overColumn) {
      newStatus = overId;
    } else {
      const overJob = jobs.find((j) => j.id === overId);
      if (overJob) {
        newStatus = overJob.status;
      }
    }

    if (newStatus) {
      const activeJobOriginal = jobs.find(j => j.id === activeJobId);
      if (activeJobOriginal && activeJobOriginal.status !== newStatus) {
        updateJob(activeJobId, { status: newStatus });
      }
    }
  };

  return (
    <div className="flex-1 overflow-x-auto h-full p-4 bg-gray-50 dark:bg-gray-900 flex scrollbar-thin">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            jobs={filteredJobs.filter((j) => j.status === col.id)}
            onEdit={onEditJob}
            onDelete={deleteJob}
          />
        ))}
        <DragOverlay>
          {activeJob ? (
            <div className="rotate-2 scale-105 opacity-90 cursor-grabbing shadow-2xl">
              <JobCard job={activeJob} onEdit={() => {}} onDelete={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
