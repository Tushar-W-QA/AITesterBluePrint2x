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
        background: {
          light: '#F8F7F4',
          dark: '#111110',
        },
        primary: {
          DEFAULT: '#1D4ED8',
          hover: '#1e40af',
        },
        indigo: { DEFAULT: '#6366F1' },
        blue: { DEFAULT: '#3B82F6' },
        amber: { DEFAULT: '#F59E0B' },
        purple: { DEFAULT: '#8B5CF6' },
        emerald: { DEFAULT: '#10B981' },
        green: { DEFAULT: '#22C55E' },
        red: { DEFAULT: '#EF4444' },
        gray: { DEFAULT: '#6B7280' },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
