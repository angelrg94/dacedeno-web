# Sections and interaction verification — 2026-09-14

Angular build passed and prerendered `/`, `/privacidad`, and `/404` with a 297.40 kB initial bundle. Vitest passed 5 files / 6 tests, including the SSR-safe Calendly loader. Strict TypeScript and Prettier checks passed.

Chrome + axe passed 9 end-to-end tests: all sections and optimized images load without page errors; no horizontal overflow at 320, 390, 768, 1024, or 1440 px; no axe WCAG 2A/AA violations; mobile menu Escape restores focus and closes; privacy/unknown routes return 200/404; the home fallback works; and the booking flow requests Calendly only after user intent while retaining its external fallback. The release gate intentionally fails while content, privacy, booking verification, hosting and contact decisions are unverified.

The application keeps unapproved testimonials out of the browser and now renders the nine approved mock stories with reserved identities. The approved logo master is used directly through transparent PNG derivatives for the light header and dark footer, preserving the designer's exact geometry and lettering. The method image uses a source-faithful 1493px WebP derivative at higher quality so the original facial and body features are preserved while reducing visible scaling artifacts. Booking now has typed validation, an allowlisted HTTPS adapter, a client-only Calendly inline embed, accessible loading/error states and an external fallback. All six current selections resolve to `https://calendly.com/cedenorojasd/30min`; no controlled reservation has been claimed.

`npm ci` succeeds with the pinned Node 22.22.3 toolchain. The gate also checks draft records, empty event/host mappings, origin and timezone; its non-zero result is expected until the external decisions are supplied.

Prerender inspection confirms route-specific title, description, Open Graph and noindex metadata for `/` and `/privacidad`. `generate-sitemap.mjs` refuses to write a sitemap until `PUBLIC_ORIGIN` is a confirmed HTTPS domain.

Static preview verification confirms both approved logo PNGs return `200 OK` with `Content-Type: image/png` and remain loadable with `X-Content-Type-Options: nosniff`.
