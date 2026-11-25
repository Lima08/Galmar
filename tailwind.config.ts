import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  prefix: '',
  corePlugins: { container: false },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        display: [
          'clamp(2rem, 1.4rem + 2.6vw, 3.5rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' }
        ],
        h2: [
          'clamp(1.75rem, 1.4rem + 1.5vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.01em' }
        ],
        h3: ['clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)', { lineHeight: '1.3' }]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#d52825',
          foreground: '#ffffff',
          dark: '#b3211f'
        },
        secondary: {
          DEFAULT: '#2983c2',
          foreground: '#ffffff',
          dark: '#1f6aa0',
          bg: '#eaf3fa'
        },
        // Exceções de terceiros (AD-016): cores oficiais, só nesses usos
        whatsapp: { DEFAULT: '#25d366', dark: '#1ebe5d' },
        rating: '#eab308',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindcssAnimate]
} satisfies Config

export default config
