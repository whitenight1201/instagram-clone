/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      colors: {
        primary: '#1877f2',
        greenLight: '#42b72a',
      },
      animation: {
        shine: 'shine 1.5s linear infinite',
      },
      keyframes: {
        shine: {
          '0%': {
            'background-position-x': '0%',
          },
          '100%': {
            'background-position-x': '-200%',
          },
        },
      },
    },
  },
  plugins: [],
}

