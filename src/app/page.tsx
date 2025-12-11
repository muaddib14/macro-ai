'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { useDashboardData } from '@/hooks';

export default function HomePage() {
  const dashboardData = useDashboardData();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-[#FFFFFF] mb-4">
            MacroCycle AI
          </h1>
          <p className="text-lg md:text-xl text-[#A1A1AA] mb-8 max-w-3xl mx-auto leading-relaxed">
            AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-[#FFA500] text-[#000000] rounded-full font-medium hover:bg-[#FF7A1A] transition-all duration-300 hover:shadow-glow hover:scale-105">
              Launch App
            </button>
            <button className="px-8 py-3 border border-[#3F3F46] text-[#FFFFFF] rounded-full font-medium hover:bg-[#27272A] hover:border-[#FFA500] transition-all duration-300">
              Explore How It Works
            </button>
          </div>
        </motion.div>

        {/* Live Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-[#FFFFFF] mb-2">
                  Live Dashboard
                </h2>
                <p className="text-[#A1A1AA]">
                  Real-time macro analysis and prediction market opportunities
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-xs text-[#A1A1AA]">Live Data</span>
              </div>
            </div>
          </div>
          
          <DashboardGrid
            regimeData={dashboardData.regime}
            regimeLoading={dashboardData.isLoading}
            regimeError={dashboardData.error}
            
            shockData={dashboardData.shock}
            shockLoading={dashboardData.isLoading}
            shockError={dashboardData.error}
            
            marketData={dashboardData.markets}
            marketLoading={dashboardData.isLoading}
            marketError={dashboardData.error}
            
            recommendationData={dashboardData.recommendations}
            recommendationLoading={dashboardData.isLoading}
            recommendationError={dashboardData.error}
            
            liquidityData={dashboardData.liquidity}
            liquidityLoading={dashboardData.isLoading}
            liquidityError={dashboardData.error}
            
            volatilityData={dashboardData.volatility}
            volatilityLoading={dashboardData.isLoading}
            volatilityError={dashboardData.error}
            
            newsData={dashboardData.news}
            newsLoading={dashboardData.isLoading}
            newsError={dashboardData.error}
          />
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-[#09090B] border border-[#27272A] rounded-lg p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                <span className="text-[#A1A1AA]">System Status</span>
              </div>
              <div className="text-[#A1A1AA]">•</div>
              <div className="text-[#A1A1AA]">
                Last update: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}