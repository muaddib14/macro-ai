import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd'> {
  hover?: boolean;
  glow?: boolean;
  delay?: number;
  variant?: 'default' | 'neon' | 'subtle';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = true, glow = false, delay = 0, variant = 'default', children, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'neon':
          return 'glass-amber neon-border-amber';
        case 'subtle':
          return 'bg-[#080400] border-[#CC4400]/20 hover:border-[#FF9500]/40';
        default:
          return 'bg-[#050505] border-[#FF5500]/30 hover:border-[#FFC850] hover:shadow-glow-sm';
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={hover ? { 
          scale: 1.02, 
          boxShadow: variant === 'neon' 
            ? '0 0 30px rgba(255, 165, 0, 0.5), 0 0 60px rgba(255, 85, 0, 0.3)'
            : '0 0 20px rgba(255, 165, 0, 0.3), 0 0 40px rgba(255, 85, 0, 0.15)'
        } : {}}
        className={cn(
          'rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm',
          getVariantStyles(),
          hover && 'transition-all duration-300',
          glow && 'shadow-glow',
          className
        )}
        {...props}
      >
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFC850]/5 via-transparent to-[#FF5500]/5 pointer-events-none" />
        
        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FFC850]/10 to-transparent rounded-bl-2xl" />
        
        {children}
      </motion.div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2 p-0 mb-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('font-extrabold leading-none tracking-wider text-[#FFC850] neon-text-glow-sm uppercase text-base', className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-[#FF9500]/70 leading-relaxed font-medium', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 border-t border-[#FF5500]/20', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };