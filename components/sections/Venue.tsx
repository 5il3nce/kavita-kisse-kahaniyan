import { NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { venue, nav } from "@/lib/copy";
import { CalendarArt, MapArt } from "@/components/art/VenueArt";
import { Countdown } from "@/components/motion/Countdown";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ScallopDivider } from "@/components/art/Dividers";
import { C } from "@/components/art/motifs";
import { TicketButton } from "./TicketButton";

/**
 * Layout family: three-cell bento. Calendar (tall, left), map and venue (wide, top right),
 * countdown and tickets (wide, bottom right). Three items, three cells.
 */
export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative bg-sun pb-24 pt-16 md:pb-32 md:pt-24">
      <ScallopDivider fill={C.sun} />

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 id="venue-title" className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-tighter text-ink">
          {venue.title}
        </h2>

        <RevealGroup className="mt-10 grid grid-flow-dense grid-cols-1 gap-5 md:mt-14 md:grid-cols-12 md:gap-6">
          {/* Date */}
          <article data-reveal className="flex flex-col rounded-[24px] bg-rose-light p-6 md:col-span-5 md:row-span-2 md:p-8">
            <h3 className="font-display text-lg font-semibold text-ink/75">{venue.dateLabel}</h3>
            <p className="mt-1 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-bold leading-tight tracking-tight text-ink">{venue.date}</p>
            <div className="mt-6 flex flex-1 items-center justify-center">
              <div className="w-full max-w-[400px] -rotate-2">
                <CalendarArt />
              </div>
            </div>
          </article>

          {/* Venue and map */}
          <article data-reveal style={{ ["--i" as string]: 1 }} className="overflow-hidden rounded-[24px] bg-cream md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <MapArt />
              </div>
              <div className="flex flex-col justify-center gap-5 p-6 sm:col-span-2 md:p-7">
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink/75">{venue.venueLabel}</h3>
                  <p className="mt-1 font-display text-xl font-bold leading-snug text-ink md:text-2xl">{venue.venue}</p>
                </div>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kkk-press inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink bg-cream px-5 py-3 font-display font-semibold leading-none text-ink"
                >
                  <NavigationArrow weight="bold" aria-hidden="true" className="size-[1.1em]" />
                  {venue.directions}
                  <span className="sr-only"> {nav.newTab}</span>
                </a>
              </div>
            </div>
          </article>

          {/* Countdown and tickets */}
          <article data-reveal style={{ ["--i" as string]: 2 }} className="relative overflow-hidden rounded-[24px] bg-marigold p-6 md:col-span-7 md:p-8">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-30">
              <circle cx={100} cy={100} r={96} fill="url(#kkk-jaali)" />
            </svg>
            <h3 className="relative font-display text-2xl font-bold text-ink md:text-3xl">{venue.countdownTitle}</h3>
            <div className="relative mt-5">
              <Countdown />
            </div>
            <div className="relative mt-6">
              <TicketButton size="lg" />
            </div>
          </article>
        </RevealGroup>
      </div>
    </section>
  );
}
