/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#09080f',
        accent: {
          amber: '#f59e0b',
          cyan: '#06b6d4',
          pink: '#ec4899',
          purple: '#a855f7',
          rose: '#f43f5e',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-y': 'float-y 5s ease-in-out infinite',
      },
      boxShadow: {
        'glow-amber': '0 0 30px rgba(245, 158, 11, 0.35)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.3)',
      },
    },
  },
  plugins: [],
}
