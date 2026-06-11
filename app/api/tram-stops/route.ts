import { db } from '@/lib/db';
import { tramStops } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await db.select().from(tramStops);
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/tram-stops error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tram stops' },
      { status: 500 }
    );
  }
}
