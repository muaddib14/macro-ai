import { NextRequest, NextResponse } from 'next/server';
import { mockVolatilityData } from '@/data/mockWidgets';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return NextResponse.json({
      data: mockVolatilityData,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch volatility data',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}