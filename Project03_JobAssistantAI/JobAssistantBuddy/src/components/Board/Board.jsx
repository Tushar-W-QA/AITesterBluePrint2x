import React from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { COLUMNS } from '../../lib/constants';
import { Column } from './Column';
import { JobCard } from '../Card/JobCard';

export const Board = ({ jobs, onEditJob, onStatusChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = React.useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Logic for dropping into a different column is handled in onDragEnd 
    // for simplicity since we're using status-based columns.
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const jobId = active.id;
    const overId = over.id;

    // Check if dropped over a column or another card
    let newStatus = over.data.current?.status;
    
    // If dropped over a card, get its status
    if (!newStatus && over.data.current?.sortable?.containerId) {
      newStatus = over.data.current.sortable.containerId;
    }

    if (newStatus && newStatus !== jobs.find(j => j.id === jobId)?.status) {
      onStatusChange(jobId, newStatus);
    }

    setActiveId(null);
  };

  const getJobsByStatus = (status) => jobs.filter(j => j.status === status);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex-1 overflow-x-auto overflow-y-hidden bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-112px)] flex items-start px-6 gap-6 py-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.label}
            color={column.color}
            count={getJobsByStatus(column.id).length}
          >
            <SortableContext 
              id={column.id} 
              items={getJobsByStatus(column.id).map(j => j.id)} 
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-3">
                {getJobsByStatus(column.id).map((job) => (
                  <JobCard key={job.id} job={job} onClick={() => onEditJob(job)} />
                ))}
              </div>
            </SortableContext>
          </Column>
        ))}
      </div>
      
      <DragOverlay>
        {activeId ? (
          <JobCard job={jobs.find(j => j.id === activeId)} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
