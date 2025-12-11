interface MarketData {
  sp500: {
    price: number;
    change: number;
    changePercent: number;
    high: number;
    low: number;
    volume: number;
  };
  
  vix: {
    price: number;
    change: number;
    changePercent: number;
    level: 'low' | 'medium' | 'high';
  };
  
  treasuryYield: {
    price: number;
    change: number;
    changePercent: number;
    interpretation: string;
  };
  
  aapl: {
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  
  googl: {
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  };
  
  oil: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
}

const generateMarketData = (): MarketData => {
  // Generate realistic market data with some variation
  const sp500Price = 6800 + Math.random() * 200;
  const sp500Change = (Math.random() - 0.5) * 50;
  
  const vixPrice = 12 + Math.random() * 20;
  const vixLevel = vixPrice < 20 ? 'low' : vixPrice > 25 ? 'high' : 'medium';
  
  const treasuryPrice = 3.5 + Math.random() * 2;
  const treasuryChange = (Math.random() - 0.5) * 0.2;
  
  return {
    sp500: {
      price: sp500Price,
      change: sp500Change,
      changePercent: (sp500Change / sp500Price) * 100,
      high: sp500Price + Math.random() * 10,
      low: sp500Price - Math.random() * 10,
      volume: Math.floor(Math.random() * 5000000000) + 2000000000
    },
    
    vix: {
      price: vixPrice,
      change: (Math.random() - 0.5) * 2,
      changePercent: (Math.random() - 0.5) * 10,
      level: vixLevel
    },
    
    treasuryYield: {
      price: treasuryPrice,
      change: treasuryChange,
      changePercent: (treasuryChange / treasuryPrice) * 100,
      interpretation: treasuryChange < 0 ? 'Declining yields suggest lower inflation expectations' : 'Rising yields suggest higher inflation expectations'
    },
    
    aapl: {
      price: 280 + Math.random() * 20,
      change: (Math.random() - 0.5) * 5,
      changePercent: (Math.random() - 0.5) * 3,
      volume: Math.floor(Math.random() * 50000000) + 30000000
    },
    
    googl: {
      price: 310 + Math.random() * 30,
      change: (Math.random() - 0.5) * 8,
      changePercent: (Math.random() - 0.5) * 4,
      volume: Math.floor(Math.random() * 50000000) + 25000000
    },
    
    oil: {
      price: 55 + Math.random() * 20,
      change: (Math.random() - 0.5) * 3,
      changePercent: (Math.random() - 0.5) * 5,
      unit: 'per barrel'
    }
  };
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
    const marketData = generateMarketData();
    
    return new Response(JSON.stringify({
      data: marketData,
      status: 'success',
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch real market data',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
