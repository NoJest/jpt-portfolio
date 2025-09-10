import clientPromise from '@/app/lib/db';
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  console.log('Contact form submission started');
  
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'anonymous';
    
    console.log('IP address:', ip);

    

    const { name, email, message, website, recaptchaToken } = await request.json();
    console.log('Received data:', { name, email, message: message?.length, website: !!website });

    // Honeypot check
    if (website) {
      console.log('Bot detected via honeypot');
      return NextResponse.json({ success: true });
    }

    // Input validation
    if (!name || !email || !message || !recaptchaToken) {
      console.log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA v2
    console.log('Verifying reCAPTCHA');
    try {
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
      const response = await fetch(verificationUrl, { method: 'POST' });
      const data = await response.json();
      console.log('reCAPTCHA response:', data);

      if (!data.success) {
        console.error('reCAPTCHA failed:', data['error-codes']);
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return NextResponse.json(
        { error: 'Error verifying reCAPTCHA' },
        { status: 500 }
      );
    }

    // Save to MongoDB
    console.log('Attempting to save to MongoDB');
    try {
      const client = await clientPromise;
      const db = client.db();
      
      const result = await db.collection('contacts').insertOne({
        name,
        email,
        message,
        ipAddress: ip,
        userAgent: request.headers.get('user-agent'),
        createdAt: new Date(),
        verified: true,
      });
      
      console.log('Successfully saved to MongoDB:', result.insertedId);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in contact API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}