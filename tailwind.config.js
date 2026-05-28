import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#061525',
        gold: '#D6A63A',
        cream: '#F8F4EA',
        burgundy: '#5B1022',
        emerald: '#0C6B4F',
      },
      boxShadow: {
        glow: '0 18px 55px rgba(6, 21, 37, 0.18)',
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-worship.svg')",
      },
    },
  },
  plugins: [forms],
};
