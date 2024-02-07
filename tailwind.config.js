/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        white: '#FFFFFF',
        black: '#000000'
      }
    }
  },
  plugins: []
}
