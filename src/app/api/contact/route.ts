import clientPromise from "@/app/lib/db";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your DB name if not default
    
    await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Database error' }), {
      status: 500,
    });
  }
}