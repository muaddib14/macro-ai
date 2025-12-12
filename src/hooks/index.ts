import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
import { ApiResponse, LoadingState, RegimeData } from '@/types';

// Generic hook for data fetching with loading and error states
function useApi<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    setLoadingState({ isLoading: true });
    try {
      const response = await fetcher();
      setData(response.data);
      setLoadingState({ isLoading: false });
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loadingState, refetch: fetchData };
}

// Specific hooks for different data types
export const useRegimeData = () => {
  const fetcher = useCallback(() => api.regime.getRegimeData(), []);
  return useApi(fetcher, []);
};

export const useRegimeTimeseries = (horizon: string = '90d') => {
  const fetcher = useCallback(() => api.regime.getRegimeTimeseries(horizon), [horizon]);
  return useApi(fetcher, [horizon]);
};

export const useShockData = () => {
  const fetcher = useCallback(() => api.shock.getShockHeatmap(), []);
  return useApi(fetcher, []);
};

export const useShockHeatmap = () => {
  const fetcher = useCallback(() => api.shock.getShockHeatmap(), []);
  return useApi(fetcher, []);
};

export const useMispricedMarkets = () => {
  const fetcher = useCallback(() => api.market.getMispricedMarkets(), []);
  return useApi(fetcher, []);
};

export const useMarketDetails = (marketId: string) => {
  const fetcher = useCallback(() => api.market.getMarketDetails(marketId), [marketId]);
  return useApi(fetcher, [marketId]);
};

export const useRecommendations = () => {
  const fetcher = useCallback(() => api.trade.getRecommendations(), []);
  return useApi(fetcher, []);
};

export const useRecommendation = (id: string) => {
  const fetcher = useCallback(() => api.trade.getRecommendation(id), [id]);
  return useApi(fetcher, [id]);
};

export const useLiquidityData = () => {
  const fetcher = useCallback(() => api.widget.getLiquidityData(), []);
  return useApi(fetcher, []);
};

export const useVolatilityData = () => {
  const fetcher = useCallback(() => api.widget.getVolatilityData(), []);
  return useApi(fetcher, []);
};

export const useNewsTicker = () => {
  const fetcher = useCallback(() => api.widget.getNewsTicker(), []);
  return useApi(fetcher, []);
};

export const useSystemStatus = () => {
  const fetcher = useCallback(() => api.status.getSystemStatus(), []);
  return useApi(fetcher, []);
};

// Chat hook with message handling
export const useChat = () => {
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.chat.sendMessage(message);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response.data.answer,
        sender: 'ai' as const,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};

// Real-time data hook with polling
export const useRealTimeData = <T>(
  fetcher: () => Promise<ApiResponse<T>>,
  interval: number = 30000, // 30 seconds default
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetcher();
      setData(response.data);
      setLoadingState({ isLoading: false });
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
    
    const intervalId = setInterval(fetchData, interval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, interval]);

  return { data, loadingState, refetch: fetchData };
};

// Dashboard data hook that combines multiple data sources
export const useDashboardData = () => {
  const regime = useRegimeData();
  const shock = useShockData();
  const markets = useMispricedMarkets();
  const recommendations = useRecommendations();
  const liquidity = useLiquidityData();
  const volatility = useVolatilityData();
  const news = useNewsTicker();

  const isLoading = 
    regime.loadingState.isLoading ||
    shock.loadingState.isLoading ||
    markets.loadingState.isLoading ||
    recommendations.loadingState.isLoading ||
    liquidity.loadingState.isLoading ||
    volatility.loadingState.isLoading ||
    news.loadingState.isLoading;

  const hasError = 
    regime.loadingState.error ||
    shock.loadingState.error ||
    markets.loadingState.error ||
    recommendations.loadingState.error ||
    liquidity.loadingState.error ||
    volatility.loadingState.error ||
    news.loadingState.error;

  return {
    regime: regime.data,
    shock: shock.data,
    markets: markets.data,
    recommendations: recommendations.data,
    liquidity: liquidity.data,
    volatility: volatility.data,
    news: news.data,
    isLoading,
    error: hasError,
  };
};