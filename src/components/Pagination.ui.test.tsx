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
import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  beforeEach(() => {
    shapeMorphMocks.animateRandom.mockClear()
    shapeMorphMocks.animateToDefault.mockClear()
  })

  it('does not render when there is only one page', () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders page controls and calls onPageChange for page navigation', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()

    render(<Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />)

    expect(screen.getByRole('button', { name: 'Prev' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled()
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Prev' }))
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1)
    expect(onPageChange).toHaveBeenNthCalledWith(2, 4)
    expect(onPageChange).toHaveBeenNthCalledWith(3, 3)
    expect(shapeMorphMocks.animateRandom).toHaveBeenCalled()
  })

  it('disables prev and next at the range boundaries', () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled()

    rerender(<Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />)

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  it('does not trigger hover morphing for disabled buttons', async () => {
    const user = userEvent.setup()

    render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />)

    await user.hover(screen.getByRole('button', { name: 'Prev' }))

    expect(shapeMorphMocks.animateRandom).not.toHaveBeenCalled()
  })
})
