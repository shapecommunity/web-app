import { createShapeTransitionOverlay, getShapeTransitionOverlay, removeExistingShapeTransitionOverlay } from './shapeCardTransition'

describe('shapeCardTransition', () => {
  it('creates a transition overlay with the provided shape metadata', () => {
    createShapeTransitionOverlay({
      slug: 'cube',
      rect: { left: 10, top: 20, width: 30, height: 40 },
      previewShape: 'square',
      previewAccent: 'red',
    })

    const overlay = getShapeTransitionOverlay('cube')

    expect(overlay).not.toBeNull()
    expect(overlay).toHaveAttribute('data-shape-transition-overlay', 'cube')
    expect(overlay).toHaveStyle({ left: '10px', top: '20px', width: '30px', height: '40px' })
    expect(overlay?.style.getPropertyValue('--transition-accent')).toBe('var(--red)')
    expect(overlay?.querySelector('path')).toHaveAttribute('d', expect.stringContaining('M14 14H86V86H14Z'))
  })

  it('replaces any existing overlay before creating a new one', () => {
    createShapeTransitionOverlay({
      slug: 'cube',
      rect: { left: 0, top: 0, width: 10, height: 10 },
      previewShape: 'square',
      previewAccent: 'red',
    })

    createShapeTransitionOverlay({
      slug: 'orbit-disc',
      rect: { left: 5, top: 5, width: 20, height: 20 },
      previewShape: 'circle',
      previewAccent: 'blue',
    })

    expect(document.querySelectorAll('[data-shape-transition-overlay]')).toHaveLength(1)
    expect(getShapeTransitionOverlay('cube')).toBeNull()
    expect(getShapeTransitionOverlay('orbit-disc')).not.toBeNull()
  })

  it('removes an existing overlay', () => {
    createShapeTransitionOverlay({
      slug: 'cube',
      rect: { left: 0, top: 0, width: 10, height: 10 },
      previewShape: 'square',
      previewAccent: 'red',
    })

    removeExistingShapeTransitionOverlay()

    expect(document.querySelector('[data-shape-transition-overlay]')).toBeNull()
  })
})
