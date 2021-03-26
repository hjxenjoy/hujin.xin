const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{tsx,css}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
