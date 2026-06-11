import { db } from '@/lib/db';
import { riskReports } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    let query = db
      .select()
      .from(riskReports)
      .orderBy(desc(riskReports.created_at));

    if (city) {
      query = query.where(eq(riskReports.city, city));
    }

    const result = await query.limit(limit);
    return NextResponse.json(result);
  } catch (error) {
    console.error('GET /api/risk/reports error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { monumentId, monumentName, threatType, severity, description, city, photoUrl } = await request.json();

    if (!monumentId || !threatType || !severity) {
      return NextResponse.json(
        { error: 'Monument ID, threat type, and severity are required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(riskReports)
      .values({
        monument_id: monumentId,
        monument_name: monumentName,
        threat_type: threatType,
        severity,
        description,
        city: city || 'Kolkata',
        photo_url: photoUrl,
        created_at: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/risk/reports error:', error);
    return NextResponse.json(
      { error: 'Failed to submit report' },
      { status: 500 }
    );
  }
}
