"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Gsap = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let pending: Promise<Gsap> | null = null;

/**
 * Loads GSAP and ScrollTrigger once, after hydration, so they stay off the critical path.
 * Every scroll-driven component waits on this same promise.
 */
export function loadGsap(): Promise<Gsap> {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
    });
  }
  return pending;
}

/** Minimal handle for a gsap.context, so effects can revert it on unmount. */
export type Revertable = { revert(): void };
