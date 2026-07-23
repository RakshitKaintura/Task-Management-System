import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'personal' | 'study' | 'work' | 'shopping' | 'health';
  dueDate?: Date;
  tags: string[];
  estimatedTime?: number;
  completed: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  category: { type: String, enum: ['personal', 'study', 'work', 'shopping', 'health'], default: 'personal' },
  dueDate: { type: Date },
  tags: [{ type: String }],
  estimatedTime: { type: Number }, // in minutes
  completed: { type: Boolean, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create indexes for efficient querying
TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ dueDate: 1 });

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
