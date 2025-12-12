// ShockDomain type definition for the edge function
interface ShockDomain {
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

const generateShockDomains = (): ShockDomain[][] => {
  const domains = [
    {
      domain: 'Geopolitical',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Rising tensions in Eastern Europe affect global markets',
          tone: 'negative' as const,
          source: 'Reuters',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Trade negotiations show signs of progress',
          tone: 'positive' as const,
          source: 'Bloomberg',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Geopolitical events and international relations impacting market stability.'
    },
    {
      domain: 'Monetary Policy',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Central bank signals potential rate changes',
          tone: 'neutral' as const,
          source: 'Financial Times',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Inflation data shows unexpected trends',
          tone: 'negative' as const,
          source: 'Wall Street Journal',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Central bank policies and monetary decisions affecting financial markets.'
    },
    {
      domain: 'Technology',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'AI breakthroughs drive tech sector volatility',
          tone: 'positive' as const,
          source: 'TechCrunch',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Regulatory concerns affect major tech companies',
          tone: 'negative' as const,
          source: 'The Verge',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Technological disruptions and innovations impacting market dynamics.'
    },
    {
      domain: 'Energy',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Oil supply disruptions create price volatility',
          tone: 'negative' as const,
          source: 'Energy Information Administration',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Renewable energy investments reach new highs',
          tone: 'positive' as const,
          source: 'GreenTech Media',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Energy markets and supply chain disruptions affecting global economy.'
    },
    {
      domain: 'Financial Stability',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Banking sector shows signs of stress',
          tone: 'negative' as const,
          source: 'Financial Stability Council',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Credit markets remain stable',
          tone: 'positive' as const,
          source: 'Federal Reserve',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Financial system stability and credit market conditions.'
    },
    {
      domain: 'Supply Chain',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Global shipping costs increase significantly',
          tone: 'negative' as const,
          source: 'Supply Chain Digest',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Port efficiency improvements reduce delays',
          tone: 'positive' as const,
          source: 'Logistics Weekly',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Global supply chain disruptions and logistics challenges.'
    },
    {
      domain: 'Commodities',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Agricultural commodity prices surge due to weather',
          tone: 'negative' as const,
          source: 'Commodity Research Bureau',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Precious metals demand increases amid uncertainty',
          tone: 'positive' as const,
          source: 'Kitco Metals',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Raw material and agricultural commodity market volatility.'
    },
    {
      domain: 'Currency',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Dollar strengthens against major currencies',
          tone: 'neutral' as const,
          source: 'CurrencyWatch',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Emerging market currencies show resilience',
          tone: 'positive' as const,
          source: 'FXStreet',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Foreign exchange market dynamics and currency volatility.'
    },
    {
      domain: 'Consumer Sentiment',
      score: Math.floor(Math.random() * 100),
      intensity: Math.random() < 0.25 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.75 ? 'medium' : 'low',
      top_headlines: [
        {
          headline: 'Consumer confidence drops amid economic uncertainty',
          tone: 'negative' as const,
          source: 'Conference Board',
          timestamp: new Date().toISOString()
        },
        {
          headline: 'Retail sales exceed expectations',
          tone: 'positive' as const,
          source: 'Department of Commerce',
          timestamp: new Date().toISOString()
        }
      ],
      description: 'Consumer confidence and spending patterns affecting economic growth.'
    }
  ];

  // Create 3x3 grid (flatten domains into 2D array structure)
  const grid: ShockDomain[][] = [];
  for (let i = 0; i < 3; i++) {
    grid.push(domains.slice(i * 3, (i + 1) * 3));
  }
  
  return grid;
};

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
    'Access-Control-Max-Age': '86400',
    'Access-Control-Allow-Credentials': 'false'
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const shockDomains = generateShockDomains();
    
    return new Response(JSON.stringify({
      data: shockDomains,
      status: 'success',
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to generate shock analysis',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});