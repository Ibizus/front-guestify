/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors:{
        'primary': {
          DEFAULT: '#fad4d4', // light-pink 200
          400: '#f3a2a2',
          600: '#ee7d7d',
        },
        'secondary': {
          DEFAULT: '#b6cfb5', // light-green 200
          400: '#87a286',
          600: '#5c795b',
        },
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    },
    plugins: [
      require('tailwindcss/colors'),
      require('@tailwindcss/forms'),
      require('preline/plugin'),
    ],
  }
}
