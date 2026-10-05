/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#F4EFE4',
        'navy': '#223247',
        'sage': '#78947A',
        'sand': '#CBBDA8',
        'sage-light': '#A8B88A',
        'sage-dark': '#748A70',
        'navy-light': '#3A4C63',
        'cream': '#FFFDF7',
        'espresso': '#463C32',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        '3d': '0 4px 0 0 #463C32',
        '3d-hover': '0 2px 0 0 #463C32',
        '3d-active': '0 0px 0 0 #463C32',
        'card': '0 8px 30px -5px rgba(34, 50, 71, 0.08)',
      },
      transform: {
        '3d-active': 'translateY(4px)',
        '3d-hover': 'translateY(2px)',
      }
    },
  },
  plugins: [],
}
