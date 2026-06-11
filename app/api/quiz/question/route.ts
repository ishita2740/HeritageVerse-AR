import { db } from '@/lib/db';
import { quizQuestions } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const monumentId = searchParams.get('monumentId');
    const difficulty = searchParams.get('difficulty') || 'Tourist';

    let query = db.select().from(quizQuestions);

    if (monumentId) {
      query = query.where(eq(quizQuestions.monument_id, monumentId));
    }

    let results = await query;

    if (difficulty) {
      results = results.filter((q) => q.difficulty === difficulty);
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No questions found' },
        { status: 404 }
      );
    }

    const randomQuestion = results[Math.floor(Math.random() * results.length)];
    return NextResponse.json(randomQuestion);
  } catch (error) {
    console.error('GET /api/quiz/question error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch question' },
      { status: 500 }
    );
  }
}
