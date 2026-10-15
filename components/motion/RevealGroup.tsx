"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Arms children marked with data-reveal and shows them as they enter the viewport.
 * Content stays visible without JS or under reduced motion.
 */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((el) => el.setAttribute("data-armed", el.dataset.reveal || ""));
    const armed = new Set<HTMLElement>(items);

    // [data-armed] carries a will-change hint so each reveal starts on its own GPU layer. Once an item has
    // finished revealing, drop the attribute so the layer is released. Its resting style is already the
    // default (full opacity, no transform), so nothing moves. Descendants' own transitions are ignored.
    const release = (e: TransitionEvent) => {
      const t = e.target;
      if (e.propertyName !== "transform" || !(t instanceof HTMLElement) || !armed.has(t) || !t.classList.contains("is-in")) return;
      armed.delete(t);
      t.removeAttribute("data-armed");
      t.classList.remove("is-in");
    };
    root.addEventListener("transitionend", release);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    items.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.removeEventListener("transitionend", release);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
