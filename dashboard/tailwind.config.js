/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { borderColor: 'rgba(239, 68, 68, 0.4)', boxShadow: '0 0 5px rgba(239, 68, 68, 0.2)' },
          '50%': { borderColor: 'rgba(239, 68, 68, 1)', boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
