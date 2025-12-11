export interface MispricedMarket {
  id: string;
  name: string;
  market_price: number; // Implied probability from market
  model_price: number;  // Fair probability from our model
  edge: number;         // Model price - Market price
  kelly_stake: number;  // Suggested Kelly fraction
  horizon: string;      // Time horizon for resolution
  rationale: string;
  volume_24h: number;
  category: string;
  confidence: 'low' | 'medium' | 'high';
}

export const mockMispricedMarkets: MispricedMarket[] = [
  {
    id: 'fed-cuts-q1-2026',
    name: 'Fed cuts rates by March 2026',
    market_price: 0.34,
    model_price: 0.52,
    edge: 0.18,
    kelly_stake: 0.08,
    horizon: '90 days',
    rationale: 'Disinflationary regime + sticky services inflation + Fed minutes signaling patience',
    volume_24h: 2400000,
    category: 'Monetary Policy',
    confidence: 'high'
  },
  {
    id: 'oil-100-by-q2',
    name: 'Oil above $100 by Q2 2026',
    market_price: 0.23,
    model_price: 0.41,
    edge: 0.18,
    kelly_stake: 0.07,
    horizon: '180 days',
    rationale: 'Energy shock domain at critical level + geopolitical tensions + supply constraints',
    volume_24h: 1800000,
    category: 'Commodities',
    confidence: 'medium'
  },
  {
    id: 'ecb-taper-jan',
    name: 'ECB begins tapering by January 2026',
    market_price: 0.67,
    model_price: 0.84,
    edge: 0.17,
    kelly_stake: 0.09,
    horizon: '45 days',
    rationale: 'ECB shock at high level + persistent inflation concerns + Lagarde hints',
    volume_24h: 950000,
    category: 'Monetary Policy',
    confidence: 'high'
  },
  {
    id: 'china-stimulus-q1',
    name: 'China announces major stimulus by Q1 2026',
    market_price: 0.45,
    model_price: 0.61,
    edge: 0.16,
    kelly_stake: 0.06,
    horizon: '120 days',
    rationale: 'Mixed manufacturing data + property sector concerns + political pressure',
    volume_24h: 1200000,
    category: 'Fiscal Policy',
    confidence: 'medium'
  },
  {
    id: 'btc-80k-by-summer',
    name: 'Bitcoin above $80k by Summer 2026',
    market_price: 0.38,
    model_price: 0.53,
    edge: 0.15,
    kelly_stake: 0.05,
    horizon: '200 days',
    rationale: 'Macro liquidity improving + institutional adoption + regulatory clarity',
    volume_24h: 3200000,
    category: 'Crypto',
    confidence: 'low'
  }
];