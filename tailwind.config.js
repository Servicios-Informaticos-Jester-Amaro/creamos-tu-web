/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#030308',
          800: '#0a0a12',
          700: '#111118',
          600: '#1a1a28',
        },
        neon: {
          violet: '#8b5cf6',
          purple: '#a855f7',
          cyan: '#06b6d4',
          pink: '#ec4899',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'shimmer': 'shimmer 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.5), 0 0 60px rgba(6, 182, 212, 0.3)' },
        },
        fadeInUp: {
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
