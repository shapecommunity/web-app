import type { AccentName, MorphShapeName } from '../lib/shapePaths'

export type ShapeRecord = {
  slug: string
  name: string
  geometry: string
  material: string
  color: string
  previewShape: MorphShapeName
  previewAccent: AccentName
  shortDescription: string
  description: string
  tags: string[]
  dimensions: string
  compatibilitySummary: string
}

export const shapes: ShapeRecord[] = [
  {
    slug: 'cube',
    name: 'Cube',
    geometry: 'Prism',
    material: 'ABS plastic',
    color: 'Bright red',
    previewShape: 'square',
    previewAccent: 'red',
    shortDescription: 'Classic six-sided starter block with even edges.',
    description:
      'The Cube is the most recognizable starter shape in the collection. It is balanced, stackable, and easy to compare against rounded or tapered shapes.',
    tags: ['starter', 'balanced', 'stackable'],
    dimensions: '48mm x 48mm x 48mm',
    compatibilitySummary: 'Reliable baseline shape for future fit comparisons.',
  },
  {
    slug: 'orbit-disc',
    name: 'Orbit Disc',
    geometry: 'Cylinder',
    material: 'Gloss polymer',
    color: 'Signal blue',
    previewShape: 'circle',
    previewAccent: 'blue',
    shortDescription: 'Round profile with a smooth edge and low height.',
    description:
      'Orbit Disc is a flat circular piece used to compare rotational symmetry and compact silhouettes inside the catalogue.',
    tags: ['round', 'compact', 'smooth'],
    dimensions: '54mm diameter x 18mm tall',
    compatibilitySummary: 'Useful for later circular hole checks and loose-fit scenarios.',
  },
  {
    slug: 'apex-triangle',
    name: 'Apex Triangle',
    geometry: 'Triangular prism',
    material: 'Molded resin',
    color: 'Warm yellow',
    previewShape: 'triangle',
    previewAccent: 'yellow',
    shortDescription: 'Pointed profile designed to stress edge and corner handling.',
    description:
      'Apex Triangle introduces sharper transitions than the rounded pieces, which makes it a good visual counterpoint on the discover page.',
    tags: ['angular', 'pointed', 'contrast'],
    dimensions: '52mm wide x 48mm tall x 24mm deep',
    compatibilitySummary: 'Great candidate for future blocked or tight fit examples.',
  },
  {
    slug: 'nova-star',
    name: 'Nova Star',
    geometry: 'Star prism',
    material: 'Textured plastic',
    color: 'Toy orange',
    previewShape: 'star',
    previewAccent: 'orange',
    shortDescription: 'Expressive multi-point form with distinct pockets and peaks.',
    description:
      'Nova Star adds a more decorative silhouette to the collection and helps the catalogue feel less uniform when browsing many cards at once.',
    tags: ['decorative', 'expressive', 'peaks'],
    dimensions: '56mm point-to-point x 22mm deep',
    compatibilitySummary: 'Future compatibility logic can use it to demonstrate complex edge cases.',
  },
  {
    slug: 'luma-heart',
    name: 'Luma Heart',
    geometry: 'Heart block',
    material: 'Soft-touch polymer',
    color: 'Vivid purple',
    previewShape: 'heart',
    previewAccent: 'purple',
    shortDescription: 'Rounded heart silhouette with a soft valley at the top.',
    description:
      'Luma Heart brings an intentionally playful profile to the set and helps show how organic silhouettes could be presented in the same catalogue.',
    tags: ['organic', 'playful', 'rounded'],
    dimensions: '50mm wide x 46mm tall x 20mm deep',
    compatibilitySummary: 'Useful later for showing organic fit states and soft-corner comparisons.',
  },
  {
    slug: 'soft-rect',
    name: 'Soft Rect',
    geometry: 'Rounded rectangle',
    material: 'Matte ABS',
    color: 'Leaf green',
    previewShape: 'squircle',
    previewAccent: 'green',
    shortDescription: 'Rounded-rectangle body with soft corners and stable proportions.',
    description:
      'Soft Rect sits between the crisp cube and the fully circular pieces, which makes it a useful anchor for the discover catalogue.',
    tags: ['rounded', 'stable', 'transitional'],
    dimensions: '58mm x 42mm x 22mm',
    compatibilitySummary: 'Strong candidate for future button-like fit and alignment demos.',
  },
  {
    slug: 'vault-block',
    name: 'Vault Block',
    geometry: 'Tall prism',
    material: 'Rigid plastic',
    color: 'Deep orange',
    previewShape: 'square',
    previewAccent: 'orange',
    shortDescription: 'Tall, narrow block with a more architectural silhouette.',
    description:
      'Vault Block stretches the catalogue proportions vertically and gives the discover grid a better mix of weight and rhythm.',
    tags: ['tall', 'architectural', 'structured'],
    dimensions: '38mm x 62mm x 24mm',
    compatibilitySummary: 'Future fit tests can use it for height-sensitive cases.',
  },
  {
    slug: 'halo-round',
    name: 'Halo Round',
    geometry: 'Rounded puck',
    material: 'Gloss composite',
    color: 'Clear sky blue',
    previewShape: 'circle',
    previewAccent: 'blue',
    shortDescription: 'Rounded puck shape with a fuller edge than Orbit Disc.',
    description:
      'Halo Round provides a softer circular option with more volume, making it useful for comparing compact and full-body round shapes.',
    tags: ['rounded', 'full-body', 'soft'],
    dimensions: '50mm diameter x 28mm tall',
    compatibilitySummary: 'Later useful for loose vs snug rounded fit states.',
  },
  {
    slug: 'peak-prism',
    name: 'Peak Prism',
    geometry: 'Stepped triangle',
    material: 'Layered plastic',
    color: 'Bright yellow',
    previewShape: 'triangle',
    previewAccent: 'yellow',
    shortDescription: 'Triangular body with a stepped base and broad shoulders.',
    description:
      'Peak Prism broadens the triangular family so the catalogue can show multiple interpretations of angular geometry.',
    tags: ['angular', 'stepped', 'broad'],
    dimensions: '60mm wide x 44mm tall x 26mm deep',
    compatibilitySummary: 'Future fit logic can compare this against tighter triangular slots.',
  },
  {
    slug: 'petal-star',
    name: 'Petal Star',
    geometry: 'Rounded star',
    material: 'Injection-molded polymer',
    color: 'Fresh green',
    previewShape: 'star',
    previewAccent: 'green',
    shortDescription: 'Softer star form with rounded internal pockets.',
    description:
      'Petal Star feels friendlier than the sharper Nova Star, helping the grid show variation even inside the same general family.',
    tags: ['star', 'rounded', 'friendly'],
    dimensions: '58mm point-to-point x 22mm deep',
    compatibilitySummary: 'Good future candidate for shape-family comparison views.',
  },
  {
    slug: 'kind-heart',
    name: 'Kind Heart',
    geometry: 'Wide heart block',
    material: 'Soft matte polymer',
    color: 'Warm red',
    previewShape: 'heart',
    previewAccent: 'red',
    shortDescription: 'Wider heart silhouette with a lower, fuller body.',
    description:
      'Kind Heart provides a second organic profile so the catalogue can show a broader range than only strict geometric solids.',
    tags: ['organic', 'wide', 'soft'],
    dimensions: '58mm wide x 42mm tall x 20mm deep',
    compatibilitySummary: 'Useful later for showing how organic silhouettes compare to rounded slots.',
  },
  {
    slug: 'capsule-bar',
    name: 'Capsule Bar',
    geometry: 'Capsule block',
    material: 'Matte composite',
    color: 'Playful purple',
    previewShape: 'squircle',
    previewAccent: 'purple',
    shortDescription: 'Long capsule profile that reads almost like a button block.',
    description:
      'Capsule Bar is helpful both for catalogue variety and for future UI-driven demonstrations that mirror the morphing button language of the app itself.',
    tags: ['capsule', 'long', 'ui-like'],
    dimensions: '66mm x 30mm x 18mm',
    compatibilitySummary: 'Great future example for elongated fit comparisons.',
  },
]

export function getShapeBySlug(slug: string) {
  return shapes.find((shape) => shape.slug === slug)
}
