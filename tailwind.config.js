/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': {
          '100':'#413548',
          '200':'#2C2232'
        },
        'pink': '#DC5266',
        'green': '#00D4AD',
        'orange': '#FE7E75',
      },
      fontFamily: {
        digital: ['"DigitalNumbers"', 'sans-serif'], // Replace 'DigitalNumbers' with your font's name
      },
    },
  },
  plugins: [],
}