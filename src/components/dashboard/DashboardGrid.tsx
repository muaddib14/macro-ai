import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { LoadingState } from '@/components/ui/Loading';

// Import dashboard components
import RegimeGauge from './RegimeGauge';
import ShockHeatmap from './ShockHeatmap';
import MispricedList from './MispricedList';
import Recommendations from './Recommendations';
import ChatAgent from './ChatAgent';
import { 
  LiquidityMeterWidget, 
  VolatilityIndexWidget, 
  NewsTickerWidget 
} from './Widgets';

interface DashboardGridProps {
  // Regime data
  regimeData: any;
  regimeLoading: boolean;
  regimeError: string | null;
  
  // Shock data
  shockData: any;
  shockLoading: boolean;
  shockError: string | null;
  
  // Market data
  marketData: any;
  marketLoading: boolean;
  marketError: string | null;
  
  // Recommendations data
  recommendationData: any;
  recommendationLoading: boolean;
  recommendationError: string | null;
  
  // Widget data
  liquidityData: any;
  liquidityLoading: boolean;
  liquidityError: string | null;
  
  volatilityData: any;
  volatilityLoading: boolean;
  volatilityError: string | null;
  
  newsData: any;
  newsLoading: boolean;
  newsError: string | null;
  
  className?: string;
}

const DashboardGrid: React.FC<DashboardGridProps> = ({
  regimeData,
  regimeLoading,
  regimeError,
  shockData,
  shockLoading,
  shockError,
  marketData,
  marketLoading,
  marketError,
  recommendationData,
  recommendationLoading,
  recommendationError,
  liquidityData,
  liquidityLoading,
  liquidityError,
  volatilityData,
  volatilityLoading,
  volatilityError,
  newsData,
  newsLoading,
  newsError,
  className,
}) => {
  const isAnyLoading = 
    regimeLoading || shockLoading || marketLoading || 
    recommendationLoading || liquidityLoading || volatilityLoading || newsLoading;

  const hasAnyError = 
    regimeError || shockError || marketError || 
    recommendationError || liquidityError || volatilityError || newsError;

  if (hasAnyError) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-[#F43F5E] mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-[#FFFFFF] mb-2">Dashboard Error</h3>
          <p className="text-[#A1A1AA] mb-4">
            Unable to load dashboard data. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#FFA500] text-[#000000] rounded-lg hover:bg-[#FF7A1A] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-max', className)}>
      {/* Row 1: Regime Gauge (spans 4 cols) + Shock Heatmap (spans 4 cols) + Chat Agent (spans 4 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-4"
      >
        <RegimeGauge 
          data={regimeData} 
          isLoading={regimeLoading} 
          error={regimeError} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-4"
      >
        <ShockHeatmap 
          data={shockData} 
          isLoading={shockLoading} 
          error={shockError} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-4"
      >
        <ChatAgent />
      </motion.div>

      {/* Row 2: Mispriced Markets (spans 6 cols) + Recommendations (spans 6 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-6"
      >
        <MispricedList 
          data={marketData} 
          isLoading={marketLoading} 
          error={marketError} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="lg:col-span-6"
      >
        <Recommendations 
          data={recommendationData} 
          isLoading={recommendationLoading} 
          error={recommendationError} 
        />
      </motion.div>

      {/* Row 3: Small Widgets (each spans 4 cols) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="lg:col-span-4"
      >
        <LiquidityMeterWidget 
          data={liquidityData} 
          isLoading={liquidityLoading} 
          error={liquidityError} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="lg:col-span-4"
      >
        <VolatilityIndexWidget 
          data={volatilityData} 
          isLoading={volatilityLoading} 
          error={volatilityError} 
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="lg:col-span-4"
      >
        <NewsTickerWidget 
          data={newsData} 
          isLoading={newsLoading} 
          error={newsError} 
        />
      </motion.div>
    </div>
  );
};

export default DashboardGrid;