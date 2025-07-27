import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("page_views");
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    
    const count = await db.collection('page_views').countDocuments({ path });
    
    return NextResponse.json({ count });
  } catch (error) {
    // Proper type narrowing
    if (error instanceof Error) {
      console.error('Database error:', error.message);
      return NextResponse.json(
        { 
          error: 'Failed to get view count',
          message: error.message 
        },
        { status: 500 }
      );
    }
    
    // Fallback for non-Error types
    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: 'An unknown error occurred' },
      { status: 500 }
    );
  }
}