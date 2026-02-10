import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        accent: '#F59E0B',
        danger: '#EF4444'
      }
    }
  },
  plugins: []
}

export default config
