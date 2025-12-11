import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/Loading';
import { cn } from '@/utils';
import { LiquidityMeter, VolatilityIndex, NewsItem } from '@/types';

interface LiquidityMeterProps {
  data: LiquidityMeter | null;
  isLoading: boolean;
  error?: string | null;
}

export const LiquidityMeterWidget: React.FC<LiquidityMeterProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Liquidity Meter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[#F43F5E]">
            {error || 'No data'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-[#10B981]" />;
      case 'decreasing':
        return <TrendingDown className="h-4 w-4 text-[#F43F5E]" />;
      default:
        return <Minus className="h-4 w-4 text-[#A1A1AA]" />;
    }
  };

  const getTrendColor = () => {
    switch (data.trend) {
      case 'increasing':
        return 'text-[#10B981]';
      case 'decreasing':
        return 'text-[#F43F5E]';
      default:
        return 'text-[#A1A1AA]';
    }
  };

  return (
    <Card hover>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Liquidity Meter
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Gauge */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="text-3xl font-orbitron font-bold text-[#FFA500] mb-1"
            >
              {data.current_level}
            </motion.div>
            <div className="text-xs text-[#A1A1AA] uppercase">Liquidity Index</div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-[#27272A] rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-[#10B981] to-[#FFA500] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${data.current_level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#A1A1AA]">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Components */}
          <div className="space-y-2">
            <div className="text-xs text-[#A1A1AA] mb-2">Components:</div>
            {Object.entries(data.components).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA] capitalize">
                  {key.replace('_', ' ')}
                </span>
                <span className="font-mono text-[#FFFFFF]">{value}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs text-[#52525B] leading-relaxed">
            {data.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface VolatilityIndexProps {
  data: VolatilityIndex | null;
  isLoading: boolean;
  error?: string | null;
}

export const VolatilityIndexWidget: React.FC<VolatilityIndexProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Volatility Index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Volatility Index</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[#F43F5E]">
            {error || 'No data'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'rising':
        return <TrendingUp className="h-4 w-4 text-[#F43F5E]" />;
      case 'falling':
        return <TrendingDown className="h-4 w-4 text-[#10B981]" />;
      default:
        return <Minus className="h-4 w-4 text-[#A1A1AA]" />;
    }
  };

  return (
    <Card hover>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Volatility Index
          {getTrendIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Value */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="text-3xl font-orbitron font-bold text-[#FFFFFF] mb-1"
            >
              {data.current_value}
            </motion.div>
            <div className="text-xs text-[#A1A1AA] uppercase">VIX-like Index</div>
          </div>

          {/* Percentile */}
          <div className="text-center">
            <div className="text-sm font-mono text-[#FFA500]">
              {data.percentile_1y}th percentile
            </div>
            <div className="text-xs text-[#A1A1AA]">vs 1-year history</div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#52525B] leading-relaxed text-center">
            {data.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface NewsTickerProps {
  data: NewsItem[] | null;
  isLoading: boolean;
  error?: string | null;
}

export const NewsTickerWidget: React.FC<NewsTickerProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News Ticker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <LoadingSpinner size="md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News Ticker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 text-[#F43F5E]">
            {error || 'No data'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'positive':
        return 'text-[#10B981]';
      case 'negative':
        return 'text-[#F43F5E]';
      default:
        return 'text-[#A1A1AA]';
    }
  };

  return (
    <Card hover>
      <CardHeader>
        <CardTitle>News Ticker</CardTitle>
        <p className="text-xs text-[#A1A1AA]">
          Latest market-moving headlines
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data.slice(0, 6).map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-[#18181B] rounded-lg border border-[#27272A] hover:border-[#FFA500] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm text-[#FFFFFF] leading-tight flex-1 pr-2">
                  {news.headline}
                </h4>
                <div className={cn('text-xs font-medium uppercase', getToneColor(news.tone))}>
                  {news.tone}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">{news.source}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[#52525B]">{news.category}</span>
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    news.impact_score >= 8 && 'bg-[#F43F5E]',
                    news.impact_score >= 5 && news.impact_score < 8 && 'bg-[#FFA500]',
                    news.impact_score < 5 && 'bg-[#10B981]'
                  )} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-[#52525B]">
            Real-time updates • {data.length} headlines
          </p>
        </div>
      </CardContent>
    </Card>
  );
};