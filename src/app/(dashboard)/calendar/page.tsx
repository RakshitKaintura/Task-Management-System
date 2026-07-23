'use client';

import CalendarView from '@/components/calendar/CalendarView';

export default function CalendarPage() {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View your tasks in a monthly calendar.
          </p>
        </div>
      </div>
      
      <div className="flex-1">
        <CalendarView />
      </div>
    </div>
  );
}
