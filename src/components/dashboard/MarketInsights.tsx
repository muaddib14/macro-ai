import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/utils';
import { RealMarketData, getMarketSentiment, getMacroRegime } from '@/data/realMarketData';

interface MarketInsightsProps {
  data: RealMarketData;
  isLoading: boolean;
  error?: string | null;
}

const MarketInsights: React.FC<MarketInsightsProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-[#FFA500]" />
            <span>Market Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFA500]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-[#FFA500]" />
            <span>Market Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[#F43F5E]">
            {error || 'No data available'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const marketSentiment = getMarketSentiment(data);
  const macroRegime = getMacroRegime(data);
  
  // Generate AI insights based on real data
  const generateInsights = () => {
    const insights = [];
    
    // VIX Analysis
    if (data.vix.level === 'low') {
      insights.push({
        type: 'bullish',
        icon: <TrendingUp className="h-4 w-4" />,
        title: 'Low Volatility Environment',
        description: `VIX at ${data.vix.price.toFixed(2)} indicates investor complacency and potential upward market momentum.`,
        confidence: 'high'
      });
    } else if (data.vix.level === 'high') {
      insights.push({
        type: 'bearish',
        icon: <AlertTriangle className="h-4 w-4" />,
        title: 'Elevated Volatility Alert',
        description: `VIX at ${data.vix.price.toFixed(2)} suggests heightened market uncertainty and potential downside risk.`,
        confidence: 'high'
      });
    }
    
    // Market Performance Analysis
    if (data.sp500.changePercent > 1) {
      insights.push({
        type: 'bullish',
        icon: <Target className="h-4 w-4" />,
        title: 'Strong Market Performance',
        description: `S&P 500 up ${data.sp500.changePercent.toFixed(2)}% indicates positive risk appetite and bullish sentiment.`,
        confidence: 'medium'
      });
    } else if (data.sp500.changePercent < -1) {
      insights.push({
        type: 'bearish',
        icon: <AlertTriangle className="h-4 w-4" />,
        title: 'Market Weakness Detected',
        description: `S&P 500 down ${Math.abs(data.sp500.changePercent).toFixed(2)}% suggests risk-off sentiment and potential correction.`,
        confidence: 'medium'
      });
    }
    
    // Commodity Analysis
    if (data.oil.changePercent < -2) {
      insights.push({
        type: 'bullish',
        icon: <TrendingUp className="h-4 w-4" />,
        title: 'Oil Price Weakness',
        description: `Oil down ${Math.abs(data.oil.changePercent).toFixed(2)}% reduces inflation pressure and supports risk assets.`,
        confidence: 'medium'
      });
    } else if (data.oil.changePercent > 2) {
      insights.push({
        type: 'bearish',
        icon: <AlertTriangle className="h-4 w-4" />,
        title: 'Oil Price Strength',
        description: `Oil up ${data.oil.changePercent.toFixed(2)}% increases inflation concerns and may pressure central bank policy.`,
        confidence: 'medium'
      });
    }
    
    // Treasury Yield Analysis
    if (data.treasuryYield.changePercent < -0.5) {
      insights.push({
        type: 'bullish',
        icon: <Target className="h-4 w-4" />,
        title: 'Declining Yields Support Risk Assets',
        description: `10Y Treasury down ${Math.abs(data.treasuryYield.changePercent).toFixed(2)}% signals easing monetary conditions.`,
        confidence: 'high'
      });
    } else if (data.treasuryYield.changePercent > 0.5) {
      insights.push({
        type: 'bearish',
        icon: <AlertTriangle className="h-4 w-4" />,
        title: 'Rising Yields Increase Competition',
        description: `10Y Treasury up ${data.treasuryYield.changePercent.toFixed(2)}% raises opportunity cost of equities.`,
        confidence: 'high'
      });
    }
    
    return insights.slice(0, 3); // Return top 3 insights
  };

  const insights = generateInsights();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'bullish': return 'text-[#10B981] border-[#10B981]/20 bg-[#10B981]/5';
      case 'bearish': return 'text-[#F43F5E] border-[#F43F5E]/20 bg-[#F43F5E]/5';
      default: return 'text-[#FFA500] border-[#FFA500]/20 bg-[#FFA500]/5';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-[#10B981]';
      case 'medium': return 'text-[#FFA500]';
      default: return 'text-[#F43F5E]';
    }
  };

  return (
    <Card className="col-span-2" glow>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-[#FFA500]" />
          <span>AI Market Insights</span>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-[#A1A1AA]">Sentiment:</span>
            <span className={cn(
              'font-medium capitalize',
              marketSentiment === 'bullish' && 'text-[#10B981]',
              marketSentiment === 'bearish' && 'text-[#F43F5E]',
              marketSentiment === 'neutral' && 'text-[#FFA500]'
            )}>
              {marketSentiment}
            </span>
          </div>
          <div className="text-[#A1A1AA]">•</div>
          <div className="text-[#A1A1AA]">Regime:</div>
          <span className="text-[#FFA500] font-medium">{macroRegime}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'p-4 rounded-lg border transition-all duration-300',
                getInsightColor(insight.type)
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[#FFFFFF]">
                      {insight.title}
                    </h4>
                    <span className={cn(
                      'text-xs font-medium uppercase',
                      getConfidenceColor(insight.confidence)
                    )}>
                      {insight.confidence} confidence
                    </span>
                  </div>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {insights.length === 0 && (
            <div className="text-center py-8">
              <Brain className="h-12 w-12 text-[#27272A] mx-auto mb-4" />
              <p className="text-[#A1A1AA]">
                Analyzing market conditions for AI-generated insights...
              </p>
            </div>
          )}
        </div>

        {/* Market Regime Indicators */}
        <div className="mt-6 pt-6 border-t border-[#27272A]">
          <h3 className="text-sm font-orbitron font-semibold text-[#FFFFFF] uppercase tracking-wide mb-4">
            Regime Indicators
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-[#FFA500] mb-1">
                {data.vix.price < 20 ? 'Low' : data.vix.price > 25 ? 'High' : 'Medium'}
              </div>
              <div className="text-xs text-[#A1A1AA]">Volatility Regime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-orbitron font-bold text-[#10B981] mb-1">
                {data.treasuryYield.changePercent < 0 ? 'Easing' : 'Tightening'}
              </div>
              <div className="text-xs text-[#A1A1AA]">Monetary Stance</div>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mt-4 p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#A1A1AA]">Overall Risk Level:</span>
            <span className={cn(
              'text-sm font-medium',
              data.vix.level === 'low' && 'text-[#10B981]',
              data.vix.level === 'medium' && 'text-[#FFA500]',
              data.vix.level === 'high' && 'text-[#F43F5E]'
            )}>
              {data.vix.level === 'low' ? 'Low Risk' : 
               data.vix.level === 'medium' ? 'Moderate Risk' : 'High Risk'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;