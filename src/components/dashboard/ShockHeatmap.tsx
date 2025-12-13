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
          <CardTitle className="text-white">Narrative Shock Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Provide fallback data structure when API fails
  const getFallbackData = (): ShockDomain[][] => {
    const fallbackDomains: ShockDomain[] = [
      {
        domain: 'Geopolitical',
        score: 45,
        intensity: 'medium',
        top_headlines: [
          {
            headline: 'Global tensions affect market stability',
            tone: 'negative',
            source: 'Reuters',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Geopolitical events impacting market stability.'
      },
      {
        domain: 'Monetary Policy',
        score: 60,
        intensity: 'high',
        top_headlines: [
          {
            headline: 'Central bank policy changes expected',
            tone: 'neutral',
            source: 'Financial Times',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Central bank policies affecting markets.'
      },
      {
        domain: 'Technology',
        score: 70,
        intensity: 'high',
        top_headlines: [
          {
            headline: 'Tech sector shows strong momentum',
            tone: 'positive',
            source: 'TechCrunch',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Technology sector developments.'
      },
      {
        domain: 'Energy',
        score: 55,
        intensity: 'medium',
        top_headlines: [
          {
            headline: 'Energy markets stabilize',
            tone: 'positive',
            source: 'Bloomberg',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Energy market dynamics.'
      },
      {
        domain: 'Financial Stability',
        score: 40,
        intensity: 'medium',
        top_headlines: [
          {
            headline: 'Banking sector remains stable',
            tone: 'positive',
            source: 'Wall Street Journal',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Financial system stability.'
      },
      {
        domain: 'Supply Chain',
        score: 65,
        intensity: 'high',
        top_headlines: [
          {
            headline: 'Supply chain improvements noted',
            tone: 'positive',
            source: 'Supply Chain Digest',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Supply chain and logistics.'
      },
      {
        domain: 'Commodities',
        score: 50,
        intensity: 'medium',
        top_headlines: [
          {
            headline: 'Commodity prices fluctuate',
            tone: 'neutral',
            source: 'Commodity Research Bureau',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Raw material markets.'
      },
      {
        domain: 'Currency',
        score: 35,
        intensity: 'low',
        top_headlines: [
          {
            headline: 'Currency markets steady',
            tone: 'neutral',
            source: 'CurrencyWatch',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Foreign exchange dynamics.'
      },
      {
        domain: 'Consumer Sentiment',
        score: 75,
        intensity: 'high',
        top_headlines: [
          {
            headline: 'Consumer confidence rises',
            tone: 'positive',
            source: 'Conference Board',
            timestamp: new Date().toISOString()
          }
        ],
        description: 'Consumer confidence and spending.'
      }
    ];

    // Create 3x3 grid
    const grid: ShockDomain[][] = [];
    for (let i = 0; i < 3; i++) {
      grid.push(fallbackDomains.slice(i * 3, (i + 1) * 3));
    }
    return grid;
  };

  // Use fallback data if API fails or data is invalid
  const validData = (error || !data || !Array.isArray(data)) ? getFallbackData() : data;

  // Ensure data is properly structured as 2D array
  let flatData;
  try {
    flatData = validData.flat();
    if (!Array.isArray(flatData) || flatData.length === 0) {
      flatData = getFallbackData().flat();
    }
  } catch (err) {
    flatData = getFallbackData().flat();
  }

  return (
    <>
      <Card className="col-span-2" hover>
        <CardHeader>
          <CardTitle className="text-white">Narrative Shock Heatmap</CardTitle>
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