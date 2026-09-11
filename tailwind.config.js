/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF9F3',
          100: '#F5F0E6',
          200: '#EDE4D3',
          300: '#E0D4B8',
          400: '#D4C49D',
          500: '#D4AF37',
          600: '#C9A227',
          700: '#8B6914',
          800: '#6B5210',
          900: '#4A390B',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FAF8F5',
          200: '#F5F0E6',
          300: '#EDE4D3',
        },
        bronze: {
          500: '#8B6914',
          600: '#6B5210',
          700: '#4A390B',
        },
        sage: {
          500: '#6B7B3C',
          600: '#566230',
        }
      },
      fontFamily: {
        script: ['Cormorant Garamond', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
