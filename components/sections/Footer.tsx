import Image from "next/image";
import { FacebookLogo, InstagramLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { footer, nav } from "@/lib/copy";
import { WavesDivider } from "@/components/art/Dividers";
import { C, Diya, Marigold } from "@/components/art/motifs";

const ICONS = { Instagram: InstagramLogo, YouTube: YoutubeLogo, Facebook: FacebookLogo, X: XLogo } as const;

/** Footer with the page's single marquee. */
export function Footer() {
  const run = Array.from({ length: 6 });
  return (
    <footer className="relative overflow-x-clip bg-marigold pb-28 pt-14 md:pb-14 md:pt-20">
      <WavesDivider fill={C.marigold} />

      <div className="overflow-hidden border-y-2 border-ink bg-sun py-4">
        <p className="sr-only">{footer.marquee}</p>
        <div className="kkk-marquee flex w-max items-center" aria-hidden="true">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {run.map((_, i) => (
                <span key={i} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-display text-[clamp(2rem,5vw,4.2rem)] font-bold leading-none tracking-tighter text-ink">
                    {footer.marquee}
                  </span>
                  <svg viewBox="0 0 60 60" className="h-10 w-10 md:h-14 md:w-14">
                    {i % 2 ? <Marigold x={30} y={30} r={24} /> : <Diya x={30} y={44} s={0.85} />}
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col items-start justify-between gap-8 px-4 md:flex-row md:items-center md:px-8">
        <a href="#top" aria-label={nav.homeLabel} className="block rounded-[24px] bg-sun p-2">
          <Image src="/images/kkk-logo.png" alt={footer.logoAlt} width={1132} height={725} sizes="140px" className="h-20 w-auto" />
        </a>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">{footer.socialTitle}</h2>
          <ul className="mt-3 flex gap-3">
            {footer.social.map((s) => {
              const Icon = ICONS[s.label as keyof typeof ICONS];
              return (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} ${nav.newTab}`} className="kkk-press grid size-12 place-items-center rounded-full border-2 border-ink bg-cream text-ink">
                    <Icon weight="bold" aria-hidden="true" className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-sm font-medium text-ink/80">{footer.copyright}</p>
      </div>
    </footer>
  );
}
