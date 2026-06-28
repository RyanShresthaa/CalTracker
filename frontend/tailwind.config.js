/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-primary)',
        surface: 'var(--bg-card)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        coral: 'var(--coral)',
        'text-primary': 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        hover: 'var(--hover)',
        'on-accent': 'var(--on-accent)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', '"Space Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'label': ['11px', { lineHeight: '1', letterSpacing: '0.12em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-up': 'slideUp 0.4s ease-out both',
        'ring-pulse': 'ringPulse 2s ease-in-out 0.6s 1',
        'ring-fill': 'ringFill 600ms ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.82' },
        },
        ringFill: {
          from: { '--ring-deg': '0deg' },
          to: { '--ring-deg': 'var(--ring-target)' },
        },
      },
      transitionDuration: {
        expand: '300ms',
      },
    },
  },
  plugins: [],
}
