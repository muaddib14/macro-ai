import { NextRequest, NextResponse } from 'next/server';
import { chatResponses, defaultResponse } from '@/data/mockChatResponses';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid message',
          timestamp: new Date().toISOString() 
        },
        { status: 400 }
      );
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find matching response based on keywords
    const normalizedMessage = message.toLowerCase();
    let response = defaultResponse;

    // Check for keyword matches
    if (normalizedMessage.includes('fed cuts') || normalizedMessage.includes('fed rate')) {
      response = chatResponses['fed cuts by 2026-03-31'];
    } else if (normalizedMessage.includes('mispriced') || normalizedMessage.includes('opportunity')) {
      response = chatResponses['find mispriced markets'];
    } else if (normalizedMessage.includes('regime') || normalizedMessage.includes('current')) {
      response = chatResponses['current regime'];
    } else if (normalizedMessage.includes('energy') || normalizedMessage.includes('oil')) {
      response = chatResponses['energy shock'];
    }

    return NextResponse.json({
      ...response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to process chat message',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}