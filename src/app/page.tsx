'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { InteractiveLavaBackground } from '@/components/ui/InteractiveLavaBackground';
import { RewardsMarquee } from '@/components/dashboard/RewardsMarquee';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import Header from '@/components/layout/Header';
import { api } from '@/services/api';
import { 
  RegimeData, 
  ShockDomain, 
  MispricedMarket, 
  RecommendedTrade,
  LiquidityMeter,
  VolatilityIndex,
  NewsItem
} from '@/types';

export default function Home() {
  // State for all dashboard data
  const [regimeData, setRegimeData] = useState<RegimeData | null>(null);
  const [shockData, setShockData] = useState<ShockDomain[]>([]);
  const [mispricedMarkets, setMispricedMarkets] = useState<MispricedMarket[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedTrade[]>([]);
  const [liquidity, setLiquidity] = useState<LiquidityMeter | null>(null);
  const [volatility, setVolatility] = useState<VolatilityIndex | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // Loading & Error States
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch all data in parallel
        const [
          regimeRes,
          shockRes,
          marketRes,
          tradeRes,
          liqRes,
          volRes,
          newsRes
        ] = await Promise.all([
          api.regime.getRegimeData(),
          api.shock.getShockData(),
          api.market.getMispricedMarkets(),
          api.trade.getRecommendations(),
          api.widget.getLiquidityData(),
          api.widget.getVolatilityData(),
          api.widget.getNewsTicker()
        ]);

        setRegimeData(regimeRes.data);
        setShockData(Array.isArray(shockRes.data) ? shockRes.data : []);
        setMispricedMarkets(marketRes.data);
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

    fetchDashboardData();
  }, []);

  return (
    <main className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* 1. Interactive Background Layer */}
      <InteractiveLavaBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-8 space-y-12">
          
          {/* 2. Hero Section */}
          <section className="text-center py-16 lg:py-24 max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#FFA500]/10 border border-[#FFA500]/30 text-[#FFA500] text-xs font-medium tracking-wider uppercase mb-4">
                MacroCycle AI v1.0
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                Predict the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#F43F5E] animate-pulse">Unseen.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center gap-4 pt-6"
            >
              <button className="px-8 py-3 bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)]">
                Start Trading
              </button>
              <button className="px-8 py-3 bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] text-white font-semibold rounded-lg transition-all">
                View Signals
              </button>
            </motion.div>
          </section>

          {/* 3. Avici-style Marquee Section */}
          <section className="py-8">
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-white/80">System Capabilities</h3>
            </div>
            <RewardsMarquee />
          </section>

          {/* 4. Main Dashboard Area */}
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
              
              // MARKETS (Fixed prop name)
              marketData={mispricedMarkets}
              marketLoading={isLoading}
              marketError={error}
              
              // RECOMMENDATIONS (Fixed prop name)
              recommendationData={recommendations}
              recommendationLoading={isLoading}
              recommendationError={error}
              
              // WIDGETS (Fixed prop mapping)
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