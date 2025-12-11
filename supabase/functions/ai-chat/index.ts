interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const generateAIResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Simple rule-based responses for demo purposes
  if (message.includes('market') || message.includes('stock')) {
    return `Based on current market data, I'm observing ${Math.random() > 0.5 ? 'bullish' : 'bearish'} sentiment. The VIX is at ${(15 + Math.random() * 15).toFixed(1)}, suggesting ${Math.random() > 0.5 ? 'low' : 'elevated'} volatility. Would you like me to analyze any specific sectors?`;
  }
  
  if (message.includes('fed') || message.includes('rate') || message.includes('interest')) {
    return `The Federal Reserve is maintaining a ${Math.random() > 0.5 ? 'hawkish' : 'dovish'} stance. Current treasury yields suggest ${Math.random() > 0.5 ? 'declining' : 'rising'} inflation expectations. Rate cuts are ${Math.random() > 0.5 ? 'possible' : 'unlikely'} in the near term.`;
  }
  
  if (message.includes('inflation') || message.includes('cpi')) {
    return `Inflation indicators show ${Math.random() > 0.5 ? 'disinflationary' : 'inflationary'} trends. The current macro regime indicates ${Math.random() > 0.5 ? 'controlled' : 'elevated'} price pressures. Energy and food sectors are ${Math.random() > 0.5 ? 'contributing to' : 'moderating'} inflation.`;
  }
  
  if (message.includes('recession') || message.includes('growth') || message.includes('gdp')) {
    return `Economic growth indicators suggest ${Math.random() > 0.5 ? 'positive' : 'negative'} momentum. Leading economic indicators are ${Math.random() > 0.5 ? 'expanding' : 'contracting'}. The probability of recession in the next 12 months is ${Math.round(Math.random() * 30)}%.`;
  }
  
  // Default response
  return `I analyze macro market conditions including volatility, interest rates, economic growth, and market sentiment. Currently observing a ${Math.random() > 0.5 ? 'risk-on' : 'risk-off'} environment. What specific aspect of the markets would you like me to focus on?`;
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
    
    const aiResponse = generateAIResponse(message);
    
    const chatHistory: ChatMessage[] = [
      { role: 'user', content: message },
      { role: 'assistant', content: aiResponse }
    ];
    
    return new Response(JSON.stringify({
      data: {
        response: aiResponse,
        history: chatHistory,
        timestamp: new Date().toISOString()
      },
      status: 'success'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to process chat request',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
