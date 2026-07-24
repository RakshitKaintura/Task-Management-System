'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import useTaskStore from '@/store/useTaskStore';
import { isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import { Task } from '@/types';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'warning' | 'info';
  read: boolean;
  taskId: string;
};

export default function NotificationCenter() {
  const { tasks } = useTaskStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Generate notifications based on tasks
    const newNotifications: Notification[] = [];

    tasks.forEach(task => {
      if (task.status === 'completed' || !task.dueDate) return;

      const dueDate = new Date(task.dueDate);
      
      if (isPast(dueDate) && !isToday(dueDate)) {
        newNotifications.push({
          id: `overdue-${task._id}`,
          title: 'Overdue Task',
          message: `"${task.title}" was due recently.`,
          type: 'urgent',
          read: false,
          taskId: task._id
        });
      } else if (isToday(dueDate)) {
        newNotifications.push({
          id: `today-${task._id}`,
          title: 'Due Today',
          message: `"${task.title}" is due today.`,
          type: 'warning',
          read: false,
          taskId: task._id
        });
      } else if (isTomorrow(dueDate)) {
        newNotifications.push({
          id: `tomorrow-${task._id}`,
          title: 'Due Tomorrow',
          message: `"${task.title}" is due tomorrow.`,
          type: 'info',
          read: false,
          taskId: task._id
        });
      }
    });

    // In a real app we'd fetch saved notifications and merge read state.
    // For now we just populate them dynamically.
    setNotifications(newNotifications);
  }, [tasks]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'urgent': return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-amber-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger 
        render={
          <Button variant="ghost" size="icon" className="rounded-full relative" />
        }
      >
        <Bell className="h-5 w-5 text-muted-foreground" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-2 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-background animate-pulse"></span>
        )}
        <span className="sr-only">Notifications</span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="px-1.5 py-0 h-5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground" onClick={markAllAsRead}>
              <Check className="mr-1 h-3 w-3" /> Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground px-4 text-center">
              <Bell className="h-8 w-8 mb-2 opacity-20" />
              <p className="text-sm">You're all caught up!</p>
              <p className="text-xs mt-1">No new notifications</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`flex gap-3 px-4 py-3 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-muted/20' : 'opacity-70'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-0.5 shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm font-medium leading-none ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="shrink-0 flex items-center justify-center">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
