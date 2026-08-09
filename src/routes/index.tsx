import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import riro1 from "@/assets/riro-1.webp.asset.json";
import riro2 from "@/assets/riro-2.webp.asset.json";
import riro3 from "@/assets/riro-3.webp.asset.json";
import riro4 from "@/assets/riro-4.webp.asset.json";
import nasaLogo from "@/assets/nasa-space-apps.png.asset.json";
import isroLogo from "@/assets/isro.png.asset.json";
import riroLogo from "@/assets/riro-logo.png.asset.json";

import { SiteShell } from "@/components/SiteNav";
import { CompetitionsGrid } from "@/components/CompetitionsGrid";
import { Leaderboard } from "@/components/Leaderboard";
import { Reveal, CountUp } from "@/components/Reveal";

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
  { src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1600&q=80", alt: "Humanoid robot portrait" },
  { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1600&q=80", alt: "White humanoid robot" },
  { src: "https://images.unsplash.com/photo-1563209259-9ac06bfd0aa2?auto=format&fit=crop&w=1600&q=80", alt: "Humanoid robot close-up" },
  { src: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=1600&q=80", alt: "Humanoid robot expressive face" },
  { src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1600&q=80", alt: "Futuristic humanoid robot" },
  { src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80", alt: "AI humanoid robot glowing" },
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
      { property: "og:title", content: "RIRO World Cup 2026 | International Robotics & Innovation Championship" },
      {
        property: "og:description",
        content: "4-day mega event Oct–Nov 2026 in Mira-Bhayander. Robotics, drones, aerospace, gaming, STEM. Register your team now.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      {/* Hero */}
      
      <header
        id="top"
        className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 py-16 overflow-hidden noise-overlay"
      >
        {/* Cinematic base + atmospheric bloom */}
        <div className="absolute inset-0 bg-linear-to-b from-deep-black via-background to-background z-[1]" />
        <div className="absolute inset-0 radial-bloom z-[1] pointer-events-none" />
        {/* Technical grid */}
        <div className="absolute inset-0 tech-grid opacity-60 pointer-events-none animate-grid-shift z-[2]" />
        {/* Soft electric-blue depth orbs */}
        <div className="absolute top-1/4 -left-24 w-[460px] h-[460px] rounded-full bg-electric/12 blur-[130px] pointer-events-none animate-orb-drift z-[2]" />
        <div className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full bg-cyan/10 blur-[110px] pointer-events-none animate-orb-drift [animation-delay:-4s] z-[2]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rounded-full bg-primary/8 blur-[120px] pointer-events-none z-[2]" />
        {/* Light streak */}
        <div className="absolute inset-x-0 top-0 h-px hairline-cyan pointer-events-none animate-scanline z-[2]" />
        {/* Orbital arc */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] rounded-full border border-electric/10 pointer-events-none z-[2]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] h-[760px] rounded-full border border-cyan/[0.07] pointer-events-none z-[2]" />


        {/* Official logos strip */}
        <div className="max-w-7xl mx-auto w-full relative z-10 mb-10 sm:mb-14 animate-slide-up">
          <div className="flex items-center justify-center gap-4 sm:gap-10">
            <div className="shrink-0 p-2 sm:p-3 bg-white/90 border border-primary/30 rounded-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <img src={isroLogo.url} alt="ISRO logo" className="h-14 sm:h-20 w-auto" />
            </div>

            <div className="relative shrink-0">
              <div className="absolute -inset-4 bg-primary/25 blur-2xl rounded-full pointer-events-none" />
              <img
                src={riroLogo.url}
                alt="RIRO World Cup 2026 shield logo"
                className="relative h-32 sm:h-52 lg:h-64 w-auto drop-shadow-[0_0_35px_rgba(200,155,60,0.45)] transition-transform duration-500 hover:scale-[1.04]"
              />
            </div>

            <div className="shrink-0 p-2 sm:p-3 bg-white/90 border border-primary/30 rounded-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <img src={nasaLogo.url} alt="NASA Space Apps Challenge Mira-Bhayander logo" className="h-14 sm:h-20 w-auto" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-[1fr_1fr] gap-12 items-center place-items-center">
          <div className="relative text-center">
            {/* HUD corner brackets */}
            <span className="absolute -top-3 -left-3 w-5 h-5 border-t-2 border-l-2 border-primary/70" />
            <span className="absolute -top-3 -right-3 w-5 h-5 border-t-2 border-r-2 border-primary/70" />
            <span className="absolute -bottom-3 -left-3 w-5 h-5 border-b-2 border-l-2 border-primary/70" />
            <span className="absolute -bottom-3 -right-3 w-5 h-5 border-b-2 border-r-2 border-primary/70" />

            <div className="inline-flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] mb-6 animate-slide-up flex-wrap justify-center">
              <span className="px-3 py-1.5 rounded-sm glass-card inline-flex items-center gap-2 text-cyan">
                <span className="size-1.5 rounded-full bg-cyan animate-pulse" />
                World Cup 2026
              </span>
              <span className="text-silver/50">Mira-Bhayander, Maharashtra</span>
            </div>

            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-[-0.03em] leading-[0.88] mb-5 animate-slide-up [animation-delay:100ms]">
              <span className="block text-white-soft drop-shadow-[0_0_30px_rgba(30,168,255,0.25)]">RIRO</span>
              <span className="block bg-linear-to-r from-primary via-gold to-gold-dark bg-clip-text text-transparent">
                World Cup
              </span>
              <span className="block [-webkit-text-stroke:2px_var(--silver)] text-transparent">2026</span>
            </h1>

            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.34em] text-cyan/90 mb-6 animate-slide-up [animation-delay:150ms]">
              Robotics • Science • Innovation • Technology
            </p>


            <div className="mb-6 animate-slide-up [animation-delay:120ms] flex justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/40 rounded-sm">
                <span className="font-mono font-black text-xl sm:text-2xl text-primary">17+</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">Competitions</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground mb-3 animate-slide-up [animation-delay:200ms]">
              International Robotics, Innovation & Technology Championship.
            </p>
            <p className="text-sm font-mono uppercase tracking-wider text-foreground/80 mb-4 animate-slide-up [animation-delay:250ms]">
              4-Day Mega Event • 14 - 18 November 2026
            </p>

            {/* Official affiliations */}
            <div className="mb-6 animate-slide-up [animation-delay:260ms] flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/90 border border-primary/30 rounded-sm backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]">
                <img src={isroLogo.url} alt="ISRO logo" loading="lazy" className="h-10 w-auto" />
                <span className="text-left font-mono text-[10px] sm:text-xs uppercase tracking-wider text-background leading-tight">
                  Official Registered<br />ISRO Space Tutor
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/90 border border-primary/30 rounded-sm backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]">
                <img src={nasaLogo.url} alt="NASA Space Apps Challenge Mira-Bhayander logo" loading="lazy" className="h-10 w-auto" />
                <span className="text-left font-mono text-[10px] sm:text-xs uppercase tracking-wider text-background leading-tight">
                  Official NASA Space Apps<br />Challenge Organizer
                </span>
              </div>
            </div>

            <div className="mb-8 animate-slide-up [animation-delay:280ms] flex flex-wrap justify-center gap-3">
              <div className="glass-card glass-card-hover rounded-md px-5 py-3 inline-flex items-center gap-3 text-left">
                <span className="font-display text-lg sm:text-xl font-bold text-primary leading-none">50+</span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-silver/85 leading-snug">
                  Free courses to<br />all participants
                </span>
              </div>
              <div className="glass-card glass-card-hover rounded-md px-5 py-3 inline-flex items-center gap-3 text-left">
                <span className="font-display text-lg sm:text-xl font-bold text-cyan leading-none">₹0</span>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-silver/85 leading-snug">
                  Register<br />for free
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 items-center animate-slide-up [animation-delay:300ms]">
              <Link
                to="/register"
                search={{}}
                className="group relative px-6 sm:px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm overflow-hidden min-h-11 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative">Register Now</span>
              </Link>
              <Link
                to="/visitors-register"
                className="group relative px-6 sm:px-8 py-4 glass-card glass-card-hover text-white-soft font-mono font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm min-h-11"
              >
                Visitors Registration
              </Link>
              <Link
                to="/competitions"
                className="group px-6 sm:px-8 py-4 border border-white/15 font-mono font-bold uppercase tracking-[0.2em] text-xs sm:text-sm rounded-sm min-h-11 transition-all duration-300 hover:border-cyan/60 hover:bg-white/[0.05]"
              >
                <span className="inline-flex items-center gap-2">
                  Explore the Championship
                  <span className="text-cyan transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </div>


            {/* HUD telemetry footer */}
            <div className="mt-10 flex items-center justify-center gap-3 opacity-50 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
              <div className="h-px w-8 bg-muted-foreground/40" />
              <span>SYS.RIRO_2026 // STATUS: ONLINE</span>
              <div className="h-px w-8 bg-muted-foreground/40" />
            </div>
          </div>

          <div className="relative animate-slide-up [animation-delay:400ms] group mx-auto">
  <div className="absolute -inset-2 bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent rounded-sm blur-xl opacity-60" />

  <video
    className="relative w-full max-w-lg aspect-square object-cover rounded-sm border border-white/10"
    autoPlay
    loop
    muted
    playsInline
  >
    <source
      src="/videos/VID_20260615_131310_875.mp4"
      type="video/mp4"
    />
  </video>

  <span className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
  <span className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
  <span className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
  <span className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
</div>
        </div>
      </header>

      <Leaderboard />

      {/* Impact / statistics */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 bg-deep-black border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <h2 className="label-mono mb-4">[ Championship Scale ]</h2>
            <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[-0.03em] mb-6 leading-[1.05]">
              The World&apos;s Next Generation <br className="hidden sm:block" />
              of Innovators Meets Here.
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              RIRO WORLD CUP 2026 brings together students, innovators, robotics enthusiasts, gamers,
              drone pilots, makers, and technology professionals from across India and beyond.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
            {[
              { value: 300, suffix: "K+", label: "Students Reached" },
              { value: 600, suffix: "+", label: "Schools & Colleges" },
              { value: 17, suffix: "+", label: "Competitions" },
              { value: 4, suffix: "-Day", label: "Mega Event" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="glass-card glass-card-hover rounded-md p-6 sm:p-8 h-full">
                  <div className="font-display text-4xl sm:text-6xl font-bold tracking-[-0.04em] bg-linear-to-b from-white-soft to-silver/60 bg-clip-text text-transparent">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 h-px w-10 bg-linear-to-r from-cyan to-transparent" />
                  <div className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.24em] text-muted-foreground mt-3">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/about"
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan hover:text-white-soft transition-colors"
            >
              Explore the championship →
            </Link>
          </div>
        </div>
      </section>

      {/* Championship timeline */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 radial-bloom opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <h2 className="label-mono mb-4">[ Road to the Final ]</h2>
            <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[-0.03em] mb-12">
              Championship Timeline
            </h3>
          </Reveal>
          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-linear-to-r from-transparent via-electric/40 to-transparent" />
            {[
              ["01", "Registration", "Open now"],
              ["02", "Qualifiers", "Oct 2026"],
              ["03", "Championship", "14 Nov"],
              ["04", "Exhibition", "15 – 16 Nov"],
              ["05", "Finals", "17 Nov"],
              ["06", "Awards", "18 Nov"],
            ].map(([n, title, when], i) => (
              <Reveal as="li" key={n} delay={i * 80} className="relative">
                <div className="glass-card glass-card-hover rounded-md p-5 h-full">
                  <span className="grid size-9 place-items-center rounded-sm bg-electric/15 border border-electric/40 font-mono text-[11px] text-cyan">
                    {n}
                  </span>
                  <h4 className="font-display text-base font-bold uppercase tracking-tight mt-4">
                    {title}
                  </h4>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
                    {when}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>


      {/* Gallery Slider */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <h2 className="label-mono block mb-2">[ GALLERY ]</h2>
            <h3 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-[-0.03em]">
              Inside The Arena
            </h3>
          </div>
          <Carousel opts={{ loop: true }} className="relative">
            <CarouselContent>
              {GALLERY_SLIDES.map((s) => (
                <CarouselItem key={s.src}>
                  <div className="glass-card rounded-md overflow-hidden">
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
            <CarouselPrevious className="left-3 size-11 bg-background/70 backdrop-blur-md border-white/15" />
            <CarouselNext className="right-3 size-11 bg-background/70 backdrop-blur-md border-white/15" />
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
              <h2 className="label-mono block mb-2">[ CATEGORIES ]</h2>
              <h3 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-[-0.03em]">
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
          <h2 className="label-mono block mb-2">[ REGISTRATION ]</h2>
          <h3 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-[-0.03em] mb-6 leading-tight">
            Secure Your Slot.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Lock in your spot in the championship. Submit your details now to receive priority updates.
          </p>
          <Link to="/register" search={{}} className="inline-block px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm">
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
          <h2 className="label-mono block mb-2">[ VIDEO ]</h2>
          <h3 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-[-0.03em]">
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

