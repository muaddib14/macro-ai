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
        // Dark Hot Glow Theme - Cinematic Orange/Amber
        background: '#050505', // Deep void black
        surface: {
          DEFAULT: '#080400', // Warm charcoal
          highlight: '#1a1a0a', // Slightly lighter
        },
        border: '#CC4400', // Deep red-orange
        
        // Primary Brand - Hot Amber/Orange
        primary: {
          DEFAULT: '#FFC850', // Bright amber
          dark: '#FF9500', // Standard orange
          light: '#FFD180', // Light amber
          glow: '#FF5500', // Hot orange
        },
        
        // Text Colors - Amber Spectrum
        foreground: '#FFC850', // Primary text
        muted: {
          DEFAULT: '#FF9500', // Secondary text
          foreground: '#CC4400', // Muted text
        },
        
        // Semantic Colors
        success: '#10B981',
        error: '#F43F5E',
        
        // Extended Color Palette
        amber: {
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFB5',
          300: '#FFE380',
          400: '#FFD24A',
          500: '#FFC850', // Primary amber
          600: '#FF9500', // Primary orange
          700: '#FF5500', // Hot orange
          800: '#CC4400', // Deep orange-red
          900: '#993300', // Dark red-orange
        },
        
        // Custom colors for the hot glow theme
        glow: {
          amber: '#FFC850',
          orange: '#FF9500',
          hot: '#FF5500',
          deep: '#CC4400',
        }
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
        // Hot glow shadows
        'glow': '0 0 20px rgba(255, 165, 0, 0.4), 0 0 40px rgba(255, 85, 0, 0.2)',
        'glow-sm': '0 0 10px rgba(255, 165, 0, 0.3), 0 0 20px rgba(255, 85, 0, 0.15)',
        'glow-lg': '0 0 30px rgba(255, 165, 0, 0.5), 0 0 60px rgba(255, 85, 0, 0.3), 0 0 90px rgba(204, 68, 0, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(255, 165, 0, 0.1)',
        'neon-amber': '0 0 5px #FF9500, 0 0 10px #FF9500, 0 0 20px #FF5500, 0 0 40px #CC4400',
      },
      animation: {
        'pulse-glow': 'pulse-glow-amber 2s ease-in-out infinite',
        'ambient-pulse': 'ambient-pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grain 8s infinite',
      },
      keyframes: {
        'pulse-glow-amber': {
          '0%, 100%': { 
            opacity: '1', 
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.3), 0 0 40px rgba(255, 85, 0, 0.15)' 
          },
          '50%': { 
            opacity: '0.8', 
            boxShadow: '0 0 30px rgba(255, 165, 0, 0.5), 0 0 60px rgba(255, 85, 0, 0.25)' 
          },
        },
        'ambient-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.2' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFC850 0%, #FF5500 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
        'gradient-ambient': 'radial-gradient(circle at 50% 50%, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}