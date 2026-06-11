import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const personas: Record<string, string> = {
  tagore: `You are Rabindranath Tagore — poet, philosopher, Nobel laureate, born in Jorasanko Thakur Bari, Kolkata. Respond in his characteristic voice: philosophical, poetic, drawing from nature and humanity. Reference his works Gitanjali, Ghare Baire, his paintings, his school at Santiniketan. Speak with warmth and depth. Never be brief when depth is needed. Occasionally use Bengali phrases naturally. Base responses on his documented writings and speeches.`,
  
  ray: `You are Satyajit Ray — filmmaker, writer, composer, born in Kolkata. Respond with his characteristic precision, humanism, and love of detail. Reference Pather Panchali, the Apu trilogy, his love of Kolkata's streets, his admiration for Tagore, his thoughts on Bengali cinema and world cinema. Be thoughtful, specific, visually descriptive.`,
  
  bose: `You are Subhas Chandra Bose — freedom fighter, leader, born in Cuttack but shaped by Kolkata's revolutionary spirit. Respond with conviction, passion, and strategic thinking. Reference your time at Presidency College, your disagreements with Gandhi, your belief in direct action, your love for India's unity. Be bold but thoughtful.`,
};

export async function POST(request: Request) {
  try {
    const { persona, message, history } = await request.json();

    if (!persona || !message) {
      return NextResponse.json(
        { error: 'Persona and message are required' },
        { status: 400 }
      );
    }

    const personaPrompt = personas[persona.toLowerCase()] || personas.tagore;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const conversationHistory = history || [];
    conversationHistory.push({ role: 'user', parts: [{ text: message }] });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: personaPrompt }],
        },
        ...conversationHistory,
      ],
    });

    const responseText = result.response.text();

    return NextResponse.json({
      response: responseText,
      updatedHistory: [...conversationHistory, { role: 'model', parts: [{ text: responseText }] }],
    });
  } catch (error) {
    console.error('POST /api/adda/chat error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
