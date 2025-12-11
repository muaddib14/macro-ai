import { NextRequest, NextResponse } from 'next/server';
import { mockNewsTicker } from '@/data/mockWidgets';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      data: mockNewsTicker,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch news data',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}