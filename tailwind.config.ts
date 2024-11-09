import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        ivory: {
          100: '#fffff0',
          150: '#fbf5df',
        },
        grafit: {
          100: '#303030',
        },
        grass: {
          10: '#f0fff4',
          15: '#dcfce7',
          20: '#c6f6d5',
          25: '#9ae6b4',
          30: '#9ae6b4',
          35: '#7ee2a8',
          40: '#68d391',
          45: '#48bb78',
          50: '#72eb3a',
          60: '#5d9d0b',
          70: '#365a08',
          100: '#5d9d0b',
          150: '#365a08',
        },
      },
      keyframes: {
        shake: {
          '0%, 25%': { transform: 'translate(0, 0) rotate(0deg)' },
          '5%, 15%': { transform: 'translate(0.5px, 0.5px) rotate(0.1deg)' },
          '10%, 20%': {
            transform: 'translate(-0.5px, -0.5px) rotate(-0.1deg)',
          },
        },
        fallAndBounce: {
          '0%': { transform: 'translateY(-80px)' },
          '20%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-50px)' },
          '55%': { transform: 'translateY(0)' },
          '70%': { transform: 'translateY(-30px)' },
          '80%': { transform: 'translateY(0)' },
          '85%': { transform: 'translateY(-10px)' },
          '90%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        shake: 'shake 2.5s infinite',
        fallAndBounce: 'fallAndBounce 2s infinite ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
