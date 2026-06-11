import { db } from '@/lib/db';
import { communityStories } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const monumentId = searchParams.get('monumentId');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '6', 10);

    let query = db
      .select()
      .from(communityStories)
      .where(eq(communityStories.is_approved, true))
      .orderBy(desc(communityStories.upvotes))
      .limit(limit);

    if (monumentId) {
      query = query.where(eq(communityStories.monument_id, monumentId));
    }

    let results = await query;

    if (type) {
      results = results.filter((s) => s.story_type === type);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('GET /api/stories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, monumentId, storyType, language, content, contributorName, audioUrl } = await request.json();

    if (!title || !monumentId || !content) {
      return NextResponse.json(
        { error: 'Title, monument ID, and content are required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(communityStories)
      .values({
        title,
        monument_id: monumentId,
        story_type: storyType || 'Personal Memory',
        language: language || 'English',
        content,
        contributor_name: contributorName || 'Anonymous',
        audio_url: audioUrl,
        is_approved: false,
        upvotes: 0,
        created_at: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/stories error:', error);
    return NextResponse.json(
      { error: 'Failed to submit story' },
      { status: 500 }
    );
  }
}
