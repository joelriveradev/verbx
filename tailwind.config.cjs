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

  plugins: []
}

module.exports = config
