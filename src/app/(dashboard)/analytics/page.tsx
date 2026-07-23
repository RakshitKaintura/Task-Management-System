'use client';

import { useEffect } from 'react';
import useTaskStore from '@/store/useTaskStore';
import CategoryPieChart from '@/components/analytics/CategoryPieChart';
import PriorityChart from '@/components/analytics/PriorityChart';
import CompletionChart from '@/components/analytics/CompletionChart';

export default function AnalyticsPage() {
  const { tasks, isLoading, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-lg bg-primary/20 mb-4 flex items-center justify-center">
            <div className="h-6 w-6 rounded-sm bg-primary/50 animate-bounce" />
          </div>
          <div className="h-4 w-32 bg-muted rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Insights and metrics about your task management.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <CompletionChart tasks={tasks} />
        <CategoryPieChart tasks={tasks} />
        <PriorityChart tasks={tasks} />
      </div>
    </div>
  );
}
