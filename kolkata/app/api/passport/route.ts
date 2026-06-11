import { db } from '@/lib/db';
import { heritagePassports } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        stamps: [],
        level: 1,
        totalPoints: 0,
      });
    }

    const result = await db
      .select()
      .from(heritagePassports)
      .where(eq(heritagePassports.user_id, userId));

    if (result.length === 0) {
      return NextResponse.json({
        stamps: [],
        level: 1,
        totalPoints: 0,
      });
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('GET /api/passport error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch passport' },
      { status: 500 }
    );
  }
}
