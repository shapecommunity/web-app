export type MorphShapeName = 'rounded' | 'square' | 'circle' | 'squircle'

export const defaultMorphShape: MorphShapeName = 'rounded'

export const morphShapes: MorphShapeName[] = ['rounded', 'square', 'circle', 'squircle']

export const morphShapePaths: Record<MorphShapeName, string> = {
  rounded:
    'M18 12H82C85.3137 12 88 14.6863 88 18V82C88 85.3137 85.3137 88 82 88H18C14.6863 88 12 85.3137 12 82V18C12 14.6863 14.6863 12 18 12Z',
  square: 'M14 14H86V86H14Z',
  circle:
    'M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50C10 27.9086 27.9086 10 50 10Z',
  squircle:
    'M24 10C37 10 63 10 76 10C86.5 10 90 13.5 90 24V76C90 86.5 86.5 90 76 90C63 90 37 90 24 90C13.5 90 10 86.5 10 76V24C10 13.5 13.5 10 24 10Z',
}

export function getRandomMorphShape(exclude: MorphShapeName[] = []) {
  const candidates = morphShapes.filter((shape) => !exclude.includes(shape))
  return candidates[Math.floor(Math.random() * candidates.length)] ?? defaultMorphShape
}
