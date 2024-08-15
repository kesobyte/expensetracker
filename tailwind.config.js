/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        springgreen: 'var(--springgreen)',
        mediumseagreen: 'var(--mediumseagreen)',
        black: 'var(--black)',
        darkslategray: 'var(--darkslategray)',
        white: 'var(--white)',
        tomato: 'var(--tomato)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
