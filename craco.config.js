/* eslint-disable */
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
};
