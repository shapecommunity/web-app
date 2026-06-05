import { morphShapePaths, type AccentName, type MorphShapeName } from './shapePaths'

type TransitionRect = {
  left: number
  top: number
  width: number
  height: number
}

const OVERLAY_SELECTOR = '[data-shape-transition-overlay]'

export function removeExistingShapeTransitionOverlay() {
  document.querySelector(OVERLAY_SELECTOR)?.remove()
}

export function createShapeTransitionOverlay({
  slug,
  rect,
  previewShape,
  previewAccent,
}: {
  slug: string
  rect: TransitionRect
  previewShape: MorphShapeName
  previewAccent: AccentName
}) {
  removeExistingShapeTransitionOverlay()

  const previewOverlay = document.createElement('div')
  previewOverlay.className = 'shape-transition-overlay shape-transition-overlay-preview'
  previewOverlay.dataset.shapeTransitionOverlay = slug
  previewOverlay.innerHTML = `<div class="shape-transition-overlay-preview-shell"><svg viewBox="0 0 100 100" class="shape-transition-overlay-shape"><path d="${morphShapePaths[previewShape]}"></path></svg></div>`
  previewOverlay.style.left = `${rect.left}px`
  previewOverlay.style.top = `${rect.top}px`
  previewOverlay.style.width = `${rect.width}px`
  previewOverlay.style.height = `${rect.height}px`
  previewOverlay.style.setProperty('--transition-accent', `var(--${previewAccent})`)

  document.body.append(previewOverlay)
}

export function getShapeTransitionOverlay(slug: string) {
  const overlay = document.querySelector<HTMLElement>(OVERLAY_SELECTOR)
  return overlay?.dataset.shapeTransitionOverlay === slug ? overlay : null
}
