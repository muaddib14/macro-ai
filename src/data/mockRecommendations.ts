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
  signal_strength: number; // 1-10 scale
}

export const mockRecommendations: RecommendedTrade[] = [
  {
    id: 'rec-001',
    market_name: 'Fed cuts rates by March 2026',
    position: 'YES',
    kelly_fraction: 0.08,
    confidence_band: '65-78%',
    time_horizon: '90 days',
    risk_level: 'medium',
    expected_value: 0.14,
    max_loss: 0.08,
    reasoning: 'Strong disinflationary regime signal with 74% probability. Fed minutes show patience despite market expectations.',
    signal_strength: 8
  },
  {
    id: 'rec-002',
    market_name: 'ECB begins tapering by January 2026',
    position: 'YES',
    kelly_fraction: 0.09,
    confidence_band: '78-85%',
    time_horizon: '45 days',
    risk_level: 'low',
    expected_value: 0.17,
    max_loss: 0.06,
    reasoning: 'ECB shock at critical level with explicit policy guidance from leadership. High confidence setup.',
    signal_strength: 9
  },
  {
    id: 'rec-003',
    market_name: 'Oil above $100 by Q2 2026',
    position: 'YES',
    kelly_fraction: 0.07,
    confidence_band: '35-55%',
    time_horizon: '180 days',
    risk_level: 'high',
    expected_value: 0.18,
    max_loss: 0.12,
    reasoning: 'Energy shock domain at critical level (89/100) with multiple supply constraints. Higher risk due to geopolitical factors.',
    signal_strength: 7
  },
  {
    id: 'rec-004',
    market_name: 'China announces major stimulus by Q1 2026',
    position: 'YES',
    kelly_fraction: 0.06,
    confidence_band: '55-68%',
    time_horizon: '120 days',
    risk_level: 'medium',
    expected_value: 0.16,
    max_loss: 0.09,
    reasoning: 'Mixed economic data and political pressure creating favorable setup for fiscal intervention.',
    signal_strength: 6
  }
];