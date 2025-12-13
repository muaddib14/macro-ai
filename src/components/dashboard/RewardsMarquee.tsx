'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Calculator, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';

const benefits = [
  { 
    id: 1, 
    title: 'Global Cycles', 
    desc: 'Real-time analysis of macro liquidity flows.', 
    icon: Globe 
  },
  { 
    id: 2, 
    title: 'Narrative Shocks', 
    desc: 'Instant detection of geopolitical impact.', 
    icon: Zap 
  },
  { 
    id: 3, 
    title: 'Prediction Markets', 
    desc: 'Arb opportunities across Kalshi & PolyMarket.', 
    icon: TrendingUp 
  },
  { 
    id: 4, 
    title: 'Kelly Criterion', 
    desc: 'Optimal position sizing for every trade.', 
    icon: Calculator 
  },
  { 
    id: 5, 
    title: 'Zero Hallucination', 
    desc: 'Data-grounded probabilistic models.', 
    icon: ShieldCheck 
  },
  { 
    id: 6, 
    title: '24/7 Monitoring', 
    desc: 'Always-on surveillance of Fed speakers.', 
    icon: Eye 
  },
];

export const RewardsMarquee = () => {
  return (
    <div className="relative w-full py-12 overflow-hidden bg-transparent">
      {/* Extended fade edges to blend with deep black background */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#020202] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#020202] to-transparent pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex gap-6"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 40, // Slower scrolling for readability
          }}
        >
          {/* Double the list for infinite loop */}
          {[...benefits, ...benefits].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 w-[320px] p-6 bg-[#0A0A0A]/60 border-[#27272A] backdrop-blur-sm hover:border-[#FFA500]/50 transition-all duration-300 group"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Icon Container with subtle glow on hover */}
                    <div className="p-3 bg-[#18181B] w-fit rounded-lg mb-4 group-hover:bg-[#FFA500]/10 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-[#FFA500] group-hover:text-[#FFC850] transition-colors duration-300" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 tracking-wide">{item.title}</h4>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed group-hover:text-[#D4D4D8] transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};