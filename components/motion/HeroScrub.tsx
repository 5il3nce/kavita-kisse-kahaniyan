"use client";

import { useEffect } from "react";
import { loadGsap, type Revertable } from "./loadGsap";

/**
 * Drives the server-rendered hero (#top). The scene markup is not hydrated, only this effect runs.
 * The tagline, subtext and ticket CTA are visible on first paint over the closed gate; the scrub
 * opens the doors, the KKK logo resolves in the light, and the same copy re-settles under it.
 * Reduced motion jumps straight to the open-gate final state.
 */
export function HeroScrub() {
  useEffect(() => {
    const el = document.getElementById("top");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ctx: Revertable | undefined;
    let dead = false;
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (dead) return;
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        const stage = q("[data-stage]")[0] as HTMLElement;
        const box = q("[data-scene-box]")[0] as HTMLElement;
        const copy = q("[data-copy]")[0] as HTMLElement;
        const logoWrap = q("[data-logo-wrap]")[0] as HTMLElement;

        // Map a scene point to pixels inside the scene box (viewBox 1600x1000, xMidYMax slice).
        const map = (x: number, y: number) => {
          const W = box.offsetWidth;
          const H = box.offsetHeight;
          const s = Math.max(W / 1600, H / 1000);
          return { x: (W - 1600 * s) / 2 + x * s, y: H - 1000 * s + y * s };
        };
        const portrait = () => stage.offsetHeight > stage.offsetWidth;
        const origin = () => {
          const p = map(800, 640);
          return `${p.x}px ${p.y}px`;
        };
        const camY = () => stage.offsetHeight * (portrait() ? 0.37 : 0.4) - map(800, 640).y;
        const zoom = () => (portrait() ? 2.3 : 2.5);
        const finalCopyY = () =>
          logoWrap.offsetTop + logoWrap.offsetHeight / 2 + stage.offsetHeight * 0.03 - copy.offsetTop;

        const tl = gsap.timeline({ defaults: { ease: "none" }, paused: true });

        // Camera: slow push into the gate, sky and clouds move less (parallax depth).
        tl.fromTo(q("[data-layer=gate]"), { scale: 1, y: 0, transformOrigin: origin }, { scale: zoom, y: camY, transformOrigin: origin, duration: 10, ease: "power2.in" }, 0)
          .fromTo(q("[data-layer=sky]"), { scale: 1, y: 0, transformOrigin: origin }, { scale: 1.3, y: () => camY() * 0.35, transformOrigin: origin, duration: 10 }, 0)
          .fromTo(q("[data-layer=clouds]"), { scale: 1, transformOrigin: origin }, { scale: 1.45, transformOrigin: origin, duration: 10 }, 0)
          .to(q(".kkk-cloud-l1"), { x: -420, duration: 7 }, 0)
          .to(q(".kkk-cloud-r1"), { x: 420, duration: 7 }, 0)
          .to(q(".kkk-cloud-l2"), { x: -260, y: -40, duration: 9 }, 0)
          .to(q(".kkk-cloud-r2"), { x: 260, y: -40, duration: 9 }, 0)
          .to(q(".kkk-birds-l"), { x: -340, y: -180, duration: 8 }, 0)
          .to(q(".kkk-birds-r"), { x: 340, y: -220, duration: 8 }, 0)
          .to(q("[data-layer=bunting]"), { yPercent: -5, scale: 1.06, transformOrigin: "50% 0%", duration: 10 }, 0)
          // Foreground tiles slide away.
          .to(q("[data-layer=fg]"), { yPercent: 40, duration: 6, ease: "power1.in" }, 0.4)
          // Doors swing open with a snappy ease-out.
          .fromTo(q(".kkk-door-l"), { scaleX: 1, skewY: 0, transformOrigin: "0% 50%" }, { scaleX: 0.14, skewY: -16, transformOrigin: "0% 50%", duration: 2, ease: "power4.out" }, 1.4)
          .fromTo(q(".kkk-door-r"), { scaleX: 1, skewY: 0, transformOrigin: "100% 50%" }, { scaleX: 0.14, skewY: 16, transformOrigin: "100% 50%", duration: 2, ease: "power4.out" }, 1.4)
          // Light, rays and the Imambara silhouette.
          .fromTo(q(".kkk-inner-rays"), { scale: 0.3, opacity: 0.3 }, { scale: 1.4, opacity: 1, duration: 2.6, ease: "power2.out" }, 1.9)
          .fromTo(q(".kkk-imambara"), { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 2.2, ease: "power2.out" }, 2.4)
          .fromTo(q(".kkk-burst"), { scale: 0.15, opacity: 0 }, { scale: 1.25, opacity: 0.75, duration: 3.2, ease: "power2.out" }, 2.6);

        // Petals, stars and confetti float out of the doorway.
        q(".kkk-particle").forEach((p, i) => {
          const d = (p as HTMLElement).dataset;
          tl.fromTo(
            p,
            { x: 800, y: 690, scale: 0.2, rotation: 0, opacity: 0 },
            { x: 800 + Number(d.tx), y: 690 + Number(d.ty), scale: 1, rotation: Number(d.rot), opacity: 1, duration: 3.4, ease: "power1.out" },
            2.8 + (i % 12) * 0.08,
          );
        });

        // Final third: the copy steps aside, the logo resolves in the glow, the copy returns under it.
        tl.to(q("[data-plaque]"), { opacity: 0, yPercent: 20, duration: 0.8 }, 5.6)
          .to(q("[data-line], [data-sub], [data-cta]"), { opacity: 0, y: -18, duration: 0.7, stagger: 0.08 }, 5.7)
          .fromTo(q("[data-glow]"), { scale: 0.25, transformOrigin: "50% 100%" }, { scale: 1, transformOrigin: "50% 100%", duration: 1.6, ease: "power3.out" }, 5.5)
          .fromTo(q("[data-glow]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 5.5)
          .set(copy, { y: finalCopyY }, 6.7)
          .fromTo(q("[data-logo]"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 6.7)
          .fromTo(q("[data-logo-sharp]"), { opacity: 0 }, { opacity: 1, duration: 0.9 }, 7.0)
          .fromTo(q("[data-logo-blur]"), { opacity: 1 }, { opacity: 0, duration: 0.7 }, 7.4)
          .fromTo(q("[data-line]"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.35, immediateRender: false, ease: "power2.out" }, 8.2)
          .fromTo(q("[data-sub]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, 9.0)
          .fromTo(q("[data-cta]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, immediateRender: false }, 9.25)
          .fromTo(q("[data-petals]"), { opacity: 0 }, { opacity: 1, duration: 0.8 }, 8.6)
          .to({}, { duration: 0.15 }, 9.85);

        if (reduce) {
          tl.progress(1);
          return;
        }

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          animation: tl,
          invalidateOnRefresh: true,
        });

        // Cache the zooming layers as GPU textures only while scrolling through the hero (smooth),
        // then drop the hint so the browser re-rasters them crisp at rest.
        const layers = q("[data-layer]") as HTMLElement[];
        const hint = (v: string) => layers.forEach((l) => (l.style.willChange = v));
        const onStart = () => st.isActive && hint("transform");
        const onEnd = () => hint("");
        ScrollTrigger.addEventListener("scrollStart", onStart);
        ScrollTrigger.addEventListener("scrollEnd", onEnd);
        return () => {
          ScrollTrigger.removeEventListener("scrollStart", onStart);
          ScrollTrigger.removeEventListener("scrollEnd", onEnd);
        };
      }, el);
    });

    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
