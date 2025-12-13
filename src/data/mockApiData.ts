import { MispricedMarket, RecommendedTrade, LiquidityMeter, VolatilityIndex, NewsItem } from '@/types';

// Mock data for API routes that don't work in static export
export const mockMispricedMarkets: MispricedMarket[] = [
  {
    id: '1',
    name: 'BTC/USD',
    market_price: 43250.00,
    model_price: 41500.00,
    edge: 4.22,
    kelly_stake: 0.15,
    horizon: '2-3 days',
    rationale: 'Bitcoin shows strong technical momentum with institutional buying pressure.',
    volume_24h: 28500000000,
    category: 'crypto',
    confidence: 'high'
  },
  {
    id: '2',
    name: 'ETH/USD',
    market_price: 2680.50,
    model_price: 2850.00,
    edge: -5.95,
    kelly_stake: 0.12,
    horizon: '1-2 days',
    rationale: 'Ethereum experiencing temporary weakness due to network congestion concerns.',
    volume_24h: 15200000000,
    category: 'crypto',
    confidence: 'high'
  },
  {
    id: '3',
    name: 'GOLD',
    market_price: 1985.20,
    model_price: 2020.00,
    edge: -1.72,
    kelly_stake: 0.08,
    horizon: '3-5 days',
    rationale: 'Gold prices reflect dollar strength and risk-off sentiment.',
    volume_24h: 8500000000,
    category: 'commodities',
    confidence: 'medium'
  },
  {
    id: '4',
    name: 'SPY',
    market_price: 445.80,
    model_price: 438.50,
    edge: 1.67,
    kelly_stake: 0.10,
    horizon: '1-2 days',
    rationale: 'S&P 500 ETF trading at premium due to earnings season optimism.',
    volume_24h: 42000000000,
    category: 'equities',
    confidence: 'medium'
  },
  {
    id: '5',
    name: 'TSLA',
    market_price: 248.90,
    model_price: 265.00,
    edge: -6.08,
    kelly_stake: 0.18,
    horizon: '2-4 days',
    rationale: 'Tesla stock reflects delivery concerns and competitive pressures.',
    volume_24h: 18500000000,
    category: 'equities',
    confidence: 'high'
  }
];

export const mockRecommendations: RecommendedTrade[] = [
  {
    id: 'rec_1',
    market_name: 'BTC/USD',
    position: 'YES',
    kelly_fraction: 0.15,
    confidence_band: 'High Confidence',
    time_horizon: '2-3 weeks',
    risk_level: 'medium',
    expected_value: 0.087,
    max_loss: 0.052,
    reasoning: 'Bitcoin showing strong institutional adoption and technical breakout pattern.',
    signal_strength: 0.87
  },
  {
    id: 'rec_2',
    market_name: 'ETH/USD',
    position: 'NO',
    kelly_fraction: 0.12,
    confidence_band: 'Medium Confidence',
    time_horizon: '1-2 weeks',
    risk_level: 'medium',
    expected_value: 0.062,
    max_loss: 0.045,
    reasoning: 'Ethereum facing short-term headwinds with network congestion issues.',
    signal_strength: 0.79
  },
  {
    id: 'rec_3',
    market_name: 'XAU/USD',
    position: 'YES',
    kelly_fraction: 0.08,
    confidence_band: 'Medium Confidence',
    time_horizon: '3-4 weeks',
    risk_level: 'low',
    expected_value: 0.045,
    max_loss: 0.035,
    reasoning: 'Gold showing mispricing relative to dollar strength indicators.',
    signal_strength: 0.75
  }
];

export const mockLiquidityData: LiquidityMeter = {
  current_level: 0.73,
  trend: 'increasing',
  description: 'Strong liquidity conditions driven by accommodative monetary policy and robust institutional flows.',
  components: {
    central_bank_liquidity: 0.85,
    market_liquidity: 0.67,
    funding_liquidity: 0.74
  }
};

export const mockVolatilityData: VolatilityIndex = {
  current_value: 18.5,
  percentile_1y: 0.32,
  trend: 'falling',
  description: 'Market volatility declining from recent highs as uncertainty decreases.'
};

export const mockNewsTicker: NewsItem[] = [
  {
    id: 'news_1',
    headline: 'Federal Reserve Signals Potential Rate Pause',
    source: 'Federal Reserve',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    tone: 'positive',
    category: 'monetary-policy',
    impact_score: 0.85
  },
  {
    id: 'news_2',
    headline: 'Bitcoin ETF Sees Record $2.1B Daily Inflows',
    source: 'CoinDesk',
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    tone: 'positive',
    category: 'crypto',
    impact_score: 0.92
  },
  {
    id: 'news_3',
    headline: 'Oil Prices Surge on Supply Chain Disruptions',
    source: 'Reuters',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    tone: 'negative',
    category: 'commodities',
    impact_score: 0.67
  },
  {
    id: 'news_4',
    headline: 'Tech Earnings Beat Expectations Despite Headwinds',
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    tone: 'positive',
    category: 'equities',
    impact_score: 0.74
  },
  {
    id: 'news_5',
    headline: 'Gold Reaches New High Amid Economic Uncertainty',
    source: 'Financial Times',
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    tone: 'neutral',
    category: 'commodities',
    impact_score: 0.45
  }
];

export const mockSystemStatus = {
  status: 'operational',
  last_updated: new Date().toISOString(),
  version: '2.1.0'
};
