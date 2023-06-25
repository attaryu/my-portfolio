/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'tusker-grotesk-medium': ['Tusker Grotesk Medium', 'sans-serif'],
        'tusker-grotesk-semibold': ['Tusker Grotesk Semibold', 'sans-serif'],
        'tusker-grotesk-bold': ['Tusker Grotesk Bold', 'sans-serif'],
      },
      borderWidth: {
        '0.5': '1px',
        1: '1.5px',
      },
      height: {
        '0.5': '1px',
        1: '1.5px',
      },
    },
  },
  plugins: [],
}

