'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/types';
import useTaskStore from '@/store/useTaskStore';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const { updateTask, optimisticUpdateTaskStatus } = useTaskStore();
  const [activeId, setActiveId] = useState<string | null>(null);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
  ];

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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    // Check if we dropped on a column
    const isOverColumn = columns.some((col) => col.id === overId);
    let newStatus: Task['status'] = task.status;

    if (isOverColumn) {
      newStatus = overId as Task['status'];
    } else {
      // We dropped on another task, get its status
      const overTask = tasks.find((t) => t._id === overId);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (task.status !== newStatus) {
      // Optimistic update
      optimisticUpdateTaskStatus(taskId, newStatus);
      
      try {
        await updateTask(taskId, { status: newStatus });
      } catch (error) {
        // Revert optimistic update (already handled by refetching/showing error in store)
        console.error('Failed to update task status', error);
      }
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((t) => t.status === status);
  };

  const activeTask = activeId ? tasks.find((t) => t._id === activeId) : null;

  return (
    <div className="flex h-full w-full gap-4 overflow-x-auto pb-4 pt-2 hide-scrollbar">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={getTasksByStatus(col.id)}
          />
        ))}
        
        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 scale-105 opacity-80 cursor-grabbing">
              <TaskCard task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
