import type { Metadata, Viewport } from "next";
import { Hind, Palanquin, Palanquin_Dark } from "next/font/google";
import { site } from "@/lib/copy";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SvgDefs } from "@/components/art/SvgDefs";
import { Grain } from "@/components/art/Grain";
import "./globals.css";

// Palanquin comes from the brief document's embedded fonts. Hind carries all Hindi text.
// Only the weights in use are loaded. The display face is not preloaded (only small nav text uses it
// above the fold), so the hero text fonts win the early bandwidth on phones.
const display = Palanquin_Dark({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-palanquin-dark", display: "swap", preload: false });
const body = Palanquin({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-palanquin", display: "swap" });
const hindi = Hind({ subsets: ["devanagari"], weight: ["600"], variable: "--font-hind", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  keywords: ["Kavita Kisse Kahaniyan", "Spill The Word Fest", "spoken word", "poetry", "storytelling", "Lucknow", "open mic", "festival"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  icons: { icon: "/images/kkk-logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#FFC918",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hindi.variable}`}>
      <body>
        <SvgDefs />
        <LenisProvider>{children}</LenisProvider>
        <Grain />
      </body>
    </html>
  );
}
