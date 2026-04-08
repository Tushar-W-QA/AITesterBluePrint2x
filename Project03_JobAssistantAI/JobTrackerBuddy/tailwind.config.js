/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'column-wishlist': '#6366F1',
        'column-applied': '#3B82F6',
        'column-screening': '#F59E0B',
        'column-interview': '#8B5CF6',
        'column-offer': '#10B981',
        'column-accepted': '#22C55E',
        'column-rejected': '#EF4444',
        'column-withdrawn': '#6B7280',
      },
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
