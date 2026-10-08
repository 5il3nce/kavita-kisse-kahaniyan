"use client";

import { useEffect, useState } from "react";
import { venue } from "@/lib/copy";
import { FEST_START_MS } from "@/lib/site";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/** Live countdown to 24 Oct 2026 00:00 Asia/Kolkata. Shows a skeleton until mounted, and a live message after the start. */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now !== null && now >= FEST_START_MS) {
    return <p className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">{venue.countdownLive}</p>;
  }

  const parts = now === null ? null : split(FEST_START_MS - now);
  return (
    <div>
      <p className="sr-only">{venue.countdownSr}</p>
      <dl className="grid grid-cols-4 gap-2 md:gap-3" aria-busy={now === null}>
        {venue.countdownUnits.map((u, i) => (
          <div key={u} className="flex flex-col-reverse rounded-[24px] bg-cream px-2 py-3 text-center md:py-4">
            <dt className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink/75 md:text-sm">{u}</dt>
            <dd className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-none tracking-tighter tabular-nums text-ink">
              {parts ? String(parts[i]).padStart(2, "0") : <span className="inline-block h-[0.9em] w-[1.3em] animate-pulse rounded-lg bg-sand align-middle" aria-label={venue.countdownLoading} />}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
