const useShapeMorphMocks = vi.hoisted(() => ({
  animateRandom: vi.fn(),
  animateToDefault: vi.fn(),
  animateToShape: vi.fn(),
}))

vi.mock('./hooks/useShapeMorph', () => ({
  useShapeMorph: () => ({
    path: 'M10 10H90V90H10Z',
    animateRandom: useShapeMorphMocks.animateRandom,
    animateToDefault: useShapeMorphMocks.animateToDefault,
    animateToShape: useShapeMorphMocks.animateToShape,
  }),
}))

import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { createShapeTransitionOverlay } from './lib/shapeCardTransition'
import { renderWithRouter } from '../test/helpers/renderWithRouter'
import { flushAnimationFrame, setMediaQueryMatches, triggerIntersection } from '../test/setup/browserMocks'

function renderApp(route = '/') {
  return renderWithRouter(<App />, { route })
}

describe('App routes', () => {
  beforeEach(() => {
    vi.useRealTimers()
    useShapeMorphMocks.animateRandom.mockClear()
    useShapeMorphMocks.animateToDefault.mockClear()
    useShapeMorphMocks.animateToShape.mockClear()
    vi.mocked(window.scrollTo).mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the home page and updates the animated brand on its interval', () => {
    vi.useFakeTimers()

    renderApp('/')

    expect(screen.getByRole('heading', { name: 'Shape Community App' })).toBeInTheDocument()
    expect(screen.getByText('Discover a large catalogue')).toBeInTheDocument()
    expect(screen.getByText(/Version 0\.1\.0/)).toBeInTheDocument()
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'auto' })

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(useShapeMorphMocks.animateRandom).toHaveBeenCalled()
  })

  it('renders desktop discover results, paginates, filters, and shows the empty state', async () => {
    const user = userEvent.setup()

    renderApp('/shapes')

    expect(screen.getByRole('heading', { name: 'Discover' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Cube/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Vault Block/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByRole('link', { name: /Vault Block/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Cube/i })).not.toBeInTheDocument()

    await user.clear(screen.getByRole('searchbox', { name: /Search catalogue/i }))
    await user.type(screen.getByRole('searchbox', { name: /Search catalogue/i }), 'heart')

    expect(screen.getByRole('link', { name: /Luma Heart/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Kind Heart/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument()

    await user.clear(screen.getByRole('searchbox', { name: /Search catalogue/i }))
    await user.type(screen.getByRole('searchbox', { name: /Search catalogue/i }), 'zzz')

    expect(screen.getByText('Nothing matched that search.')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Cube/i })).not.toBeInTheDocument()
  })

  it('renders mobile discover results and grows the list through the sentinel observer', async () => {
    setMediaQueryMatches('(max-width: 680px)', true)

    renderApp('/shapes')

    expect(screen.getByRole('link', { name: /Cube/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /Vault Block/i })).not.toBeInTheDocument()

    const sentinel = document.querySelector('.discover-sentinel')

    expect(sentinel).not.toBeNull()

    act(() => {
      triggerIntersection(sentinel as Element, false)
    })

    expect(screen.queryByRole('link', { name: /Vault Block/i })).not.toBeInTheDocument()

    act(() => {
      triggerIntersection(sentinel as Element, true)
    })

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Vault Block/i })).toBeInTheDocument()
    })

    act(() => {
      setMediaQueryMatches('(max-width: 680px)', false)
    })

    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('renders a shape detail page', () => {
    renderApp('/shapes/cube')

    expect(screen.getByRole('heading', { name: 'Cube' })).toBeInTheDocument()
    expect(screen.getByText('Future fit summary')).toBeInTheDocument()
    expect(screen.getByText('48mm x 48mm x 48mm')).toBeInTheDocument()
  })

  it('consumes the transition overlay on the detail page', async () => {
    createShapeTransitionOverlay({
      slug: 'cube',
      rect: { left: 10, top: 20, width: 30, height: 40 },
      previewShape: 'square',
      previewAccent: 'red',
    })

    renderApp('/shapes/cube')

    expect(document.querySelector('[data-shape-transition-overlay]')).not.toBeNull()

    act(() => {
      flushAnimationFrame()
    })

    await waitFor(() => {
      expect(Element.prototype.animate).toHaveBeenCalled()
      expect(document.querySelector('[data-shape-transition-overlay]')).toBeNull()
    })
  })

  it('renders the unknown shape state', () => {
    renderApp('/shapes/not-a-shape')

    expect(screen.getByRole('heading', { name: 'Unknown shape' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute('href', '/shapes')
  })

  it('renders the meta page', () => {
    renderApp('/meta')

    expect(screen.getByRole('heading', { name: 'Meta' })).toBeInTheDocument()
    expect(screen.getByText('Most viewed shapes')).toBeInTheDocument()
  })

  it('renders the not-found page for unknown routes', () => {
    renderApp('/outside')

    expect(screen.getByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Home' }).at(-1)).toHaveAttribute('href', '/')
    expect(screen.getAllByRole('link', { name: 'Discover' }).at(-1)).toHaveAttribute('href', '/shapes')
  })
})
