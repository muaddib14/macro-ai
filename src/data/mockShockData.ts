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

export const mockShockData: ShockDomain[] = [
  {
    domain: 'Fed',
    score: 23,
    intensity: 'low',
    description: 'Federal Reserve policy stance',
    top_headlines: [
      {
        headline: 'Fed officials signal patience on rate cuts',
        tone: 'neutral',
        source: 'Federal Reserve',
        timestamp: '2025-12-11T14:30:00Z'
      }
    ]
  },
  {
    domain: 'ECB',
    score: 67,
    intensity: 'high',
    description: 'European Central Bank policy',
    top_headlines: [
      {
        headline: 'ECB raises concerns over eurozone inflation persistence',
        tone: 'negative',
        source: 'ECB Press Release',
        timestamp: '2025-12-11T10:15:00Z'
      },
      {
        headline: 'Lagarde hints at potential policy tightening',
        tone: 'negative',
        source: 'Financial Times',
        timestamp: '2025-12-11T09:45:00Z'
      }
    ]
  },
  {
    domain: 'China',
    score: 45,
    intensity: 'medium',
    description: 'Chinese economic developments',
    top_headlines: [
      {
        headline: 'China reports mixed manufacturing data',
        tone: 'neutral',
        source: 'National Bureau of Statistics',
        timestamp: '2025-12-11T02:00:00Z'
      }
    ]
  },
  {
    domain: 'Energy',
    score: 89,
    intensity: 'critical',
    description: 'Energy market dynamics',
    top_headlines: [
      {
        headline: 'Oil prices surge on Middle East tensions',
        tone: 'negative',
        source: 'Reuters',
        timestamp: '2025-12-12T01:20:00Z'
      },
      {
        headline: 'Gas supply concerns emerge from Ukraine',
        tone: 'negative',
        source: 'Bloomberg',
        timestamp: '2025-12-12T00:45:00Z'
      },
      {
        headline: 'Renewable energy investments accelerate globally',
        tone: 'positive',
        source: 'IEA',
        timestamp: '2025-12-11T23:30:00Z'
      }
    ]
  },
  {
    domain: 'Geopolitics',
    score: 78,
    intensity: 'high',
    description: 'Global geopolitical events',
    top_headlines: [
      {
        headline: 'Diplomatic tensions rise in Asia-Pacific',
        tone: 'negative',
        source: 'CNN',
        timestamp: '2025-12-11T22:15:00Z'
      }
    ]
  },
  {
    domain: 'Fiscal',
    score: 34,
    intensity: 'low',
    description: 'Fiscal policy developments',
    top_headlines: [
      {
        headline: 'US budget negotiations show progress',
        tone: 'positive',
        source: 'Treasury Department',
        timestamp: '2025-12-11T18:00:00Z'
      }
    ]
  },
  {
    domain: 'Tech',
    score: 56,
    intensity: 'medium',
    description: 'Technology sector impacts',
    top_headlines: [
      {
        headline: 'AI regulation framework gains momentum',
        tone: 'neutral',
        source: 'TechCrunch',
        timestamp: '2025-12-11T16:45:00Z'
      }
    ]
  },
  {
    domain: 'Credit',
    score: 12,
    intensity: 'low',
    description: 'Credit market conditions',
    top_headlines: [
      {
        headline: 'Corporate bond spreads remain stable',
        tone: 'neutral',
        source: 'Bloomberg',
        timestamp: '2025-12-11T15:30:00Z'
      }
    ]
  },
  {
    domain: 'Liquidity',
    score: 41,
    intensity: 'medium',
    description: 'Global liquidity conditions',
    top_headlines: [
      {
        headline: 'Central bank swap lines see increased usage',
        tone: 'neutral',
        source: 'Bank for International Settlements',
        timestamp: '2025-12-11T13:45:00Z'
      }
    ]
  }
];

// 3x3 Grid structure for UI
export const shockHeatmapData = [
  [mockShockData[0], mockShockData[1], mockShockData[2]], // Fed, ECB, China
  [mockShockData[3], mockShockData[4], mockShockData[5]], // Energy, Geopolitics, Fiscal
  [mockShockData[6], mockShockData[7], mockShockData[8]], // Tech, Credit, Liquidity
];