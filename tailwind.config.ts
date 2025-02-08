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
        ballCombined: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '12.5%': { transform: 'translateY(2px) rotate(45deg)' },
          '25%': { transform: 'translateY(3px) rotate(90deg)' },
          '37.5%': { transform: 'translateY(2px) rotate(135deg)' },
          '50%': { transform: 'translateY(0px) rotate(180deg)' },
          '62.5%': { transform: 'translateY(2px) rotate(225deg)' },
          '75%': { transform: 'translateY(3px) rotate(270deg)' },
          '87.5%': { transform: 'translateY(2px) rotate(315deg)' },
          '100%': { transform: 'translateY(0px) rotate(360deg)' },
        },
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        clouds: {
          '0%': { transform: 'translateY(-175px)' },
          '100%': { transform: 'translateY(175px)' },
        },
      },
      animation: {
        shake: 'shake 2.5s infinite',
        ballCombined: 'ballCombined 2s infinite linear',
        clouds: 'clouds 1s infinite linear',
        rotate360: 'rotate360 3s infinite linear',
      },
    },
  },
  plugins: [],
};
export default config;
