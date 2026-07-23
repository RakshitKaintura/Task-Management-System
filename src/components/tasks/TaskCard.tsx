'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { CalendarIcon, Clock, MoreVertical, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { Task } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import useTaskStore from '@/store/useTaskStore';
import TaskDialog from './TaskDialog';
import { toast } from 'sonner';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteTask, updateTask } = useTaskStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityColors = {
    low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30',
    critical: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 shadow-sm shadow-rose-500/20',
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
        toast.success('Task deleted');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const markComplete = async () => {
    try {
      await updateTask(task._id, { status: 'completed' });
      toast.success('Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card className={`cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors ${
          task.status === 'completed' ? 'opacity-70' : ''
        } ${task.priority === 'critical' ? 'border-rose-500/50' : ''}`}>
          <CardHeader className="p-3 pb-2 flex flex-row items-start justify-between space-y-0 relative">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className={`text-xs px-2 py-0 h-5 font-semibold ${priorityColors[task.priority]}`}>
                {task.priority}
              </Badge>
              <Badge variant="secondary" className="text-xs px-2 py-0 h-5 font-medium capitalize">
                {task.category}
              </Badge>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="h-6 w-6 p-0 -mr-2 -mt-1 text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                {task.status !== 'completed' && (
                  <DropdownMenuItem onClick={markComplete}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Complete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          
          <CardContent className="p-3 pt-0 pb-2">
            <h4 className={`font-semibold text-sm line-clamp-2 ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {task.description}
              </p>
            )}
          </CardContent>
          
          <CardFooter className="p-3 pt-0 flex items-center justify-between">
            {task.dueDate ? (
              <div className="flex items-center text-xs text-muted-foreground font-medium">
                <CalendarIcon className="mr-1 h-3 w-3" />
                <span className={new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-red-500 font-semibold' : ''}>
                  {format(new Date(task.dueDate), 'MMM d')}
                </span>
              </div>
            ) : (
              <div />
            )}
            
            {task.estimatedTime ? (
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {task.estimatedTime}m
              </div>
            ) : null}
          </CardFooter>
        </Card>
      </div>

      <TaskDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
        task={task} 
      />
    </>
  );
}
