import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:         '#080808',
        surface:    '#0F0F0F',
        'surface-2':'#161616',
        border:     '#1E1E1E',
        'text-primary': '#F0F0F0',
        'text-muted':   '#6B6B6B',
        'text-dim':     '#3A3A3A',
        gold:       '#C9A84C',
        'gold-light':'#E8C96B',
        'gold-dim': '#8B6F2E',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 14vw, 14rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(3rem, 8vw, 8rem)',  { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 5rem)',  { lineHeight: '1.0',  letterSpacing: '-0.01em' }],
        'title':      ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1' }],
        'body-lg':    ['1.125rem', { lineHeight: '1.7' }],
      },
      spacing: {
        'section': 'clamp(6rem, 12vw, 12rem)',
      },
      transitionTimingFunction: {
        'expo-out':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'circ-out':  'cubic-bezier(0, 0.55, 0.45, 1)',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-line': {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':      { transform: 'translate(-2%, -3%)' },
          '20%':      { transform: 'translate(2%, 2%)' },
          '30%':      { transform: 'translate(-1%, 3%)' },
          '40%':      { transform: 'translate(2%, -1%)' },
          '50%':      { transform: 'translate(-2%, 2%)' },
          '60%':      { transform: 'translate(1%, -2%)' },
          '70%':      { transform: 'translate(-2%, 1%)' },
          '80%':      { transform: 'translate(2%, 3%)' },
          '90%':      { transform: 'translate(-1%, -2%)' },
        },
      },
      animation: {
        marquee:   'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        grain:     'grain 8s steps(1) infinite',
      },
    },
  },
  plugins: [],
}

export default config
