import { useEffect, useState, type ReactNode } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { ShapeMorphButton, ShapeMorphNavLink } from './components/ShapeMorphButton'
import { MorphShape } from './components/MorphShape'
import { useShapeMorph } from './hooks/useShapeMorph'
import { expressiveMorphShapes } from './lib/shapePaths'

type ShapeName = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'rounded'

const accentSequence = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'] as const

function randomAccent() {
  return accentSequence[Math.floor(Math.random() * accentSequence.length)]
}

function ShapeGlyph({ shape, accent, className = '' }: { shape: ShapeName; accent: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`shape-glyph shape-${shape} accent-${accent} ${className}`.trim()}
    />
  )
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

function HomePage() {
  return (
    <section className="page-stack">
      <section className="hero-shell">
        <div className="hero-copy-block glass-panel accent-yellow">
          <SectionLabel>Digital toy museum + compatibility lab</SectionLabel>
          <AccentHeading accent="blue">Shape Community App</AccentHeading>
          <p className="lead-copy">
            A bright, glassy frontend shell for exploring geometric toy shapes,
            previewing future compatibility tests, and growing into a playful public catalogue.
          </p>
          <div className="shape-button-row">
            <ShapeMorphButton to="/shapes" label="Shapes" accent="yellow" defaultShape="buttonSlim" />
            <ShapeMorphButton to="/shapes/cube" label="Demo" accent="blue" defaultShape="buttonSlim" />
          </div>
        </div>
        <aside className="hero-lab-column">
          <div className="glass-panel lab-card accent-blue">
            <SectionLabel>Foundation status</SectionLabel>
            <div className="metric-grid">
              <MetricChip label="Routes" value="4 ready" accent="blue" />
              <MetricChip label="Theme" value="Light only" accent="yellow" />
              <MetricChip label="Next milestone" value="M1 static catalogue" accent="green" />
            </div>
          </div>
          <div className="glass-panel note-card accent-red">
            <span className="mono-label">Micro-interactions</span>
            <p>
              The shape action now uses a real SVG path tween instead of a silhouette swap, so the hover reads like a gradual morph.
            </p>
          </div>
        </aside>
      </section>

      <section className="card-grid" aria-label="Foundation overview">
        <StatusCard
          title="Routes are in place"
          body="Home, catalogue, shape detail, and a 404 page are ready for real content without changing the app shell."
          accent="blue"
          label="Routing"
        />
        <StatusCard
          title="Glass panel language"
          body="Cards, nav, and content areas use smaller glass surfaces instead of one heavy app-wide layer."
          accent="purple"
          label="Visual system"
        />
        <StatusCard
          title="Ready for product data"
          body="The next pass can focus on static shapes, previews, and metadata instead of shell restructuring."
          accent="orange"
          label="M1 handoff"
        />
      </section>
    </section>
  )
}

function ShapesPage() {
  return (
    <section className="page-stack">
      <section className="glass-panel page-hero accent-blue">
        <SectionLabel>Catalogue shell</SectionLabel>
        <AccentHeading accent="orange">Shapes</AccentHeading>
        <p className="lead-copy">
          This route is prepared for the first static catalogue milestone with room for bright shape cards, preview tiles, and metadata labels.
        </p>
      </section>

      <section className="card-grid two-up">
        <article className="glass-panel accent-green">
          <span className="mono-label">Planned content</span>
          <h3>Shape cards</h3>
          <p>Responsive cards with toy accents, small previews, geometry type, and clean route links.</p>
        </article>
        <article className="glass-panel accent-orange">
          <span className="mono-label">Example route</span>
          <h3>Start with one detail page</h3>
          <p>
            Use <Link className="inline-link" to="/shapes/cube">/shapes/cube</Link> as the first real product page shell.
          </p>
        </article>
      </section>
    </section>
  )
}

function ShapeDetailPage() {
  const { slug } = useParams()

  return (
    <section className="page-stack">
      <section className="shape-layout">
        <article className="glass-panel viewer-stage accent-yellow">
          <div className="stage-header">
            <SectionLabel>Viewer</SectionLabel>
            <span className="mono-label">Mobile-safe placeholder</span>
          </div>
          <h1>{slug ?? 'unknown-shape'}</h1>
          <p className="lead-copy">
            This area is reserved for the future 3D viewer and fit animation surface.
          </p>
          <div className="viewer-placeholder">
            <ShapeGlyph shape="rounded" accent="yellow" className="stage-shape stage-shape-large" />
            <ShapeGlyph shape="triangle" accent="blue" className="stage-shape stage-shape-top" />
            <ShapeGlyph shape="circle" accent="red" className="stage-shape stage-shape-bottom" />
          </div>
        </article>

        <div className="shape-info-column">
          <article className="glass-panel accent-green">
            <SectionLabel>Selected result</SectionLabel>
            <h3>Compatibility panel</h3>
            <p>Reserved for fit status, human-readable reasons, and watcher info.</p>
          </article>
          <article className="glass-panel accent-purple">
            <SectionLabel>Metadata</SectionLabel>
            <div className="spec-list">
              <div>
                <span>Slug</span>
                <strong>{slug ?? 'unknown-shape'}</strong>
              </div>
              <div>
                <span>Route</span>
                <strong>/shapes/:slug</strong>
              </div>
              <div>
                <span>Viewer mode</span>
                <strong>Placeholder</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="card-grid three-up">
        <article className="glass-panel accent-green">
          <span className="mono-label">Watchers</span>
          <h3>Future live activity</h3>
          <p>Reserved for active watchers and lightweight live presence signals.</p>
        </article>
        <article className="glass-panel accent-orange">
          <span className="mono-label">Selector</span>
          <h3>Hole selection</h3>
          <p>Reserved for the compatibility selector and fit-state switching.</p>
        </article>
        <article className="glass-panel accent-red">
          <span className="mono-label">Meta</span>
          <h3>Graph and details</h3>
          <p>Reserved for metadata, charts, and future popularity surfaces.</p>
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
        <AccentHeading accent="red">Shape not found</AccentHeading>
        <p className="lead-copy">
          This route is outside the current shell. Head back to the main museum view or open the catalogue placeholder.
        </p>
        <div className="shape-button-row shape-button-row-compact">
          <ShapeMorphButton to="/" label="Home" accent="yellow" />
          <ShapeMorphButton to="/shapes" label="Shapes" accent="red" />
        </div>
      </section>
    </section>
  )
}

function AppShell() {
  const [brandAccent] = useState<string>(randomAccent)
  const { path: brandPath, animateRandom: animateBrandRandom } = useShapeMorph({
    shapePool: expressiveMorphShapes,
    durationMs: 260,
  })

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      animateBrandRandom()
    }, 3000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [animateBrandRandom])

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand-lockup glass-panel" to="/">
          <span className="brand-mark-wrap">
            <MorphShape path={brandPath} accent={brandAccent} className="brand-mark-shape" />
          </span>
          <span className="brand-copy">
            <strong>Shape Community App</strong>
            <span>Digital toy museum + compatibility lab</span>
          </span>
        </Link>

        <nav className="site-nav glass-panel" aria-label="Primary">
          <ShapeMorphNavLink to="/" end label="Home" accent="blue" />
          <ShapeMorphNavLink to="/shapes" label="Shapes" accent="orange" />
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shapes" element={<ShapesPage />} />
          <Route path="/shapes/:slug" element={<ShapeDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="glass-panel footer-panel">
          <p>Frontend foundation for a public catalogue, compatibility demos, and bright toy-inspired interactions.</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return <AppShell />
}
