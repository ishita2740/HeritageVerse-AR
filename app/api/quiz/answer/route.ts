import { db } from '@/lib/db';
import { quizAnswers } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { questionId, selectedOption, userId, isCorrect, pointsAwarded } = await request.json();

    if (!questionId || !selectedOption) {
      return NextResponse.json(
        { error: 'Question ID and selected option are required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(quizAnswers)
      .values({
        question_id: questionId,
        user_id: userId || 'guest',
        selected_option: selectedOption,
        is_correct: isCorrect || false,
        points_awarded: pointsAwarded || 0,
        answered_at: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/quiz/answer error:', error);
    return NextResponse.json(
      { error: 'Failed to submit answer' },
      { status: 500 }
    );
  }
}
