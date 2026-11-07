/** BanglaCanvas design tokens (taken from the Stitch export) */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#faf5ee', // page background
        paper: '#f6f0e8', // soft surface
        sand: '#ece6dc', // muted surface / footer
        line: '#d8d0c8', // hairlines
        ink: '#3a302a', // text
        muted: '#605850', // secondary text
        faint: '#9a9088', // tertiary text
        terracotta: {
          DEFAULT: '#c2652a',
          dark: '#8a4518',
          light: '#e08850',
          tint: '#fbe8d8',
        },
        rose: '#8c3c3c',
        gold: '#c8a75d',
        danger: '#c0392b',
      },
      fontFamily: {
        serif: ['"EB Garamond"', '"Noto Serif Bengali"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        bangla: ['"Noto Serif Bengali"', '"EB Garamond"', 'serif'],
      },
      borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem' },
      boxShadow: {
        soft: '0 2px 16px rgba(58,48,42,0.05)',
        float: '0 24px 48px -12px rgba(58,48,42,0.18), 0 1px 2px rgba(58,48,42,0.06)',
        frame: '0 20px 40px -15px rgba(58,48,42,0.28), 0 0 0 1px rgba(58,48,42,0.05)',
      },
      keyframes: {
        slideIn: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        slideIn: 'slideIn 300ms cubic-bezier(0.16,1,0.3,1)',
        fadeIn: 'fadeIn 200ms ease-out',
      },
    },
  },
  plugins: [],
};
