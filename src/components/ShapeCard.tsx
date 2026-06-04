import { Link } from 'react-router-dom'
import type { ShapeRecord } from '../data/shapes'

type ShapeCardProps = {
  shape: ShapeRecord
}

export function ShapeCard({ shape }: ShapeCardProps) {
  return (
    <Link className="shape-card glass-panel" to={`/shapes/${shape.slug}`}>
      <div className="shape-card-preview-wrap">
        <span
          aria-hidden="true"
          className={`shape-glyph shape-${shape.previewShape} accent-${shape.previewAccent} shape-card-preview`}
        />
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
