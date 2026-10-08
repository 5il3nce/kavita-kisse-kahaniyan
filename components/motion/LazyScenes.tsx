"use client";

import dynamic from "next/dynamic";
import { LazyMount } from "./LazyMount";

// Heavy decorative scenes load as their own chunks when they come near the viewport,
// so they stay out of the initial HTML and RSC payload.
const Amphitheatre = dynamic(() => import("@/components/art/AmphitheatreScene").then((m) => m.AmphitheatreScene), { ssr: false });
const Crowd = dynamic(() => import("@/components/art/CrowdScene").then((m) => m.CrowdScene), { ssr: false });

export function LazyAmphitheatre({ className }: { className?: string }) {
  return (
    <LazyMount className={className}>
      <Amphitheatre />
    </LazyMount>
  );
}

export function LazyCrowd({ className }: { className?: string }) {
  return (
    <LazyMount className={className}>
      <Crowd />
    </LazyMount>
  );
}
