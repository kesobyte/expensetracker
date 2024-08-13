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
    },
  },
  plugins: [],
};
