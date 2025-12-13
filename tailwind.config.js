/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Color System - Dark Hot Glow Theme
      colors: {
        // Base Colors
        background: '#050505',
        foreground: '#FFC850',
        
        // Surface Colors
        surface: {
          DEFAULT: '#080400',
          elevated: '#1a1a0a',
          highlight: '#27272a',
        },
        
        // Brand Colors
        primary: {
          DEFAULT: '#FFC850',
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFB5',
          300: '#FFE380',
          400: '#FFD24A',
          500: '#FFC850',
          600: '#FF9500',
          700: '#FF5500',
          800: '#CC4400',
          900: '#993300',
        },
        
        // Semantic Colors
        success: '#10B981',
        error: '#F43F5E',
        warning: '#F59E0B',
        info: '#3B82F6',
        
        // Border & Effects
        border: '#CC4400',
        ring: '#FFC850',
        input: '#1a1a0a',
      },
      
      // Typography System
      fontFamily: {
        'heading': ['Orbitron', 'monospace'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      
      // Spacing System
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      
      // Shadow System
      boxShadow: {
        'glow': '0 0 20px rgba(255, 165, 0, 0.4), 0 0 40px rgba(255, 85, 0, 0.2)',
        'glow-sm': '0 0 10px rgba(255, 165, 0, 0.3), 0 0 20px rgba(255, 85, 0, 0.15)',
        'glow-lg': '0 0 30px rgba(255, 165, 0, 0.5), 0 0 60px rgba(255, 85, 0, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(255, 165, 0, 0.1)',
        'neon': '0 0 5px #FF9500, 0 0 10px #FF9500, 0 0 20px #FF5500',
      },
      
      // Animation System
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grain': 'grainShift 8s infinite',
        'ambient-pulse': 'ambientPulse 4s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            opacity: '1', 
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.3)' 
          },
          '50%': { 
            opacity: '0.8', 
            boxShadow: '0 0 30px rgba(255, 165, 0, 0.5)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        grainShift: {
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
        ambientPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.2' },
        },
      },
      
      // Background System
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFC850 0%, #FF5500 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
      // Blur Effects
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}