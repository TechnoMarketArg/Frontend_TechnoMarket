/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'kanit': ["Kanit", "sans-serif"],
      'Anton': ["Anton", "sans-serif"]
    },
    extend: {
      textShadow: {
        'sm': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        'xl': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        '2xl': '5px 5px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  darkMode: "class",
  plugins: [
    animations,
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          'text-shadow': '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          'text-shadow': '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          'text-shadow': '5px 5px 10px rgba(0, 0, 0, 0.5)',
        },
      });
    },
  ],
}