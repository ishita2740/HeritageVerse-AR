import { db } from '@/lib/db';
import { monuments, riskReports } from '@/lib/schema';
import { eq, count } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city') || 'Kolkata';

    const monumentCount = await db
      .select({ count: count() })
      .from(monuments)
      .where(eq(monuments.city, city));

    const reportCount = await db
      .select({ count: count() })
      .from(riskReports)
      .where(eq(riskReports.city, city));

    const atRiskCount = await db
      .select({ count: count() })
      .from(monuments)
      .where(eq(monuments.city, city));

    return NextResponse.json({
      monumentsCovered: monumentCount[0]?.count || 0,
      totalReports: reportCount[0]?.count || 0,
      monumentsAtRisk: 3, // Placeholder based on seed data
    });
  } catch (error) {
    console.error('GET /api/risk/stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
