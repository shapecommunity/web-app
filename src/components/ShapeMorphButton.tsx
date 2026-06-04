import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { MorphShape } from './MorphShape'
import { useShapeMorph } from '../hooks/useShapeMorph'
import { getRandomAccent, type AccentName, textMorphShapes, type MorphShapeName } from '../lib/shapePaths'

type ShapeMorphButtonProps = {
  to: string
  label: string
  accent: AccentName
  defaultShape?: MorphShapeName
}

type ShapeMorphNavLinkProps = ShapeMorphButtonProps & {
  end?: boolean
}

function ShapeButtonContent({ label, accent, path }: { label: string; accent: AccentName; path: string }) {
  return (
    <>
      <MorphShape path={path} accent={accent} className="shape-button-surface" />
      <span className="shape-button-label">{label}</span>
    </>
  )
}

export function ShapeMorphButton({ to, label, accent, defaultShape }: ShapeMorphButtonProps) {
  const [currentAccent, setCurrentAccent] = useState<AccentName>(accent)
  const { path, animateRandom, animateToDefault } = useShapeMorph({
    defaultShape,
    shapePool: textMorphShapes,
  })

  function handleEnter() {
    setCurrentAccent(getRandomAccent([currentAccent]))
    animateRandom()
  }

  function handleLeave() {
    setCurrentAccent(accent)
    animateToDefault()
  }

  return (
    <Link
      className={`shape-button shape-button-hero accent-${accent}`}
      to={to}
      onPointerEnter={handleEnter}
      onPointerDown={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <ShapeButtonContent label={label} accent={currentAccent} path={path} />
    </Link>
  )
}

export function ShapeMorphNavLink({ to, label, accent, end = false, defaultShape }: ShapeMorphNavLinkProps) {
  const [currentAccent, setCurrentAccent] = useState<AccentName>(accent)
  const { path, animateRandom, animateToDefault } = useShapeMorph({
    defaultShape,
    shapePool: textMorphShapes,
    durationMs: 200,
  })

  function handleEnter() {
    setCurrentAccent(getRandomAccent([currentAccent]))
    animateRandom()
  }

  function handleLeave() {
    setCurrentAccent(accent)
    animateToDefault()
  }

  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `shape-button shape-button-nav accent-${accent}${isActive ? ' is-active' : ''}`
      }
      onPointerEnter={handleEnter}
      onPointerDown={handleEnter}
      onPointerLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <ShapeButtonContent label={label} accent={currentAccent} path={path} />
    </NavLink>
  )
}
