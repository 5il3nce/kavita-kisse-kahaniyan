# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Single-page landing site for Kavita Kisse Kahaniyan (Lucknow spoken word platform) and its festival Spill The Word Fest. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis. No database or API routes; it deploys as a static page.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build        # production build (also type-checks)
npm run start
npx tsc --noEmit     # type-check only
```

There are no lint or test scripts.

Next.js 16 has breaking changes from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before using a Next API you are not sure about (see `AGENTS.md`).

## Where content lives

- `lib/copy.ts`: every visible string on the page (headings, body copy, alt text, venue, social links).
- `lib/site.ts`: `TICKET_URL` (District event page, overridable with `NEXT_PUBLIC_DISTRICT_TICKET_URL`) and `FEST_START_MS` for the countdown.
- `lib/artists.ts` and `lib/brands.ts`: the data behind the artist strip and the logo wall. Images are in `public/images/`.
- `Assets/` and `Refrences/` are gitignored design inputs: `Assets/brief.docx` (copy and section order), `Assets/main-design/` (illustration style), and the raw photos and logos. `public/` holds the processed copies the site uses.

## Architecture

**Section order is fixed by the brief.** `app/page.tsx` renders the sections in the order of `Assets/brief.docx`: Hero (logo and tagline), Intro, AboutKkk, Stats, Fest, Artists, Brands, Venue, then Footer. Do not reorder them without asking.

**Server sections, client motion leaves.** Everything in `components/sections/` and `components/art/` is a Server Component. Interactivity lives only in `components/motion/` (`"use client"`). Motion components attach to server-rendered markup through ids and `data-*` hooks instead of wrapping it. For example, `HeroScrub` finds `#top`, `[data-stage]`, `[data-scene-box]`, `[data-layer=...]` and `[data-copy]` in `Hero.tsx`. The hero SVG scene is never hydrated. If you rename one of these hooks, update both files.

**GSAP and scrolling:**
- Always get GSAP through `loadGsap()` in `components/motion/loadGsap.ts`. It is one shared dynamic import that registers ScrollTrigger after hydration. Never import `gsap` statically into a component.
- Effects follow one pattern: a `dead` flag for unmount before the import resolves, everything inside `gsap.context()`, and `ctx.revert()` in cleanup.
- `LenisProvider` (in the layout) creates the only Lenis instance, drives it from `gsap.ticker`, and feeds `ScrollTrigger.update`. Its anchor offset (-72) matches the nav height.
- Never add `window` scroll listeners. Use ScrollTrigger or IntersectionObserver.

**Hero:** `Hero.tsx` is a 320vh section holding a sticky 100dvh stage. `HeroScrub` builds one paused timeline: camera push into the gate, doors open, the KKK logo resolves, and the copy re-settles under it. Scroll drives the timeline. Scene coordinates use the SVG viewBox (1600x1000, `xMidYMax slice`), mapped to pixels by `map()` in `HeroScrub`.

**Scroll reveals:** wrap content in `RevealGroup` and mark children with `data-reveal` (optionally `data-reveal="drop"` and similar). The CSS for `[data-armed]` and `.is-in` is in `app/globals.css`. Elements are armed only when JS runs and motion is allowed, so content stays visible without JS.

**Heavy SVG scenes** (amphitheatre, crowd) load through `components/motion/LazyScenes.tsx`, which uses `next/dynamic` with `ssr: false` inside `LazyMount` (an IntersectionObserver with a 600px margin). The wrapper box reserves the space so layout does not shift.

**Reduced motion is deliberately ignored.** The client chose full motion for every visitor, because Windows performance mode and similar settings report `prefers-reduced-motion: reduce` and made the site look static. Do not add `prefers-reduced-motion` checks, `motion-reduce:` or `motion-safe:` variants, or static fallbacks unless asked.

**Illustrations are hand-built SVG** in `components/art/`, in a flat, paper-cut, risograph style:
- `SvgDefs` (rendered once in `app/layout.tsx`) defines shared filters and patterns that any inline SVG can reference by id (`#kkk-paper`, `#kkk-paper-lg`, `#kkk-jaali`, `#kkk-jaali-teal`, and others).
- `motifs.tsx` exports the palette constant `C` and the reusable shapes (petals, stars, scalloped arches).
- `Dividers.tsx` holds the section separators.

## Design rules the page was built to

- **Theme:** one light theme only (`colorScheme: "light"`). The palette tokens are in the `@theme` block of `app/globals.css` (sun, cream, ink, marigold, rose, teal). Keep `C` in `motifs.tsx` in sync with them.
- **Corner radius:** CTAs are full pill and panels use `--radius-panel` (24px).
- **Ticket CTA:** every ticket button is the `TicketButton` component, labelled "Book Tickets" and opening `TICKET_URL` in a new tab. Do not add another CTA with the same intent under a different label.
- **No dashes in copy:** visible text contains no em dashes or en dashes. Ranges are written with "to" (e.g. "24 Oct to 25 Oct 2026").
- **Layout families:** each section's doc comment names its layout family (pinned scrub, editorial manifesto, asymmetric split, illustrated band, full-bleed scene, cycling strip, logo wall, bento). A new or changed section should not repeat a family already on the page.
- **Fonts:** Palanquin Dark (display), Palanquin (body) and Hind (Devanagari), all loaded through `next/font` in `app/layout.tsx`. Hindi text needs `lang="hi"` to get the Hind face.
- **Artists:** artist names are intentionally not shown (client request). Each photo has descriptive alt text only.
- **Brand logos:** the wall shows logos only, with no labels.
- **Naming:** custom CSS classes and SVG ids use the `kkk-` prefix.
