'use client';

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer 
} from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CompletionChartProps {
  tasks: Task[];
}

export default function CompletionChart({ tasks }: CompletionChartProps) {
  // Generate last 7 days data
  const data = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i); // 6 days ago to today
    
    // Count tasks completed on this date
    // Note: We use updatedAt here assuming it reflects the completion time. 
    // In a real app we'd have a specific `completedAt` timestamp.
    const completedCount = tasks.filter(t => 
      t.status === 'completed' && 
      t.updatedAt && 
      isSameDay(new Date(t.updatedAt), date)
    ).length;

    // Count tasks created on this date
    const createdCount = tasks.filter(t => 
      t.createdAt && 
      isSameDay(new Date(t.createdAt), date)
    ).length;

    return {
      name: format(date, 'EEE'), // Mon, Tue, etc.
      completed: completedCount,
      created: createdCount,
    };
  });

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Tasks created vs completed over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="created" 
                stroke="#3b82f6" 
                fillOpacity={1} 
                fill="url(#colorCreated)" 
                name="Created"
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorCompleted)" 
                name="Completed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
