import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';

// Disable Next.js internal caching
export const dynamic = 'force-dynamic'; 

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const collection = client.db('Portfolio').collection('page_views')
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') || '/';
    
    // Count ALL historical documents for this path
    const count = await collection.countDocuments({ 
      $or: [
        { path: path },
        { path: `${path}/` } 
      ]
    });
    
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { count: 0 }, 
      { status: 500 }
    );
  }
}