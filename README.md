# Kavita Kisse Kahaniyan

Landing page for **Kavita Kisse Kahaniyan**, a spoken word, poetry and storytelling platform from Lucknow, and its festival **Spill The Word Fest** (24 Oct to 25 Oct 2026, Amphitheatre, Dr Ram Manohar Lohia Park, Gomti Nagar, Lucknow).

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP with ScrollTrigger, and Lenis. All illustrations are hand-built SVG.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Ticket link

Every Book Tickets button opens the District event page. The link is built into `lib/site.ts`, so no setup is needed. To point the buttons somewhere else, copy `.env.example` to `.env.local` and change `NEXT_PUBLIC_DISTRICT_TICKET_URL`.

## Editing content

| What | Where |
|---|---|
| All page text, venue, dates, social links | `lib/copy.ts` |
| Artist photos and alt text | `lib/artists.ts` and `public/images/artists/` |
| Brand logos | `lib/brands.ts` and `public/images/brands/` |
| Ticket link and countdown time | `lib/site.ts` |
| Colours and fonts | `app/globals.css` and `app/layout.tsx` |

## Project structure

```
app/                  page, layout, metadata, global styles
components/sections/  one file per page section
components/art/       SVG illustrations, motifs and section dividers
components/motion/    scroll and animation helpers (client components)
lib/                  content and settings
public/               logos, artist photos, brand logos, Open Graph image
```

## Notes

- Animations respect the visitor's reduced-motion setting: the hero shows its final open-gate frame and loops stop.
- Deploys as a static page on any Next.js host (for example Vercel) with no extra configuration.
