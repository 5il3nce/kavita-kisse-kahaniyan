"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, type Revertable } from "./loadGsap";

/** Scrubs the pen scene: the ink ribbon wipes out of the nib and its shapes pop along it. */
export function PenReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: Revertable | undefined;
    let dead = false;
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        tl.fromTo(".kkk-pen", { x: -40, y: 40 }, { x: 0, y: 0, duration: 1 }, 0)
          .fromTo(".kkk-ink-wipe", { scaleX: 0 }, { scaleX: 1, transformOrigin: "0% 50%", duration: 2.2 }, 0.3)
          .fromTo(
            ".kkk-pop",
            { scale: 0, opacity: 0, transformOrigin: "50% 50%" },
            { scale: 1, opacity: 1, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.09, ease: "back.out(2)" },
            0.6,
          );
      }, el);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
