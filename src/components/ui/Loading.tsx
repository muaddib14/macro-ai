import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <motion.div
      className={cn(
        'border-2 border-[#27272A] border-t-[#FFA500] rounded-full',
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
};

interface LoadingDotsProps {
  className?: string;
}

const LoadingDots: React.FC<LoadingDotsProps> = ({ className }) => {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-[#FFA500] rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

interface LoadingPulseProps {
  className?: string;
}

const LoadingPulse: React.FC<LoadingPulseProps> = ({ className }) => {
  return (
    <div className={cn('space-y-3', className)}>
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="h-4 bg-[#18181B] rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children, 
  message = 'Loading...' 
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl"
        >
          <div className="text-center">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-[#A1A1AA] font-inter">{message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface SkeletonProps {
  className?: string;
  lines?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, lines = 1 }) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-[#18181B] rounded"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

interface LoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingMessage?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  error,
  children,
  loadingMessage = 'Loading...',
}) => {
  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="text-[#F43F5E]">
          <p className="font-inter">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-[#A1A1AA] font-inter">{loadingMessage}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export {
  LoadingSpinner,
  LoadingDots,
  LoadingPulse,
  LoadingOverlay,
  Skeleton,
  LoadingState,
};