module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
      './node_modules/tw-elements/dist/js/**/*.js'
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'sombra3': '0 20px 60px -16px rgba(0, 0, 0, 1)',
      },
      boxShadow: {
        '4xl': '0 20px 60px -1px rgba(0, 0, 0, .5)',
      },
      fontFamily: {
        'Convergence' : ['Convergence', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography'),require("daisyui"),require("tw-elements/dist/plugin.cjs")],
};


