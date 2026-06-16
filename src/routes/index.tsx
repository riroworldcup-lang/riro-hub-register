import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import riro1 from "@/assets/riro-1.webp.asset.json";
import riro2 from "@/assets/riro-2.webp.asset.json";
import riro3 from "@/assets/riro-3.webp.asset.json";
import riro4 from "@/assets/riro-4.webp.asset.json";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { SiteShell } from "@/components/SiteNav";
import { CompetitionsGrid } from "@/components/CompetitionsGrid";
import { Leaderboard } from "@/components/Leaderboard";
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
      <header id="top" className="relative min-h-[90vh] flex flex-col justify-center px-4 sm:px-6 py-16 overflow-hidden">
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/80 z-[1]" />
        {/* Animated cyber grid */}
        <div className="absolute inset-0 opacity-30 pointer-events-none animate-grid-shift z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,107,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Drifting glow orbs */}
        <div className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-orb-drift z-[2]" />
        <div className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full bg-primary/10 blur-[100px] pointer-events-none animate-orb-drift [animation-delay:-4s] z-[2]" />
        {/* Scanline */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_var(--color-primary)] pointer-events-none animate-scanline z-[2]" />
        {/* Subtle diagonal stripes & code echo */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-[2]">
          <div className="absolute top-0 right-0 w-1/2 h-full border-l border-primary/20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,107,0,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
          <div className="absolute bottom-10 left-4 font-mono text-[80px] sm:text-[100px] leading-none opacity-10 select-none">010101</div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="relative">
            {/* HUD corner brackets */}
            <span className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-primary/70" />
            <span className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-primary/70" />
            <span className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-primary/70" />
            <span className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-primary/70" />

            <div className="flex items-center gap-3 font-mono text-primary text-xs sm:text-sm mb-6 animate-slide-up flex-wrap">
              <span className="px-2 py-0.5 border border-primary inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                WORLD CUP 2026
              </span>
              <span className="opacity-50">MIRA-BHAYANDER, MAHARASHTRA</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.9] mb-6 animate-slide-up [animation-delay:100ms] drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
              RIRO <br />
              <span className="text-primary drop-shadow-[0_0_25px_rgba(255,107,0,0.6)] transition-all duration-500 hover:drop-shadow-[0_0_45px_rgba(255,107,0,0.95)]">World Cup</span> <br />
              <span className="[-webkit-text-stroke:2px_white] text-transparent">2026</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-muted-foreground mb-3 animate-slide-up [animation-delay:200ms]">
              International Robotics, Innovation & Technology Championship.
            </p>
            <p className="max-w-xl text-sm font-mono uppercase tracking-wider text-foreground/80 mb-4 animate-slide-up [animation-delay:250ms]">
              4-Day Mega Event • October–November 2026
            </p>

            <div className="max-w-xl mb-8 animate-slide-up [animation-delay:280ms] animate-float-y">
              <div className="group relative inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent border-l-4 border-primary rounded-r overflow-hidden backdrop-blur-sm transition-all duration-300 hover:from-primary/35 hover:shadow-[0_0_30px_rgba(255,107,0,0.45)]">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <span className="text-2xl">🎓</span>
                <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-primary leading-tight">
                  50 FREE COURSES TO ALL PARTICIPANTS
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center animate-slide-up [animation-delay:300ms]">
              <Link to="/register" className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm cursor-pointer overflow-hidden animate-glow-pulse transition-transform duration-300 hover:scale-[1.04] active:scale-95">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative">Register Now</span>
              </Link>
              <div className="flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">Register for Free</span>
              </div>
              <Link to="/competitions" className="group px-6 sm:px-8 py-3 sm:py-4 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_25px_rgba(255,107,0,0.35)]">
                <span className="inline-flex items-center gap-2">
                  View Competitions
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>

            {/* HUD telemetry footer */}
            <div className="mt-10 flex items-center gap-3 opacity-50 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              <div className="h-px w-8 bg-muted-foreground/40" />
              <span>SYS.RIRO_2026 // STATUS: ONLINE</span>
              <div className="h-px flex-1 bg-muted-foreground/20" />
            </div>
          </div>

          <div className="relative animate-slide-up [animation-delay:400ms] group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent rounded-sm blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
            <video
              autoPlay
              loop
              muted
              playsInline
              src={heroVideo.url}
              width={1024}
              height={1024}
              className="relative w-full aspect-square object-cover rounded-sm border border-white/10 transition-transform duration-700 group-hover:scale-[1.02] group-hover:border-primary/50"
            />
            {/* Video corner brackets */}
            <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-primary text-primary-foreground p-4 sm:p-5 rounded-sm shadow-2xl transition-transform duration-300 hover:scale-105 hover:rotate-[-2deg]">
              <div className="font-mono font-black text-2xl sm:text-3xl">17+</div>
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">Competitions</div>
            </div>
          </div>
        </div>
      </header>

      <Leaderboard />

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

      {/* Gallery Slider */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <h2 className="font-mono text-primary text-sm mb-2">[ GALLERY ]</h2>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
              Inside The Arena
            </h3>
          </div>
          <Carousel opts={{ loop: true }} className="px-10 sm:px-12">
            <CarouselContent>
              {GALLERY_SLIDES.map((s) => (
                <CarouselItem key={s.src}>
                  <div className="border border-border rounded-sm overflow-hidden bg-white/[0.02]">
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Video Showcase */}
      <VideoShowcase />

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

function VideoShowcase() {
  const [url, setUrl] = useState<string>("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  function toEmbed(input: string): string | null {
    try {
      const u = new URL(input);
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        if (id) return `https://www.youtube.com/embed/${id}`;
      }
      if (u.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
      }
      if (u.hostname.includes("vimeo.com")) {
        const id = u.pathname.split("/").filter(Boolean)[0];
        if (id) return `https://player.vimeo.com/video/${id}`;
      }
      if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return input;
      return input;
    } catch {
      return null;
    }
  }

  const embed = submitted ? toEmbed(submitted) : null;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="font-mono text-primary text-sm mb-2">[ VIDEO ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
            Watch The Action
          </h3>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Paste a YouTube, Vimeo, or direct video URL to preview it here.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(url.trim() || null);
          }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="flex-1 px-4 py-3 bg-background border border-border rounded-sm font-mono text-sm focus:border-primary outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm"
          >
            Load Video
          </button>
        </form>

        <div className="aspect-video w-full bg-background border border-border rounded-sm overflow-hidden flex items-center justify-center">
          {embed ? (
            /\.(mp4|webm|ogg)$/i.test(embed) ? (
              <video src={embed} controls className="w-full h-full object-contain" />
            ) : (
              <iframe
                src={embed}
                title="Video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          ) : (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground px-4 text-center">
              Video preview will appear here
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

