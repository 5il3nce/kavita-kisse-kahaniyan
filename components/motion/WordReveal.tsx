"use client";

import { useEffect, useRef } from "react";
import { loadGsap, type Revertable } from "./loadGsap";

/** Paragraph whose words brighten one by one as it scrolls. The floor stays at 0.6 so every word keeps AA contrast. */
export function WordReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: Revertable | undefined;
    let dead = false;
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          el.querySelectorAll("[data-w]"),
          { opacity: 0.6 },
          { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.4 } },
        );
      }, el);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} data-w>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
