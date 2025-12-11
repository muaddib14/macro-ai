import { NextRequest, NextResponse } from 'next/server';
import { mockShockData } from '@/data/mockShockData';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return NextResponse.json({
      data: mockShockData,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch shock data',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}