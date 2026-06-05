import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ShapeRecord } from '../data/shapes'
import { MorphShape } from './MorphShape'
import { morphShapePaths } from '../lib/shapePaths'
import { createShapeTransitionOverlay } from '../lib/shapeCardTransition'

type ShapeCardProps = {
  shape: ShapeRecord
}

export function ShapeCard({ shape }: ShapeCardProps) {
  const navigate = useNavigate()
  const previewRef = useRef<HTMLDivElement | null>(null)

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return
    }

    event.preventDefault()

    const previewRect = previewRef.current?.getBoundingClientRect()

    if (previewRect) {
      createShapeTransitionOverlay({
        slug: shape.slug,
        rect: {
          left: previewRect.left,
          top: previewRect.top,
          width: previewRect.width,
          height: previewRect.height,
        },
        previewShape: shape.previewShape,
        previewAccent: shape.previewAccent,
      })
    }

    navigate(`/shapes/${shape.slug}`)
  }

  return (
    <Link className="shape-card glass-panel" to={`/shapes/${shape.slug}`} onClick={handleClick}>
      <div ref={previewRef} className="shape-card-preview-wrap shape-transition-preview" style={{ viewTransitionName: `shape-preview-${shape.slug}` }}>
        <MorphShape path={morphShapePaths[shape.previewShape]} accent={shape.previewAccent} className="shape-card-preview" />
      </div>
      <div className="shape-card-copy">
        <span className="mono-label">{shape.geometry}</span>
        <h3>{shape.name}</h3>
        <p>{shape.shortDescription}</p>
      </div>
      <div className="shape-card-meta">
        <span>{shape.color}</span>
        <span>{shape.material}</span>
      </div>
    </Link>
  )
}
