"use client";

import { useEffect, useRef } from "react";
import { C } from "@/components/art/motifs";
import { loadGsap, type Revertable } from "./loadGsap";

/**
 * Divider: an ink ribbon path revealed by a clip-path wipe tied to scroll.
 * The wipe scales a clip rectangle (transform only), so it stays on the compositor-friendly path.
 */
export function RibbonWipe({ fill }: { fill: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: Revertable | undefined;
    let dead = false;
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-wipe]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", transformOrigin: "0% 50%", scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: 0.5 } },
        );
      }, el);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  const ribbon = "M-20 70 C 180 10, 320 120, 520 60 S 860 0, 1040 70 S 1380 120, 1620 40";
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[3] -translate-y-[calc(100%-2px)]">
      <svg viewBox="0 0 1600 130" preserveAspectRatio="none" overflow="visible" className="block h-[70px] w-full md:h-[110px]">
        <clipPath id="kkk-ribbon-wipe">
          <rect data-wipe x={0} y={0} width={1600} height={130} />
        </clipPath>
        {/* The next section's colour starts along the ribbon's centre line, so the ribbon is the seam. */}
        <path d={`${ribbon} L1620 130 L-20 130 Z`} fill={fill} />
        <g clipPath="url(#kkk-ribbon-wipe)">
          <path d={ribbon} stroke={C.sunDeep} strokeWidth={30} fill="none" strokeLinecap="round" transform="translate(0 8)" />
          <path d={ribbon} stroke={C.sun} strokeWidth={26} fill="none" strokeLinecap="round" />
          <path d={ribbon} stroke={C.ink} strokeWidth={3} fill="none" strokeDasharray="2 14" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
