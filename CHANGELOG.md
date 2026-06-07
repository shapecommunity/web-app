# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 - June 7th 2026

### Added
- Initialized the frontend app with Vite, React, TypeScript, and pnpm.
- Added the first public app shell with Home, Discover, shape detail, Meta, and 404 routes.
- Added a frontend-first Discover catalogue with hardcoded shape data, search, cards, and pagination.
- Added shape detail pages backed by the same frontend dataset.
- Added a placeholder Meta page for future popularity and analytics work.
- Added responsive morphing shape buttons for hero actions, navbar items, and pagination controls.
- Added automatic logo morphing in the header.
- Added a full Vitest-based test pyramid with business-logic unit tests, UI tests, and route-level integration tests.
- Added Playwright end-to-end coverage for core desktop and mobile user journeys, plus targeted visual snapshots for stable desktop views.
- Added PR-only GitHub Actions checks covering lint, build, unit, and integration stages.
- Added a temporary 10,000-shape hardcoded load-test dataset to stress frontend catalogue performance before API-backed loading exists.

### Changed
- Renamed the visible catalogue label from Shapes to Discover while keeping the `/shapes` route.
- Reworked the visual system toward a cleaner light theme with solid heading colors and flatter surfaces.
- Updated catalogue and detail previews to use the shared SVG shape system.
- Added mobile-specific behavior including stacked card layouts, route scroll reset, touch-triggered morph feedback, and automatic infinite scroll on Discover.
- Reworked desktop catalogue pagination to use a sliding five-page window instead of rendering every available page button.
- Reflected the current roadmap reality toward product-page work and a planned `0.2.0` milestone instead of treating the app as only a public shell.

### Fixed
- Fixed morph interactions so visible shapes and interaction state stay in sync.
- Fixed product pages showing extra decorative shapes instead of only the selected shape.
- Fixed search field contrast on the Discover page.
- Fixed active navbar state so the selected page stands out more clearly.
- Fixed CI test discovery by switching split Vitest runs to explicit config files.
- Fixed desktop catalogue usability under the temporary high-volume dataset by limiting visible numeric pagination buttons.
