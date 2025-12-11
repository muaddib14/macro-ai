interface RegimeData {
  current: {
    primary: string;
    probability: number;
    horizon: string;
  };
  timeseries: Array<{
    date: string;
    regime: string;
    probability: number;
  }>;
}

const generateRegimeData = (): RegimeData => {
  const regimes = ['Disinflationary', 'Inflationary', 'Growth', 'Recession', 'Neutral'];
  const primaryRegime = 'Disinflationary';
  const probability = 70 + Math.random() * 25; // 70-95%
  
  // Generate time series data for the last 30 days
  const timeseries = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some realistic variation around the primary regime
    const regimeProb = probability + (Math.random() - 0.5) * 20;
    
    timeseries.push({
      date: date.toISOString().split('T')[0],
      regime: primaryRegime,
      probability: Math.max(0, Math.min(100, regimeProb))
    });
  }
  
  return {
    current: {
      primary: primaryRegime,
      probability: Math.round(probability),
      horizon: '90d'
    },
    timeseries
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
    const regimeData = generateRegimeData();
    
    return new Response(JSON.stringify({
      data: regimeData,
      status: 'success',
      timestamp: new Date().toISOString(),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to fetch regime analysis',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
