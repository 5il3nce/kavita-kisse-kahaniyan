import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { AboutKkk } from "@/components/sections/AboutKkk";
import { Stats } from "@/components/sections/Stats";
import { Fest } from "@/components/sections/Fest";
import { Artists } from "@/components/sections/Artists";
import { Brands } from "@/components/sections/Brands";
import { Venue } from "@/components/sections/Venue";
import { Footer } from "@/components/sections/Footer";
import { MobileTicketBar } from "@/components/motion/MobileTicketBar";

// Order follows Assets/brief.docx: brand and tagline, intro, About KKK, About the fest, date and venue,
// "Art, Literature & Culture". Stats, artists and brands sit where they support that flow.
export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Intro />
        <AboutKkk />
        <Stats />
        <Fest />
        <Artists />
        <Brands />
        <Venue />
      </main>
      <Footer />
      <MobileTicketBar />
    </>
  );
}
