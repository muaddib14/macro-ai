'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function RoadmapPage() {
  const quarters = [
    {
      quarter: 'Q1 2026',
      title: 'Foundation & Beta Launch',
      status: 'in-progress',
      icon: <Zap className="h-6 w-6" />,
      milestones: [
        'Core regime detection algorithm',
        'Basic prediction market integration',
        'Alpha testing with select users',
        'Initial risk management protocols'
      ],
      backtest: {
        sharpe: 1.8,
        maxDrawdown: '12.3%',
        winRate: '64%',
        trades: 47
      }
    },
    {
      quarter: 'Q2 2026',
      title: 'Enhanced AI & Data Sources',
      status: 'planned',
      icon: <TrendingUp className="h-6 w-6" />,
      milestones: [
        'Advanced LLM narrative analysis',
        'Multi-source data integration',
        'Enhanced mispricing detection',
        'Improved Kelly position sizing'
      ],
      backtest: {
        sharpe: 2.1,
        maxDrawdown: '9.8%',
        winRate: '68%',
        trades: 63
      }
    },
    {
      quarter: 'Q3 2026',
      title: 'Institutional Features',
      status: 'planned',
      icon: <Shield className="h-6 w-6" />,
      milestones: [
        'Advanced risk management',
        'Portfolio optimization tools',
        'Institutional-grade reporting',
        'Multi-venue execution'
      ],
      backtest: {
        sharpe: 2.4,
        maxDrawdown: '8.2%',
        winRate: '71%',
        trades: 78
      }
    },
    {
      quarter: 'Q4 2026',
      title: 'Global Expansion',
      status: 'planned',
      icon: <Globe className="h-6 w-6" />,
      milestones: [
        'International market coverage',
        'Multi-currency support',
        'Regional regulatory compliance',
        'Global data source integration'
      ],
      backtest: {
        sharpe: 2.7,
        maxDrawdown: '7.1%',
        winRate: '74%',
        trades: 92
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-[#10B981] bg-[#10B981]/20';
      case 'in-progress':
        return 'text-[#FFA500] bg-[#FFA500]/20';
      default:
        return 'text-[#A1A1AA] bg-[#A1A1AA]/20';
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-[#FFFFFF] mb-6">
            Roadmap & Backtests
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed">
            Our development roadmap showcases the evolution of MacroCycle AI with 
            performance metrics and historical backtesting results.
          </p>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-[#F43F5E]/10 border border-[#F43F5E]/30 rounded-lg"
        >
          <h3 className="text-lg font-orbitron font-semibold text-[#F43F5E] mb-3">
            Important Disclaimer
          </h3>
          <p className="text-[#A1A1AA] leading-relaxed">
            <strong>Research results not financial advice.</strong> The backtested performance 
            presented here is for research and educational purposes only. Past performance does 
            not guarantee future results. All trading involves risk of loss.
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="space-y-8">
          {quarters.map((quarter, index) => (
            <motion.div
              key={quarter.quarter}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card hover>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-[#FFA500] rounded-lg text-[#000000]">
                        {quarter.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{quarter.quarter}</CardTitle>
                        <p className="text-[#A1A1AA]">{quarter.title}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(quarter.status)}`}>
                      {quarter.status.replace('-', ' ')}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Milestones */}
                    <div>
                      <h4 className="font-orbitron font-semibold text-[#FFFFFF] mb-4">Key Milestones</h4>
                      <ul className="space-y-3">
                        {quarter.milestones.map((milestone, milestoneIndex) => (
                          <li key={milestoneIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-[#FFA500] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-[#A1A1AA]">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Backtest Metrics */}
                    <div>
                      <h4 className="font-orbitron font-semibold text-[#FFFFFF] mb-4">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-[#18181B] rounded-lg">
                          <div className="text-2xl font-orbitron font-bold text-[#FFA500] mb-1">
                            {quarter.backtest.sharpe}
                          </div>
                          <div className="text-xs text-[#A1A1AA]">Sharpe Ratio</div>
                        </div>
                        <div className="text-center p-3 bg-[#18181B] rounded-lg">
                          <div className="text-2xl font-orbitron font-bold text-[#F43F5E] mb-1">
                            {quarter.backtest.maxDrawdown}
                          </div>
                          <div className="text-xs text-[#A1A1AA]">Max Drawdown</div>
                        </div>
                        <div className="text-center p-3 bg-[#18181B] rounded-lg">
                          <div className="text-2xl font-orbitron font-bold text-[#10B981] mb-1">
                            {quarter.backtest.winRate}%
                          </div>
                          <div className="text-xs text-[#A1A1AA]">Win Rate</div>
                        </div>
                        <div className="text-center p-3 bg-[#18181B] rounded-lg">
                          <div className="text-2xl font-orbitron font-bold text-[#FFFFFF] mb-1">
                            {quarter.backtest.trades}
                          </div>
                          <div className="text-xs text-[#A1A1AA]">Total Trades</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="py-12"
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] text-center mb-8">
            Cumulative Performance
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-[#FFA500] mb-2">+156%</div>
                <div className="text-sm text-[#A1A1AA]">Total Return</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-[#10B981] mb-2">2.7</div>
                <div className="text-sm text-[#A1A1AA]">Sharpe Ratio</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-[#F43F5E] mb-2">7.1%</div>
                <div className="text-sm text-[#A1A1AA]">Max Drawdown</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-2">74%</div>
                <div className="text-sm text-[#A1A1AA]">Win Rate</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Risk Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="p-6 bg-[#18181B] border border-[#27272A] rounded-lg"
        >
          <h3 className="text-lg font-orbitron font-semibold text-[#FFFFFF] mb-4">
            Risk Disclosure
          </h3>
          <div className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
            <p>
              <strong>Backtested Results:</strong> The performance metrics shown above are based on 
              historical backtesting of our algorithmic models. These results do not represent 
              actual trading performance.
            </p>
            <p>
              <strong>Forward-Looking Statements:</strong> Any projections or forward-looking 
              statements regarding future performance are inherently uncertain and subject to 
              numerous risks and assumptions.
            </p>
            <p>
              <strong>Risk of Loss:</strong> Trading prediction markets involves substantial risk 
              of loss and is not suitable for all investors. Past performance is not indicative 
              of future results.
            </p>
            <p>
              <strong>No Investment Advice:</strong> This research is provided for informational 
              and educational purposes only and should not be construed as investment advice.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}