"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type Revertable } from "./loadGsap";

/** Counts from 0 to value once, when it enters. Writes text directly, no React re-renders. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { n: 0 };
    let ctx: Revertable | undefined;
    let dead = false;
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      ctx = gsap.context(() => {
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          n: value,
          duration: value > 50 ? 1.8 : 1.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(state.n)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }, el);
    });
    return () => {
      dead = true;
      ctx?.revert();
      el.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
