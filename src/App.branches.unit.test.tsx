import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderToString } from 'react-dom/server'

describe('App branch coverage', () => {
  it('renders ShapesPage when window is unavailable during initial state calculation', async () => {
    vi.resetModules()

    const originalWindow = globalThis.window

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: undefined,
    })

    vi.doMock('./components/ShapeCard', () => ({
      ShapeCard: ({ shape }: { shape: { name: string } }) => <div>{shape.name}</div>,
    }))

    vi.doMock('./components/Pagination', () => ({
      Pagination: () => <div>Pagination stub</div>,
    }))

    const { ShapesPage } = await import('./App')

    expect(renderToString(<ShapesPage />)).toContain('Discover')

    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: originalWindow,
    })

    vi.doUnmock('./components/ShapeCard')
    vi.doUnmock('./components/Pagination')
  })

  it('renders the fallback detail page when no slug is available', async () => {
    vi.resetModules()

    vi.doMock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

      return {
        ...actual,
        useParams: () => ({}),
      }
    })

    const { ShapeDetailPage } = await import('./App')

    render(
      <MemoryRouter>
        <ShapeDetailPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Unknown shape' })).toBeInTheDocument()

    vi.doUnmock('react-router-dom')
  })
})
