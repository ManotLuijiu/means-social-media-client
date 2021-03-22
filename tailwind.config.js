/* eslint-disable */
const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme('colors'),
      primary: '#0984e3',
      secondary: '#003bb1',
    }),
    fontFamily: {
      body: ['Sarabun', 'san-serif'],
      headEng: ['Rubik', 'sans-serif'],
    },
    extend: {
      lineHeight: {
        'extra-loose': '2.5',
        12: '3rem',
        15: '5rem',
        tight: 1.2,
      },
      colors: {
        'light-blue': colors.lightBlue,
        cyan: colors.cyan,
        'means-color-1': '#003bb1',
        'means-color': '#0984e3',
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        'means-success': '#0070f3',
        'means-cyan': '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      fontFamily: {
        menlo: ['Menlo', 'sans-serif'],
        fontAwesome: ['Font Awesome 5 Free'],
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0,0,0, 0.12)',
        medium: '0 8px 30px rgba(0,0,0, 0.12)',
      },
      backgroundColor: {
        'means-theme': '#0984e3',
      },
      height: (theme) => ({
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
      }),
      backgroundImage: (theme) => ({
        'hero-pattern': "url('https://assets.means-business.com/images/means-hero.jpg')",
      }),
    },
  },
  variants: {
    display: ['responsive', 'hover', 'focus'],
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/line-clamp')],
};
