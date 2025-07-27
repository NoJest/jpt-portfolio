import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';

export async function GET(request: Request) {
     // Skip counting in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({ count: 42 }); // Mock data
  }
  try {
    const client = await clientPromise;
    const db = client.db("page_views"); 
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    
    const count = await db.collection('views').countDocuments({ path });
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { 
        count: 0, // Always return a number
      },
      { status: 500 }
    );
  }
}