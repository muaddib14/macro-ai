import { NextRequest, NextResponse } from 'next/server';
import { mockMispricedMarkets } from '@/data/mockMispricedMarkets';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return NextResponse.json({
      data: mockMispricedMarkets,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch mispriced markets',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}