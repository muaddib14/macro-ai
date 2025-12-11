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

// Base API Service following SOLID principles
abstract class BaseApiService {
  protected async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error for ${url}:`, error);
      throw error;
    }
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
      const data = await this.fetchWithErrorHandling<RegimeData>('/api/regime');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch regime data: ${error}`);
    }
  }

  async getRegimeTimeseries(horizon: string = '90d'): Promise<ApiResponse<RegimeData['timeseries']>> {
    try {
      const data = await this.fetchWithErrorHandling<RegimeData['timeseries']>(`/api/regime/timeseries?horizon=${horizon}`);
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch regime timeseries: ${error}`);
    }
  }
}

// Shock Service - Single Responsibility: Handle shock/heatmap data
export class ShockService extends BaseApiService {
  async getShockData(): Promise<ApiResponse<ShockDomain[]>> {
    try {
      const data = await this.fetchWithErrorHandling<ShockDomain[]>('/api/shock');
      return this.createApiResponse(data);
    } catch (error) {
      throw new Error(`Failed to fetch shock data: ${error}`);
    }
  }

  async getShockHeatmap(): Promise<ApiResponse<ShockDomain[][]>> {
    try {
      const data = await this.fetchWithErrorHandling<ShockDomain[][]>('/api/shock/heatmap');
      return this.createApiResponse(data);
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

// Chat Service - Single Responsibility: Handle AI chat functionality
export class ChatService extends BaseApiService {
  async sendMessage(message: string): Promise<ApiResponse<ChatResponse>> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.createApiResponse(data);
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

  private constructor() {
    this.regime = new RegimeService();
    this.shock = new ShockService();
    this.market = new MarketService();
    this.trade = new TradeService();
    this.widget = new WidgetService();
    this.chat = new ChatService();
    this.status = new StatusService();
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