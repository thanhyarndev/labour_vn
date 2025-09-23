import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Contact } from '@/models/Contact';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = ContactSchema.parse(body);
    
    // Connect to database
    await connectToDatabase();
    
    // Create new contact entry
    const contact = new Contact({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
      status: 'new'
    });
    
    await contact.save();
    
    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
