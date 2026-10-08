import Image from "next/image";
import { hero, site } from "@/lib/copy";
import { BirdsLayer, BuntingLayer, CloudsLayer, ForegroundLayer, GateLayer, SkyLayer } from "@/components/art/GatewayScene";
import { C, Petal, Star, scallopArchPath, scallopEdgePath } from "@/components/art/motifs";
import { HeroScrub } from "@/components/motion/HeroScrub";
import { TicketButton } from "./TicketButton";

const PETALS: [string, string, string, "petal" | "star"][] = [
  ["12%", "22%", C.marigold, "petal"], ["22%", "58%", C.rose, "petal"], ["8%", "70%", C.cream, "star"],
  ["84%", "26%", C.rose, "petal"], ["76%", "62%", C.marigold, "petal"], ["90%", "48%", C.cream, "star"],
  ["30%", "14%", C.teal, "petal"], ["68%", "12%", C.marigold, "star"],
];

/** Layout family: pinned scroll-scrubbed scene (280vh with a sticky full-screen stage). */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative h-[280vh] bg-sun motion-reduce:h-auto">
      <HeroScrub />
      <div data-stage className="sticky top-0 h-[100dvh] min-h-[560px] overflow-hidden bg-cream">
        <div data-scene-box className="kkk-scene-box" role="img" aria-label={hero.sceneLabel}>
          <div data-layer="sky" className="absolute inset-0">
            <SkyLayer />
          </div>
          <div data-layer="clouds" className="absolute inset-0">
            <CloudsLayer />
          </div>
          <div data-layer="birds" className="absolute inset-0">
            <BirdsLayer />
          </div>
          <div data-layer="gate" className="absolute inset-0">
            <GateLayer />
          </div>
          <div data-layer="fg" className="absolute inset-0">
            <ForegroundLayer />
          </div>
          <div data-layer="bunting" className="absolute inset-0">
            <div className="kkk-breeze absolute inset-0">
              <BuntingLayer />
            </div>
          </div>
        </div>

        {/* Flat paper-cut arch of light that opens in front of the gate for the final frame. */}
        <div data-glow aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[92%] w-[min(100vw,1360px)] opacity-0 portrait:h-[82%]">
          {/* Outline inset from the viewBox edges: the scallop lobes bulge ~60 units outward and must stay inside.
              Portrait uses a taller canvas so the straight sides reach up beside the copy. */}
          {[
            [1000, "h-full w-full portrait:hidden"],
            [2000, "hidden h-full w-full portrait:block"],
          ].map(([vh, cls]) => (
            <svg key={vh} viewBox={`0 0 1000 ${vh}`} preserveAspectRatio="none" className={cls as string}>
              <path d={scallopArchPath(500, +vh, 860, +vh - 90, 5)} fill="#F5B400" transform="translate(0 -14)" />
              <path d={scallopArchPath(500, +vh, 860, +vh - 90, 5)} fill="#FFF6DC" />
              <path d={scallopArchPath(500, +vh, 770, +vh - 150, 5)} fill="none" stroke="#FF8A00" strokeWidth={4} strokeDasharray="2 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          ))}
        </div>

        {/* Ambient petals for the final frame: small HTML pieces, so their drift is compositor-only. */}
        <div data-petals aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0">
          {PETALS.map(([left, top, color, kind], i) => (
            <svg key={i} viewBox="-14 -14 28 28" className={`absolute size-6 md:size-8 ${i % 2 ? "kkk-drift-a" : "kkk-drift-b"}`} style={{ left, top, animationDelay: `${-i * 1.3}s` }}>
              {kind === "star" ? <Star x={0} y={0} r={12} color={color} /> : <Petal x={0} y={0} rot={i * 40} color={color} />}
            </svg>
          ))}
        </div>

        {/* KKK logo, resolved from a pre-blurred copy (opacity cross-fade only, no animated filter). */}
        <div data-logo-wrap className="pointer-events-none absolute inset-x-0 top-[37%] flex -translate-y-1/2 justify-center portrait:top-[34%]">
          <div data-logo className="relative w-[min(60vw,340px)] opacity-0 [@media(max-height:520px)]:w-[180px]">
            <Image data-logo-blur src="/images/kkk-logo.png" alt="" aria-hidden="true" width={1132} height={725} sizes="340px" className="h-auto w-full blur-md" />
            <Image data-logo-sharp src="/images/kkk-logo.png" alt={hero.logoAlt} width={1132} height={725} sizes="340px" className="absolute inset-0 h-auto w-full opacity-0" />
          </div>
        </div>

        <div data-copy className="absolute inset-x-0 bottom-[max(1.25rem,4vh)] px-4">
          <div className="relative mx-auto w-fit max-w-6xl">
            <div data-plaque aria-hidden="true" className="kkk-paper-shadow absolute -inset-x-5 -inset-y-4 rounded-[24px] bg-sun md:-inset-x-8 md:-inset-y-5">
              <svg viewBox="0 0 400 14" preserveAspectRatio="none" className="absolute inset-x-6 -top-[13px] h-[14px] w-[calc(100%-3rem)]">
                <path d={scallopEdgePath(400, 14, 16, 2)} fill="#FFC918" />
              </svg>
            </div>
            <div className="relative flex flex-col items-center gap-4 text-center lg:flex-row lg:items-center lg:gap-10 lg:text-left [@media(max-height:520px)]:flex-row [@media(max-height:520px)]:gap-6 [@media(max-height:520px)]:text-left">
              <div>
                <h1 id="hero-title" className="font-hindi font-semibold leading-[1.35] tracking-normal text-ink text-[clamp(1.05rem,4.9vw,2.5rem)] [@media(max-height:520px)]:text-[1.15rem]">
                  <span className="sr-only">{site.name}: </span>
                  {hero.taglineLines.map((line) => (
                    <span key={line} data-line lang="hi" className="block whitespace-nowrap">
                      {line}
                    </span>
                  ))}
                </h1>
                <p data-sub className="mt-2 font-body text-[0.95rem] font-medium leading-snug text-ink/85 md:text-lg">
                  {hero.sub}
                </p>
              </div>
              <div data-cta className="shrink-0">
                <TicketButton size="lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
