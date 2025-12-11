import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/Loading';
import { cn } from '@/utils';
import { RegimeData } from '@/types';

interface RegimeGaugeProps {
  data: RegimeData | null;
  isLoading: boolean;
  error?: string | null;
}

const RegimeGauge: React.FC<RegimeGaugeProps> = ({ data, isLoading, error }) => {
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Regime Probability</CardTitle>
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
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Regime Probability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-[#F43F5E]">
            {error || 'No data available'}
          </div>
        </CardContent>
      </Card>
    );
  }

  const { current } = data;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (current.probability / 100) * circumference;

  return (
    <Card className="col-span-2" glow>
      <CardHeader>
        <CardTitle>Regime Probability</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#A1A1AA]">Horizon:</span>
          <span className="text-xs font-mono text-[#FFA500]">{current.horizon}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Gauge SVG */}
          <div className="relative w-48 h-48 mb-6">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                stroke="#27272A"
                strokeWidth="12"
                fill="none"
              />
              
              {/* Progress circle */}
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              
              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="100%" stopColor="#FF7A1A" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="text-center"
              >
                <div className="text-4xl font-orbitron font-bold text-[#FFFFFF] mb-1">
                  {current.probability}%
                </div>
                <div className="text-sm text-[#A1A1AA] uppercase tracking-wide">
                  {current.primary.replace('_', ' ')}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Regime breakdown */}
          <div className="w-full grid grid-cols-3 gap-4 text-center">
            {data.timeseries[data.timeseries.length - 1].regimes && 
              Object.entries(data.timeseries[data.timeseries.length - 1].regimes).map(([regime, probability]) => (
                <div key={regime} className="space-y-1">
                  <div className="text-sm font-mono text-[#FFA500]">
                    {probability}%
                  </div>
                  <div className="text-xs text-[#A1A1AA] uppercase">
                    {regime.replace('_', ' ')}
                  </div>
                </div>
              ))
            }
          </div>

          {/* Last update */}
          <div className="mt-4 text-xs text-[#52525B]">
            Last updated: {new Date(current.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegimeGauge;