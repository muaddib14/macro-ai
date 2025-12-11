import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return NextResponse.json({
      status: 'operational',
      last_updated: new Date().toISOString(),
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch system status',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}