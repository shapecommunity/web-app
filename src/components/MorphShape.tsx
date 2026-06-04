type MorphShapeProps = {
  path: string
  accent: string
  className?: string
}

export function MorphShape({ path, accent, className = '' }: MorphShapeProps) {
  return (
    <svg className={`morph-shape accent-${accent} ${className}`.trim()} viewBox="0 0 100 100" aria-hidden="true">
      <path d={path} />
    </svg>
  )
}
