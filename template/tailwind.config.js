const plugin = require('tailwindcss/plugin');
const Colors = require('./src/configs/colors.js');
module.exports = {
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        center: `flex justify-center items-center`,
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: Colors.primary,
        dark: Colors.dark,
      },
    },
  },
};
