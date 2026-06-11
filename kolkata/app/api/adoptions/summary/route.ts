import { db } from '@/lib/db';
import { adoptions } from '@/lib/schema';
import { eq, sum } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Kolkata';

    const result = await db
      .select()
      .from(adoptions)
      .where(eq(adoptions.city, city));

    // Group by monument and sum amounts
    const summary = result.reduce(
      (acc: Record<string, any>, adoption) => {
        if (!acc[adoption.monument_id]) {
          acc[adoption.monument_id] = {
            monument_id: adoption.monument_id,
            monument_name: adoption.monument_name,
            total_pledged: 0,
            adopter_count: 0,
          };
        }
        acc[adoption.monument_id].total_pledged += adoption.amount || 0;
        acc[adoption.monument_id].adopter_count += 1;
        return acc;
      },
      {}
    );

    return NextResponse.json(Object.values(summary));
  } catch (error) {
    console.error('GET /api/adoptions/summary error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch adoption summary' },
      { status: 500 }
    );
  }
}
