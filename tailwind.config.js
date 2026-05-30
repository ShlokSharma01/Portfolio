/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0608',
        'bg-elev': '#160A0D',
        crimson: {
          DEFAULT: '#E10E1F',
          glow: '#FF2D3F',
          deep: '#7A0A12',
        },
        gold: '#D4AF37',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['Satoshi', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
