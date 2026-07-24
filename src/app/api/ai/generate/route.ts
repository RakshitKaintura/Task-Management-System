import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getCurrentUser } from '@/lib/auth';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { message: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: 'Task title is required for AI generation' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `
      You are an AI assistant in a task management app. 
      The user is creating a task with the title: "${title}".
      ${description ? `The user also provided this initial description: "${description}"` : ''}
      
      Please provide a detailed, actionable breakdown for this task. 
      Include 3-5 clear, bulleted sub-steps or essential considerations. 
      Keep the response concise, professional, and formatted in Markdown.
      Do not include greetings or conversational filler, just the breakdown.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { message: 'Failed to generate AI content' },
      { status: 500 }
    );
  }
}
