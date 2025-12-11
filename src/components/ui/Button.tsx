import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium font-orbitron transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFA500] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        default: 'bg-[#FFA500] text-[#000000] hover:bg-[#FF7A1A] hover:shadow-glow hover:scale-105',
        secondary: 'border border-[#3F3F46] bg-transparent text-[#FFFFFF] hover:bg-[#27272A] hover:border-[#FFA500]',
        outline: 'border border-[#FFA500] bg-transparent text-[#FFA500] hover:bg-[#FFA500] hover:text-[#000000]',
        ghost: 'text-[#FFFFFF] hover:bg-[#27272A] hover:text-[#FFA500]',
        link: 'text-[#FFA500] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
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