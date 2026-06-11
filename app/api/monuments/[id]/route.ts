import { db } from '@/lib/db';
import { monuments } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db
      .select()
      .from(monuments)
      .where(eq(monuments.id, id));

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Monument not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('GET /api/monuments/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monument' },
      { status: 500 }
    );
  }
}
