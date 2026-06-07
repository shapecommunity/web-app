const shapeMorphMocks = vi.hoisted(() => ({
  animateRandom: vi.fn(),
  animateToDefault: vi.fn(),
}))

vi.mock('../hooks/useShapeMorph', () => ({
  useShapeMorph: () => ({
    path: 'M10 10H90V90H10Z',
    animateRandom: shapeMorphMocks.animateRandom,
    animateToDefault: shapeMorphMocks.animateToDefault,
  }),
}))

import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'
import { ShapeMorphButton, ShapeMorphNavLink } from './ShapeMorphButton'
import { renderWithRouter } from '../../test/helpers/renderWithRouter'

beforeEach(() => {
  shapeMorphMocks.animateRandom.mockClear()
  shapeMorphMocks.animateToDefault.mockClear()
})

describe('ShapeMorphButton', () => {
  it('renders a link and triggers morph handlers from pointer and focus interactions', async () => {
    const user = userEvent.setup()

    renderWithRouter(<ShapeMorphButton to="/shapes" label="Discover" accent="yellow" />)

    const link = screen.getByRole('link', { name: 'Discover' })

    expect(link).toHaveAttribute('href', '/shapes')

    await user.hover(link)
    await user.unhover(link)
    link.focus()
    link.blur()

    expect(shapeMorphMocks.animateRandom).toHaveBeenCalled()
    expect(shapeMorphMocks.animateToDefault).toHaveBeenCalled()
  })
})

describe('ShapeMorphNavLink', () => {
  it('marks the current route as active', () => {
    renderWithRouter(<ShapeMorphNavLink to="/meta" label="Meta" accent="green" />, { route: '/meta' })

    expect(screen.getByRole('link', { name: 'Meta' })).toHaveClass('is-active')
  })

  it('triggers enter and leave morph handlers', async () => {
    const user = userEvent.setup()

    renderWithRouter(<ShapeMorphNavLink to="/meta" label="Meta" accent="green" />, { route: '/' })

    const link = screen.getByRole('link', { name: 'Meta' })

    await user.hover(link)
    await user.unhover(link)
    link.focus()
    link.blur()

    expect(shapeMorphMocks.animateRandom).toHaveBeenCalled()
    expect(shapeMorphMocks.animateToDefault).toHaveBeenCalled()
  })
})
