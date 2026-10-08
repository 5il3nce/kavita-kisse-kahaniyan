import { intro } from "@/lib/copy";
import { WordReveal } from "@/components/motion/WordReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ScallopDivider } from "@/components/art/Dividers";
import { C, Marigold, scallopArchPath } from "@/components/art/motifs";

/** Layout family: editorial manifesto. One long statement, one display pull line, an offset closing note. */
export function Intro() {
  return (
    <section id="about" aria-label="Kavita Kisse Kahaniyan in Lucknow" className="relative bg-cream py-20 md:py-32">
      <ScallopDivider fill={C.cream} />

      {/* Paper-cut layers so the section never reads as a flat block. */}
      <svg aria-hidden="true" viewBox="0 0 600 800" className="pointer-events-none absolute -right-24 top-10 hidden h-[620px] w-auto md:block lg:right-0">
        <path d={scallopArchPath(300, 800, 520, 760, 5)} fill={C.sun} opacity={0.22} />
        <path d={scallopArchPath(300, 800, 420, 640, 5)} fill="none" stroke={C.marigold} strokeOpacity={0.35} strokeWidth={3} strokeDasharray="2 10" strokeLinecap="round" />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 220 220" className="pointer-events-none absolute -left-10 bottom-40 hidden h-44 w-44 opacity-80 md:block">
        <path d="M0 0 H220 A220 220 0 0 1 0 220 Z" fill="url(#kkk-jaali-teal)" transform="rotate(180 110 110)" />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-8">
        <WordReveal
          text={intro.lead}
          className="max-w-5xl font-display text-[clamp(1.3rem,2.5vw,2.3rem)] font-medium leading-[1.4] tracking-tight text-ink"
        />

        <RevealGroup className="mt-16 md:mt-28">
          <blockquote data-reveal className="relative max-w-6xl md:ml-[8%]">
            <svg aria-hidden="true" viewBox="0 0 60 60" className="absolute -left-2 -top-8 h-12 w-12 md:-left-16 md:top-0">
              <Marigold x={30} y={30} r={24} />
            </svg>
            <p className="font-display text-[clamp(2rem,5.2vw,4.6rem)] font-bold leading-[1.08] tracking-tighter text-ink">
              {intro.pull}
            </p>
            <svg aria-hidden="true" viewBox="0 0 600 30" preserveAspectRatio="none" className="mt-4 h-5 w-2/3 md:h-7">
              <path d="M4 18 C120 4 220 28 320 14 S520 6 596 16" stroke={C.marigold} strokeWidth={10} fill="none" strokeLinecap="round" />
            </svg>
          </blockquote>

          <p data-reveal className="mt-14 max-w-[52ch] text-lg leading-relaxed text-ink/80 md:ml-[46%] md:mt-20 md:text-xl" style={{ ["--i" as string]: 1 }}>
            {intro.close}
          </p>
        </RevealGroup>
      </div>
    </section>
  );
}
