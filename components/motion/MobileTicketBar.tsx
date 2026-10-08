"use client";

import { useEffect, useState } from "react";
import { mobileBar } from "@/lib/copy";
import { TicketButton } from "@/components/sections/TicketButton";

/** Sticky bottom ticket bar on phones, shown once the hero has scrolled past. */
export function MobileTicketBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: "0px 0px -100% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.ticketBar = show ? "on" : "off";
  }, [show]);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-full border-2 border-ink bg-sun py-2 pl-5 pr-2 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <p className="whitespace-nowrap font-display text-[13px] font-semibold leading-tight text-ink">{mobileBar.date}</p>
      <TicketButton size="md" />
    </div>
  );
}
