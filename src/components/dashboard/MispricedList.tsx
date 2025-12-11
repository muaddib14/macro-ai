import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/Loading';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Modal';
import { cn, formatPercentage, getConfidenceColor } from '@/utils';
import { MispricedMarket } from '@/types';

interface MispricedListProps {
  data: MispricedMarket[] | null;
  isLoading: boolean;
  error?: string | null;
}

const MispricedList: React.FC<MispricedListProps> = ({ data, isLoading, error }) => {
  const [selectedMarket, setSelectedMarket] = useState<MispricedMarket | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Top Mispriced Markets</CardTitle>
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
          <CardTitle>Top Mispriced Markets</CardTitle>
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
    <>
      <Card className="col-span-2" hover>
        <CardHeader>
          <CardTitle>Top Mispriced Markets</CardTitle>
          <p className="text-xs text-[#A1A1AA]">
            Markets with highest edge opportunities
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.map((market, index) => (
              <motion.div
                key={market.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-[#18181B] rounded-lg border border-[#27272A] hover:border-[#FFA500] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-[#FFFFFF] mb-1 leading-tight">
                      {market.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-xs text-[#A1A1AA]">
                      <span>{market.category}</span>
                      <span>•</span>
                      <span>{market.horizon}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedMarket(market)}
                    className="ml-2"
                  >
                    Detail
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xs text-[#A1A1AA] mb-1">Market</div>
                    <div className="font-mono text-sm text-[#FFFFFF]">
                      {formatPercentage(market.market_price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#A1A1AA] mb-1">Model</div>
                    <div className="font-mono text-sm text-[#FFA500]">
                      {formatPercentage(market.model_price)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#A1A1AA] mb-1">Edge</div>
                    <div className={cn(
                      'font-mono text-sm font-medium',
                      market.edge > 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                    )}>
                      {formatPercentage(market.edge)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-[#A1A1AA] mb-1">Kelly</div>
                    <div className="font-mono text-sm text-[#FFFFFF]">
                      {formatPercentage(market.kelly_stake)}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-[#A1A1AA]">Confidence:</span>
                      <span className={cn('text-xs font-medium uppercase', getConfidenceColor(market.confidence))}>
                        {market.confidence}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-[#52525B]">
                    Vol: ${(market.volume_24h / 1000000).toFixed(1)}M
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Detail Modal */}
      <Dialog 
        open={!!selectedMarket} 
        onOpenChange={(open) => !open && setSelectedMarket(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMarket?.name}</DialogTitle>
          </DialogHeader>
          {selectedMarket && (
            <div className="space-y-6">
              {/* Overview */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-[#A1A1AA] mb-3">Market Data</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Market Price:</span>
                      <span className="font-mono text-sm text-[#FFFFFF]">
                        {formatPercentage(selectedMarket.market_price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Model Price:</span>
                      <span className="font-mono text-sm text-[#FFA500]">
                        {formatPercentage(selectedMarket.model_price)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Edge:</span>
                      <span className={cn(
                        'font-mono text-sm font-medium',
                        selectedMarket.edge > 0 ? 'text-[#10B981]' : 'text-[#F43F5E]'
                      )}>
                        {formatPercentage(selectedMarket.edge)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#A1A1AA] mb-3">Position Sizing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Kelly Stake:</span>
                      <span className="font-mono text-sm text-[#FFFFFF]">
                        {formatPercentage(selectedMarket.kelly_stake)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Horizon:</span>
                      <span className="font-mono text-sm text-[#FFFFFF]">
                        {selectedMarket.horizon}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Confidence:</span>
                      <span className={cn('text-sm font-medium uppercase', getConfidenceColor(selectedMarket.confidence))}>
                        {selectedMarket.confidence}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rationale */}
              <div>
                <h4 className="text-sm font-medium text-[#A1A1AA] mb-3">Model Rationale</h4>
                <p className="text-sm text-[#FFFFFF] leading-relaxed">
                  {selectedMarket.rationale}
                </p>
              </div>

              {/* Market Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-[#A1A1AA] mb-3">Market Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">Category:</span>
                      <span className="text-sm text-[#FFFFFF]">{selectedMarket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[#A1A1AA]">24h Volume:</span>
                      <span className="text-sm text-[#FFFFFF]">
                        ${(selectedMarket.volume_24h / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#18181B] rounded-lg border border-[#27272A]">
                <p className="text-xs text-[#52525B] leading-relaxed">
                  <strong>Disclaimer:</strong> Research results not financial advice. 
                  This analysis is for informational purposes only and should not be considered 
                  as investment recommendations. Past performance does not guarantee future results.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MispricedList;