const shapeCardMocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  createShapeTransitionOverlay: vi.fn(),
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

  return {
    ...actual,
    useNavigate: () => shapeCardMocks.navigate,
  }
})

vi.mock('../lib/shapeCardTransition', () => ({
  createShapeTransitionOverlay: shapeCardMocks.createShapeTransitionOverlay,
}))

import userEvent from '@testing-library/user-event'
import { fireEvent, screen } from '@testing-library/react'
import { ShapeCard } from './ShapeCard'
import { renderWithRouter } from '../../test/helpers/renderWithRouter'
import { shapes } from '../data/shapes'

describe('ShapeCard', () => {
  beforeEach(() => {
    shapeCardMocks.navigate.mockClear()
    shapeCardMocks.createShapeTransitionOverlay.mockClear()
  })

  it('renders the shape summary', () => {
    renderWithRouter(<ShapeCard shape={shapes[0]} />)

    expect(screen.getByRole('link', { name: /Cube/i })).toHaveAttribute('href', '/shapes/cube')
    expect(screen.getByText('Prism')).toBeInTheDocument()
    expect(screen.getByText('Bright red')).toBeInTheDocument()
  })

  it('creates a transition overlay and navigates on a normal click', async () => {
    const user = userEvent.setup()

    renderWithRouter(<ShapeCard shape={shapes[0]} />)

    const preview = document.querySelector('.shape-card-preview-wrap') as HTMLDivElement

    vi.spyOn(preview, 'getBoundingClientRect').mockReturnValue({
      left: 12,
      top: 24,
      width: 48,
      height: 48,
      bottom: 72,
      right: 60,
      x: 12,
      y: 24,
      toJSON: () => ({}),
    })

    await user.click(screen.getByRole('link', { name: /Cube/i }))

    expect(shapeCardMocks.createShapeTransitionOverlay).toHaveBeenCalledWith({
      slug: 'cube',
      rect: { left: 12, top: 24, width: 48, height: 48 },
      previewShape: 'square',
      previewAccent: 'red',
    })
    expect(shapeCardMocks.navigate).toHaveBeenCalledWith('/shapes/cube')
  })

  it('does not intercept modifier-assisted clicks', () => {
    renderWithRouter(<ShapeCard shape={shapes[0]} />)

    fireEvent.click(screen.getByRole('link', { name: /Cube/i }), { metaKey: true })

    expect(shapeCardMocks.createShapeTransitionOverlay).not.toHaveBeenCalled()
    expect(shapeCardMocks.navigate).not.toHaveBeenCalled()
  })
})
