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
          '200':'#2C2232',
          '300':'#B8B1FF'
        },
        'red':'#DC5266',
        'pink': '#FFABC4',
        'green': '#92FFEB',
        'orange': '#FAB48D',
      },
      fontFamily: {
        digital: ['"DigitalNumbers"', 'sans-serif'], // Replace 'DigitalNumbers' with your font's name
        alata: ['"Alata"', 'sans-serif']
      },
      
    },
  },
  plugins: [],
}