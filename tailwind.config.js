/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#FDFBF7', // Premium Cream Light
          container: {
            lowest: '#ffffff',
            low: '#F8F9FA',
            DEFAULT: '#F1F3F5',
            high: '#E9ECEF',
            highest: '#DEE2E6',
          }
        },
        primary: {
          DEFAULT: '#FFDD00', // THE HOLE YELLOW - Pixel Perfect
          container: '#FFEA00',
          fixed: '#FFF9C4',
          'fixed-dim': '#FFF176',
        },
        secondary: {
          DEFAULT: '#4A1E1E', // THE HOLE DEEP MAROON - Pixel Perfect
          container: '#601D1F',
          light: '#8D1614', // Accent Red
        },
        on: {
          surface: '#1A0F0F', // Deep Maroon-tinted Dark
          'surface-variant': '#4A3F3F',
          primary: '#1A0F0F',
        },
        outline: {
          DEFAULT: '#D1BFA7',
          variant: '#E5D9C8',
        },
        accent: {
          yellow: '#FFDD00',
          maroon: '#4A1E1E',
          red: '#8D1614',
          cream: '#FFF9E5',
        }
      },
      fontFamily: {
        headline: ['"DM Serif Display"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 30px 60px -12px rgba(74, 30, 30, 0.12)',
        'warm': '0 8px 32px rgba(74, 30, 30, 0.08)',
      },
      borderRadius: {
        'warm': '0.75rem',
        'cozy': '1rem',
        'editorial': '2rem',
      },
      keyframes: {
        'syrup-drip': {
          '0%': { clipPath: 'inset(0 0 100% 0)' },
          '100%': { clipPath: 'inset(0 0 0% 0)' },
        },
        'steam': {
          '0%, 100%': { opacity: 0, transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: 0.3, transform: 'translateY(-20px) scaleX(1.5)' },
        }
      },
      animation: {
        'syrup-drip': 'syrup-drip 1.2s ease-out forwards',
        'steam': 'steam 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
