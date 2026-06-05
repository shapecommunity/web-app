import {
  accentNames,
  defaultMorphShape,
  getRandomAccent,
  getRandomMorphShape,
  morphShapePaths,
  morphShapes,
  type MorphShapeName,
} from './shapePaths'

describe('shapePaths', () => {
  it('contains a path for every registered morph shape', () => {
    expect(morphShapes).toSatisfy((shapes: MorphShapeName[]) =>
      shapes.every((shape: MorphShapeName) => typeof morphShapePaths[shape] === 'string'),
    )
  })

  it('returns a random morph shape from the provided pool', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99)

    expect(getRandomMorphShape(['circle', 'square'])).toBe('square')
  })

  it('excludes shapes and falls back to the default morph shape when no candidates remain', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(getRandomMorphShape(['circle'], ['circle'])).toBe(defaultMorphShape)
  })

  it('returns a random accent that is not excluded', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(getRandomAccent(['red'])).toBe('yellow')
  })

  it('falls back to the first accent when all candidates are excluded', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    expect(getRandomAccent(accentNames)).toBe(accentNames[0])
  })
})
