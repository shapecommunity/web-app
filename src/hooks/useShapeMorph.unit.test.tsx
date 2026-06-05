import { renderHook, act } from '@testing-library/react'
import { interpolate } from 'flubber'
import { flushAnimationFrame, setMediaQueryMatches } from '../../test/setup/browserMocks'
import { morphShapePaths } from '../lib/shapePaths'
import { useShapeMorph } from './useShapeMorph'

vi.mock('flubber', () => ({
  interpolate: vi.fn(() => (progress: number) => `morphed-${progress.toFixed(2)}`),
}))

describe('useShapeMorph', () => {
  it('starts with the default shape path', () => {
    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle' }))

    expect(result.current.path).toBe(morphShapePaths.circle)
  })

  it('does nothing when asked to animate to the current shape', () => {
    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle' }))

    act(() => {
      result.current.animateToShape('circle')
    })

    expect(window.requestAnimationFrame).not.toHaveBeenCalled()
    expect(result.current.path).toBe(morphShapePaths.circle)
  })

  it('switches immediately when reduced motion is enabled', () => {
    setMediaQueryMatches('(prefers-reduced-motion: reduce)', true)

    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle' }))

    act(() => {
      result.current.animateToShape('square')
    })

    expect(result.current.path).toBe(morphShapePaths.square)
    expect(window.requestAnimationFrame).not.toHaveBeenCalled()
  })

  it('updates reduced-motion behavior when the media query changes', () => {
    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle' }))

    act(() => {
      setMediaQueryMatches('(prefers-reduced-motion: reduce)', true)
      result.current.animateToShape('square')
    })

    expect(result.current.path).toBe(morphShapePaths.square)
  })

  it('animates to the next shape and finishes on the final path', () => {
    vi.spyOn(performance, 'now').mockReturnValue(0)

    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle', durationMs: 100 }))

    act(() => {
      result.current.animateToShape('square')
    })

    expect(interpolate).toHaveBeenCalledWith(morphShapePaths.circle, morphShapePaths.square, { maxSegmentLength: 1.5 })
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    act(() => {
      flushAnimationFrame(25)
    })

    expect(result.current.path).toBe('morphed-0.13')

    act(() => {
      flushAnimationFrame(50)
    })

    expect(result.current.path).toBe('morphed-0.50')

    act(() => {
      flushAnimationFrame(100)
    })

    expect(result.current.path).toBe(morphShapePaths.square)
  })

  it('cancels an existing animation before starting a new one', () => {
    vi.spyOn(performance, 'now').mockReturnValue(0)

    const { result } = renderHook(() => useShapeMorph({ defaultShape: 'circle', durationMs: 100 }))

    act(() => {
      result.current.animateToShape('square')
      result.current.animateToShape('triangle')
    })

    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1)
  })

  it('animates to a random shape and back to the default shape', () => {
    setMediaQueryMatches('(prefers-reduced-motion: reduce)', true)
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { result } = renderHook(() =>
      useShapeMorph({
        defaultShape: 'circle',
        shapePool: ['circle', 'square'],
      }),
    )

    act(() => {
      result.current.animateRandom()
    })

    expect(result.current.path).toBe(morphShapePaths.square)

    act(() => {
      result.current.animateToDefault()
    })

    expect(result.current.path).toBe(morphShapePaths.circle)
  })

  it('cancels a queued animation frame on unmount', () => {
    vi.spyOn(performance, 'now').mockReturnValue(0)

    const { result, unmount } = renderHook(() => useShapeMorph({ defaultShape: 'circle' }))

    act(() => {
      result.current.animateToShape('square')
    })

    unmount()

    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(1)
  })
})
