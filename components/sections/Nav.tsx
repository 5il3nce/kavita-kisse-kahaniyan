import Image from "next/image";
import { nav, footer } from "@/lib/copy";
import { TicketButton } from "./TicketButton";

/** Single-line nav, 64px tall. Book Tickets is visible from first paint at every width. */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" aria-label={nav.homeLabel} className="flex shrink-0 items-center rounded-full bg-sun/90 py-1 pl-1 pr-3">
          <Image src="/images/kkk-logo.png" alt={footer.logoAlt} width={1132} height={725} priority sizes="72px" className="h-11 w-auto" />
        </a>
        <ul className="hidden items-center gap-1 rounded-full border-2 border-ink bg-cream px-2 py-1 font-display text-[0.95rem] font-semibold lg:flex">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-4 py-1.5 transition-colors duration-300 hover:bg-sun">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <TicketButton size="sm" className="kkk-nav-cta md:px-5 md:py-2.5 md:text-base" />
      </nav>
    </header>
  );
}
