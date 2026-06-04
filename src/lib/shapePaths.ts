export type MorphShapeName =
  | 'button'
  | 'buttonSlim'
  | 'square'
  | 'circle'
  | 'squircle'
  | 'diamond'
  | 'hexagon'
  | 'octagon'
  | 'triangle'
  | 'star'
  | 'heart'
  | 'pill'
  | 'arch'
  | 'clover'
  | 'burst'

export const defaultMorphShape: MorphShapeName = 'pill'

export const morphShapes: MorphShapeName[] = [
  'button',
  'square',
  'circle',
  'squircle',
  'diamond',
  'hexagon',
  'octagon',
  'triangle',
  'star',
  'heart',
  'pill',
  'arch',
  'clover',
  'burst',
]

export const textMorphShapes: MorphShapeName[] = [
  'button',
  'buttonSlim',
  'square',
  'circle',
  'squircle',
  'pill',
  'octagon',
  'diamond',
  'hexagon',
]

export const expressiveMorphShapes: MorphShapeName[] = morphShapes

export const morphShapePaths: Record<MorphShapeName, string> = {
  button:
    'M10 28C10 18.0589 18.0589 10 28 10H72C81.9411 10 90 18.0589 90 28V72C90 81.9411 81.9411 90 72 90H28C18.0589 90 10 81.9411 10 72V28Z',
  buttonSlim:
    'M10 34C10 25.1634 17.1634 18 26 18H74C82.8366 18 90 25.1634 90 34V66C90 74.8366 82.8366 82 74 82H26C17.1634 82 10 74.8366 10 66V34Z',
  square: 'M14 14H86V86H14Z',
  circle:
    'M50 10C72.0914 10 90 27.9086 90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50C10 27.9086 27.9086 10 50 10Z',
  squircle:
    'M24 10C37 10 63 10 76 10C86.5 10 90 13.5 90 24V76C90 86.5 86.5 90 76 90C63 90 37 90 24 90C13.5 90 10 86.5 10 76V24C10 13.5 13.5 10 24 10Z',
  diamond: 'M50 8L92 50L50 92L8 50Z',
  hexagon: 'M30 10H70L90 50L70 90H30L10 50Z',
  octagon: 'M28 10H72L90 28V72L72 90H28L10 72V28Z',
  triangle: 'M50 8L92 86H8Z',
  star:
    'M50 8L60.5801 35.4381H89.9444L66.1821 53.1238L75.2632 81.5619L50 64.8762L24.7368 81.5619L33.8179 53.1238L10.0556 35.4381H39.4199L50 8Z',
  heart:
    'M50 88C46.5 83.9 42.3 80.4 37.9 76.9C20.5 63 8 50.8 8 33.5C8 19.2 19.2 8 33.5 8C41.6 8 47.8 11.7 50 17.5C52.2 11.7 58.4 8 66.5 8C80.8 8 92 19.2 92 33.5C92 50.8 79.5 63 62.1 76.9C57.7 80.4 53.5 83.9 50 88Z',
  pill:
    'M18 18H82C87.5228 18 92 22.4772 92 28V72C92 77.5228 87.5228 82 82 82H18C12.4772 82 8 77.5228 8 72V28C8 22.4772 12.4772 18 18 18Z',
  arch:
    'M18 90V42C18 23.2223 32.9985 8 50 8C67.0015 8 82 23.2223 82 42V90Z',
  clover:
    'M50 14C58.8366 14 66 21.1634 66 30C66 33.369 64.9591 36.4949 63.1823 39.0746C67.5758 39.1922 71.7335 41.0056 74.8284 44.1005C81.0772 50.3492 81.0772 60.4802 74.8284 66.729C71.7335 69.8239 67.5758 71.6373 63.1823 71.7549C64.9591 74.3347 66 77.4605 66 80.8295C66 89.6661 58.8366 96.8295 50 96.8295C41.1634 96.8295 34 89.6661 34 80.8295C34 77.4605 35.0409 74.3347 36.8177 71.7549C32.4242 71.6373 28.2665 69.8239 25.1716 66.729C18.9228 60.4802 18.9228 50.3492 25.1716 44.1005C28.2665 41.0056 32.4242 39.1922 36.8177 39.0746C35.0409 36.4949 34 33.369 34 30C34 21.1634 41.1634 14 50 14Z',
  burst:
    'M50 8L60 24L78.2843 21.7157L76 40L92 50L76 60L78.2843 78.2843L60 76L50 92L40 76L21.7157 78.2843L24 60L8 50L24 40L21.7157 21.7157L40 24L50 8Z',
}

export function getRandomMorphShape(pool: MorphShapeName[] = morphShapes, exclude: MorphShapeName[] = []) {
  const candidates = pool.filter((shape) => !exclude.includes(shape))
  return candidates[Math.floor(Math.random() * candidates.length)] ?? defaultMorphShape
}
