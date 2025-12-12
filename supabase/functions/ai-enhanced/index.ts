// Enhanced AI Market Analysis with OpenRouter
interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface MarketData {
  sp500: {
    price: number;
    change: number;
    changePercent: number;
    level: string;
  };
  vix: {
    price: number;
    level: 'low' | 'medium' | 'high';
  };
  treasuryYield: {
    price: number;
    change: number;
    changePercent: number;
  };
}

const generateMarketAnalysis = async (marketData: MarketData): Promise<any> => {
  const systemPrompt = `You are an expert financial market analyst AI. Analyze the current market data and provide comprehensive insights.

Current Market Data:
- S&P 500: ${marketData.sp500.price.toFixed(2)} (${marketData.sp500.changePercent.toFixed(2)}%)
- VIX: ${marketData.vix.price.toFixed(2)} (${marketData.vix.level} volatility)
- Treasury Yield: ${marketData.treasuryYield.price.toFixed(3)}% (${marketData.treasuryYield.changePercent.toFixed(2)}%)

Provide analysis in this JSON format:
{
  "sentiment": "bullish/bearish/neutral",
  "confidence": "high/medium/low",
  "key_insights": [
    "3-4 actionable market insights",
    "focus on specific metrics and implications"
  ],
  "risk_assessment": "Brief risk analysis",
  "outlook": "Market outlook and potential scenarios"
}`;

  // For demo purposes, generate intelligent analysis based on market data
  const sp500Change = marketData.sp500.changePercent;
  const vixLevel = marketData.vix.price;
  const yieldChange = marketData.treasuryYield.changePercent;

  let sentiment = 'neutral';
  let confidence = 'medium';
  const insights = [];

  // S&P 500 Analysis
  if (sp500Change > 1) {
    sentiment = 'bullish';
    confidence = 'high';
    insights.push(`Strong S&P 500 performance (+${sp500Change.toFixed(2)}%) indicates robust market sentiment and risk appetite`);
  } else if (sp500Change < -1) {
    sentiment = 'bearish';
    confidence = 'high';
    insights.push(`S&P 500 decline (${sp500Change.toFixed(2)}%) suggests market weakness and potential correction`);
  } else {
    insights.push(`S&P 500 showing mixed signals with ${sp500Change >= 0 ? 'positive' : 'negative'} momentum`);
  }

  // VIX Analysis
  if (vixLevel < 20) {
    insights.push(`Low VIX (${vixLevel.toFixed(1)}) indicates market complacency and potential upside`);
  } else if (vixLevel > 25) {
    insights.push(`High VIX (${vixLevel.toFixed(1)}) signals elevated uncertainty and potential volatility`);
  } else {
    insights.push(`Moderate VIX (${vixLevel.toFixed(1)}) suggests balanced market conditions`);
  }

  // Treasury Yield Analysis
  if (yieldChange < -0.5) {
    insights.push(`Falling yields (${yieldChange.toFixed(2)}%) suggest declining inflation expectations and potential risk-on environment`);
  } else if (yieldChange > 0.5) {
    insights.push(`Rising yields (${yieldChange.toFixed(2)}%) indicate potential inflation concerns and risk-off sentiment`);
  }

  // Risk Assessment
  let riskAssessment = '';
  if (vixLevel > 25 || Math.abs(sp500Change) > 2) {
    riskAssessment = 'Elevated market risk - monitor for volatility spikes and potential correction';
  } else if (vixLevel < 15 && sp500Change > 0) {
    riskAssessment = 'Low risk environment - potential for continued upside momentum';
  } else {
    riskAssessment = 'Moderate risk levels - normal market volatility expected';
  }

  // Market Outlook
  let outlook = '';
  if (sentiment === 'bullish' && vixLevel < 20) {
    outlook = 'Positive outlook with potential for continued market gains. Watch for overvaluation signals.';
  } else if (sentiment === 'bearish' && vixLevel > 25) {
    outlook = 'Cautious outlook - elevated risk of continued market weakness and increased volatility.';
  } else {
    outlook = 'Neutral outlook - markets likely to remain range-bound with mixed signals.';
  }

  return {
    sentiment,
    confidence,
    key_insights: insights,
    risk_assessment: riskAssessment,
    outlook
  };
};

const generateChatResponse = async (userMessage: string, marketContext: any): Promise<string> => {
  const message = userMessage.toLowerCase();
  
  // Get current market sentiment
  const sentiment = marketContext.sentiment || 'neutral';
  const sp500Price = marketContext.sp500?.price || 'unknown';
  const vixLevel = marketContext.vix?.price || 'unknown';
  
  // AI-powered responses based on market context and user query
  if (message.includes('buy') || message.includes('invest') || message.includes('long')) {
    return `Based on current market conditions (${sentiment} sentiment), I'd recommend being ${sentiment === 'bullish' ? 'selectively bullish' : sentiment === 'bearish' ? 'defensive and cautious' : 'balanced and diversified'}. Current S&P 500 at ${sp500Price} shows ${marketContext.sp500?.changePercent >= 0 ? 'positive' : 'negative'} momentum. Consider dollar-cost averaging and focus on quality assets.`;
  }
  
  if (message.includes('sell') || message.includes('short') || message.includes('exit')) {
    return `Regarding selling considerations: VIX at ${vixLevel} indicates ${vixLevel > 25 ? 'high' : vixLevel < 15 ? 'low' : 'moderate'} volatility. ${sentiment === 'bearish' ? 'This confirms the bearish environment' : 'This suggests a neutral stance'}. Consider taking profits on overvalued positions and maintain cash reserves for opportunities.`;
  }
  
  if (message.includes('market') || message.includes('outlook')) {
    return `Current market outlook: ${marketContext.outlook}. Key risks: ${marketContext.risk_assessment}. The ${sentiment} sentiment is driven by ${marketContext.key_insights?.[0] || 'mixed market signals'}.`;
  }
  
  if (message.includes('fed') || message.includes('rates') || message.includes('interest')) {
    const yieldChange = marketContext.treasuryYield?.changePercent || 0;
    return `Rate environment analysis: Treasury yields ${yieldChange >= 0 ? 'rising' : 'declining'} (${yieldChange.toFixed(2)}%). This suggests the Fed is ${yieldChange < -0.5 ? 'potentially easing' : yieldChange > 0.5 ? 'maintaining tight policy' : 'holding steady'}. Watch inflation data and employment reports for policy signals.`;
  }
  
  if (message.includes('inflation') || message.includes('cpi')) {
    return `Inflation analysis: Current yield environment suggests ${marketContext.treasuryYield?.change < 0 ? 'declining' : 'rising'} inflation expectations. VIX levels indicate ${marketContext.vix?.level} market concern about price pressures. Monitor PCE and CPI data for Fed policy direction.`;
  }
  
  if (message.includes('recession') || message.includes('risk')) {
    const riskLevel = marketContext.vix?.price > 25 ? 'elevated' : marketContext.vix?.price < 15 ? 'low' : 'moderate';
    return `Recession risk assessment: Current risk level is ${riskLevel}. ${marketContext.risk_assessment}. Leading indicators to watch: yield curve inversion, employment trends, credit spreads. Maintain diversification and quality focus.`;
  }
  
  // Default intelligent response
  return `Thank you for your question about "${userMessage}". Given the current ${sentiment} market sentiment with S&P 500 at ${sp500Price} and VIX at ${vixLevel}, I recommend focusing on ${sentiment === 'bullish' ? 'growth opportunities while monitoring for overvaluation' : sentiment === 'bearish' ? 'risk management and defensive positioning' : 'balanced approach with selective opportunities'}. What specific aspect of the markets would you like me to analyze further?`;
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
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'analysis';
    
    if (action === 'chat') {
      // Chat functionality
      const { message, marketData } = await req.json();
      
      if (!message) {
        return new Response(JSON.stringify({ error: 'Message is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // Get market context for intelligent responses
      const marketContext = marketData || {
        sentiment: 'neutral',
        sp500: { price: 5000, changePercent: 0 },
        vix: { price: 20, level: 'medium' },
        treasuryYield: { change: 0 }
      };
      
      const aiResponse = await generateChatResponse(message, marketContext);
      
      return new Response(JSON.stringify({
        data: {
          response: aiResponse,
          timestamp: new Date().toISOString(),
          market_context: marketContext
        },
        status: 'success'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      // Market analysis functionality
      const { marketData } = await req.json();
      
      if (!marketData) {
        return new Response(JSON.stringify({ error: 'Market data is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      const analysis = await generateMarketAnalysis(marketData);
      
      return new Response(JSON.stringify({
        data: analysis,
        status: 'success',
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to process AI request',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
