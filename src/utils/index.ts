import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(d);
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return formatDate(d);
  }
}

export function getIntensityColor(score: number): string {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export function getIntensityStyles(intensity: string): string {
  switch (intensity) {
    case 'critical':
      return 'bg-[#FFA500] shadow-glow animate-pulse-glow';
    case 'high':
      return 'bg-[#7C2D12] border-[#FFA500]/30';
    case 'medium':
      return 'bg-[#3F2F1A] border-[#FFA500]/20';
    default:
      return 'bg-[#18181B] border-[#27272A]';
  }
}

export function getToneColor(tone: string): string {
  switch (tone) {
    case 'positive':
      return 'text-[#10B981]';
    case 'negative':
      return 'text-[#F43F5E]';
    default:
      return 'text-[#A1A1AA]';
  }
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case 'high':
      return 'text-[#10B981]';
    case 'medium':
      return 'text-[#FFA500]';
    default:
      return 'text-[#F43F5E]';
  }
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'low':
      return 'text-[#10B981]';
    case 'medium':
      return 'text-[#FFA500]';
    default:
      return 'text-[#F43F5E]';
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  // Simple color interpolation for gradients
  const hex = (color: string) => parseInt(color.slice(1), 16);
  const r1 = hex(color1) >> 16;
  const g1 = (hex(color1) >> 8) & 0x00FF;
  const b1 = hex(color1) & 0x0000FF;
  
  const r2 = hex(color2) >> 16;
  const g2 = (hex(color2) >> 8) & 0x00FF;
  const b2 = hex(color2) & 0x0000FF;
  
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}