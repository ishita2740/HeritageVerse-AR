import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { monumentName, monumentDescription, builtYear, style, mode, language } = await request.json();

    if (!monumentName || !monumentDescription) {
      return NextResponse.json(
        { error: 'Monument name and description are required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are narrating the story of ${monumentName} in Kolkata, India.
Mode: ${mode || 'Storyteller'} - ${
      mode === 'Historian'
        ? 'factual, academic, detailed'
        : mode === 'Child-Friendly'
          ? 'simple, fun, age 8-12'
          : 'immersive, narrative, poetic'
    }
Language: ${language || 'English'} - respond entirely in that language. For Bengali, use authentic Bengali script.
Monument context: ${monumentDescription}, built ${builtYear}, ${style || 'architectural style'}.

Write 3 paragraphs. Make it vivid and emotionally resonant. Reference the specific cultural significance to Kolkata and Bengal.`;

    const result = await model.generateContentStream(prompt);

    // Convert stream to readable format for Next.js streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('POST /api/ai/story error:', error);
    return NextResponse.json(
      { error: 'Failed to generate story' },
      { status: 500 }
    );
  }
}
