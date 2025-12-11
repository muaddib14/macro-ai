import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';
import { ApiResponse, LoadingState, RealMarketData } from '@/types';
import { createRealMarketData } from '@/data/realMarketData';

// Hook for real market data
export const useRealMarketData = (refreshInterval: number = 30000) => {
  const [data, setData] = useState<RealMarketData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
  });

  const fetchData = useCallback(async () => {
    try {
      // In a real implementation, this would fetch from actual APIs
      // For now, we'll use our enhanced mock data with real market structure
      const marketData = createRealMarketData();
      
      setData(marketData);
      setLoadingState({ isLoading: false });
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch market data',
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    // Set up real-time updates
    const intervalId = setInterval(fetchData, refreshInterval);
    
    return () => clearInterval(intervalId);
  }, [fetchData, refreshInterval]);

  return { data, loadingState, refetch: fetchData };
};

// Enhanced hook that combines mock and real data
export const useEnhancedDashboardData = () => {
  // Get all the original mock data
  const regime = useRegimeData();
  const shock = useShockData();
  const markets = useMispricedMarkets();
  const recommendations = useRecommendations();
  const liquidity = useLiquidityData();
  const volatility = useVolatilityData();
  const news = useNewsTicker();
  
  // Get real market data
  const realMarket = useRealMarketData();

  const isLoading = 
    regime.loadingState.isLoading ||
    shock.loadingState.isLoading ||
    markets.loadingState.isLoading ||
    recommendations.loadingState.isLoading ||
    liquidity.loadingState.isLoading ||
    volatility.loadingState.isLoading ||
    news.loadingState.isLoading ||
    realMarket.loadingState.isLoading;

  const hasError = 
    regime.loadingState.error ||
    shock.loadingState.error ||
    markets.loadingState.error ||
    recommendations.loadingState.error ||
    liquidity.loadingState.error ||
    volatility.loadingState.error ||
    news.loadingState.error ||
    realMarket.loadingState.error;

  return {
    // Original mock data
    regime: regime.data,
    shock: shock.data,
    markets: markets.data,
    recommendations: recommendations.data,
    liquidity: liquidity.data,
    volatility: volatility.data,
    news: news.data,
    
    // New real market data
    realMarket: realMarket.data,
    
    // Combined loading and error states
    isLoading,
    error: hasError,
  };
};

// Import the original hooks
import { 
  useRegimeData,
  useShockData, 
  useMispricedMarkets,
  useRecommendations,
  useLiquidityData,
  useVolatilityData,
  useNewsTicker
} from '@/hooks';