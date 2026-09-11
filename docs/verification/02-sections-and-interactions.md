# Sections and interaction verification — 2026-09-10

Angular build passed and prerendered `/`, `/privacidad`, and `/404` with a 292.24 kB initial bundle. Vitest passed 4 files / 4 tests: route recovery, allowlisted booking URL resolution, testimonial carousel wrap/direct selection, and the nine approved mock stories. Strict TypeScript and Prettier checks passed.

Chrome + axe passed 8 end-to-end tests: all sections and optimized images load without page errors; no horizontal overflow at 320, 390, 768, 1024, or 1440 px; no axe WCAG 2A/AA violations; mobile menu Escape restores focus and closes; privacy/unknown routes return 200/404; and the home fallback works. The release gate intentionally fails while booking, content, privacy, hosting and contact decisions are unverified.

The application keeps unapproved testimonials out of the browser and now renders the nine approved mock stories with reserved identities. Booking has typed validation and an allowlisted HTTPS adapter, but no provider URL is configured. These remain deliberate owner dependencies, not completed publication or reservation evidence.

`npm ci` succeeds with the pinned Node 22.22.3 toolchain. The gate also checks draft records, empty event/host mappings, origin and timezone; its non-zero result is expected until the external decisions are supplied.

Prerender inspection confirms route-specific title, description, Open Graph and noindex metadata for `/` and `/privacidad`. `generate-sitemap.mjs` refuses to write a sitemap until `PUBLIC_ORIGIN` is a confirmed HTTPS domain.
