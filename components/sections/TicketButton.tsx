import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { nav } from "@/lib/copy";
import { TICKET_URL } from "@/lib/site";

const sizes = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2",
};

/** The one ticket CTA used everywhere on the page. Opens the District event page. */
export function TicketButton({ size = "md", className = "" }: { size?: keyof typeof sizes; className?: string }) {
  return (
    <a
      href={TICKET_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`kkk-press inline-flex items-center whitespace-nowrap rounded-full border-2 border-ink bg-rose font-display font-semibold leading-none text-ink shadow-[0_4px_0_#B8325F] ${sizes[size]} ${className}`}
    >
      {nav.ticket}
      <ArrowUpRight weight="bold" aria-hidden="true" className="size-[1.1em]" />
      <span className="sr-only"> {nav.newTab}</span>
    </a>
  );
}
