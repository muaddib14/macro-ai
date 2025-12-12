'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import RealMarketTracker from '@/components/dashboard/RealMarketTracker';
import MarketInsights from '@/components/dashboard/MarketInsights';
import { useEnhancedDashboardData } from '@/hooks/useRealMarketData';

export default function HomePage() {
  const dashboardData = useEnhancedDashboardData();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#050505] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Ambient Glow Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC850]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF5500]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CC4400]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 space-y-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-6"
          >
            {/* Glowing Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full flex items-center justify-center relative">
                  <span className="text-[#050505] font-extrabold text-3xl">M</span>
                  {/* Multi-layer Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full blur-lg opacity-70 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full blur-xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-wider mb-6 neon-text-glow">
              MACRO AI
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#FF9500]/80 font-medium mb-2">
              QUANTITATIVE INTELLIGENCE
            </p>
            
            <p className="text-lg md:text-xl text-[#FF9500]/60 mb-12 max-w-4xl mx-auto leading-relaxed">
              AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-10 py-4 bg-gradient-to-r from-[#FFC850] to-[#FF5500] text-[#050505] rounded-lg font-bold text-lg shadow-2xl shadow-[#FFC850]/30 hover:shadow-[#FFC850]/50 transition-all duration-300 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  'Analyze Markets'
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-[#FF5500]/50 text-[#FF9500] rounded-lg font-bold text-lg hover:bg-[#FF5500]/10 hover:border-[#FFC850] hover:text-[#FFC850] transition-all duration-300"
              >
                Explore Analytics
              </motion.button>
            </div>
          </motion.div>

          {/* Real Market Data */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-6"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#FFC850] mb-3 neon-text-glow">
                    Real Market Data
                  </h2>
                  <p className="text-[#FF9500]/70 text-lg">
                    Live market data from Yahoo Finance, commodities, and financial news
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
                  <span className="text-[#FF9500]/60 font-medium">Live Data</span>
                </div>
              </div>
            </div>
            
            <RealMarketTracker
              data={dashboardData.realMarket}
              isLoading={dashboardData.isLoading}
              error={dashboardData.error}
            />
          </motion.div>

          {/* AI Market Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#FFC850] mb-3 neon-text-glow">
                    AI Market Insights
                  </h2>
                  <p className="text-[#FF9500]/70 text-lg">
                    Machine learning analysis of market conditions and regime detection
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FFC850] rounded-full animate-pulse"></div>
                  <span className="text-[#FF9500]/60 font-medium">AI Analysis</span>
                </div>
              </div>
            </div>
            
            <MarketInsights
              data={dashboardData.realMarket}
              isLoading={dashboardData.isLoading}
              error={dashboardData.error}
            />
          </motion.div>

          {/* AI Analysis Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="px-6"
          >
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#FFC850] mb-3 neon-text-glow">
                    AI Macro Analysis
                  </h2>
                  <p className="text-[#FF9500]/70 text-lg">
                    AI-powered regime detection, narrative analysis, and prediction market insights
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-[#FF5500] rounded-full animate-pulse"></div>
                  <span className="text-[#FF9500]/60 font-medium">AI Models</span>
                </div>
              </div>
            </div>
            
            <DashboardGrid
              regimeData={dashboardData.regime}
              regimeLoading={dashboardData.isLoading}
              regimeError={dashboardData.error || null}
              
              shockData={dashboardData.shock}
              shockLoading={dashboardData.isLoading}
              shockError={dashboardData.error || null}
              
              marketData={dashboardData.markets}
              marketLoading={dashboardData.isLoading}
              marketError={dashboardData.error || null}
              
              recommendationData={dashboardData.recommendations}
              recommendationLoading={dashboardData.isLoading}
              recommendationError={dashboardData.error || null}
              
              liquidityData={dashboardData.liquidity}
              liquidityLoading={dashboardData.isLoading}
              liquidityError={dashboardData.error || null}
              
              volatilityData={dashboardData.volatility}
              volatilityLoading={dashboardData.isLoading}
              volatilityError={dashboardData.error || null}
              
              newsData={dashboardData.news}
              newsLoading={dashboardData.isLoading}
              newsError={dashboardData.error || null}
            />
          </motion.div>

          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="bg-[#050505]/90 border border-[#FF5500]/30 rounded-lg p-4 backdrop-blur-sm shadow-2xl">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                  <span className="text-[#FF9500]/80 font-medium">System Status</span>
                </div>
                <div className="text-[#FF9500]/40">•</div>
                <div className="text-[#FF9500]/60">
                  Last update: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Analysis Loading Overlay */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFC850] to-[#FF5500] rounded-full animate-ping opacity-30" />
                <div className="absolute inset-2 bg-gradient-to-r from-[#FFC850] to-[#FF5500] rounded-full animate-pulse opacity-50" />
                <div className="absolute inset-4 bg-[#FFC850] rounded-full animate-spin border-2 border-[#050505]" />
              </div>
              <h3 className="text-[#FFC850] font-bold text-2xl mb-2">Processing Market Data</h3>
              <p className="text-[#FF9500]/70">Running AI analysis and regime detection...</p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}