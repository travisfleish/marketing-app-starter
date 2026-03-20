import type { Config } from 'tailwindcss'
import gsMarketingUiPreset from '@genius-sports/gs-marketing-ui/tailwind-preset'

const config: Config = {
  presets: [gsMarketingUiPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@genius-sports/gs-marketing-ui/dist/**/*.{js,mjs}',
    '../../gs-marketing-ui/gs-marketing-ui/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config