/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF6F91', // Custom light primary color
          DEFAULT: '#FF6F91', // Custom primary color
          dark: '#FF6F91', // Custom dark primary color
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

