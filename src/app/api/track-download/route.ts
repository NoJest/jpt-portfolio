import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { ip, userAgent } = await request.json();

    await db.collection('resume_downloads').insertOne({
      ip,
      userAgent,
      downloadedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to track download' },
      { status: 500 }
    );
  }
}