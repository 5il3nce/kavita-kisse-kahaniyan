import Image from "next/image";
import { artists, type Artist } from "@/lib/artists";
import { artistsCopy } from "@/lib/copy";
import { RibbonWipe } from "@/components/motion/RibbonWipe";
import { C, scallopArchPath } from "@/components/art/motifs";

const FRAME: Record<Artist["frame"], { front: string; back: string }> = {
  sun: { front: C.sun, back: C.sunDeep },
  rose: { front: C.rose, back: C.roseDeep },
  marigold: { front: C.marigold, back: "#D96F00" },
  cream: { front: C.cream, back: C.sand },
};
const TILT = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
const archFront = scallopArchPath(160, 430, 296, 390, 4);

function ArtistCard({ artist, index, copy }: { artist: Artist; index: number; copy?: boolean }) {
  const f = FRAME[artist.frame];
  return (
    <li aria-hidden={copy || undefined} className={`relative mr-6 w-[70vw] max-w-[300px] shrink-0 sm:w-[290px] md:mr-10 ${TILT[index % TILT.length]} ${copy ? "motion-reduce:hidden" : ""}`}>
      <figure className="group relative aspect-[320/440]">
        <svg viewBox="0 0 320 440" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <path d={archFront} fill={f.back} transform="translate(10 8)" />
          <path d={archFront} fill={f.front} filter="url(#kkk-paper-lg)" />
          <path d={scallopArchPath(160, 430, 262, 356, 4)} fill="none" stroke={C.ink} strokeOpacity={0.18} strokeWidth={2} strokeDasharray="3 7" />
        </svg>
        <div className="absolute inset-x-3 bottom-[2.5%] top-[4%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
          <Image
            src={artist.src}
            alt={copy ? "" : artist.alt}
            fill
            sizes="(min-width: 640px) 290px, 70vw"
            draggable={false}
            className="select-none object-contain object-bottom"
          />
        </div>
      </figure>
    </li>
  );
}

/**
 * Layout family: continuously cycling strip. The list is rendered twice and the track slides by
 * exactly one copy (CSS, compositor-only), so the loop is seamless and never stops.
 * Under reduced motion it stays still and becomes a normal swipeable row.
 */
export function Artists() {
  return (
    <section id="artists" aria-labelledby="artists-title" className="relative bg-teal pb-24 pt-16 md:pb-32 md:pt-24">
      <RibbonWipe fill={C.teal} />

      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-4 md:px-8">
        <h2 id="artists-title" className="font-display text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-tighter text-ink">
          {artistsCopy.title}
        </h2>
      </div>

      <div className="mt-12 overflow-hidden pb-10 pt-8 motion-reduce:overflow-x-auto md:mt-16">
        <ul role="list" aria-label={artistsCopy.regionLabel} className="kkk-artists ml-4 flex w-max md:ml-8">
          {artists.map((a, i) => (
            <ArtistCard key={a.id} artist={a} index={i} />
          ))}
          {artists.map((a, i) => (
            <ArtistCard key={`${a.id}-copy`} artist={a} index={i} copy />
          ))}
        </ul>
      </div>
    </section>
  );
}
