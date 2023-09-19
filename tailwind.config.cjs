/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        cornflower: '#716FED'
      }
    }
  },

  plugins: [require('@tailwindcss/typography')]
}

module.exports = config
