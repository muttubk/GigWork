/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Fraunces', 'serif'],
      },
      colors: {
        brand: {
          50:  '#f0faf4',
          100: '#dcf5e7',
          200: '#b3e9cc',
          300: '#7dd3a8',
          400: '#4aba82',
          500: '#2d9e63',
          600: '#1B4332',
          700: '#163827',
          800: '#112d1f',
          900: '#0c2217',
        },
        gold: {
          50:  '#fdf8ee',
          100: '#F4E4C1',
          200: '#eacc85',
          300: '#dea84a',
          400: '#C9892A',
          500: '#a86d1a',
          600: '#865510',
        },
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
      },
    },
  },
  plugins: [],
}
