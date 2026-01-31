/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      colors: {
        slate: {
          950: '#020617',
          900: '#0f172a',
          800: '#1e293b',
        },
        sapphire: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc9fb',
          400: '#36aff7',
          500: '#0c92eb',
          600: '#0174c8',
          700: '#025ba1',
          800: '#064d85',
          900: '#0b416f',
          950: '#07294a',
        },
      },
    },
  },
  plugins: [],
}
