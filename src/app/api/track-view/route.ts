import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/db';
import { type NextRequest } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const collection = client.db('Portfolio').collection('page_views')
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer');
    let { path = '/' } = await request.json();
  
    // Validate path format
    if (!path.startsWith('/') || path.includes(':')) {
      path = '/'; 
    }
    
    //  Check for uniqueness (using IP + path combo)
    const existingView = await collection.findOne({
      ip,
      path,
      viewedAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } // 24h window
    });

    const isUnique = !existingView;

    // 4. Geolocation (production only)
    let geo = {};
    if (process.env.NODE_ENV === 'production' && ip !== 'unknown') {
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { 'User-Agent': 'Next.js-Page-View-Tracker' }
        });
        
        if (response.ok) {
          const data = await response.json();
          geo = {
            country: data.country_name,
            region: data.region,
            city: data.city,
            latlon: data.latitude && data.longitude 
              ? `${data.latitude},${data.longitude}`
              : undefined
          };
        }
      } catch (error) {
        console.log('Geolocation skipped (rate limit/error)');
      }
    }


    await collection.insertOne({
      path,
      ip,
      userAgent,
      isUnique,
      geo:Object.keys(geo).length > 0 ? geo : undefined,
      viewedAt: new Date(),
      referrer,
    });

    return NextResponse.json({
         success: true,
         isUnique, 
         geo: Object.keys(geo).length > 0 ? geo : undefined 
        });

  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track page view', 
        details: error instanceof Error ? error.message : 'unknown error'
      },
      { status: 500 }
    );
  }
}