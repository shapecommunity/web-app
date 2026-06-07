import { defineConfig, mergeConfig } from 'vitest/config'
import baseConfig from './vite.config'

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ['src/**/*.unit.test.ts', 'src/**/*.unit.test.tsx'],
    },
  }),
)
