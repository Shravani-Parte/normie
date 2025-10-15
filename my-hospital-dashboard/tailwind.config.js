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
        primary: {
          50: '#E0F2FF',
          100: '#B9E4FF',
          200: '#89D2FF',
          500: '#0077B6',
          600: '#00619B',
          700: '#023E8A',
          900: '#012A4A',
        },
        accent: {
          50: '#E0FBFF',
          100: '#B3F4FF',
          200: '#7AE8FF',
          500: '#00B4D8',
          600: '#0091B5',
          700: '#007A99',
        },
        grey: {
          50: '#F8FAFC',
          100: '#EDF2F7',
          200: '#D7DEE9',
          400: '#94A3B8',
          600: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        },
        success: {
          100: '#D9F3EE',
          500: '#2A9D8F',
          700: '#1E776C',
        },
        warning: {
          100: '#FFE8CF',
          500: '#F4A261',
          700: '#C4742B',
        },
        danger: {
          100: '#FAD4D8',
          500: '#E63946',
          700: '#B22432',
        }
      }
    },
  },
  plugins: [],
}
