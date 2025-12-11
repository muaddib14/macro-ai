export interface ChatResponse {
  answer: string;
  rationale: string;
  horizon: string;
  confidence: 'low' | 'medium' | 'high';
  kelly_fraction?: number;
  uncertainty_factors: string[];
}

export const chatResponses: Record<string, ChatResponse> = {
  'fed cuts by 2026-03-31': {
    answer: 'There is a 52% chance the Fed cuts rates by 2026-03-31.',
    rationale: 'Cycle: liquidity remains tight; inflation prints show sticky services inflation; narrative: Fed minutes signalled caution.',
    horizon: '90 days',
    confidence: 'medium',
    kelly_fraction: 0.08,
    uncertainty_factors: ['incoming CPI prints', 'unexpected geopolitical energy shock', 'Fed communication shifts']
  },
  'find mispriced markets': {
    answer: 'Top 3 mispriced opportunities: ECB tapering (17% edge), Fed cuts March 2026 (18% edge), Oil $100+ Q2 2026 (18% edge).',
    rationale: 'Market pricing significantly undervalues policy tightening probability and energy supply constraints.',
    horizon: 'varies by market',
    confidence: 'high',
    uncertainty_factors: ['policy communication changes', 'market sentiment shifts']
  },
  'current regime': {
    answer: 'Current regime: Disinflationary (74% probability).',
    rationale: 'Strong disinflationary signals across multiple indicators with stable regime transition probabilities.',
    horizon: '90 days',
    confidence: 'high',
    uncertainty_factors: ['unexpected inflation shocks', 'Fed policy surprises']
  },
  'energy shock': {
    answer: 'Energy domain at critical shock level (89/100) with high probability of continued volatility.',
    rationale: 'Multiple supply constraints, geopolitical tensions, and Middle East dynamics creating persistent upward pressure.',
    horizon: '30-90 days',
    confidence: 'high',
    uncertainty_factors: ['geopolitical de-escalation', 'strategic reserve releases', 'demand destruction']
  }
};

export const defaultResponse: ChatResponse = {
  answer: 'I need more specific information to provide an accurate probability assessment.',
  rationale: 'Please provide more context about the specific event, timeframe, or market you are interested in.',
  horizon: '90 days',
  confidence: 'low',
  uncertainty_factors: ['insufficient context', 'ambiguous timeframe']
};