import type { Config } from 'tailwindcss'
import gsMarketingUiPreset from '@genius-sports/gs-marketing-ui/tailwind-preset'

const config: Config = {
  presets: [gsMarketingUiPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    // Monorepo: package lives at ../packages (hoisting may also place it under ./node_modules)
    '../packages/gs-marketing-ui/src/**/*.{ts,tsx}',
    './node_modules/@genius-sports/gs-marketing-ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
