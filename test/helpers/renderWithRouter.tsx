import { MemoryRouter } from 'react-router-dom'
import { render, type RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'

type RouterRenderOptions = RenderOptions & {
  route?: string
}

export function renderWithRouter(ui: ReactElement, { route = '/', ...options }: RouterRenderOptions = {}) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>, options)
}
