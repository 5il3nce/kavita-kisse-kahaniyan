"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Mounts a heavy SVG scene only when it comes near the viewport. The box reserves its space (no CLS). */
export function LazyMount({ children, className, rootMargin = "600px 0px" }: { children: ReactNode; className?: string; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {show ? children : null}
    </div>
  );
}
