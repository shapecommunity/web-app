import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { interpolate } from 'flubber'
import {
  defaultMorphShape,
  getRandomMorphShape,
  morphShapePaths,
  type MorphShapeName,
} from '../lib/shapePaths'

type ShapeMorphButtonProps = {
  to: string
  label: string
  title: string
  detail: string
  accent: string
}

const MORPH_DURATION_MS = 220

function easeInOutQuad(progress: number) {
  if (progress < 0.5) {
    return 2 * progress * progress
  }

  return 1 - Math.pow(-2 * progress + 2, 2) / 2
}

export function ShapeMorphButton({ to, label, title, detail, accent }: ShapeMorphButtonProps) {
  const [path, setPath] = useState(morphShapePaths[defaultMorphShape])
  const [shape, setShape] = useState<MorphShapeName>(defaultMorphShape)
  const animationFrameRef = useRef<number | null>(null)
  const pathRef = useRef(path)
  const shapeRef = useRef(shape)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    reducedMotionRef.current = mediaQuery.matches

    function handleChange(event: MediaQueryListEvent) {
      reducedMotionRef.current = event.matches
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  function finishAnimation(nextShape: MorphShapeName) {
    const nextPath = morphShapePaths[nextShape]

    pathRef.current = nextPath
    shapeRef.current = nextShape
    setShape(nextShape)
    setPath(nextPath)
  }

  function animateToShape(nextShape: MorphShapeName) {
    if (shapeRef.current === nextShape && pathRef.current === morphShapePaths[nextShape]) {
      return
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (reducedMotionRef.current) {
      finishAnimation(nextShape)
      return
    }

    const fromPath = pathRef.current
    const toPath = morphShapePaths[nextShape]
    const morph = interpolate(fromPath, toPath, { maxSegmentLength: 1.5 })
    const startTime = performance.now()

    function tick(timestamp: number) {
      const progress = Math.min((timestamp - startTime) / MORPH_DURATION_MS, 1)
      const easedProgress = easeInOutQuad(progress)
      const nextPath = morph(easedProgress)

      pathRef.current = nextPath
      setPath(nextPath)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(tick)
        return
      }

      animationFrameRef.current = null
      finishAnimation(nextShape)
    }

    animationFrameRef.current = requestAnimationFrame(tick)
  }

  function handleEnter() {
    const nextShape = getRandomMorphShape([shapeRef.current])
    animateToShape(nextShape)
  }

  function handleLeave() {
    animateToShape(defaultMorphShape)
  }

  return (
    <Link
      className={`morph-action accent-${accent}`}
      to={to}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <span
        className="morph-button"
      >
        <svg className="morph-button-surface" viewBox="0 0 100 100" aria-hidden="true">
          <path d={path} />
        </svg>
        <span className="morph-button-label">{label}</span>
      </span>
      <span className="morph-action-copy">
        <strong>{title}</strong>
        <span>{detail}</span>
      </span>
    </Link>
  )
}
