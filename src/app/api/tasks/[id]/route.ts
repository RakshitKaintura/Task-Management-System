import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import Task from '@/models/Task';
import { getCurrentUser } from '@/lib/auth';

const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['personal', 'study', 'work', 'shopping', 'health']).optional(),
  dueDate: z.string().optional().nullable().transform(val => val ? new Date(val) : undefined),
  tags: z.array(z.string()).optional(),
  estimatedTime: z.number().optional().nullable(),
  completed: z.boolean().optional(),
});

type Context = {
  params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: Context) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const task = await Task.findOne({ _id: id, createdBy: user._id });
    
    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error('Get task error:', error);
    return NextResponse.json({ message: 'Failed to fetch task' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = updateTaskSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const updateData: any = { ...result.data, updatedAt: new Date() };
    
    // Auto-sync completed flag with status
    if (updateData.status === 'completed') {
      updateData.completed = true;
    } else if (updateData.status === 'todo' || updateData.status === 'in-progress') {
      updateData.completed = false;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error('Update task error:', error);
    return NextResponse.json({ message: 'Failed to update task' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const task = await Task.findOneAndDelete({ _id: id, createdBy: user._id });

    if (!task) {
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete task error:', error);
    return NextResponse.json({ message: 'Failed to delete task' }, { status: 500 });
  }
}
