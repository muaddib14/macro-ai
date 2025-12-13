import { 
  RegimeData, 
  ShockDomain, 
  MispricedMarket, 
  RecommendedTrade,
  LiquidityMeter,
  VolatilityIndex,
  NewsItem,
  ChatResponse,
  ApiResponse,
  DbTradingSignal
} from '@/types';

import { 
  mockLiquidityData,
  mockVolatilityData,
  mockNewsTicker,
  mockSystemStatus
} from '@/data/mockApiData';

// Supabase Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hczrquegpsgehiglprqq.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjenJxdWVncHNnZWhpZ2xwcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzA4MTksImV4cCI6MjA4MDI0NjgxOX0.6xSs8lhYy01WvIesHFVMgJ9wDbENk3Yk05V2IOj1NUc';

// Base API Service
abstract class BaseApiService {
  protected async fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      // Add Supabase headers for Functions and REST API
      const isSupabaseRequest = url.includes('supabase.co');
      
      const headers = {
        'Content-Type': 'application/json',
        ...(isSupabaseRequest && {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        }),
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
  }

  protected async fetchSupabaseFunction<T>(functionName: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<T> {
    const url = `${SUPABASE_URL}/functions/v1/${functionName}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
    };

    if (body && method === 'POST') {
      options.body = JSON.stringify(body);
    }

    return this.fetchWithErrorHandling<T>(url, options);
  }

  // New helper for direct DB access
  protected async fetchSupabaseTable<T>(table: string, query: string = ''): Promise<T[]> {
    const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;
    return this.fetchWithErrorHandling<T[]>(url);
  }

  protected createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString(),
      message,
    };
  }
}

// Regime Service
export class RegimeService extends BaseApiService {
  async getRegimeData(): Promise<ApiResponse<RegimeData>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: RegimeData }>('regime-analysis');
      return this.createApiResponse(response.data);
    } catch (error) {
      // Fallback if function fails, normally you might return mock here
      throw error;
    }
  }

  async getRegimeTimeseries(horizon: string = '90d'): Promise<ApiResponse<RegimeData['timeseries']>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: RegimeData }>('regime-analysis');
      return this.createApiResponse(response.data.timeseries);
    } catch (error) {
      throw error;
    }
  }
}

// Shock Service
export class ShockService extends BaseApiService {
  async getShockData(): Promise<ApiResponse<ShockDomain[]>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ShockDomain[][] }>('shock-analysis');
      return this.createApiResponse(response.data.flat());
    } catch (error) {
      throw error;
    }
  }

  async getShockHeatmap(): Promise<ApiResponse<ShockDomain[][]>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ShockDomain[][] }>('shock-analysis');
      return this.createApiResponse(response.data);
    } catch (error) {
      throw error;
    }
  }
}

// Market Service - CONNECTED TO REAL SUPABASE TABLES
export class MarketService extends BaseApiService {
  async getMispricedMarkets(): Promise<ApiResponse<MispricedMarket[]>> {
    try {
      // Query trading_signals joined with markets
      // Selecting top edges, ensuring we have market data
      const query = 'select=*,markets(*)&order=edge.desc&limit=10';
      const signals = await this.fetchSupabaseTable<DbTradingSignal>('trading_signals', query);
      
      // Map DB types to UI types
      const mappedMarkets: MispricedMarket[] = signals
        .filter(s => s.markets) // Ensure market data exists
        .map(s => ({
          id: s.id,
          name: s.markets?.question || 'Unknown Market',
          market_price: s.markets?.last_yes_price || 0,
          model_price: s.model_prob,
          edge: s.edge,
          kelly_stake: s.kelly_fraction,
          horizon: 'Varies', // You might want to calculate this or fetch from DB
          rationale: `Model probability ${Math.round(s.model_prob * 100)}% vs Market ${Math.round((s.markets?.last_yes_price || 0) * 100)}%`,
          volume_24h: s.markets?.volume_24h || 0,
          category: s.markets?.category || 'General',
          confidence: s.confidence || 'medium'
        }));

      return this.createApiResponse(mappedMarkets);
    } catch (error) {
      console.error('Failed to fetch mispriced markets from DB', error);
      return this.createApiResponse([], 'Failed to load market data');
    }
  }

  async getMarketDetails(marketId: string): Promise<ApiResponse<MispricedMarket | null>> {
    // Placeholder for detail fetch if needed
    return this.createApiResponse(null);
  }
}

// Trade Service - CONNECTED TO REAL SUPABASE TABLES
export class TradeService extends BaseApiService {
  async getRecommendations(): Promise<ApiResponse<RecommendedTrade[]>> {
    try {
      // Query recommendations table
      const query = 'select=*&order=expected_value.desc&limit=5';
      const recommendations = await this.fetchSupabaseTable<any>('recommendations', query);
      
      const mappedRecs: RecommendedTrade[] = recommendations.map(r => ({
        id: r.id,
        market_name: r.market_ticker || 'Unknown Market',
        position: 'YES', // Defaulting, check your DB if 'direction' exists in recommendations
        kelly_fraction: r.kelly_optimal_size || 0,
        confidence_band: `${Math.round((r.confidence || 0) * 100)}%`,
        time_horizon: 'Medium Term',
        risk_level: 'medium',
        expected_value: r.expected_value || 0,
        max_loss: 1.0, // Standard binary option risk
        reasoning: r.reasoning || 'AI Generated Recommendation',
        signal_strength: Math.round((r.confidence || 0.5) * 10)
      }));

      return this.createApiResponse(mappedRecs);
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
      return this.createApiResponse([]);
    }
  }

  async getRecommendation(id: string): Promise<ApiResponse<RecommendedTrade | null>> {
    return this.createApiResponse(null);
  }
}

// Widget Service
export class WidgetService extends BaseApiService {
  async getLiquidityData(): Promise<ApiResponse<LiquidityMeter>> {
    return this.createApiResponse(mockLiquidityData);
  }

  async getVolatilityData(): Promise<ApiResponse<VolatilityIndex>> {
    return this.createApiResponse(mockVolatilityData);
  }

  async getNewsTicker(): Promise<ApiResponse<NewsItem[]>> {
    // Ideally fetch from 'market_stats' or 'insights' table
    return this.createApiResponse(mockNewsTicker);
  }
}

// Real Market Service
export class RealMarketService extends BaseApiService {
  async getRealMarketData(): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: any }>('real-market-data');
      return this.createApiResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  async getAIInsights(): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: any }>('ai-insights');
      return this.createApiResponse(response.data);
    } catch (error) {
      throw error;
    }
  }
}

// Chat Service
export class ChatService extends BaseApiService {
  async sendMessage(message: string): Promise<ApiResponse<ChatResponse>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ChatResponse }>(
        'ai-chat',
        'POST',
        { message }
      );
      return this.createApiResponse(response.data);
    } catch (error) {
      throw error;
    }
  }
}

// Status Service
export class StatusService extends BaseApiService {
  async getSystemStatus(): Promise<ApiResponse<any>> {
    return this.createApiResponse(mockSystemStatus);
  }
}

// Service Container
export class ServiceContainer {
  private static instance: ServiceContainer;
  public readonly regime: RegimeService;
  public readonly shock: ShockService;
  public readonly market: MarketService;
  public readonly trade: TradeService;
  public readonly widget: WidgetService;
  public readonly chat: ChatService;
  public readonly status: StatusService;
  public readonly realMarket: RealMarketService;

  private constructor() {
    this.regime = new RegimeService();
    this.shock = new ShockService();
    this.market = new MarketService();
    this.trade = new TradeService();
    this.widget = new WidgetService();
    this.chat = new ChatService();
    this.status = new StatusService();
    this.realMarket = new RealMarketService();
  }

  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}

export const api = ServiceContainer.getInstance();