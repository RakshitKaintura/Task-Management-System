'use client';

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import useTaskStore from '@/store/useTaskStore';
import KanbanBoard from '@/components/tasks/KanbanBoard';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskSearch from '@/components/tasks/TaskSearch';
import { Button } from '@/components/ui/button';
import TaskDialog from '@/components/tasks/TaskDialog';

export default function TasksPage() {
  const { tasks, isLoading, fetchTasks } = useTaskStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="flex flex-col space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage and organize your tasks using the Kanban board.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg border shadow-sm">
        <TaskSearch />
        <TaskFilters />
      </div>

      <div className="flex-1 overflow-hidden relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10 backdrop-blur-sm">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 rounded-lg bg-primary/20 mb-4 flex items-center justify-center">
                <div className="h-6 w-6 rounded-sm bg-primary/50 animate-bounce" />
              </div>
            </div>
          </div>
        ) : null}
        <KanbanBoard tasks={tasks} />
      </div>

      <TaskDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </div>
  );
}
