import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Clock, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const currentTime = new Date().toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full border-b border-[#FF5500]/20 bg-[#050505]/90 backdrop-blur-sm',
      className
    )}>
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4"
          >
            {/* Glowing Logo Icon */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full flex items-center justify-center relative">
                <Zap className="h-6 w-6 text-[#050505]" />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full blur-md opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFC850] to-[#FF5500] rounded-full blur-lg opacity-50" />
              </div>
            </div>
            
            <div>
              <h1 className="font-extrabold text-2xl tracking-wider text-[#FFC850] neon-text-glow">
                MACRO AI
              </h1>
              <p className="text-xs text-[#FF9500]/70 font-medium tracking-wide">
                QUANTITATIVE INTELLIGENCE
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {[
            { label: 'Dashboard', href: '/', isActive: true },
            { label: 'Analytics', href: '/analytics' },
            { label: 'AI Chat', href: '/chat' },
            { label: 'How It Works', href: '/how' },
            { label: 'About', href: '/about' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg ${
                  item.isActive
                    ? 'text-[#FFC850] bg-[#FF5500]/20 border border-[#FF5500]/30'
                    : 'text-[#FF9500] hover:text-[#FFC850] hover:bg-[#FF5500]/10'
                }`}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Time Display */}
          <div className="hidden md:flex items-center space-x-2 text-sm text-[#FF9500]/70">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-medium">{currentTime}</span>
          </div>

          {/* Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-[#10B981]/20 border border-[#10B981]/30 rounded-full">
            <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
            <span className="text-xs text-[#10B981] font-medium">LIVE</span>
          </div>

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            className="text-[#FF9500] hover:text-[#FFC850] hover:bg-[#FF5500]/10 border border-[#FF5500]/20"
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-[#FF9500] hover:text-[#FFC850] hover:bg-[#FF5500]/10 border border-[#FF5500]/20"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;