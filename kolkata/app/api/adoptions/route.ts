import { db } from '@/lib/db';
import { adoptions } from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { monumentId, monumentName, amount, adopterName, city } = await request.json();

    if (!monumentId || !amount) {
      return NextResponse.json(
        { error: 'Monument ID and amount are required' },
        { status: 400 }
      );
    }

    const result = await db
      .insert(adoptions)
      .values({
        monument_id: monumentId,
        monument_name: monumentName,
        amount: parseFloat(amount),
        adopter_name: adopterName || 'Anonymous Guardian',
        city: city || 'Kolkata',
        pledged_at: new Date(),
      })
      .returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('POST /api/adoptions error:', error);
    return NextResponse.json(
      { error: 'Failed to submit pledge' },
      { status: 500 }
    );
  }
}
