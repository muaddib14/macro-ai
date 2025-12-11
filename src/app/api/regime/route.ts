import { NextRequest, NextResponse } from 'next/server';
import { mockRegimeData } from '@/data/mockRegimeData';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      data: mockRegimeData,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch regime data',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}