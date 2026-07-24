'use client';

import { Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useTaskStore from '@/store/useTaskStore';

export default function TaskFilters() {
  const { filters, setFilters } = useTaskStore();

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground mr-2 shrink-0">
        <Filter className="h-4 w-4" />
        <span className="hidden sm:inline">Filter:</span>
      </div>

      <Select value={filters.status} onValueChange={(v) => setFilters({ status: v || undefined })}>
        <SelectTrigger className="w-[130px] h-9 shrink-0">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.priority} onValueChange={(v) => setFilters({ priority: v || undefined })}>
        <SelectTrigger className="w-[130px] h-9 shrink-0">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(v) => setFilters({ category: v || undefined })}>
        <SelectTrigger className="w-[130px] h-9 shrink-0">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="personal">Personal</SelectItem>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="study">Study</SelectItem>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="shopping">Shopping</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
