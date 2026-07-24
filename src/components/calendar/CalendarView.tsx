'use client';

import { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useTaskStore from '@/store/useTaskStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { tasks, fetchTasks } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>Today</Button>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEE';
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="text-center font-medium text-sm py-2 text-muted-foreground" key={i}>
          {format(addDays(startDate, i), dateFormat).substring(0, 3)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 border-b">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        // Find tasks for this day
        const dayTasks = tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), cloneDay));
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        days.push(
          <div
            className={`min-h-[100px] border-b border-r p-2 transition-colors hover:bg-muted/30 ${
              !isCurrentMonth ? 'bg-muted/10 text-muted-foreground' : 'bg-card'
            }`}
            key={day.toString()}
          >
            <div className="flex justify-between items-start">
              <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${
                isToday ? 'bg-primary text-primary-foreground' : ''
              }`}>
                {formattedDate}
              </span>
            </div>
            
            <div className="mt-2 flex flex-col gap-1">
              {dayTasks.slice(0, 3).map((task, idx) => (
                <Popover key={task._id || idx}>
                  <PopoverTrigger className={`text-left text-xs p-1 rounded truncate cursor-pointer w-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30' :
                      task.priority === 'high' || task.priority === 'critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30'
                    }`}>
                      {task.title}
                  </PopoverTrigger>
                  <PopoverContent className="w-64">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
                      <div className="flex justify-between text-xs mt-2 pt-2 border-t">
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                        <span className="capitalize">{task.priority} Priority</span>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
              {dayTasks.length > 3 && (
                <div className="text-xs text-muted-foreground font-medium pl-1">
                  +{dayTasks.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="border-l border-t rounded-lg overflow-hidden">{rows}</div>;
  };

  return (
    <div className="w-full bg-card rounded-xl border shadow-sm p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
