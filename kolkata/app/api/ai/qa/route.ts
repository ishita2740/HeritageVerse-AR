import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { monumentName, monumentDescription, question, language } = await request.json();

    if (!monumentName || !question) {
      return NextResponse.json(
        { error: 'Monument name and question are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert guide about ${monumentName} in Kolkata, India.
Monument Context: ${monumentDescription}
Language: Respond in ${language || 'English'}.

User Question: ${question}

Provide a clear, concise answer (2-3 sentences) that educates and engages. Be specific to Kolkata's history and culture.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ answer: text });
  } catch (error) {
    console.error('POST /api/ai/qa error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}
