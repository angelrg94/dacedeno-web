# Angular site

Requires Node 22.22.3 and npm 10.9.8. Angular 22.0.8 / CLI 22.0.9 and TypeScript 6.0.2 are pinned with package-lock.json. Generated with `npx @angular/cli@22.0.9 new angular-site --routing --style=scss --strict --standalone --ssr --skip-git --skip-install --defaults`, then switched to static output and removed Express.

`npm ci`, `npm start`, `npm test`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm run format:check`.

Run `node scripts/prepare-assets.mjs "/path/to/the/local/mock"` when source photos or fonts change. The script writes only optimized derivatives to `public/`; private source material remains outside the repository. `npm run check:release` is an intentional gate: it exits non-zero until owner approvals, real contacts, provider events, timezone, publication origin and hosting verification are present.

Set `PUBLIC_ORIGIN=https://the-final-domain.example` and run `node scripts/generate-sitemap.mjs` only after the domain is confirmed. The preview remains `noindex`; production robots, canonical metadata and sitemap must be generated as part of the release with that real origin.

The optimized build currently creates a **noindex preview**, not a publishable release. Output: `dist/angular-site/browser`. Static routes: `/`, `/privacidad`, `/404`; the host must serve the last document with HTTP 404 for unknown paths. No runtime backend is required. The authoritative scope and external blockers are in the parent PROMPT.md and Obsidian DCA notes.
