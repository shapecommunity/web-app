import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vite.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ['src/**/*.ui.test.tsx', 'src/**/*.routes.test.tsx'],
    },
  }),
)
