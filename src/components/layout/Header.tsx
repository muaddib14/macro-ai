import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, Clock, Settings } from 'lucide-react';
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
      'sticky top-0 z-40 w-full border-b border-[#27272A] bg-[#000000]/95 backdrop-blur supports-[backdrop-filter]:bg-[#000000]/75',
      className
    )}>
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 text-[#000000]" />
            </div>
            <div>
              <h1 className="font-orbitron font-bold text-xl text-[#FFFFFF]">
                MacroCycle AI
              </h1>
              <p className="text-xs text-[#A1A1AA] -mt-1">
                AI Macro Trading Dashboard
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { label: 'Dashboard', href: '/' },
            { label: 'How It Works', href: '/how' },
            { label: 'Roadmap', href: '/roadmap' },
            { label: 'Docs', href: '/docs' },
            { label: 'About', href: '/about' },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-sm text-[#A1A1AA] hover:text-[#FFA500] transition-colors duration-300"
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Time Display */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#A1A1AA]">
            <Clock className="h-4 w-4" />
            <span className="font-mono">{currentTime}</span>
          </div>

          {/* Data Sources Dropdown */}
          <div className="hidden lg:block">
            <Button variant="ghost" size="sm">
              Data Sources
            </Button>
          </div>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>

          {/* Profile */}
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Profile
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              className="h-5 w-5"
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