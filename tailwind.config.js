/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc3ff',
          400: '#36a2f5',
          500: '#0f84e0',
          600: '#0366bf',
          700: '#04519c',
          800: '#0a4581',
          900: '#0e3b6b',
          950: '#082447'
        },
        ink: {
          50: '#f7f9fc',
          100: '#eef3f9',
          200: '#d9e2ee',
          300: '#b9c6d6',
          400: '#8ea0b9',
          500: '#6b7e9a',
          600: '#51647f',
          700: '#3f5068',
          800: '#2e3e54',
          900: '#13283f',
          950: '#0a1a2e'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Sora', '"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 16px 36px rgba(10, 44, 85, 0.12)',
        glow: '0 22px 60px rgba(10, 44, 85, 0.18)',
        ring: '0 0 0 1px rgba(12, 75, 140, 0.14), 0 18px 40px rgba(7, 33, 67, 0.1)'
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(180deg, #f7fbff 0%, #edf4fb 100%)',
        'glass-gradient':
          'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%)'
      },
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        'float-medium': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
};
