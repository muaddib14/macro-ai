import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/Loading';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Modal';
import { cn, getIntensityStyles } from '@/utils';
import { ShockDomain } from '@/types';

interface ShockHeatmapProps {
  data: ShockDomain[][] | null;
  isLoading: boolean;
  error?: string | null;
}

const ShockHeatmap: React.FC<ShockHeatmapProps> = ({ data, isLoading, error }) => {
  const [selectedDomain, setSelectedDomain] = useState<ShockDomain | null>(null);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Narrative Shock Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data || !Array.isArray(data)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Narrative Shock Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-[#F43F5E]">
            {error || 'No data available'}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ensure data is properly structured as 2D array
  let flatData;
  try {
    flatData = data.flat();
    if (!Array.isArray(flatData) || flatData.length === 0) {
      throw new Error('Invalid data structure');
    }
  } catch (err) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Narrative Shock Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-[#F43F5E]">
            Invalid data format
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="col-span-2" hover>
        <CardHeader>
          <CardTitle>Narrative Shock Heatmap</CardTitle>
          <p className="text-xs text-[#A1A1AA]">
            3×3 grid showing shock intensity across domains
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {flatData.map((domain, index) => (
              <motion.div
                key={domain.domain}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  'aspect-square rounded-lg border border-[#27272A] p-4 cursor-pointer transition-all duration-300',
                  getIntensityStyles(domain.intensity)
                )}
                onClick={() => setSelectedDomain(domain)}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-2">
                  <div className="font-orbitron font-bold text-lg text-[#FFFFFF]">
                    {domain.score}
                  </div>
                  <div className="text-xs text-[#A1A1AA] text-center uppercase leading-tight">
                    {domain.domain}
                  </div>
                  <div className="w-full bg-[#27272A] rounded-full h-1">
                    <motion.div
                      className="bg-[#FFA500] h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${domain.score}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex items-center justify-between text-xs">
            <span className="text-[#A1A1AA]">Low</span>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded bg-[#18181B] border border-[#27272A]" />
              <div className="w-3 h-3 rounded bg-[#3F2F1A] border border-[#FFA500]/20" />
              <div className="w-3 h-3 rounded bg-[#7C2D12] border border-[#FFA500]/30" />
              <div className="w-3 h-3 rounded bg-[#FFA500] border border-[#FFA500]" />
            </div>
            <span className="text-[#A1A1AA]">Critical</span>
          </div>
        </CardContent>
      </Card>

      {/* Modal for domain details */}
      <Dialog 
        open={!!selectedDomain} 
        onOpenChange={(open) => !open && setSelectedDomain(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedDomain?.domain} - Shock Details</DialogTitle>
          </DialogHeader>
          {selectedDomain && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A1A1AA]">Intensity Score:</span>
                <span className="font-mono text-[#FFA500]">{selectedDomain.score}/100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A1A1AA]">Level:</span>
                <span className={cn(
                  'text-sm font-medium uppercase',
                  selectedDomain.intensity === 'critical' && 'text-[#FFA500]',
                  selectedDomain.intensity === 'high' && 'text-[#7C2D12]',
                  selectedDomain.intensity === 'medium' && 'text-[#3F2F1A]',
                  selectedDomain.intensity === 'low' && 'text-[#A1A1AA]'
                )}>
                  {selectedDomain.intensity}
                </span>
              </div>

              <div>
                <p className="text-sm text-[#A1A1AA] mb-2">Description:</p>
                <p className="text-sm text-[#FFFFFF]">{selectedDomain.description}</p>
              </div>

              <div>
                <p className="text-sm text-[#A1A1AA] mb-3">Recent Headlines:</p>
                <div className="space-y-2">
                  {selectedDomain.top_headlines.map((headline, index) => (
                    <div key={index} className="p-3 bg-[#18181B] rounded-lg">
                      <p className="text-sm text-[#FFFFFF] mb-1">{headline.headline}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#52525B]">{headline.source}</span>
                        <span className={cn(
                          'font-medium',
                          headline.tone === 'positive' && 'text-[#10B981]',
                          headline.tone === 'negative' && 'text-[#F43F5E]',
                          headline.tone === 'neutral' && 'text-[#A1A1AA]'
                        )}>
                          {headline.tone}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShockHeatmap;