import { db } from '@/lib/db';
import { guardianScores } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

const levelTitles: Record<number, string> = {
  1: 'Curious Visitor',
  2: 'Heritage Explorer',
  3: 'Story Seeker',
  4: 'Kolkata Wanderer',
  5: 'Cultural Keeper',
  6: 'Monument Guardian',
  7: 'Heritage Defender',
  8: 'Kolkata Historian',
  9: 'Living Legend',
  10: 'Guardian of Kolkata',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        total_score: 0,
        level: 1,
        level_title: levelTitles[1],
        quiz_points: 0,
        stamp_points: 0,
        report_points: 0,
        story_points: 0,
      });
    }

    const result = await db
      .select()
      .from(guardianScores)
      .where(eq(guardianScores.user_id, userId));

    if (result.length === 0) {
      return NextResponse.json({
        total_score: 0,
        level: 1,
        level_title: levelTitles[1],
        quiz_points: 0,
        stamp_points: 0,
        report_points: 0,
        story_points: 0,
      });
    }

    const score = result[0];
    return NextResponse.json({
      ...score,
      level_title: levelTitles[score.level] || 'Guardian of Kolkata',
    });
  } catch (error) {
    console.error('GET /api/guardian-score error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guardian score' },
      { status: 500 }
    );
  }
}
