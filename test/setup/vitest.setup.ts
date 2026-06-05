import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'
import { installBrowserMocks, resetBrowserMocks, setMediaQueryMatches } from './browserMocks'

beforeAll(() => {
  installBrowserMocks()
})

afterEach(() => {
  cleanup()
  resetBrowserMocks()
  setMediaQueryMatches('(prefers-reduced-motion: reduce)', false)
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})
