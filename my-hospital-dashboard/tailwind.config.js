/** @type {import('tailwindcss').Config} */
export default {
  // IMPORTANT: This content array tells Tailwind CSS where to look for your utility classes.
  // If this is wrong, Tailwind won't generate any CSS.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial for React components
  ],
  theme: {
    extend: {
      colors: {
        // Our custom color palette from before
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
        grey: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          400: '#94A3B8',
          600: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: {
          100: '#D1FAE5',
          500: '#10B981',
          700: '#047857', // Added for consistency
        },
        warning: {
          100: '#FEF3C7',
          500: '#F59E0B',
          800: '#92400E', // Added for consistency
        },
        danger: {
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C', // Added for consistency
        }
      }
    },
  },
  plugins: [],
}