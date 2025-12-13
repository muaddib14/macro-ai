'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveLavaBackground } from '@/components/ui/InteractiveLavaBackground';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import Header from '@/components/layout/Header';
import { api } from '@/services/api';
import { 
  RegimeData, 
  ShockDomain, 
  RecommendedTrade,
  LiquidityMeter,
  VolatilityIndex,
  NewsItem
} from '@/types';

export default function StartTrading() {
  const [regimeData, setRegimeData] = useState<RegimeData | null>(null);
  const [shockData, setShockData] = useState<ShockDomain[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedTrade[]>([]);
  const [liquidity, setLiquidity] = useState<LiquidityMeter | null>(null);
  const [volatility, setVolatility] = useState<VolatilityIndex | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dedicated function for high-frequency updates
  const updateLivePositions = async () => {
    try {
      // Only fetch the changing trading data to save bandwidth
      const tradeRes = await api.trade.getRecommendations();
      setRecommendations(tradeRes.data);
    } catch (err) {
      console.warn("Live update skipped:", err);
    }
  };

  useEffect(() => {
    const initDashboard = async () => {
      try {
        setIsLoading(true);
        const [
          regimeRes,
          shockRes,
          tradeRes,
          liqRes,
          volRes,
          newsRes
        ] = await Promise.all([
          api.regime.getRegimeData(),
          api.shock.getShockData(),
          api.trade.getRecommendations(),
          api.widget.getLiquidityData(),
          api.widget.getVolatilityData(),
          api.widget.getNewsTicker()
        ]);

        setRegimeData(regimeRes.data);
        setShockData(Array.isArray(shockRes.data) ? shockRes.data : []);
        setRecommendations(tradeRes.data);
        setLiquidity(liqRes.data);
        setVolatility(volRes.data);
        setNews(newsRes.data);
      } catch (err) {
        console.error("Dashboard init failed:", err);
        setError("Failed to initialize dashboard. Connecting to backup feeds...");
        // Fallback or retry logic could go here
      } finally {
        setIsLoading(false);
      }
    };

    initDashboard();

    // Fast polling (2s) for Recommendations to simulate an active trading desk
    const tradeInterval = setInterval(updateLivePositions, 2000);

    return () => {
      clearInterval(tradeInterval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      <InteractiveLavaBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="border-t border-[#27272A] pt-12"
          >
            <DashboardGrid 
              regimeData={regimeData}
              regimeLoading={isLoading}
              regimeError={error}
              
              shockData={shockData}
              shockLoading={isLoading}
              shockError={error}
              
              // We pass empty/null for removed sections
              marketData={[]}
              marketLoading={false}
              marketError={null}
              
              recommendationData={recommendations}
              recommendationLoading={isLoading}
              recommendationError={error}
              
              liquidityData={liquidity}
              liquidityLoading={isLoading}
              liquidityError={error}
              
              volatilityData={volatility}
              volatilityLoading={isLoading}
              volatilityError={error}
              
              newsData={news}
              newsLoading={isLoading}
              newsError={error}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}