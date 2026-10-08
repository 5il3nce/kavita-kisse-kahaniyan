import Image from "next/image";
import { brands } from "@/lib/brands";
import { brandsCopy } from "@/lib/copy";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ToranDivider } from "@/components/art/Dividers";
import { C } from "@/components/art/motifs";

/** Layout family: logo wall. Twelve logos, twelve tiles (3x4, 4x3, 6x2). Logos only, no labels. */
export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="relative bg-cream pb-24 pt-20 md:pb-32 md:pt-28">
      <ToranDivider fill={C.cream} />

      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <h2 id="brands-title" className="text-center font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-none tracking-tighter text-ink">
          {brandsCopy.title}
        </h2>
        <RevealGroup className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 md:mt-16">
          {brands.map((b, i) => (
            <div
              key={b.src}
              data-reveal
              style={{ ["--i" as string]: i % 6 }}
              className="group grid aspect-square place-items-center rounded-[24px] border-2 border-sand bg-[#FFFBEF] p-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 md:p-6"
            >
              <Image src={b.src} alt={b.name} width={b.width} height={b.height} sizes="(min-width: 1024px) 160px, 30vw" className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
