# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0

### Added
- Initialized the frontend app with Vite, React, TypeScript, and pnpm.
- Added the first public app shell with Home, Discover, shape detail, Meta, and 404 routes.
- Added a frontend-first Discover catalogue with hardcoded shape data, search, cards, and pagination.
- Added shape detail pages backed by the same frontend dataset.
- Added a placeholder Meta page for future popularity and analytics work.
- Added responsive morphing shape buttons for hero actions, navbar items, and pagination controls.
- Added automatic logo morphing in the header.

### Changed
- Renamed the visible catalogue label from Shapes to Discover while keeping the `/shapes` route.
- Reworked the visual system toward a cleaner light theme with solid heading colors and flatter surfaces.
- Updated catalogue and detail previews to use the shared SVG shape system.
- Added mobile-specific behavior including stacked card layouts, route scroll reset, touch-triggered morph feedback, and automatic infinite scroll on Discover.

### Fixed
- Fixed morph interactions so visible shapes and interaction state stay in sync.
- Fixed product pages showing extra decorative shapes instead of only the selected shape.
- Fixed search field contrast on the Discover page.
- Fixed active navbar state so the selected page stands out more clearly.
