# Angular site

Requires Node 24.6.0 and npm 11.5.1. Angular 21.2.23 / CLI 21.2.24 and TypeScript 5.9.3 are pinned with package-lock.json. The application uses Angular's application builder with static output and prerendered routes; no runtime backend is required.

`npm ci`, `npm start`, `npm test`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm run format:check`.

Run `node scripts/prepare-assets.mjs "/path/to/the/local/mock"` when source photos or fonts change. The script writes only optimized derivatives to `public/`; private source material remains outside the repository. `npm run check:release` is an intentional gate: it exits non-zero until owner approvals, real contacts, provider events, timezone, publication origin and hosting verification are present.

Run `npm run prepare:brand -- "/path/to/logo-aprobado"` when the approved logo reference changes. It extracts only the horizontal logo from the approved master sheet and writes the web-ready light and footer variants to `public/brand/`.

Set `PUBLIC_ORIGIN=https://the-final-domain.example` and run `node scripts/generate-sitemap.mjs` only after the domain is confirmed. The preview remains `noindex`; production robots, canonical metadata and sitemap must be generated as part of the release with that real origin.

The optimized build currently creates a **noindex preview**, not a publishable release. Output: `dist/angular-site/browser`. Static routes: `/`, `/privacidad`, `/404`; the host must serve the last document with HTTP 404 for unknown paths. No runtime backend is required. The authoritative scope and external blockers are in the parent PROMPT.md and Obsidian DCA notes.
