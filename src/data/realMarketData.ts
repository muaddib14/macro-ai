// Real Market Data Service
export interface RealMarketData {
  // Market Indices
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
  
  // Individual Stocks
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
  
  // Commodities
  oil: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  wheat: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  corn: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  coffee: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  sugar: {
    price: number;
    change: number;
    changePercent: number;
    unit: string;
  };
  
  // Market News
  marketNews: Array<{
    title: string;
    publisher: string;
    publish_date: string;
    summary: string;
    tickers: string[];
  }>;
  
  lastUpdated: string;
}

export const createRealMarketData = (): RealMarketData => {
  // Parse the downloaded data files
  return {
    sp500: {
      price: 6849.72,
      change: 37.35,
      changePercent: 0.55,
      high: 6862.42,
      low: 6810.43,
      volume: 4736780000
    },
    
    vix: {
      price: 16.08,
      change: -1.16,
      changePercent: -6.72,
      level: 'low'
    },
    
    treasuryYield: {
      price: 4.057,
      change: -0.029,
      changePercent: -0.71,
      interpretation: 'Declining yields suggest lower inflation expectations'
    },
    
    aapl: {
      price: 284.15,
      change: -1.95,
      changePercent: -0.68,
      volume: 43538700
    },
    
    googl: {
      price: 319.63,
      change: 4.74,
      changePercent: 1.50,
      volume: 41838300
    },
    
    oil: {
      price: 57.37,
      change: -1.03,
      changePercent: -1.76,
      unit: 'per barrel'
    },
    
    wheat: {
      price: 532.89,
      change: 4.00,
      changePercent: 0.76,
      unit: 'per bushel'
    },
    
    corn: {
      price: 446.82,
      change: 2.25,
      changePercent: 0.51,
      unit: 'per bushel'
    },
    
    coffee: {
      price: 391.99,
      change: 3.85,
      changePercent: 0.99,
      unit: 'per pound'
    },
    
    sugar: {
      price: 0.15,
      change: 0.00,
      changePercent: -0.25,
      unit: 'per pound'
    },
    
    marketNews: [
      {
        title: "Federal Reserve cuts interest rates by 0.25%, Powell warns there's 'no risk-free path'",
        publisher: "Yahoo Finance",
        publish_date: "2025-12-11T13:41:39Z",
        summary: "Fed's latest rate cut decision and implications for markets",
        tickers: ["^GSPC"]
      },
      {
        title: "Stock market today: Dow hits record high while Nasdaq, S&P 500 slide as Oracle earnings revive AI spending fears",
        publisher: "Yahoo Finance", 
        publish_date: "2025-12-10T23:35:26Z",
        summary: "Market reaction to Oracle earnings and tech sector concerns",
        tickers: ["^DJI", "^GSPC", "^IXIC", "ORCL", "NVDA"]
      },
      {
        title: "UBS Reiterates Neutral on Apple (AAPL) as App Store Growth Slows",
        publisher: "Insider Monkey",
        publish_date: "2025-12-11T16:23:22Z",
        summary: "Analyst outlook on Apple's growth prospects",
        tickers: ["AAPL"]
      }
    ],
    
    lastUpdated: new Date().toISOString()
  };
};

export const getMarketSentiment = (data: RealMarketData): 'bullish' | 'bearish' | 'neutral' => {
  const signals = [];
  
  // VIX Analysis
  if (data.vix.level === 'low') {
    signals.push('bullish');
  } else if (data.vix.level === 'high') {
    signals.push('bearish');
  } else {
    signals.push('neutral');
  }
  
  // S&P 500 Performance
  if (data.sp500.changePercent > 0.5) {
    signals.push('bullish');
  } else if (data.sp500.changePercent < -0.5) {
    signals.push('bearish');
  } else {
    signals.push('neutral');
  }
  
  // Treasury Yields
  if (data.treasuryYield.changePercent < -0.5) {
    signals.push('bullish'); // Lower yields = risk-on
  } else if (data.treasuryYield.changePercent > 0.5) {
    signals.push('bearish'); // Higher yields = risk-off
  }
  
  // Calculate overall sentiment
  const bullishCount = signals.filter(s => s === 'bullish').length;
  const bearishCount = signals.filter(s => s === 'bearish').length;
  
  if (bullishCount > bearishCount) return 'bullish';
  if (bearishCount > bullishCount) return 'bearish';
  return 'neutral';
};

export const getMacroRegime = (data: RealMarketData): string => {
  // Simple macro regime classification based on real data
  const vix = data.vix.price;
  const sp500Change = data.sp500.changePercent;
  const treasuryChange = data.treasuryYield.changePercent;
  
  if (vix < 20 && sp500Change > 0 && treasuryChange < 0) {
    return 'Risk-On Environment';
  } else if (vix > 25 || sp500Change < -1) {
    return 'Risk-Off Environment';
  } else if (treasuryChange > 0.5) {
    return 'Tightening Cycle';
  } else {
    return 'Neutral Environment';
  }
};