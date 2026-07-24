'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import useTaskStore from '@/store/useTaskStore';
import StatsCards from '@/components/dashboard/StatsCards';
import QuickAddTask from '@/components/dashboard/QuickAddTask';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { tasks, isLoading, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const today = new Date();
  
  // Filter for today's tasks
  const todaysTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="flex flex-col space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            {greeting()}, {user?.name?.split(' ')[0] || 'User'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1"
          >
            Here's what's happening with your tasks today.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="text-right hidden sm:block mr-2">
            <p className="text-sm font-medium">{format(today, 'EEEE, MMMM do')}</p>
            <p className="text-xs text-muted-foreground">You have {todaysTasks.length} tasks due today</p>
          </div>
          <QuickAddTask />
        </motion.div>
      </div>

      {/* Stats Cards */}
      <StatsCards tasks={tasks} isLoading={isLoading} />

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col min-h-[400px]"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Today's Tasks</h3>
            <p className="text-sm text-muted-foreground">Tasks due today</p>
          </div>
          <div className="p-6 pt-0 flex-1 flex flex-col">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}
              </div>
            ) : todaysTasks.length > 0 ? (
              <div className="space-y-4">
                {todaysTasks.map(task => (
                  <div key={task._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{task.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                        task.status === 'in-progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                      }`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 opacity-20" />
                </div>
                <p>No tasks due today.</p>
                <p className="text-sm mt-1">Enjoy your day or get ahead on upcoming tasks!</p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm flex flex-col min-h-[400px]"
        >
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">Your latest updates</p>
          </div>
          <div className="p-6 pt-0 flex-1">
            {isLoading ? (
               <div className="space-y-4">
               {[1, 2, 3].map(i => <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />)}
             </div>
            ) : tasks.length > 0 ? (
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
                {tasks.slice(0, 5).map(task => (
                  <div key={task._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    {/* Simplified timeline view for recent tasks */}
                    <div className="flex items-center w-full bg-muted/30 p-3 rounded-lg border text-sm">
                      <div className="flex-1 truncate pr-2">
                        <span className="font-medium truncate block">{task.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(task.updatedAt || task.createdAt), 'MMM d, h:mm a')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <p>No recent activity to show.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
