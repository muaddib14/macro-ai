// Core API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  timestamp: string;
  message?: string;
}

// Regime Types
export interface Regime {
  name: string;
  probability: number;
}

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

// Market Types
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

// Trade Types
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

// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface ChatResponse {
  answer: string;
  rationale: string;
  horizon: string;
  confidence: 'low' | 'medium' | 'high';
  kelly_fraction?: number;
  uncertainty_factors: string[];
}

// Component Props Types
export interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType;
  active?: boolean;
}

// Re-export RealMarketData from data module
export type { RealMarketData } from '@/data/realMarketData';