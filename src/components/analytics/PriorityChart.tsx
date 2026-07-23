'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Task } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PriorityChartProps {
  tasks: Task[];
}

export default function PriorityChart({ tasks }: PriorityChartProps) {
  // Aggregate active tasks by priority
  const activeTasks = tasks.filter(t => t.status !== 'completed');
  
  const priorityCounts = activeTasks.reduce((acc: any, task) => {
    const priority = task.priority || 'medium';
    if (!acc[priority]) {
      acc[priority] = 0;
    }
    acc[priority]++;
    return acc;
  }, { low: 0, medium: 0, high: 0, critical: 0 }); // Initialize all

  const data = [
    { name: 'Low', count: priorityCounts.low, color: '#10b981' }, // emerald-500
    { name: 'Medium', count: priorityCounts.medium, color: '#f59e0b' }, // amber-500
    { name: 'High', count: priorityCounts.high, color: '#f97316' }, // orange-500
    { name: 'Critical', count: priorityCounts.critical, color: '#ef4444' }, // red-500
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Active Tasks by Priority</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
