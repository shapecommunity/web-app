import { accentNames, morphShapes } from '../lib/shapePaths'
import type { ShapeRecord } from './shapes'
import { getShapeBySlug, shapes } from './shapes'

describe('shapes data', () => {
  it('returns the matching shape by slug', () => {
    expect(getShapeBySlug('cube')).toMatchObject({ slug: 'cube', name: 'Cube' })
  })

  it('returns undefined for an unknown slug', () => {
    expect(getShapeBySlug('unknown-shape')).toBeUndefined()
  })

  it('contains unique slugs and valid preview metadata', () => {
    const slugs = shapes.map((shape) => shape.slug)

    expect(new Set(slugs).size).toBe(slugs.length)

    expect(shapes).toSatisfy((records: ShapeRecord[]) =>
      records.every((shape: ShapeRecord) => morphShapes.includes(shape.previewShape) && accentNames.includes(shape.previewAccent)),
    )
  })
})
