/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    // Agrega aquí todas las clases posibles
  ],
  theme: {
    fontFamily: {
      'kanit': ["Kanit", "sans-serif"]
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [
    animations,
  ],
}