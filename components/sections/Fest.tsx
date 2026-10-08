import Image from "next/image";
import { fest } from "@/lib/copy";
import { LazyAmphitheatre } from "@/components/motion/LazyScenes";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { TornDivider } from "@/components/art/Dividers";
import { C, Marigold, Star } from "@/components/art/motifs";

/** Layout family: full-bleed scene with an overlapping logo card and copy stacked into its lower edge. */
export function Fest() {
  return (
    <section id="festival" aria-labelledby="fest-title" className="relative bg-cream pb-24 md:pb-36">
      <TornDivider fill={C.cream} />

      <div className="mx-auto max-w-[1400px] px-4 pt-14 md:px-8 md:pt-20">
        <h2 id="fest-title" className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-tighter text-ink">
          {fest.title}
        </h2>
        <p className="kkk-paper-shadow mt-5 inline-block rotate-1 rounded-[24px] bg-rose px-5 py-2 font-display text-xl font-semibold text-ink md:text-2xl">
          {fest.tagline}
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1600px] md:mt-14 md:px-8">
        <LazyAmphitheatre className="aspect-[1600/900] w-full overflow-hidden bg-sun md:rounded-[24px]" />
      </div>

      <RevealGroup className="relative mx-auto -mt-16 grid max-w-[1400px] grid-cols-1 gap-10 px-4 md:-mt-40 md:grid-cols-12 md:px-8">
        <div data-reveal className="md:col-span-4 md:col-start-2">
          <div className="kkk-paper-shadow relative mx-auto max-w-[320px] -rotate-2 rounded-[24px] bg-ink p-7 md:max-w-none md:p-9">
            <Image src="/images/spill-the-word-fest-logo.png" alt={fest.logoAlt} width={836} height={762} sizes="(min-width: 768px) 30vw, 280px" className="h-auto w-full" />
            <svg aria-hidden="true" viewBox="0 0 60 60" className="absolute -right-5 -top-5 h-14 w-14">
              <Marigold x={30} y={30} r={26} />
            </svg>
          </div>
        </div>
        <div className="space-y-4 md:col-span-6 md:col-start-7 md:pt-48">
          {fest.body.map((p, i) => (
            <p key={i} data-reveal style={{ ["--i" as string]: i + 1 }} className="max-w-[56ch] text-lg leading-relaxed text-ink/80">
              {p}
            </p>
          ))}
          <svg aria-hidden="true" viewBox="0 0 120 40" className="h-8 w-28">
            <Star x={20} y={20} r={14} color={C.marigold} />
            <Star x={60} y={20} r={10} color={C.rose} />
            <Star x={95} y={20} r={14} color={C.teal} />
          </svg>
        </div>
      </RevealGroup>
    </section>
  );
}
