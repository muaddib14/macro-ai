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
  // State for all dashboard data
  const [regimeData, setRegimeData] = useState<RegimeData | null>(null);
  const [shockData, setShockData] = useState<ShockDomain[]>([]);
  // mispricedMarkets removed
  const [recommendations, setRecommendations] = useState<RecommendedTrade[]>([]);
  const [liquidity, setLiquidity] = useState<LiquidityMeter | null>(null);
  const [volatility, setVolatility] = useState<VolatilityIndex | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch dynamic data (Recommendations)
  const fetchLiveRecommendations = async () => {
    try {
      const tradeRes = await api.trade.getRecommendations();
      setRecommendations(tradeRes.data);
    } catch (err) {
      console.error("Failed to update recommendations:", err);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
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
        console.error("Dashboard data fetch failed:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    
    // Set up polling for "Alive" feel on recommendations
    const intervalId = setInterval(fetchLiveRecommendations, 3000); // Update every 3 seconds

    // Ensure page starts at top
    window.scrollTo(0, 0);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* Interactive Background Layer */}
      <InteractiveLavaBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-8">
          {/* Main Dashboard Area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="border-t border-[#27272A] pt-12"
          >
            <DashboardGrid 
              // REGIME
              regimeData={regimeData}
              regimeLoading={isLoading}
              regimeError={error}
              
              // SHOCK
              shockData={shockData}
              shockLoading={isLoading}
              shockError={error}
              
              // MARKETS (Removed/Empty)
              marketData={[]}
              marketLoading={false}
              marketError={null}
              
              // RECOMMENDATIONS
              recommendationData={recommendations}
              recommendationLoading={isLoading}
              recommendationError={error}
              
              // WIDGETS
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