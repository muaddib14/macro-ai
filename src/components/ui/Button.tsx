import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold font-inter transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC850] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'hot-glow-button hover:shadow-glow-lg',
        secondary: 'border-2 border-[#FF5500]/50 bg-transparent text-[#FF9500] hover:bg-[#FF5500]/10 hover:border-[#FFC850] hover:text-[#FFC850]',
        outline: 'border-2 border-[#FF9500] bg-transparent text-[#FF9500] hover:bg-[#FF9500] hover:text-[#050505] hover:shadow-glow-sm',
        ghost: 'text-[#FF9500] hover:bg-[#FF5500]/10 hover:text-[#FFC850]',
        link: 'text-[#FFC850] underline-offset-4 hover:underline hover:text-[#FF9500]',
        neon: 'bg-[#050505] border border-[#FF9500]/30 text-[#FFC850] hover:border-[#FFC850] hover:text-[#FFC850] hover:shadow-neon-amber',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-lg',
        xl: 'h-16 px-12 text-xl',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };