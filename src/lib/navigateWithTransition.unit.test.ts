import { navigateWithTransition } from './navigateWithTransition'

describe('navigateWithTransition', () => {
  it('uses the view transition API when it exists', () => {
    const navigate = vi.fn()
    const startViewTransition = vi.fn((callback: () => void) => {
      callback()
      return { finished: Promise.resolve() }
    })

    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: startViewTransition,
    })

    navigateWithTransition(navigate, '/shapes')

    expect(startViewTransition).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/shapes')
  })

  it('falls back to direct navigation when the view transition API is unavailable', () => {
    const navigate = vi.fn()

    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: undefined,
    })

    navigateWithTransition(navigate, '/meta')

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/meta')
  })
})
