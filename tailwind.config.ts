
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'radiant-glow': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        'chest-glow': {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 5px hsl(var(--primary)))' },
          '50%': { transform: 'scale(1.05)', filter: 'drop-shadow(0 0 15px hsl(var(--primary)))' },
        },
        wave: {
          '0%': { transform: 'scaleY(.3)' },
          '20%': { transform: 'scaleY(1)' },
          '40%': { transform: 'scaleY(.5)' },
          '60%': { transform: 'scaleY(.85)' },
          '80%': { transform: 'scaleY(.4)' },
          '100%': { transform: 'scaleY(.9)' },
        },
        'wheel-spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(1080deg)' },
        },
        'vote-pop': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3) rotate(-10deg)' },
          '100%': { transform: 'scale(1)' },
        },
        'wave-flow': {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(5px, -2.5px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        'note-fall': {
            '0%': { transform: 'translateY(-100%) scale(0.5)', opacity: '0' },
            '20%': { transform: 'translateY(-80%) scale(0.7)', opacity: '1' },
            '100%': { transform: 'translateY(120vh) scale(1.5)', opacity: '0' },
        },
        'grid-bg': {
            '0%': { 'background-position': '0 0' },
            '100%': { 'background-position': '0 40px' },
        },
        'score-popup': {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '1' },
          '100%': { transform: 'translateY(-80px) scale(1.5)', opacity: '0' },
        },
        'laser-scan': {
          '0%': { left: '0%', transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(0%)' },
        },
        'card-pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' }
        },
        'shine': {
            '0%': { 'background-position': '-200% 0' },
            '100%': { 'background-position': '200% 0' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100%) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        spin: 'spin 20s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'radiant-glow': 'radiant-glow 15s ease-in-out infinite',
        'chest-glow': 'chest-glow 2s ease-in-out infinite',
        'wheel-spin': 'wheel-spin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'vote-pop': 'vote-pop 0.5s ease-in-out',
        'note-fall': 'note-fall 4s linear',
        'grid-bg': 'grid-bg 2s linear infinite',
        'score-popup': 'score-popup 1s ease-out forwards',
        'laser-scan': 'laser-scan 2s ease-in-out infinite alternate',
        'shine': 'shine 1.5s infinite linear',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'confetti-fall': 'confetti-fall 7s linear infinite',
      },
      boxShadow: {
        'primary': '0 0 15px 3px hsl(var(--primary) / 0.5)',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
