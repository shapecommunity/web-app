import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { ShapeMorphButton, ShapeMorphNavLink } from './components/ShapeMorphButton'
import { MorphShape } from './components/MorphShape'
import { ShapeCard } from './components/ShapeCard'
import { Pagination } from './components/Pagination'
import { getShapeBySlug, shapes, type ShapeRecord } from './data/shapes'
import { useShapeMorph } from './hooks/useShapeMorph'
import { expressiveMorphShapes, getRandomAccent, type AccentName } from './lib/shapePaths'

type ShapeName = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'rounded'

function randomAccent() {
  return getRandomAccent()
}

function ShapeGlyph({ shape, accent, className = '' }: { shape: ShapeName; accent: string; className?: string }) {
  return <span aria-hidden="true" className={`shape-glyph shape-${shape} accent-${accent} ${className}`.trim()} />
}

function AccentHeading({ children, accent, level = 1 }: { children: ReactNode; accent: string; level?: 1 | 2 | 3 }) {
  const className = `accent-heading accent-heading-${accent}`

  if (level === 2) {
    return <h2 className={className}>{children}</h2>
  }

  if (level === 3) {
    return <h3 className={className}>{children}</h3>
  }

  return <h1 className={className}>{children}</h1>
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>
}

function MetricChip({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className={`metric-chip accent-${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function StatusCard({
  title,
  body,
  accent,
  label,
}: {
  title: string
  body: string
  accent: string
  label: string
}) {
  return (
    <article className={`glass-panel status-card accent-${accent}`}>
      <span className="mono-label">{label}</span>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

function ShapeMetaList({ shape }: { shape: ShapeRecord }) {
  return (
    <div className="spec-list">
      <div>
        <span>Slug</span>
        <strong>{shape.slug}</strong>
      </div>
      <div>
        <span>Geometry</span>
        <strong>{shape.geometry}</strong>
      </div>
      <div>
        <span>Material</span>
        <strong>{shape.material}</strong>
      </div>
      <div>
        <span>Color</span>
        <strong>{shape.color}</strong>
      </div>
      <div>
        <span>Dimensions</span>
        <strong>{shape.dimensions}</strong>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <section className="page-stack">
      <section className="hero-shell">
        <div className="hero-copy-block glass-panel accent-yellow">
          <SectionLabel>Discover, inspect, and compare</SectionLabel>
          <AccentHeading accent="blue">Shape Community App</AccentHeading>
          <p className="lead-copy">
            Browse a colourful catalogue of toy-like shapes, open detail pages for each one, and leave room for later fit testing and popularity tracking.
          </p>
          <div className="shape-button-row">
            <ShapeMorphButton to="/shapes" label="Discover" accent="yellow" defaultShape="buttonSlim" />
            <ShapeMorphButton to="/meta" label="Meta" accent="blue" defaultShape="buttonSlim" />
          </div>
        </div>
        <aside className="hero-lab-column">
          <div className="glass-panel lab-card accent-blue">
            <SectionLabel>Feature snapshot</SectionLabel>
            <div className="metric-grid">
              <MetricChip label="Catalogue" value="Search + paging" accent="blue" />
              <MetricChip label="Details" value="Per-shape pages" accent="yellow" />
              <MetricChip label="Later" value="Meta + fit lab" accent="green" />
            </div>
          </div>
          <div className="glass-panel note-card accent-red">
            <span className="mono-label">Current focus</span>
            <p>The frontend now behaves like a real browseable web app, even while the data is still hardcoded on the client.</p>
          </div>
        </aside>
      </section>

      <section className="card-grid" aria-label="Feature overview">
        <StatusCard
          title="Discover a large catalogue"
          body="Use search, scan cards, and page through a catalogue-first view that will later connect to a backend search experience."
          accent="blue"
          label="Discover"
        />
        <StatusCard
          title="Open a real detail page"
          body="Each shape already has its own URL and frontend-driven metadata layout, ready for future 3D and compatibility work."
          accent="purple"
          label="Detail"
        />
        <StatusCard
          title="Meta arrives next"
          body="A dedicated Meta page is in the app now so later popularity, trending, and analytics surfaces already have a home."
          accent="orange"
          label="Meta"
        />
      </section>
    </section>
  )
}

function ShapesPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6

  function handleQueryChange(nextQuery: string) {
    setQuery(nextQuery)
    setPage(1)
  }

  const filteredShapes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return shapes
    }

    return shapes.filter((shape) => {
      const haystack = [shape.name, shape.geometry, shape.material, shape.color, ...shape.tags].join(' ').toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filteredShapes.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const visibleShapes = filteredShapes.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <section className="page-stack">
      <section className="glass-panel page-hero accent-blue">
        <SectionLabel>Catalogue</SectionLabel>
        <AccentHeading accent="orange">Discover</AccentHeading>
        <p className="lead-copy">
          Browse the current shape catalogue, search through the hardcoded frontend dataset, and open a detail page for anything that looks interesting.
        </p>
        <label className="search-panel" htmlFor="discover-search">
          <span className="mono-label">Search catalogue</span>
          <input
            id="discover-search"
            className="discover-search"
            type="search"
            value={query}
            placeholder="Search by name, geometry, material, or tag"
            onChange={(event) => handleQueryChange(event.target.value)}
          />
        </label>
      </section>

      {visibleShapes.length > 0 ? (
        <>
          <section className="discover-grid" aria-label="Shape catalogue results">
            {visibleShapes.map((shape) => (
              <ShapeCard key={shape.slug} shape={shape} />
            ))}
          </section>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : (
        <section className="glass-panel empty-state">
          <span className="mono-label">No results</span>
          <h3>Nothing matched that search.</h3>
          <p>Try a different geometry family, material, or tag from the current catalogue set.</p>
        </section>
      )}
    </section>
  )
}

function ShapeDetailPage() {
  const { slug } = useParams()
  const shape = slug ? getShapeBySlug(slug) : undefined

  if (!shape) {
    return (
      <section className="page-stack">
        <section className="glass-panel page-hero accent-red">
          <SectionLabel>Shape not found</SectionLabel>
          <AccentHeading accent="red">Unknown shape</AccentHeading>
          <p className="lead-copy">This shape slug is not part of the current frontend catalogue. Head back to Discover and choose one of the listed shapes.</p>
          <div className="shape-button-row shape-button-row-compact">
            <ShapeMorphButton to="/shapes" label="Back" accent="red" />
          </div>
        </section>
      </section>
    )
  }

  return (
    <section className="page-stack">
      <section className="shape-layout">
        <article className="glass-panel viewer-stage accent-yellow">
          <div className="stage-header">
            <SectionLabel>Preview</SectionLabel>
            <span className="mono-label">{shape.geometry}</span>
          </div>
          <AccentHeading accent="purple">{shape.name}</AccentHeading>
          <p className="lead-copy">{shape.description}</p>
          <div className="viewer-placeholder">
            <ShapeGlyph shape={shape.previewShape} accent={shape.previewAccent} className="stage-shape stage-shape-large" />
            <ShapeGlyph shape="triangle" accent="blue" className="stage-shape stage-shape-top" />
            <ShapeGlyph shape="circle" accent="red" className="stage-shape stage-shape-bottom" />
          </div>
        </article>

        <div className="shape-info-column">
          <article className="glass-panel accent-green">
            <SectionLabel>Compatibility</SectionLabel>
            <h3>Future fit summary</h3>
            <p>{shape.compatibilitySummary}</p>
          </article>
          <article className="glass-panel accent-purple">
            <SectionLabel>Metadata</SectionLabel>
            <ShapeMetaList shape={shape} />
          </article>
        </div>
      </section>

      <section className="card-grid three-up">
        <article className="glass-panel accent-green">
          <span className="mono-label">Tags</span>
          <h3>Shape family</h3>
          <p>{shape.tags.join(', ')}</p>
        </article>
        <article className="glass-panel accent-orange">
          <span className="mono-label">Material</span>
          <h3>Build character</h3>
          <p>{shape.material} with a {shape.color.toLowerCase()} finish.</p>
        </article>
        <article className="glass-panel accent-red">
          <span className="mono-label">Later</span>
          <h3>Popularity + watchers</h3>
          <p>Reserved for future popularity data, watch counts, and fit-testing traces.</p>
        </article>
      </section>
    </section>
  )
}

function MetaPage() {
  return (
    <section className="page-stack">
      <section className="glass-panel page-hero accent-purple">
        <SectionLabel>Later analytics</SectionLabel>
        <AccentHeading accent="green">Meta</AccentHeading>
        <p className="lead-copy">This page will later show the most popular shapes, trending activity, and catalogue-wide behaviour once the backend analytics layer exists.</p>
      </section>

      <section className="card-grid three-up">
        <article className="glass-panel accent-blue">
          <span className="mono-label">Popular</span>
          <h3>Most viewed shapes</h3>
          <p>Future leaderboard for the shapes people open the most.</p>
        </article>
        <article className="glass-panel accent-orange">
          <span className="mono-label">Trending</span>
          <h3>Recent momentum</h3>
          <p>Future trending panel for shapes that spike in attention over time.</p>
        </article>
        <article className="glass-panel accent-red">
          <span className="mono-label">Charts</span>
          <h3>Activity over time</h3>
          <p>Future charts for views, compatibility activity, and engagement signals.</p>
        </article>
      </section>
    </section>
  )
}

function NotFoundPage() {
  return (
    <section className="page-stack">
      <section className="glass-panel page-hero accent-red">
        <SectionLabel>404</SectionLabel>
        <AccentHeading accent="red">Page not found</AccentHeading>
        <p className="lead-copy">This route is outside the current shell. Head back home or open the Discover catalogue.</p>
        <div className="shape-button-row shape-button-row-compact">
          <ShapeMorphButton to="/" label="Home" accent="yellow" />
          <ShapeMorphButton to="/shapes" label="Discover" accent="red" />
        </div>
      </section>
    </section>
  )
}

function AppShell() {
  const [brandAccent, setBrandAccent] = useState<AccentName>(randomAccent)
  const { path: brandPath, animateRandom: animateBrandRandom } = useShapeMorph({
    shapePool: expressiveMorphShapes,
    durationMs: 260,
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setBrandAccent((currentAccent) => getRandomAccent([currentAccent]))
      animateBrandRandom()
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [animateBrandRandom])

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand-lockup" to="/">
          <span className="brand-mark-wrap">
            <MorphShape path={brandPath} accent={brandAccent} className="brand-mark-shape" />
          </span>
          <span className="brand-copy">
            <strong>Shape Community</strong>
          </span>
        </Link>

        <nav className="site-nav glass-panel" aria-label="Primary">
          <ShapeMorphNavLink to="/" end label="Home" accent="blue" />
          <ShapeMorphNavLink to="/shapes" label="Discover" accent="orange" />
          <ShapeMorphNavLink to="/meta" label="Meta" accent="green" />
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shapes" element={<ShapesPage />} />
          <Route path="/shapes/:slug" element={<ShapeDetailPage />} />
          <Route path="/meta" element={<MetaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="glass-panel footer-panel">
          <p>Frontend foundation for a public shape catalogue, future compatibility experiments, and later popularity tracking.</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return <AppShell />
}
