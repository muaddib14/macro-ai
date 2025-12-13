interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface TradingMetrics {
  confidence: number;
  kelly_fraction?: number;
  uncertainty_factor: number;
  market_regime?: string;
  risk_level: 'low' | 'medium' | 'high';
}

interface EnhancedAIResponse {
  answer: string;
  metrics: TradingMetrics;
}

// Enhanced OpenRouter Mistral integration with trading metrics
const generateAIResponse = async (userMessage: string): Promise<EnhancedAIResponse> => {
  const openrouterApiKey = Deno.env.get('OPENROUTER_API_KEY');
  
  if (!openrouterApiKey) {
    // Fallback to rule-based responses with enhanced metrics
    return generateFallbackResponse(userMessage);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openrouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://macrocycle-ai.com',
        'X-Title': 'MacroCycle AI Trading Assistant'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          {
            role: 'system',
            content: `You are MacroCycle AI, a sophisticated trading assistant specializing in macroeconomic analysis and prediction markets. 

Your responses should include:
1. Clear, actionable analysis
2. Probabilistic assessments when appropriate
3. Risk considerations
4. Market regime context

Always provide responses in a professional, analytical tone. If asked about trading decisions, emphasize the importance of proper risk management and diversification.`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const aiAnswer = data.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response.';

    // Generate trading metrics based on message content
    const metrics = generateTradingMetrics(userMessage);

    return {
      answer: aiAnswer,
      metrics
    };
  } catch (error) {
    console.error('OpenRouter API error:', error);
    // Fallback to enhanced rule-based responses
    return generateFallbackResponse(userMessage);
  }
};

// Enhanced fallback responses with trading metrics
const generateFallbackResponse = (userMessage: string): EnhancedAIResponse => {
  const message = userMessage.toLowerCase();
  let answer = '';
  let confidence = 0.7;
  let kelly_fraction = 0.02;
  let uncertainty_factor = 0.3;
  let risk_level: 'low' | 'medium' | 'high' = 'medium';
  let market_regime = 'neutral';

  if (message.includes('fed') || message.includes('rate') || message.includes('interest')) {
    answer = `Based on current economic indicators, the Federal Reserve is maintaining a cautiously hawkish stance. Recent FOMC minutes suggest rate cuts are unlikely in the near term, with inflation remaining above the 2% target. The current treasury yield curve shows slight inversion, indicating some recession risk in the next 12-18 months. Key factors to monitor include core PCE inflation, employment data, and global economic conditions.`;
    confidence = 0.75;
    kelly_fraction = 0.015;
    uncertainty_factor = 0.25;
    risk_level = 'medium';
    market_regime = 'hawkish_dovish_tension';
  } else if (message.includes('recession') || message.includes('growth') || message.includes('gdp')) {
    answer = `Current leading economic indicators suggest mixed signals. The yield curve inversion and weakening consumer confidence point to elevated recession risk (approximately 35-40% probability in the next 12 months). However, robust employment and consumer spending provide some counterbalance. Key recession indicators to monitor include the Sahm Rule, unemployment claims, and leading economic index.`;
    confidence = 0.68;
    kelly_fraction = 0.01;
    uncertainty_factor = 0.4;
    risk_level = 'high';
    market_regime = 'late_cycle';
  } else if (message.includes('market') || message.includes('stock') || message.includes('equity')) {
    answer = `Equity markets are showing signs of late-cycle behavior with elevated valuations (S&P 500 P/E ratio ~21x) and narrowing market breadth. The VIX at current levels suggests moderate volatility. Defensive sectors (utilities, consumer staples) are outperforming growth, which historically indicates late-cycle dynamics. Monitor earnings growth sustainability and credit spreads for early warning signals.`;
    confidence = 0.72;
    kelly_fraction = 0.025;
    uncertainty_factor = 0.35;
    risk_level = 'medium';
    market_regime = 'late_cycle';
  } else if (message.includes('inflation') || message.includes('cpi') || message.includes('pce')) {
    answer = `Inflation indicators show disinflationary trends with both headline and core metrics trending toward the Fed's 2% target. Energy prices have moderated, while shelter components show gradual improvement. However, services inflation remains sticky, suggesting the final mile to 2% inflation may take longer than initially expected.`;
    confidence = 0.78;
    kelly_fraction = 0.02;
    uncertainty_factor = 0.3;
    risk_level = 'low';
    market_regime = 'disinflation';
  } else {
    answer = `I'm MacroCycle AI, specializing in macroeconomic analysis and prediction markets. I analyze various factors including Federal Reserve policy, inflation trends, recession risk, and market regimes. Current market conditions suggest a late-cycle environment with elevated but moderating inflation. What specific aspect of the markets or economy would you like me to analyze?`;
    confidence = 0.7;
    kelly_fraction = 0.02;
    uncertainty_factor = 0.3;
    risk_level = 'medium';
    market_regime = 'mixed_signals';
  }

  return {
    answer,
    metrics: {
      confidence,
      kelly_fraction,
      uncertainty_factor,
      market_regime,
      risk_level
    }
  };
};

// Generate trading metrics based on message analysis
const generateTradingMetrics = (userMessage: string): TradingMetrics => {
  const message = userMessage.toLowerCase();
  let confidence = 0.7;
  let kelly_fraction = 0.02;
  let uncertainty_factor = 0.3;
  let risk_level: 'low' | 'medium' | 'high' = 'medium';
  let market_regime = 'neutral';

  // Adjust metrics based on question complexity and specificity
  if (message.includes('probability') || message.includes('%')) {
    confidence = 0.65; // Probabilistic questions have lower confidence
    uncertainty_factor = 0.4;
  } else if (message.includes('fed') || message.includes('rate')) {
    confidence = 0.75;
    kelly_fraction = 0.015;
    risk_level = 'medium';
  } else if (message.includes('recession') || message.includes('crisis')) {
    confidence = 0.68;
    kelly_fraction = 0.01;
    uncertainty_factor = 0.4;
    risk_level = 'high';
  }

  return {
    confidence,
    kelly_fraction,
    uncertainty_factor,
    market_regime,
    risk_level
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

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Generate enhanced AI response with trading metrics
    const aiResponse = await generateAIResponse(message);
    
    const chatHistory: ChatMessage[] = [
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse.answer }
    ];
    
    return new Response(JSON.stringify({
      data: {
        answer: aiResponse.answer,
        response: aiResponse.answer,
        metrics: aiResponse.metrics,
        history: chatHistory,
        timestamp: new Date().toISOString()
      },
      status: 'success'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Chat processing error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to process chat request',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
