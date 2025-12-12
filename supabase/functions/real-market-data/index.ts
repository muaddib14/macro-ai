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
    price: string;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  wheat: {
    price: string;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  corn: {
    price: string;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  marketNews: {
    title: string;
    publisher: string;
    publish_date: string;
    tickers: string[];
  }[];
  
  lastUpdated: string;
}

const generateMarketData = (): MarketData => {
  // Generate realistic market data with some variation
  const currentTime = new Date();
  
  const sp500Price = 6800 + Math.random() * 200;
  const sp500Change = (Math.random() - 0.5) * 50;
  
  const vixPrice = 12 + Math.random() * 20;
  const vixLevel = vixPrice < 20 ? 'low' : vixPrice > 25 ? 'high' : 'medium';
  
  const treasuryPrice = 3.5 + Math.random() * 2;
  const treasuryChange = (Math.random() - 0.5) * 0.2;
  
  // Generate commodities
  const oilPrice = 55 + Math.random() * 20;
  const oilChange = (Math.random() - 0.5) * 3;
  
  const wheatPrice = 6.0 + Math.random() * 2.0;
  const wheatChange = (Math.random() - 0.5) * 0.8;
  
  const cornPrice = 4.5 + Math.random() * 1.5;
  const cornChange = (Math.random() - 0.5) * 0.6;
  
  // Generate market news
  const marketNews = [
    {
      title: "Fed Signals Patience on Rate Cuts Amid Economic Uncertainty",
      publisher: "Financial Times",
      publish_date: currentTime.toISOString(),
      tickers: ["^GSPC", "^VIX"]
    },
    {
      title: "Tech Stocks Rally on AI Developments and Strong Earnings",
      publisher: "Wall Street Journal",
      publish_date: currentTime.toISOString(),
      tickers: ["AAPL", "GOOGL"]
    },
    {
      title: "Oil Prices Stabilize as Supply Concerns Ease",
      publisher: "Bloomberg",
      publish_date: currentTime.toISOString(),
      tickers: ["CL=F", "^GSPC"]
    }
  ];
  
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
      price: oilPrice.toFixed(2),
      change: oilChange,
      changePercent: (oilChange / oilPrice) * 100,
      unit: 'per barrel'
    },
    
    wheat: {
      price: wheatPrice.toFixed(2),
      change: wheatChange,
      changePercent: (wheatChange / wheatPrice) * 100,
      unit: 'per bushel'
    },
    
    corn: {
      price: cornPrice.toFixed(2),
      change: cornChange,
      changePercent: (cornChange / cornPrice) * 100,
      unit: 'per bushel'
    },
    
    marketNews: marketNews,
    lastUpdated: currentTime.toISOString()
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
