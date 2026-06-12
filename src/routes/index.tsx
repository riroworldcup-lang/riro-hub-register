import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import heroRobot from "@/assets/hero-robot.jpg";
import { COMPETITIONS as FALLBACK_COMPETITIONS } from "@/lib/competitions";
import { RegistrationForm } from "@/components/RegistrationForm";
import { listCompetitions, listGallery } from "@/lib/content.functions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";


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
  const fetchComps = useServerFn(listCompetitions);
  const fetchGallery = useServerFn(listGallery);
  const compsQuery = useQuery({
    queryKey: ["competitions"],
    queryFn: () => fetchComps(),
  });
  const galleryQuery = useQuery({
    queryKey: ["gallery"],
    queryFn: () => fetchGallery(),
  });
  const competitions = compsQuery.data?.competitions?.length
    ? compsQuery.data.competitions
    : FALLBACK_COMPETITIONS.map((c, i) => ({ ...c, id: String(i), levels: c.levels ?? [] }));
  const gallery = galleryQuery.data?.images ?? [];

  return (
    <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Marquee Banner */}
      <div className="bg-primary text-primary-foreground py-3 overflow-hidden whitespace-nowrap border-b border-white/10 sticky top-0 z-50">
        <div className="flex animate-marquee gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="font-mono font-bold text-xs sm:text-sm uppercase tracking-tighter shrink-0">
              Registration Charges & Rulebook Coming Soon • October–November 2026 • Mira-Bhayander, Maharashtra •
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="px-4 sm:px-6 py-5 border-b border-border flex justify-between items-center max-w-7xl mx-auto">
        <a href="#top" className="flex items-center gap-2">
          <div className="size-8 bg-primary rounded-sm rotate-45 flex items-center justify-center shrink-0">
            <div className="size-3.5 bg-background -rotate-45" />
          </div>
          <span className="font-mono font-bold text-sm sm:text-lg tracking-tighter uppercase">RIRO 2026</span>
        </a>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#competitions" className="hover:text-primary transition-colors">Competitions</a>
          <a href="#register" className="hover:text-primary transition-colors">Register</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          <Link to="/auth" className="hover:text-primary transition-colors">Admin</Link>
        </div>
      </nav>

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
              <a href="#register" className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white transition-colors cursor-pointer rounded-sm">
                Register Now
              </a>
              <a href="#competitions" className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs sm:text-sm hover:border-primary transition-colors cursor-pointer rounded-sm">
                View Competitions
              </a>
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

      {/* About */}
      <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono text-primary text-sm mb-3">[ ABOUT ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-8 leading-tight">
            The Largest Innovation <br className="hidden sm:block" />
            Championship of the Year.
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
            RIRO WORLD CUP 2026 brings together students, innovators, robotics enthusiasts, gamers,
            drone pilots, makers, and technology professionals from across India and beyond to
            compete, innovate, and showcase their skills.
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
        </div>
      </section>

      {/* Competitions */}
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
              <p className="font-mono text-xs text-muted-foreground">{competitions.length} CORE COMPETITIONS</p>
              <p className="font-mono text-xs text-muted-foreground">SENIOR / JUNIOR DIVISIONS</p>
            </div>
          </div>

          <Carousel opts={{ align: "start", loop: false }} className="relative px-2 sm:px-12">
            <CarouselContent className="-ml-4">
              {competitions.map((c: any, i: number) => (
                <CarouselItem key={c.id ?? c.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="bg-background border border-border h-full flex flex-col hover:bg-primary/5 transition-colors rounded-sm overflow-hidden">
                    {c.image_url && (
                      <img
                        src={c.image_url}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-6 sm:p-7 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <span className="font-mono text-[10px] text-primary block">
                          {String(i + 1).padStart(2, "0")} / {c.category.toUpperCase()}
                        </span>
                        {c.levels && c.levels.length > 0 && (
                          <span className="font-mono text-[9px] text-muted-foreground border border-border px-1.5 py-0.5">
                            {c.levels.join(" • ")}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold uppercase mb-2 leading-tight">{c.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground flex-1">{c.description}</p>
                      <div className="mt-4 pt-4 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Rules → Soon
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-2" />
            <CarouselNext className="hidden sm:flex -right-2" />
          </Carousel>
          <p className="mt-8 font-mono text-xs sm:text-sm text-muted-foreground italic text-center">
            Swipe or use the arrows to browse all competitions.
          </p>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 mb-12">
              <div>
                <h2 className="font-mono text-primary text-sm mb-2">[ GALLERY ]</h2>
                <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
                  From The Arena
                </h3>
              </div>
              <p className="font-mono text-xs text-muted-foreground">{gallery.length} PHOTOS</p>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="relative px-2 sm:px-12">
              <CarouselContent className="-ml-4">
                {gallery.map((img: any) => (
                  <CarouselItem key={img.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <figure className="border border-border rounded-sm overflow-hidden bg-background">
                      <img
                        src={img.image_url}
                        alt={img.caption || "RIRO World Cup 2026 gallery image"}
                        loading="lazy"
                        className="w-full aspect-[4/3] object-cover"
                      />
                      {img.caption && (
                        <figcaption className="p-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-2" />
              <CarouselNext className="hidden sm:flex -right-2" />
            </Carousel>
          </div>
        </section>
      )}


      {/* Registration */}
      <section id="register" className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          <div>
            <h2 className="font-mono text-primary text-sm mb-2">[ REGISTRATION ]</h2>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
              Secure Your Slot.
            </h3>
            <p className="text-muted-foreground mb-8">
              Lock in your spot in the championship. Registration fees and the official rulebook
              will be released soon — submit your details now to receive priority updates.
            </p>
            <ul className="space-y-3 text-sm">
              {[
                "Free pre-registration",
                "Confirmation email after submission",
                "Official rulebook delivered direct to your inbox",
                "Priority slot booking once fees are announced",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="size-1.5 bg-primary mt-2 shrink-0" />
                  <span className="text-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-border p-6 sm:p-8 rounded-sm">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-mono text-primary text-sm mb-2">[ NOTICE ]</h2>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter italic mb-10">
            Registration Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              ["01", "Registration fees will be announced later."],
              ["02", "Competition rules and regulations will be updated soon."],
              ["03", "Event schedule will be published before registrations close."],
              ["04", "Participants must provide accurate details."],
            ].map(([n, t]) => (
              <div key={n} className="bg-background p-6 sm:p-8 flex gap-4">
                <span className="font-mono font-bold text-primary text-lg shrink-0">{n}</span>
                <p className="text-sm sm:text-base text-foreground/90">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-mono text-primary text-sm mb-2">[ CONTACT ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-10">
            Mission Control
          </h3>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border max-w-2xl mx-auto">
            <div className="bg-background p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Email</div>
              <a href="mailto:riroworldcup@gmail.com" className="font-mono text-sm sm:text-base text-primary break-all">
                riroworldcup@gmail.com
              </a>
            </div>
            <div className="bg-background p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">WhatsApp</div>
              <a href="https://wa.me/918097070383" target="_blank" rel="noopener" className="font-mono text-sm sm:text-base text-primary">
                +91 80970 70383
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a href="mailto:riroworldcup@gmail.com" className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm">
              Email Us
            </a>
            <a href="https://wa.me/918097070383" target="_blank" rel="noopener" className="px-6 py-3 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs hover:border-primary transition-colors rounded-sm">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-6 bg-primary rounded-sm" />
              <span className="font-mono font-bold uppercase tracking-tight">RIRO World Cup 2026</span>
            </div>
            <p className="text-sm text-muted-foreground">Mira-Bhayander, Maharashtra, India</p>
          </div>
          <div className="flex flex-wrap gap-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#competitions" className="hover:text-primary">Competitions</a>
            <a href="#register" className="hover:text-primary">Register</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
            <Link to="/auth" className="hover:text-primary">Admin</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground text-center">
          © 2026 RIRO World Cup. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
