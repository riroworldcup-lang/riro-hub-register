import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroRobot from "@/assets/hero-robot.jpg";
import riro1 from "@/assets/riro-1.webp.asset.json";
import riro2 from "@/assets/riro-2.webp.asset.json";
import riro3 from "@/assets/riro-3.webp.asset.json";
import riro4 from "@/assets/riro-4.webp.asset.json";
import { SiteShell } from "@/components/SiteNav";
import { CompetitionsGrid } from "@/components/CompetitionsGrid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GALLERY_SLIDES = [
  { src: riro1.url, alt: "RIRO Robotics World Cup arena with humanoid robot" },
  { src: riro2.url, alt: "Robotics World Cup stadium with cheering crowd" },
  { src: riro3.url, alt: "RIRO Robotics World Cup team of robots" },
  { src: riro4.url, alt: "RIRO World Cup champion robot with trophy" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIRO World Cup 2026 | International Robotics & Innovation Championship" },
      {
        name: "description",
        content:
          "4-day mega event Oct–Nov 2026 in Mira-Bhayander. Robotics, drones, aerospace, gaming, STEM. Register your team now.",
      },
      { property: "og:title", content: "RIRO World Cup 2026" },
      {
        property: "og:description",
        content: "International Robotics, Innovation & Technology Championship.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      <header id="top" className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full border-l border-primary/20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,107,0,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
          <div className="absolute bottom-10 left-4 font-mono text-[80px] sm:text-[100px] leading-none opacity-10 select-none">010101</div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 font-mono text-primary text-xs sm:text-sm mb-6 animate-slide-up flex-wrap">
              <span className="px-2 py-0.5 border border-primary">WORLD CUP 2026</span>
              <span className="opacity-50">MIRA-BHAYANDER, MAHARASHTRA</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 animate-slide-up [animation-delay:100ms]">
              RIRO <br />
              <span className="text-primary">World Cup</span> <br />
              <span className="[-webkit-text-stroke:2px_white] text-transparent">2026</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground mb-3 animate-slide-up [animation-delay:200ms]">
              International Robotics, Innovation & Technology Championship.
            </p>
            <p className="max-w-xl text-sm font-mono uppercase tracking-wider text-foreground/80 mb-10 animate-slide-up [animation-delay:250ms]">
              4-Day Mega Event • October–November 2026
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up [animation-delay:300ms]">
              <Link to="/register" className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white transition-colors cursor-pointer rounded-sm">
                Register Now
              </Link>
              <Link to="/competitions" className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-primary transition-colors cursor-pointer rounded-sm">
                View Competitions
              </Link>
            </div>
          </div>

          <div className="relative animate-slide-up [animation-delay:400ms]">
            <img
              src={heroRobot}
              alt="High-tech robotic arm with orange accents — RIRO World Cup 2026"
              width={1024}
              height={1024}
              className="w-full aspect-square object-cover rounded-sm border border-white/10"
            />
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-primary text-primary-foreground p-4 sm:p-5 rounded-sm shadow-2xl">
              <div className="font-mono font-black text-2xl sm:text-3xl">17+</div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">Competitions</div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono text-primary text-sm mb-3">[ ABOUT ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-8 leading-tight">
            The Largest Innovation <br className="hidden sm:block" />
            Championship of the Year.
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            RIRO WORLD CUP 2026 brings together students, innovators, robotics enthusiasts, gamers,
            drone pilots, makers, and technology professionals from across India and beyond.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border mt-12">
            {[
              ["4", "DAYS"],
              ["17+", "EVENTS"],
              ["5000+", "EXPECTED"],
              ["2026", "OCT–NOV"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background p-6 sm:p-8">
                <div className="font-mono font-black text-3xl sm:text-4xl text-primary">{n}</div>
                <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-2">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/about" className="font-mono text-xs uppercase tracking-widest text-primary hover:underline">
              Learn more about RIRO →
            </Link>
          </div>
        </div>
      </section>

      {/* Championship Grid */}
      <section id="competitions" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12 sm:mb-16">
            <div>
              <h2 className="font-mono text-primary text-sm mb-2">[ CATEGORIES ]</h2>
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
                Championship Grid
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-xs text-muted-foreground">SENIOR / JUNIOR DIVISIONS</p>
              <Link to="/competitions" className="font-mono text-xs text-primary hover:underline">
                View All →
              </Link>
            </div>
          </div>
          <CompetitionsGrid limit={8} />
          <div className="mt-10 text-center">
            <Link to="/competitions" className="inline-block px-6 py-3 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs hover:border-primary transition-colors rounded-sm">
              See All Competitions
            </Link>
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-mono text-primary text-sm mb-2">[ REGISTRATION ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
            Secure Your Slot.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lock in your spot in the championship. Submit your details now to receive priority updates.
          </p>
          <Link to="/register" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm">
            Register Your Team
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
