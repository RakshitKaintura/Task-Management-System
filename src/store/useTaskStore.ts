import { create } from 'zustand';
import { Task } from '@/types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  filters: {
    status: string;
    priority: string;
    category: string;
  };
  searchQuery: string;
  
  setFilters: (filters: Partial<TaskState['filters']>) => void;
  setSearchQuery: (query: string) => void;
  
  fetchTasks: () => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  
  // Optimistic update for drag and drop
  optimisticUpdateTaskStatus: (id: string, status: Task['status']) => void;
}

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: true,
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
  },
  searchQuery: '',
  
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
    get().fetchTasks();
  },
  
  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().fetchTasks();
  },
  
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const { filters, searchQuery } = get();
      
      const params = new URLSearchParams();
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.priority !== 'all') params.append('priority', filters.priority);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (searchQuery) params.append('search', searchQuery);
      
      const res = await fetch(`/api/tasks?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        set({ tasks: data.tasks });
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  createTask: async (taskData) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to create task');
    }
    
    const data = await res.json();
    set((state) => ({ tasks: [data.task, ...state.tasks] }));
    return data.task;
  },
  
  updateTask: async (id, updates) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to update task');
    }
    
    const data = await res.json();
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? data.task : t)),
    }));
    return data.task;
  },
  
  deleteTask: async (id) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to delete task');
    }
    
    set((state) => ({
      tasks: state.tasks.filter((t) => t._id !== id),
    }));
  },
  
  optimisticUpdateTaskStatus: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((t) => (t._id === id ? { ...t, status } : t)),
    }));
  },
}));

export default useTaskStore;
