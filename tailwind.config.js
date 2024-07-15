/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#302537',
        'pink': '#F55A70',
        'green': '#00D4AD',
        'orange': '#FE7E75',
      },
    },
  },
  plugins: [],
}