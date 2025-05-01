/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: '#FBF8EF',
          100: '#F5EDD5',
          200: '#E9DFBF',
          500: '#C0994F',
          700: '#956A39',
          900: '#62472D',
        },
        text: {
          50: '#F5F7FA',
          200: '#CFDCE8',
          500: '#5480A3',
          700: '#35526F',
          900: '#2C3E50',
        },
        cta: {
          50: '#FFF7ED',
          100:'#ffedd5',
          200: '#FDD8AB',
          500: '#F77518',
          700: '#C1440E',
          900: '#7B2F13',
        },
        success: {
          50: '#F2F7EE',
          200: '#C8DEB8',
          500: '#6A994E',
          700: '#3F5B30',
          900: '#2F4027',
        },
        warning: {
          50: '#FCF8F0',
          200: '#F0DA8B',
          500: '#D4853B',
          700: '#A55629',
          900: '#6B3A23',
        },
        error: {
          50: '#FDF4F3',
          200: '#FAD2CE',
          500: '#E35E50',
          700: '#C0392B',
          900: '#782C24',
        },
        disabled: {
          50: '#F3F4F6',
          200: '#D7D8E0',
          500: '#6C798B',
          700: '#474F5D',
          900: '#363B44',
        },
      },
    },
  },
  plugins: [],
}

