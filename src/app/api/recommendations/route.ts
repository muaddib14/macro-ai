import { NextRequest, NextResponse } from 'next/server';
import { mockRecommendations } from '@/data/mockRecommendations';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 350));
    
    return NextResponse.json({
      data: mockRecommendations,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch recommendations',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}