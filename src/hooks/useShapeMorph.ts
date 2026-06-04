import { useCallback, useEffect, useRef, useState } from 'react'
import { interpolate } from 'flubber'
import {
  defaultMorphShape,
  getRandomMorphShape,
  morphShapePaths,
  morphShapes,
  type MorphShapeName,
} from '../lib/shapePaths'

type UseShapeMorphOptions = {
  defaultShape?: MorphShapeName
  durationMs?: number
  shapePool?: MorphShapeName[]
}

function easeInOutQuad(progress: number) {
  if (progress < 0.5) {
    return 2 * progress * progress
  }

  return 1 - Math.pow(-2 * progress + 2, 2) / 2
}

export function useShapeMorph(options: UseShapeMorphOptions = {}) {
  const defaultShape = options.defaultShape ?? defaultMorphShape
  const durationMs = options.durationMs ?? 220
  const shapePool = options.shapePool ?? morphShapes
  const [path, setPath] = useState(morphShapePaths[defaultShape])
  const animationFrameRef = useRef<number | null>(null)
  const pathRef = useRef(path)
  const shapeRef = useRef(defaultShape)
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

  const finishAnimation = useCallback((nextShape: MorphShapeName) => {
    const nextPath = morphShapePaths[nextShape]

    pathRef.current = nextPath
    shapeRef.current = nextShape
    setPath(nextPath)
  }, [])

  const animateToShape = useCallback((nextShape: MorphShapeName) => {
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
      const progress = Math.min((timestamp - startTime) / durationMs, 1)
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
  }, [durationMs, finishAnimation])

  const animateRandom = useCallback((exclude: MorphShapeName[] = []) => {
    const nextShape = getRandomMorphShape(shapePool, [shapeRef.current, ...exclude])
    animateToShape(nextShape)
  }, [animateToShape, shapePool])

  const animateToDefault = useCallback(() => {
    animateToShape(defaultShape)
  }, [animateToShape, defaultShape])

  return {
    path,
    animateRandom,
    animateToDefault,
    animateToShape,
  }
}
