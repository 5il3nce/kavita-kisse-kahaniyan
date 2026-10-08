import { aboutKkk } from "@/lib/copy";
import { PenScene } from "@/components/art/PenScene";
import { PenReveal } from "@/components/motion/PenReveal";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { BuntingDivider } from "@/components/art/Dividers";
import { C, Star } from "@/components/art/motifs";

/** Layout family: asymmetric split, illustration bleeding left (7 cols), text right (5 cols). */
export function AboutKkk() {
  return (
    <section aria-labelledby="about-kkk-title" className="relative bg-rose-light pb-20 pt-24 md:pb-32 md:pt-36">
      <BuntingDivider fill="#FFE1EA" />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute right-[6%] top-24 h-16 w-16">
        <Star x={50} y={50} r={44} color={C.sun} />
      </svg>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-12 md:gap-6 md:px-8">
        <PenReveal className="md:col-span-7 md:-ml-8">
          <PenScene />
        </PenReveal>

        <RevealGroup className="md:col-span-5 md:pl-4">
          <h2 id="about-kkk-title" data-reveal className="font-display text-[clamp(2.2rem,4.4vw,4rem)] font-bold leading-[1.02] tracking-tighter text-ink">
            {aboutKkk.title}
          </h2>
          <p data-reveal className="kkk-paper-shadow mt-5 inline-block -rotate-2 rounded-[24px] bg-sun px-5 py-2 font-display text-xl font-semibold text-ink md:text-2xl" style={{ ["--i" as string]: 1 }}>
            {aboutKkk.tagline}
          </p>
          <div className="mt-8 space-y-4">
            {aboutKkk.body.map((p, i) => (
              <p key={i} data-reveal className="max-w-[52ch] text-lg leading-relaxed text-ink/80" style={{ ["--i" as string]: i + 2 }}>
                {p}
              </p>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
