/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Base palette - Void Black Theme
        background: '#000000',
        surface: {
          DEFAULT: '#09090B',
          highlight: '#18181B',
        },
        border: '#27272A',
        
        // Primary Brand - Solar Flare Orange
        primary: {
          DEFAULT: '#FFA500',
          dark: '#FF7A1A',
          light: '#FFD180',
        },
        
        // Text Colors
        foreground: '#FFFFFF',
        muted: {
          DEFAULT: '#A1A1AA',
          foreground: '#52525B',
        },
        
        // Semantic Colors
        success: '#10B981',
        error: '#F43F5E',
        
        // Custom colors
        zinc: {
          950: '#09090B',
          900: '#18181B',
          800: '#27272A',
          600: '#52525B',
          400: '#A1A1AA',
        },
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: '12px',
        '2xl': '24px',
      },
      boxShadow: {
        'glow': '0 0 20px -5px rgba(255, 165, 0, 0.3)',
        'glow-sm': '0 0 15px rgba(255, 165, 0, 0.15)',
        'inner-glow': 'inset 0 0 20px rgba(255, 165, 0, 0.1)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 15px rgba(255, 165, 0, 0.15)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 25px rgba(255, 165, 0, 0.25)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFA500 0%, #FF7A1A 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}