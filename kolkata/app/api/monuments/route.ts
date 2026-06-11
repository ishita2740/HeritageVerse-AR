import { db } from '@/lib/db';
import { monuments } from '@/lib/schema';
import { eq, or, like, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const riskLevel = searchParams.get('riskLevel');
    const search = searchParams.get('search');

    let results;

    if (city && city !== 'all') {
      results = await db.select().from(monuments).where(eq(monuments.city, city));
    } else {
      results = await db.select().from(monuments);
    }

    let filtered = results;

    if (riskLevel && riskLevel !== 'all') {
      filtered = filtered.filter((m) => m.riskLevel === riskLevel);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchLower) ||
          m.location.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('GET /api/monuments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monuments' },
      { status: 500 }
    );
  }
}
