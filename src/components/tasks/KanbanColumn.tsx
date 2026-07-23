'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '@/types';
import TaskCard from './TaskCard';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export default function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div className="flex flex-col w-[320px] min-w-[320px] shrink-0 bg-muted/30 rounded-xl border overflow-hidden max-h-full">
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="secondary" className="rounded-full px-2 py-0.5 font-medium">
          {tasks.length}
        </Badge>
      </div>

      <div 
        ref={setNodeRef}
        className={`flex-1 p-3 overflow-y-auto min-h-[150px] transition-colors ${
          isOver ? 'bg-muted/50' : ''
        }`}
      >
        <SortableContext
          id={id}
          items={tasks.map((t) => t._id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
