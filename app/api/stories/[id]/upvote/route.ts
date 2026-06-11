import { db } from '@/lib/db';
import { communityStories } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const story = await db
      .select()
      .from(communityStories)
      .where(eq(communityStories.id, id));

    if (story.length === 0) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      );
    }

    const result = await db
      .update(communityStories)
      .set({ upvotes: (story[0].upvotes || 0) + 1 })
      .where(eq(communityStories.id, id))
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('POST /api/stories/[id]/upvote error:', error);
    return NextResponse.json(
      { error: 'Failed to upvote story' },
      { status: 500 }
    );
  }
}
