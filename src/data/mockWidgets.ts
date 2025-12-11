export interface LiquidityMeter {
  current_level: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  description: string;
  components: {
    central_bank_liquidity: number;
    market_liquidity: number;
    funding_liquidity: number;
  };
}

export interface VolatilityIndex {
  current_value: number;
  percentile_1y: number;
  trend: 'rising' | 'falling' | 'stable';
  description: string;
}

export interface NewsItem {
  id: string;
  headline: string;
  source: string;
  timestamp: string;
  tone: 'positive' | 'negative' | 'neutral';
  category: string;
  impact_score: number;
}

export const mockLiquidityData: LiquidityMeter = {
  current_level: 67,
  trend: 'stable',
  description: 'Adequate liquidity with stable funding conditions',
  components: {
    central_bank_liquidity: 72,
    market_liquidity: 65,
    funding_liquidity: 64
  }
};

export const mockVolatilityData: VolatilityIndex = {
  current_value: 23.4,
  percentile_1y: 45,
  trend: 'falling',
  description: 'Below average volatility regime'
};

export const mockNewsTicker: NewsItem[] = [
  {
    id: 'news-001',
    headline: 'Fed officials emphasize data-dependent approach to policy',
    source: 'Federal Reserve',
    timestamp: '2025-12-12T01:45:00Z',
    tone: 'neutral',
    category: 'Monetary Policy',
    impact_score: 6
  },
  {
    id: 'news-002',
    headline: 'Oil markets rally on supply concerns',
    source: 'Reuters',
    timestamp: '2025-12-12T01:20:00Z',
    tone: 'positive',
    category: 'Energy',
    impact_score: 8
  },
  {
    id: 'news-003',
    headline: 'ECB policymakers express inflation persistence concerns',
    source: 'ECB',
    timestamp: '2025-12-12T00:30:00Z',
    tone: 'negative',
    category: 'Monetary Policy',
    impact_score: 7
  },
  {
    id: 'news-004',
    headline: 'China reports stable manufacturing PMI at 50.2',
    source: 'NBS',
    timestamp: '2025-12-12T00:15:00Z',
    tone: 'neutral',
    category: 'Economic Data',
    impact_score: 5
  },
  {
    id: 'news-005',
    headline: 'Geopolitical tensions escalate in Asia-Pacific region',
    source: 'CNN',
    timestamp: '2025-12-11T23:45:00Z',
    tone: 'negative',
    category: 'Geopolitics',
    impact_score: 9
  },
  {
    id: 'news-006',
    headline: 'Corporate bond spreads tighten amid risk-on sentiment',
    source: 'Bloomberg',
    timestamp: '2025-12-11T23:00:00Z',
    tone: 'positive',
    category: 'Credit Markets',
    impact_score: 4
  },
  {
    id: 'news-007',
    headline: 'AI regulation framework gains bipartisan support',
    source: 'TechCrunch',
    timestamp: '2025-12-11T22:30:00Z',
    tone: 'neutral',
    category: 'Technology',
    impact_score: 3
  }
];