import { useId } from 'react'
import { accentGradientStops, type AccentName } from '../lib/shapePaths'

type MorphShapeProps = {
  path: string
  accent: AccentName
  className?: string
}

export function MorphShape({ path, accent, className = '' }: MorphShapeProps) {
  const gradientId = useId()
  const stops = accentGradientStops[accent]

  return (
    <svg className={`morph-shape accent-${accent} ${className}`.trim()} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="16" y1="12" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop className="morph-gradient-stop" offset="0%" style={{ stopColor: stops.start }} />
          <stop className="morph-gradient-stop" offset="100%" style={{ stopColor: stops.end }} />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${gradientId})`} />
    </svg>
  )
}
