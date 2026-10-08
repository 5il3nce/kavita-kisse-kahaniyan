"use client";

import { useEffect, type ReactNode } from "react";
import { loadGsap } from "./loadGsap";

/** One Lenis instance for the page, driven by GSAP's ticker and feeding ScrollTrigger. */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let dead = false;
    let cleanup = () => {};

    Promise.all([import("lenis"), loadGsap()]).then(([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
      if (dead) return;
      const lenis = new Lenis({
        autoRaf: false,
        anchors: { offset: -72 },
        lerp: 0.1,
        // Touch keeps native momentum, which is the smoothest option on phones.
        syncTouch: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      dead = true;
      cleanup();
    };
  }, []);

  return <>{children}</>;
}
