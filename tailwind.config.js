/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        aquamarine: "#85FFC7",
        lightgray:  "#8C7284",
        carolinablue: "#6DAEDB",
        argentina: "#5DA9E9",
        gunmetal: {
        100: '#212E35',
        200: '#293741',
        50: '#1A252B',

      },
      }
    },
  },
  plugins: [],
}

