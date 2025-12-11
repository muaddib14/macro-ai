import { NextRequest, NextResponse } from 'next/server';
import { createRealMarketData } from '@/data/realMarketData';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const marketData = createRealMarketData();
    
    return NextResponse.json({
      data: marketData,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch real market data',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}