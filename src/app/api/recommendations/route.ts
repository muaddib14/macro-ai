import { NextRequest, NextResponse } from 'next/server';
import { mockRecommendations } from '@/data/mockRecommendations';

// Helper: Simulate a random walk for market prices or model probabilities
const drift = (value: number, volatility: number) => {
  const change = (Math.random() - 0.5) * volatility;
  return value + change;
};

// Helper: Calculate Simple Kelly Criterion
const calculateKelly = (modelProb: number, marketPrice: number) => {
  const edge = modelProb - marketPrice;
  return Math.max(0, edge * 1.0); 
};

export async function GET(request: NextRequest) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));

    const data = mockRecommendations.map(rec => {
      // 1. Establish Baselines
      const baseModelProb = 0.5 + (rec.signal_strength / 20); 
      
      // 2. Simulate "Live" Drift
      const currentModelProb = Math.min(0.99, Math.max(0.51, drift(baseModelProb, 0.02)));
      const impliedMarketPrice = currentModelProb - rec.expected_value; 
      const currentMarketPrice = Math.min(0.98, Math.max(0.02, drift(impliedMarketPrice, 0.015)));

      // 3. Recalculate Metrics
      const newEdge = currentModelProb - currentMarketPrice;
      const newKelly = calculateKelly(currentModelProb, currentMarketPrice);
      
      // 4. Update Signal Strength
      const newSignalStrength = Math.min(10, Math.max(1, Math.round((currentModelProb - 0.5) * 20)));

      // 5. Dynamic Confidence Band (Fixing logic to ensure clean XX-YY% strings)
      // If probability is 0.85 (85%), we want band around 80-90%
      const probPercent = Math.round(currentModelProb * 100);
      const bandVariance = Math.floor(Math.random() * 3) + 3; // Random variance +/- 3-6%
      const bandLower = Math.max(0, probPercent - bandVariance);
      const bandUpper = Math.min(100, probPercent + bandVariance);

      // 6. Dynamic Max Loss (Simulating Stop Loss / Active Risk Mgmt)
      // Instead of 1.0 (100%), we simulate a dynamic stop-loss or VaR around 8-15%
      const baseMaxLoss = 0.12; 
      const dynamicMaxLoss = drift(baseMaxLoss, 0.04); 
      // Clamp between 5% and 20%
      const finalMaxLoss = Math.min(0.20, Math.max(0.05, dynamicMaxLoss));

      return {
        ...rec,
        kelly_fraction: Number(newKelly.toFixed(3)),
        expected_value: Number(newEdge.toFixed(3)),
        signal_strength: newSignalStrength,
        confidence_band: `${bandLower}-${bandUpper}%`, // Clean string, e.g., "78-84%"
        max_loss: Number(finalMaxLoss.toFixed(3)), // Dynamic value like 0.112 (11.2%)
        
        // Dynamic Risk Level
        risk_level: newEdge < 0.05 ? 'high' : (newEdge > 0.15 ? 'low' : 'medium')
      };
    });

    // Random shuffle occasionally
    if (Math.random() > 0.8) {
      data.sort(() => Math.random() - 0.5);
    }

    return NextResponse.json({
      data: data,
      status: 'success',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to generate live recommendations',
        timestamp: new Date().toISOString() 
      },
      { status: 500 }
    );
  }
}