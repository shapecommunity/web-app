import { Link, NavLink } from 'react-router-dom'
import { MorphShape } from './MorphShape'
import { useShapeMorph } from '../hooks/useShapeMorph'
import { textMorphShapes, type MorphShapeName } from '../lib/shapePaths'

type ShapeMorphButtonProps = {
  to: string
  label: string
  accent: string
  defaultShape?: MorphShapeName
}

type ShapeMorphNavLinkProps = ShapeMorphButtonProps & {
  end?: boolean
}

function ShapeButtonContent({ label, accent, path }: { label: string; accent: string; path: string }) {
  return (
    <>
      <MorphShape path={path} accent={accent} className="shape-button-surface" />
      <span className="shape-button-label">{label}</span>
    </>
  )
}

export function ShapeMorphButton({ to, label, accent, defaultShape }: ShapeMorphButtonProps) {
  const { path, animateRandom, animateToDefault } = useShapeMorph({
    defaultShape,
    shapePool: textMorphShapes,
  })

  return (
    <Link
      className={`shape-button shape-button-hero accent-${accent}`}
      to={to}
      onPointerEnter={() => animateRandom()}
      onPointerLeave={animateToDefault}
      onFocus={() => animateRandom()}
      onBlur={animateToDefault}
    >
      <ShapeButtonContent label={label} accent={accent} path={path} />
    </Link>
  )
}

export function ShapeMorphNavLink({ to, label, accent, end = false, defaultShape }: ShapeMorphNavLinkProps) {
  const { path, animateRandom, animateToDefault } = useShapeMorph({
    defaultShape,
    shapePool: textMorphShapes,
    durationMs: 200,
  })

  return (
    <NavLink
      to={to}
      end={end}
      className={`shape-button shape-button-nav accent-${accent}`}
      onPointerEnter={() => animateRandom()}
      onPointerLeave={animateToDefault}
      onFocus={() => animateRandom()}
      onBlur={animateToDefault}
    >
      <ShapeButtonContent label={label} accent={accent} path={path} />
    </NavLink>
  )
}
