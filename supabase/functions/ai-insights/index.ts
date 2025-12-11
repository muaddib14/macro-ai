interface AIInsight {
  type: 'bullish' | 'bearish' | 'neutral';
  icon: string;
  title: string;
  description: string;
  confidence: 'high' | 'medium' | 'low';
}

const generateAIInsights = (): AIInsight[] => {
  const insights: AIInsight[] = [];
  
  // Generate VIX-based insight
  const vixPrice = 12 + Math.random() * 20;
  if (vixPrice < 20) {
    insights.push({
      type: 'bullish',
      icon: 'TrendingUp',
      title: 'Low Volatility Environment',
      description: `VIX at ${vixPrice.toFixed(2)} indicates investor complacency and potential upward market momentum.`,
      confidence: 'high'
    });
  } else if (vixPrice > 25) {
    insights.push({
      type: 'bearish',
      icon: 'AlertTriangle',
      title: 'Elevated Volatility Alert',
      description: `VIX at ${vixPrice.toFixed(2)} suggests heightened market uncertainty and potential downside risk.`,
      confidence: 'high'
    });
  }
  
  // Generate S&P 500 performance insight
  const sp500Change = (Math.random() - 0.5) * 5;
  if (sp500Change > 1) {
    insights.push({
      type: 'bullish',
      icon: 'Target',
      title: 'Strong Market Performance',
      description: `S&P 500 up ${sp500Change.toFixed(2)}% indicates positive risk appetite and bullish sentiment.`,
      confidence: 'medium'
    });
  } else if (sp500Change < -1) {
    insights.push({
      type: 'bearish',
      icon: 'AlertTriangle',
      title: 'Market Weakness Detected',
      description: `S&P 500 down ${Math.abs(sp500Change).toFixed(2)}% suggests risk-off sentiment and potential correction.`,
      confidence: 'medium'
    });
  }
  
  // Generate macro regime insight
  const macroRegime = vixPrice < 20 && sp500Change > 0 ? 'Risk-On Environment' : 
                     vixPrice > 25 || sp500Change < -1 ? 'Risk-Off Environment' : 'Neutral Environment';
  
  insights.push({
    type: macroRegime.includes('Risk-On') ? 'bullish' : macroRegime.includes('Risk-Off') ? 'bearish' : 'neutral',
    icon: 'Brain',
    title: 'Macro Regime Analysis',
    description: `Current macro environment: ${macroRegime}. Market conditions suggest ${macroRegime.includes('Risk-On') ? 'bullish' : macroRegime.includes('Risk-Off') ? 'bearish' : 'neutral'} positioning.`,
    confidence: 'medium'
  });
  
  return insights;
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
    const insights = generateAIInsights();
    
    return new Response(JSON.stringify({
      data: insights,
      status: 'success',
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to generate AI insights',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
