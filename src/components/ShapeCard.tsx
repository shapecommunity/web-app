import { Link } from 'react-router-dom'
import type { ShapeRecord } from '../data/shapes'
import { MorphShape } from './MorphShape'
import { morphShapePaths } from '../lib/shapePaths'

type ShapeCardProps = {
  shape: ShapeRecord
}

export function ShapeCard({ shape }: ShapeCardProps) {
  return (
    <Link className="shape-card glass-panel" to={`/shapes/${shape.slug}`}>
      <div className="shape-card-preview-wrap">
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
