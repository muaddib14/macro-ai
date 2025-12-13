import React from 'react';
import { cn } from '@/utils';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showHeader?: boolean;
  showBackground?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className, 
  showHeader = true, 
  showBackground = true 
}) => {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FFC850] relative overflow-x-hidden">
      {/* Background Ambient Effects */}
      {showBackground && (
        <>
          {/* Cinematic Grain Effect */}
          <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-cinematic-grain" />
          
          {/* Ambient Glow Orbs */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFC850]/5 rounded-full blur-3xl animate-ambient-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF5500]/4 rounded-full blur-3xl animate-ambient-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CC4400]/2 rounded-full blur-3xl animate-ambient-pulse" style={{ animationDelay: '4s' }} />
          </div>
        </>
      )}
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {showHeader && <Header />}
        
        <main className={cn('flex-1', className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;