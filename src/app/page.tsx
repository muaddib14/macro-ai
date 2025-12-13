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
    <Layout showBackground={true} showHeader={false}>
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            {/* Brand Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary">
                  <span className="text-[#050505] font-extrabold text-3xl">M</span>
                  <div className="absolute inset-0 bg-gradient-primary rounded-full blur-lg opacity-70 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="heading-primary mb-6 animate-fade-in">
              MACRO AI
            </h1>
            
            <div className="mb-8">
              <p className="heading-secondary mb-4">
                QUANTITATIVE INTELLIGENCE
              </p>
              <p className="text-lg md:text-xl text-[#FF9500]/80 max-w-4xl mx-auto leading-relaxed">
                AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn-primary disabled:opacity-50"
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
                className="btn-secondary"
              >
                Explore Analytics
              </motion.button>
            </div>
          </motion.div>

          {/* Market Data Sections */}
          <div className="space-y-24">
            {/* Real Market Data */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="heading-secondary mb-3 text-glow">
                      Real Market Data
                    </h2>
                    <p className="text-lg text-[#FF9500]/70">
                      Live market data from Yahoo Finance, commodities, and financial news
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
                    <span className="text-sm text-[#FF9500]/60 font-medium">Live Data</span>
                  </div>
                </div>
              </div>
              
              <RealMarketTracker
                data={dashboardData.realMarket}
                isLoading={dashboardData.isLoading}
                error={dashboardData.error}
              />
            </motion.section>

            {/* AI Market Insights */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="heading-secondary mb-3 text-glow">
                      AI Market Insights
                    </h2>
                    <p className="text-lg text-[#FF9500]/70">
                      Machine learning analysis of market conditions and regime detection
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FFC850] rounded-full animate-pulse" />
                    <span className="text-sm text-[#FF9500]/60 font-medium">AI Analysis</span>
                  </div>
                </div>
              </div>
              
              <MarketInsights
                data={dashboardData.realMarket}
                isLoading={dashboardData.isLoading}
                error={dashboardData.error}
              />
            </motion.section>

            {/* AI Macro Analysis Dashboard */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="heading-secondary mb-3 text-glow">
                      AI Macro Analysis
                    </h2>
                    <p className="text-lg text-[#FF9500]/70">
                      AI-powered regime detection, narrative analysis, and prediction market insights
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#FF5500] rounded-full animate-pulse" />
                    <span className="text-sm text-[#FF9500]/60 font-medium">AI Models</span>
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
            </motion.section>
          </div>
        </div>
      </section>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="glass-effect rounded-lg p-4 shadow-glow-primary">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-[#FF9500]/80 font-medium">System Status</span>
            </div>
            <div className="text-[#FF9500]/40">•</div>
            <div className="text-[#FF9500]/60">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Loading Overlay */}
      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-primary rounded-full animate-ping opacity-30" />
              <div className="absolute inset-2 bg-gradient-primary rounded-full animate-pulse opacity-50" />
              <div className="absolute inset-4 bg-[#FFC850] rounded-full animate-spin border-2 border-[#050505]" />
            </div>
            <h3 className="text-[#FFC850] font-bold text-2xl mb-2">Processing Market Data</h3>
            <p className="text-[#FF9500]/70">Running AI analysis and regime detection...</p>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}