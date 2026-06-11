import { db } from '@/lib/db';
import { monuments } from '@/lib/schema';
import { ne, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '3', 10);

    if (!id) {
      return NextResponse.json(
        { error: 'Monument ID is required' },
        { status: 400 }
      );
    }

    const current = await db
      .select()
      .from(monuments)
      .where(eq(monuments.id, id));

    if (current.length === 0) {
      return NextResponse.json(
        { error: 'Monument not found' },
        { status: 404 }
      );
    }

    const related = await db
      .select()
      .from(monuments)
      .where(ne(monuments.id, id))
      .limit(limit);

    return NextResponse.json(related);
  } catch (error) {
    console.error('GET /api/monuments/related error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch related monuments' },
      { status: 500 }
    );
  }
}
