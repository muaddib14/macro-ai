'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveLavaBackground } from '@/components/ui/InteractiveLavaBackground';
import { RewardsMarquee } from '@/components/dashboard/RewardsMarquee';
import Header from '@/components/layout/Header';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#09090b] text-white relative overflow-hidden">
      {/* 1. Interactive Background Layer */}
      <InteractiveLavaBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 container mx-auto px-4 py-8 space-y-12">
          
          {/* 2. Hero Section */}
          <section className="text-center py-16 lg:py-24 max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-[#FFA500]/10 border border-[#FFA500]/30 text-[#FFA500] text-xs font-medium tracking-wider uppercase mb-4">
                MacroCycle AI v1.0
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                Predict the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] to-[#F43F5E] animate-pulse">Unseen.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
                AI macro trader trained on global cycles and narrative shocks — optimized for prediction markets.
              </p>
              <div className="flex justify-center gap-6 mt-6">
                <a 
                  href="https://github.com/muaddib14/macro-ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#FFC850] transition-colors text-sm font-medium"
                >
                  GitHub
                </a>
                <a 
                  href="https://x.com/macroaisite" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#FFC850] transition-colors text-sm font-medium"
                >
                  Twitter
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center gap-4 pt-6"
            >
              <button onClick={() => router.push('/start-trading')} className="px-8 py-3 bg-[#FFA500] hover:bg-[#FF8C00] text-black font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(255,165,0,0.3)]">
                Start Trading
              </button>
              <button className="px-8 py-3 bg-[#18181B] border border-[#27272A] hover:bg-[#27272A] text-white font-semibold rounded-lg transition-all">
                View Signals
              </button>
            </motion.div>
          </section>

          {/* 3. Avici-style Marquee Section */}
          <section className="py-8">
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-white/80">System Capabilities</h3>
            </div>
            <RewardsMarquee />
          </section>

        </div>
      </div>
    </main>
  );
}