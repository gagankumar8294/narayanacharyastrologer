/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './comps/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          saffron: '#ff6801',
          ochre: '#d94e00',
          tint: '#fff2e8',
          gold: '#d4af37',
          dark: '#0f081d',
          card: '#180d2e',
          purple: '#6b3fa0',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
        rozha: ['Rozha One', 'serif'],
      }
    },
  },
  plugins: [],
}

