/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unit_primary: '#f0f0f0',
        unit_forth: '#DC2626',
      },
    },
  },
  plugins: [],
}
