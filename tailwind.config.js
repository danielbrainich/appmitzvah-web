/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#82CBFF',
          light: '#9DD5FF',
          bg: 'rgba(130, 203, 255, 0.1)',
        },
        background: {
          primary: '#000000',
          secondary: '#1a1a1a',
          tertiary: '#262626',
        },
        text: {
          primary: '#ffffff',
          secondary: '#e5e5e5',
          muted: '#a3a3a3',
        },
        border: {
          default: '#404040',
          light: '#525252',
          medium: '#737373',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}