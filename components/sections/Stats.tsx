import { stats } from "@/lib/copy";
import { CountUp } from "@/components/motion/CountUp";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { LazyCrowd } from "@/components/motion/LazyScenes";
import { JaaliDivider } from "@/components/art/Dividers";

const tags = [
  { bg: "bg-cream", rot: "-rotate-3", offset: "" },
  { bg: "bg-rose", rot: "rotate-2", offset: "md:translate-y-10" },
  { bg: "bg-teal", rot: "rotate-1", offset: "" },
  { bg: "bg-marigold", rot: "-rotate-2", offset: "md:translate-y-10" },
];

/** Layout family: illustrated band. Count-up numbers on paper tags over a wide crowd scene. */
export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="relative bg-sun pt-20 md:pt-28">
      <JaaliDivider fill="#FFC918" />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 id="stats-title" className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-none tracking-tighter text-ink">
          {stats.title}
        </h2>
        <RevealGroup className="mt-10 grid max-w-xl grid-cols-2 gap-x-5 gap-y-6 md:mt-12 md:gap-x-7">
          {stats.items.map((s, i) => (
            <div key={s.label} data-reveal style={{ ["--i" as string]: i }} className={tags[i].offset}>
              <div className={`kkk-paper-shadow ${tags[i].bg} ${tags[i].rot} rounded-[24px] px-5 py-4 md:px-7 md:py-5`}>
                <p className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-none tracking-tighter text-ink">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink md:text-xl">{s.label}</p>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>

      <LazyCrowd className="relative -mt-4 aspect-[1600/640] w-full md:-mt-56 lg:-mt-80" />
    </section>
  );
}
