import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/Loading';
import { cn, formatPercentage, getRiskColor, getConfidenceColor } from '@/utils';
import { RecommendedTrade } from '@/types';

interface RecommendationsProps {
  data: RecommendedTrade[] | null;
  isLoading: boolean;
  error?: string | null;
}

const Recommendations: React.FC<RecommendationsProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Recommended Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Recommended Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-[#F43F5E]">
            {error || 'No data available'}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2" hover>
      <CardHeader>
        <CardTitle>Current Recommended Trades</CardTitle>
        <p className="text-xs text-[#A1A1AA]">
          AI-generated position recommendations with Kelly sizing
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((trade, index) => (
            <motion.div
              key={trade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[#18181B] rounded-lg border border-[#27272A] hover:border-[#FFA500] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-[#FFFFFF] mb-1">
                    {trade.market_name}
                  </h4>
                  <div className="flex items-center space-x-3">
                    <span className={cn(
                      'text-xs font-medium uppercase px-2 py-1 rounded-full',
                      trade.position === 'YES' 
                        ? 'bg-[#10B981]/20 text-[#10B981]' 
                        : 'bg-[#F43F5E]/20 text-[#F43F5E]'
                    )}>
                      {trade.position}
                    </span>
                    <span className="text-xs text-[#A1A1AA]">{trade.time_horizon}</span>
                  </div>
                </div>
                
                {/* Signal Strength Indicator */}
                <div className="flex items-center space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-1 h-3 rounded-sm',
                        i < trade.signal_strength 
                          ? 'bg-[#FFA500]' 
                          : 'bg-[#27272A]'
                      )}
                    />
                  ))}
                  <span className="text-xs text-[#A1A1AA] ml-2">
                    {trade.signal_strength}/10
                  </span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-xs text-[#A1A1AA] mb-1">Kelly</div>
                  <div className="font-mono text-sm text-[#FFFFFF]">
                    {formatPercentage(trade.kelly_fraction)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#A1A1AA] mb-1">Conf. Band</div>
                  <div className="font-mono text-sm text-[#FFA500]">
                    {trade.confidence_band}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#A1A1AA] mb-1">Risk</div>
                  <div className={cn('font-mono text-sm uppercase', getRiskColor(trade.risk_level))}>
                    {trade.risk_level}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-[#A1A1AA] mb-1">EV</div>
                  <div className={cn(
                    'font-mono text-sm font-medium',
                    trade.expected_value > 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                  )}>
                    {formatPercentage(trade.expected_value)}
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="mb-3">
                <p className="text-xs text-[#A1A1AA] mb-1">Reasoning:</p>
                <p className="text-sm text-[#FFFFFF] leading-relaxed">
                  {trade.reasoning}
                </p>
              </div>

              {/* Risk Metrics */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-[#A1A1AA]">Max Loss:</span>
                    <span className="font-mono text-[#F43F5E]">
                      {formatPercentage(trade.max_loss)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#A1A1AA]">Confidence:</span>
                    <span className={cn('font-medium uppercase', getConfidenceColor(trade.confidence))}>
                      {trade.confidence}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-[#18181B] rounded-lg border border-[#27272A]">
          <p className="text-xs text-[#52525B] leading-relaxed">
            <strong>Disclaimer:</strong> Research results not financial advice. 
            These recommendations are generated by our AI model for research purposes only. 
            Always conduct your own analysis before making investment decisions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recommendations;