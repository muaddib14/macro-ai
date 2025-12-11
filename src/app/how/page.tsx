'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, Layers, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function HowPage() {
  const pillars = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Global Cycle Engine',
      description: 'Advanced cycle analysis using macroeconomic indicators, monetary policy patterns, and liquidity regimes to identify current market positioning.',
      features: ['Multi-factor regime classification', 'Real-time cycle transitions', 'Probability-weighted scenarios']
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Narrative Shock Detector',
      description: 'LLM-powered narrative analysis that processes central bank communications, news sentiment, and geopolitical developments.',
      features: ['Real-time sentiment analysis', 'Cross-source narrative aggregation', 'Shock intensity scoring']
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Prediction Market Optimizer',
      description: 'Sophisticated mispricing detection and Kelly criterion position sizing for optimal risk-adjusted returns.',
      features: ['Automated edge detection', 'Dynamic position sizing', 'Risk management protocols']
    }
  ];

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
            How It Works
          </h1>
          <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto leading-relaxed">
            Our three-pillar architecture combines global macro analysis, narrative intelligence, 
            and prediction market optimization to deliver institutional-grade insights.
          </p>
        </motion.div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card hover glow className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-[#FFA500] rounded-lg text-[#000000]">
                      {pillar.icon}
                    </div>
                    <CardTitle>{pillar.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#A1A1AA] mb-6 leading-relaxed">
                    {pillar.description}
                  </p>
                  <ul className="space-y-2">
                    {pillar.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#FFA500] rounded-full" />
                        <span className="text-[#FFFFFF]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="py-12"
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] text-center mb-8">
            System Architecture
          </h2>
          <Card className="p-8">
            <div className="space-y-8">
              {/* Data Input Layer */}
              <div className="text-center">
                <h3 className="text-lg font-orbitron font-semibold text-[#FFA500] mb-4">
                  Data Input Layer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Macro Data Feeds</h4>
                    <p className="text-sm text-[#A1A1AA]">FRED, OECD, Central Bank APIs</p>
                  </div>
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">News & Speeches</h4>
                    <p className="text-sm text-[#A1A1AA]">Real-time feeds, transcripts</p>
                  </div>
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Market Prices</h4>
                    <p className="text-sm text-[#A1A1AA]">Prediction markets, derivatives</p>
                  </div>
                </div>
              </div>

              {/* Processing Arrows */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-[#FFA500]" />
              </div>

              {/* Processing Layer */}
              <div className="text-center">
                <h3 className="text-lg font-orbitron font-semibold text-[#FFA500] mb-4">
                  Processing Layer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-[#18181B] rounded-lg">
                      <h4 className="font-medium text-[#FFFFFF] mb-2">Cycle Classifier</h4>
                      <p className="text-sm text-[#A1A1AA]">Regime probabilities</p>
                    </div>
                    <div className="p-4 bg-[#18181B] rounded-lg">
                      <h4 className="font-medium text-[#FFFFFF] mb-2">LLM Tone Shifter</h4>
                      <p className="text-sm text-[#A1A1AA]">Narrative embeddings</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#18181B] rounded-lg">
                      <h4 className="font-medium text-[#FFFFFF] mb-2">Mispricing Engine</h4>
                      <p className="text-sm text-[#A1A1AA]">Edge detection</p>
                    </div>
                    <div className="p-4 bg-[#18181B] rounded-lg">
                      <h4 className="font-medium text-[#FFFFFF] mb-2">Kelly Sizer</h4>
                      <p className="text-sm text-[#A1A1AA]">Position optimization</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Output Arrows */}
              <div className="flex justify-center">
                <ArrowRight className="h-8 w-8 text-[#FFA500]" />
              </div>

              {/* Output Layer */}
              <div className="text-center">
                <h3 className="text-lg font-orbitron font-semibold text-[#FFA500] mb-4">
                  Output Layer
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Regime Signals</h4>
                    <p className="text-sm text-[#A1A1AA]">Market positioning</p>
                  </div>
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Shock Alerts</h4>
                    <p className="text-sm text-[#A1A1AA]">Risk monitoring</p>
                  </div>
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Trade Signals</h4>
                    <p className="text-sm text-[#A1A1AA]">Opportunity detection</p>
                  </div>
                  <div className="p-4 bg-[#18181B] rounded-lg">
                    <h4 className="font-medium text-[#FFFFFF] mb-2">Position Sizes</h4>
                    <p className="text-sm text-[#A1A1AA]">Risk management</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* API Endpoints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-orbitron font-bold text-[#FFFFFF] text-center mb-8">
            Sample API Endpoints
          </h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { method: 'GET', endpoint: '/api/regime', description: 'Current regime probabilities' },
                  { method: 'GET', endpoint: '/api/shock', description: 'Narrative shock analysis' },
                  { method: 'GET', endpoint: '/api/mispriced', description: 'Top mispriced markets' },
                  { method: 'GET', endpoint: '/api/recommendations', description: 'Current trade recommendations' },
                  { method: 'POST', endpoint: '/api/chat', description: 'AI chat interface' }
                ].map((api, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-[#18181B] rounded-lg">
                    <span className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                      api.method === 'GET' ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-[#FFA500]/20 text-[#FFA500]'
                    }`}>
                      {api.method}
                    </span>
                    <code className="flex-1 text-sm font-mono text-[#FFFFFF]">{api.endpoint}</code>
                    <span className="text-sm text-[#A1A1AA]">{api.description}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center py-12"
        >
          <h2 className="text-2xl font-orbitron font-bold text-[#FFFFFF] mb-4">
            Ready to explore the data?
          </h2>
          <p className="text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
            Experience our AI-powered macro analysis in action with real-time data and 
            prediction market opportunities.
          </p>
          <Button size="lg" className="px-8">
            Launch Dashboard
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
}