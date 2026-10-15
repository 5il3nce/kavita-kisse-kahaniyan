"use client";

import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Gsap = { gsap: typeof GsapType; ScrollTrigger: typeof ScrollTriggerType };

let pending: Promise<Gsap> | null = null;

/**
 * Freezes GSAP's clock while the tab is hidden and resumes it from the same point when the tab returns.
 * The ticker runs with lag smoothing off (see LenisProvider), so without this every running tween
 * would jump by however long the tab was away. ScrollTrigger already re-measures on return if the
 * window size changed; update() just re-syncs scrubbed timelines to the current scroll position.
 */
function syncWithVisibility({ gsap, ScrollTrigger }: Gsap) {
  const sync = () => {
    if (document.hidden) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
      ScrollTrigger.update();
    }
  };
  document.addEventListener("visibilitychange", sync);
  if (document.hidden) sync();
}

/**
 * Loads GSAP and ScrollTrigger once, after hydration, so they stay off the critical path.
 * Every scroll-driven component waits on this same promise.
 */
export function loadGsap(): Promise<Gsap> {
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      g.gsap.registerPlugin(s.ScrollTrigger);
      const loaded = { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
      // GSAP is a page-lifetime singleton, so this listener is never removed.
      syncWithVisibility(loaded);
      return loaded;
    });
  }
  return pending;
}

/** Minimal handle for a gsap.context, so effects can revert it on unmount. */
export type Revertable = { revert(): void };
