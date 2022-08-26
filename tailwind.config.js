// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
  ],
  mode: 'jit',
  theme: {
    extend: {
      fontSize: {
        '2xs': ['0.6rem', '.8rem'],
        '3xs': ['0.5rem', '.75rem'],
        '4xs': ['0.25rem', '.5rem'],
      },
      backgroundImage: {
        user: "url('/src/assets/placeholder.jpg')",
      },

      spacing: {
        '1px': '1px',
        '2px': '2px',
      },
      colors: {
        primary: colors.gray,
        secondary: colors.indigo,
        tertiary: colors.sky,
        gray: colors.stone,
        background: colors.black,
      },
    },
  },
};
