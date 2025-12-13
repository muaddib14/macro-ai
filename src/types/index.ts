// Core API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  timestamp: string;
  message?: string;
}

// Trading Metrics for AI Chat Responses
export interface TradingMetrics {
  confidence: number;
  kelly_fraction?: number;
  uncertainty_factor: number;
  market_regime?: string;
  risk_level: 'low' | 'medium' | 'high';
}

// Database Entities (Based on your schema)
export interface DbMarket {
  id: string;
  question: string;
  status: string;
  last_yes_price: number;
  last_no_price: number;
  volume_24h: number;
  category: string;
  implied_prob: number;
}

export interface DbTradingSignal {
  id: string;
  market_id: string;
  model_prob: number;
  edge: number;
  direction: 'YES' | 'NO';
  confidence: 'low' | 'medium' | 'high';
  kelly_fraction: number;
  score: number;
  markets?: DbMarket; // Joined data
}

// UI Types (Mapped from DB)
export interface MispricedMarket {
  id: string;
  name: string;
  market_price: number;
  model_price: number;
  edge: number;
  kelly_stake: number;
  horizon: string;
  rationale: string;
  volume_24h: number;
  category: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface RecommendedTrade {
  id: string;
  market_name: string;
  position: 'YES' | 'NO';
  kelly_fraction: number;
  confidence_band: string;
  time_horizon: string;
  risk_level: 'low' | 'medium' | 'high';
  expected_value: number;
  max_loss: number;
  reasoning: string;
  signal_strength: number;
}

// Widget Types
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

// Regime Data Type
export interface RegimeData {
  current: {
    primary: string;
    probability: number;
    horizon: string;
    timestamp: string;
  };
  timeseries: Array<{
    date: string;
    regimes: Record<string, number>;
  }>;
}

// Shock/Heatmap Types
export interface ShockDomain {
  domain: string;
  score: number;
  intensity: 'low' | 'medium' | 'high' | 'critical';
  top_headlines: Array<{
    headline: string;
    tone: 'positive' | 'negative' | 'neutral';
    source: string;
    timestamp: string;
  }>;
  description: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ChatResponse {
  answer: string;
  rationale: string;
  horizon: string;
  confidence: 'low' | 'medium' | 'high';
  kelly_fraction?: number;
  uncertainty_factors: string[];
  metrics?: TradingMetrics; // Added this property
}

export type { RealMarketData } from '@/data/realMarketData';