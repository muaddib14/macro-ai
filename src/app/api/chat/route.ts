import { NextRequest, NextResponse } from 'next/server';
import { mockRecommendations } from '@/data/mockRecommendations';

// Helper to add random variance to numbers
const perturb = (value: number, variance: number) => {
  const change = (Math.random() - 0.5) * variance;
  return Number((value + change).toFixed(4));
};

// Helper to randomly fluctuate integers (like signal strength)
const fluctuate = (value: number, min: number, max: number) => {
  const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
  return Math.min(Math.max(value + change, min), max);
};

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay (faster for live updates feel)
    await new Promise(resolve => setTimeout(resolve, 200));

    // Generate dynamic "live" data based on mock data
    const dynamicData = mockRecommendations.map(rec => {
      // Create variations
      const newKelly = perturb(rec.kelly_fraction, 0.01);
      const newEV = perturb(rec.expected_value, 0.02);
      const newSignalStrength = fluctuate(rec.signal_strength, 1, 10);
      
      // Update confidence band string based on signal strength
      let newConfidenceBand = rec.confidence_band;
      if (Math.random() > 0.7) {
        const baseConf = 60 + (newSignalStrength * 3);
        newConfidenceBand = `${baseConf}-${baseConf + 12}%`;
      }

      return {
        ...rec,
        kelly_fraction: Math.max(0.01, newKelly), // Ensure positive
        expected_value: newEV,
        signal_strength: newSignalStrength,
        confidence_band: newConfidenceBand
      };
    });
    
    // Occasionally shuffle order to simulate new opportunities rising
    if (Math.random() > 0.8) {
      dynamicData.sort(() => Math.random() - 0.5);
    }

    return NextResponse.json({
      data: dynamicData,
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