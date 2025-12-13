import { 
  RegimeData, 
  ShockDomain, 
  MispricedMarket, 
  RecommendedTrade,
  LiquidityMeter,
  VolatilityIndex,
  NewsItem,
  ChatResponse,
  ApiResponse
} from '@/types';

// Supabase Configuration
const SUPABASE_URL = 'https://hczrquegpsgehiglprqq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhjenJxdWVncHNnZWhpZ2xwcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NzA4MTksImV4cCI6MjA4MDI0NjgxOX0.6xSs8lhYy01WvIesHFVMgJ9wDbENk3Yk05V2IOj1NUc';

// Base API Service following SOLID principles
abstract class BaseApiService {
  protected async fetchWithErrorHandling<T>(url: string, options: RequestInit = {}): Promise<T> {
    try {
      // Add Supabase headers if calling Supabase functions
      const isSupabaseFunction = url.includes('/functions/v1/');
      const headers = {
        'Content-Type': 'application/json',
        ...(isSupabaseFunction && {
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

  protected async fetchSupabaseFunction<T>(url: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<T> {
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

  protected createApiResponse<T>(data: T, message?: string): ApiResponse<T> {
    return {
      data,
      status: 'success',
      timestamp: new Date().toISOString(),
      message,
    };
  }
}

// Regime Service - Single Responsibility: Handle regime data
export class RegimeService extends BaseApiService {
  async getRegimeData(): Promise<ApiResponse<RegimeData>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: RegimeData }>(`${SUPABASE_URL}/functions/v1/regime-analysis`);
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch regime data: ${error}`);
    }
  }

  async getRegimeTimeseries(horizon: string = '90d'): Promise<ApiResponse<RegimeData['timeseries']>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: RegimeData }>(`${SUPABASE_URL}/functions/v1/regime-analysis`);
      return this.createApiResponse(response.data.timeseries);
    } catch (error) {
      throw new Error(`Failed to fetch regime timeseries: ${error}`);
    }
  }
}

// Shock Service - Single Responsibility: Handle shock/heatmap data
export class ShockService extends BaseApiService {
  async getShockData(): Promise<ApiResponse<ShockDomain[]>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ShockDomain[][] }>(`${SUPABASE_URL}/functions/v1/shock-analysis`);
      return this.createApiResponse(response.data.flat());
    } catch (error) {
      throw new Error(`Failed to fetch shock data: ${error}`);
    }
  }

  async getShockHeatmap(): Promise<ApiResponse<ShockDomain[][]>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ShockDomain[][] }>(`${SUPABASE_URL}/functions/v1/shock-analysis`);
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch shock heatmap: ${error}`);
    }
  }
}

// Market Service - Single Responsibility: Handle market data and mispricing
export class MarketService extends BaseApiService {
  async getMispricedMarkets(): Promise<ApiResponse<MispricedMarket[]>> {
    try {
      const data = await this.fetchWithErrorHandling<MispricedMarket[]>('/api/mispriced');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch mispriced markets: ${error}`);
    }
  }

  async getMarketDetails(marketId: string): Promise<ApiResponse<MispricedMarket>> {
    try {
      const data = await this.fetchWithErrorHandling<MispricedMarket>(`/api/mispriced/${marketId}`);
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch market details: ${error}`);
    }
  }
}

// Trade Service - Single Responsibility: Handle trade recommendations
export class TradeService extends BaseApiService {
  async getRecommendations(): Promise<ApiResponse<RecommendedTrade[]>> {
    try {
      const data = await this.fetchWithErrorHandling<RecommendedTrade[]>('/api/recommendations');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch recommendations: ${error}`);
    }
  }

  async getRecommendation(id: string): Promise<ApiResponse<RecommendedTrade>> {
    try {
      const data = await this.fetchWithErrorHandling<RecommendedTrade>(`/api/recommendations/${id}`);
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch recommendation: ${error}`);
    }
  }
}

// Widget Service - Single Responsibility: Handle dashboard widgets
export class WidgetService extends BaseApiService {
  async getLiquidityData(): Promise<ApiResponse<LiquidityMeter>> {
    try {
      const data = await this.fetchWithErrorHandling<LiquidityMeter>('/api/widgets/liquidity');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch liquidity data: ${error}`);
    }
  }

  async getVolatilityData(): Promise<ApiResponse<VolatilityIndex>> {
    try {
      const data = await this.fetchWithErrorHandling<VolatilityIndex>('/api/widgets/volatility');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch volatility data: ${error}`);
    }
  }

  async getNewsTicker(): Promise<ApiResponse<NewsItem[]>> {
    try {
      const data = await this.fetchWithErrorHandling<NewsItem[]>('/api/widgets/news');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch news data: ${error}`);
    }
  }
}

// Real Market Service - Single Responsibility: Handle real market data
export class RealMarketService extends BaseApiService {
  async getRealMarketData(): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: any }>(`${SUPABASE_URL}/functions/v1/real-market-data`);
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch real market data: ${error}`);
    }
  }

  async getAIInsights(): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: any }>(`${SUPABASE_URL}/functions/v1/ai-insights`);
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch AI insights: ${error}`);
    }
  }

  async getEnhancedAnalysis(): Promise<ApiResponse<any>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: any }>(`${SUPABASE_URL}/functions/v1/ai-enhanced`, 'POST', {
        market_data: 'current',
        analysis_type: 'comprehensive'
      });
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch enhanced analysis: ${error}`);
    }
  }
}

// Chat Service - Single Responsibility: Handle AI chat functionality
export class ChatService extends BaseApiService {
  async sendMessage(message: string): Promise<ApiResponse<ChatResponse>> {
    try {
      const response = await this.fetchSupabaseFunction<{ data: ChatResponse }>(
        `${SUPABASE_URL}/functions/v1/ai-chat`,
        'POST',
        { message }
      );
      return this.createApiResponse(response.data);
    } catch (error) {
      throw new Error(`Failed to send chat message: ${error}`);
    }
  }
}

// Status Service - Single Responsibility: Handle system status
export class StatusService extends BaseApiService {
  async getSystemStatus(): Promise<ApiResponse<{ status: string; last_updated: string; version: string }>> {
    try {
      const data = await this.fetchWithErrorHandling<{ status: string; last_updated: string; version: string }>('/api/status');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch system status: ${error}`);
    }
  }
}

// Service Container - Dependency Inversion Principle
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

// Export singleton instance
export const api = ServiceContainer.getInstance();