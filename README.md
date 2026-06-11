# Parham Heydari — Portfolio

A single-page portfolio/landing site generated from my resume and LinkedIn data.

**Stack:** React 18 · TypeScript · Vite · GSAP (ScrollTrigger) · Lenis smooth scroll

## Highlights

- Interactive canvas dot-field hero that reacts to the pointer (DPR-aware, paused when the tab is hidden)
- Preloader with counter, staggered letter reveal, scroll-scrubbed about text, animated stat counters
- Expandable experience timeline, skills marquee, testimonials pulled from LinkedIn recommendations
- Fully responsive down to small phones, `prefers-reduced-motion` respected, semantic/a11y-minded markup

## Commands

```bash
npm install
npm run dev      # dev server on :5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Editing content

All copy (profile, stats, jobs, skills, testimonials) lives in [src/data.ts](src/data.ts) — no component changes needed for content updates.
