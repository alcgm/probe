module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#080B10',
        surface:  '#0F1419',
        surface2: '#141C26',
        accent:   '#E8FF47',
        orange:   '#FF6B35',
        muted:    '#4A5568',
        muted2:   '#2D3748',
        border:   'rgba(232,255,71,0.12)',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
