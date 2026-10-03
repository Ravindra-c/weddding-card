/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#5A1020', deep: '#350812', rich: '#7A1830', soft: '#8A2A3E' },
        gold: { DEFAULT: '#D4AF37', light: '#F0D78A', dark: '#9C7A1E' },
        cream: '#FFF8E7',
        ivory: '#FFFDF5',
        saffron: '#E58A1F',
        bark: '#2B160F',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Serif Telugu"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', '"Noto Serif Telugu"', 'cursive'],
        body: ['"Jost"', '"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
        telugu: ['"Noto Serif Telugu"', '"Noto Sans Telugu"', 'serif'],
        teluguSans: ['"Noto Sans Telugu"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        spinReverse: { to: { transform: 'rotate(-360deg)' } },
        flame: {
          '0%,100%': { transform: 'scale(1,1) rotate(-1.5deg)' },
          '25%': { transform: 'scale(.93,1.07) rotate(1.5deg)' },
          '50%': { transform: 'scale(1.04,.96) rotate(-1deg)' },
          '75%': { transform: 'scale(.96,1.05) rotate(1deg)' },
        },
        glowPulse: { '0%,100%': { opacity: '.55' }, '50%': { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        sway: { '0%,100%': { transform: 'rotate(-2deg)' }, '50%': { transform: 'rotate(2deg)' } },
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(.8)', opacity: '0' },
          '20%': { opacity: '.8' },
          '100%': { transform: 'translateY(-70px) scale(1.1)', opacity: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        spinSlow: 'spinSlow 120s linear infinite',
        spinReverse: 'spinReverse 160s linear infinite',
        flame: 'flame 1.6s ease-in-out infinite',
        glowPulse: 'glowPulse 3.5s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
        sway: 'sway 5s ease-in-out infinite',
        heartFloat: 'heartFloat 5s ease-in infinite',
      },
    },
  },
  plugins: [],
};
