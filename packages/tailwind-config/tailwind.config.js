/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../packages/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F1D2B',
        secondary: '#272636',
        "blue-purple": "#6F6FC8",
      }
    },
  },
  plugins: [],
}

