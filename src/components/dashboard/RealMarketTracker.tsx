import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity, DollarSign, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/utils';
import { RealMarketData, getMarketSentiment, getMacroRegime } from '@/data/realMarketData';

interface RealMarketTrackerProps {
  data: RealMarketData | null;
  isLoading: boolean;
  error?: string | null;
}

const RealMarketTracker: React.FC<RealMarketTrackerProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[#FFA500]" />
            <span>Real Market Data</span>
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
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[#FFA500]" />
            <span>Real Market Data</span>
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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-[#10B981]';
      case 'bearish': return 'text-[#F43F5E]';
      default: return 'text-[#FFA500]';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-4 w-4" />;
      case 'bearish': return <TrendingDown className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const color = isPositive ? 'text-[#10B981]' : 'text-[#F43F5E]';
    const sign = isPositive ? '+' : '';
    
    return (
      <span className={color}>
        {sign}{change.toFixed(2)} ({sign}{changePercent.toFixed(2)}%)
      </span>
    );
  };

  return (
    <Card className="col-span-3" glow>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-[#FFA500]" />
            <span>Real Market Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#A1A1AA]">Live</span>
          </div>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <span className="text-[#A1A1AA]">Sentiment:</span>
            <span className={cn('flex items-center space-x-1 font-medium', getSentimentColor(marketSentiment))}>
              {getSentimentIcon(marketSentiment)}
              <span className="capitalize">{marketSentiment}</span>
            </span>
          </div>
          <div className="text-[#A1A1AA]">•</div>
          <div className="text-[#A1A1AA]">Regime:</div>
          <span className="text-[#FFA500] font-medium">{macroRegime}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Market Indices */}
          <div className="space-y-4">
            <h3 className="text-sm font-orbitron font-semibold text-[#FFFFFF] uppercase tracking-wide flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-[#FFA500]" />
              Market Indices
            </h3>
            
            <div className="space-y-3">
              {/* S&P 500 */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">S&P 500</span>
                  <span className="text-xs text-[#A1A1AA]">^GSPC</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  {data.sp500.price.toLocaleString()}
                </div>
                <div className="text-sm">
                  {formatChange(data.sp500.change, data.sp500.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">
                  Vol: {(data.sp500.volume / 1000000000).toFixed(1)}B
                </div>
              </div>

              {/* VIX */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">VIX</span>
                  <span className="text-xs text-[#A1A1AA]">^VIX</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  {data.vix.price.toFixed(2)}
                </div>
                <div className="text-sm">
                  {formatChange(data.vix.change, data.vix.changePercent)}
                </div>
                <div className={cn(
                  'text-xs mt-1 uppercase font-medium',
                  data.vix.level === 'low' && 'text-[#10B981]',
                  data.vix.level === 'medium' && 'text-[#FFA500]',
                  data.vix.level === 'high' && 'text-[#F43F5E]'
                )}>
                  {data.vix.level} volatility
                </div>
              </div>

              {/* Treasury Yield */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">10Y Treasury</span>
                  <span className="text-xs text-[#A1A1AA]">^TNX</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  {data.treasuryYield.price.toFixed(3)}%
                </div>
                <div className="text-sm">
                  {formatChange(data.treasuryYield.change, data.treasuryYield.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">
                  {data.treasuryYield.interpretation}
                </div>
              </div>
            </div>
          </div>

          {/* Individual Stocks */}
          <div className="space-y-4">
            <h3 className="text-sm font-orbitron font-semibold text-[#FFFFFF] uppercase tracking-wide flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-[#FFA500]" />
              Key Stocks
            </h3>
            
            <div className="space-y-3">
              {/* Apple */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">Apple</span>
                  <span className="text-xs text-[#A1A1AA]">AAPL</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  ${data.aapl.price.toFixed(2)}
                </div>
                <div className="text-sm">
                  {formatChange(data.aapl.change, data.aapl.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">
                  Vol: {(data.aapl.volume / 1000000).toFixed(1)}M
                </div>
              </div>

              {/* Google */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">Google</span>
                  <span className="text-xs text-[#A1A1AA]">GOOGL</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  ${data.googl.price.toFixed(2)}
                </div>
                <div className="text-sm">
                  {formatChange(data.googl.change, data.googl.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">
                  Vol: {(data.googl.volume / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>

          {/* Commodities */}
          <div className="space-y-4">
            <h3 className="text-sm font-orbitron font-semibold text-[#FFFFFF] uppercase tracking-wide flex items-center">
              <Activity className="h-4 w-4 mr-2 text-[#FFA500]" />
              Commodities
            </h3>
            
            <div className="space-y-3">
              {/* Oil */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">Oil (WTI)</span>
                  <span className="text-xs text-[#A1A1AA]">OIL</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  ${data.oil.price}
                </div>
                <div className="text-sm">
                  {formatChange(data.oil.change, data.oil.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">{data.oil.unit}</div>
              </div>

              {/* Wheat */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">Wheat</span>
                  <span className="text-xs text-[#A1A1AA]">WHEAT</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  ${data.wheat.price}
                </div>
                <div className="text-sm">
                  {formatChange(data.wheat.change, data.wheat.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">{data.wheat.unit}</div>
              </div>

              {/* Corn */}
              <div className="p-3 bg-[#18181B] rounded-lg border border-[#27272A]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[#FFFFFF]">Corn</span>
                  <span className="text-xs text-[#A1A1AA]">CORN</span>
                </div>
                <div className="text-lg font-orbitron font-bold text-[#FFFFFF] mb-1">
                  ${data.corn.price}
                </div>
                <div className="text-sm">
                  {formatChange(data.corn.change, data.corn.changePercent)}
                </div>
                <div className="text-xs text-[#52525B] mt-1">{data.corn.unit}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Market News */}
        <div className="mt-6 pt-6 border-t border-[#27272A]">
          <h3 className="text-sm font-orbitron font-semibold text-[#FFFFFF] uppercase tracking-wide mb-4">
            Market News
          </h3>
          <div className="space-y-3">
            {data.marketNews.slice(0, 3).map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-[#18181B] rounded-lg border border-[#27272A] hover:border-[#FFA500] transition-all duration-300"
              >
                <h4 className="text-sm text-[#FFFFFF] mb-2 leading-tight">
                  {news.title}
                </h4>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A1A1AA]">{news.publisher}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#52525B]">
                      {new Date(news.publish_date).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1">
                      {news.tickers.slice(0, 2).map((ticker, tickerIndex) => (
                        <span
                          key={tickerIndex}
                          className="px-1.5 py-0.5 bg-[#FFA500]/20 text-[#FFA500] rounded text-xs"
                        >
                          {ticker.replace('^', '')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 text-center text-xs text-[#52525B]">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealMarketTracker;