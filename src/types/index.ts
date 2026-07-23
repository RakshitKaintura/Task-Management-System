export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  theme: 'light' | 'dark' | 'system';
  createdAt: Date;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'personal' | 'study' | 'work' | 'shopping' | 'health';
  dueDate?: Date;
  tags: string[];
  estimatedTime?: number;
  completed: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}
