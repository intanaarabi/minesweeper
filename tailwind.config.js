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
          '300':'#B8B1FF',
          '400':'#584561',
          '500':'#302537'
        },
        'red':'#DC5266',
        'pink': '#FFABC4',
        'green': '#92FFEB',
        'orange': {  
          '100':'#FAB48D',
          '200':'#E87F44'
        }
      },
      fontFamily: {
        digital: ['"DigitalNumbers"', 'sans-serif'], 
        baloo: ['"Baloo"', 'sans-serif'], 
        alata: ['"Alata"', 'sans-serif']
      },
      
    },
  },
  plugins: [],
}