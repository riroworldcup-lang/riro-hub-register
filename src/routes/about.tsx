import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";
import { TeamGrid } from "@/components/TeamGrid";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About RIRO World Cup 2026 | Robotics & Innovation Championship" },
      { name: "description", content: "Learn about RIRO World Cup 2026 — vision, mission, and the largest international robotics & STEM championship in Mira-Bhayander, Maharashtra." },
      { property: "og:title", content: "About RIRO World Cup 2026" },
      { property: "og:description", content: "Vision, mission and story behind the championship." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-28 max-w-5xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-3">[ ABOUT ]</h2>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-[0.95] mb-8">
          Where India Builds <br /> The Future.
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          RIRO WORLD CUP 2026 brings together students, innovators, robotics enthusiasts, gamers,
          drone pilots, makers, and technology professionals from across India and beyond to
          compete, innovate, and showcase their skills on a single stage.
        </p>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-white/[0.02] border-y border-border">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-px bg-border border border-border">
          {[
            ["MISSION", "Empower the next generation of engineers, designers and innovators through hands-on competition."],
            ["VISION", "Build India's most influential gathering of student-led robotics, drone and STEM talent."],
            ["FORMAT", "A 4-day mega event with 17+ competitions across Senior and Junior divisions."],
            ["VENUE", "Mira-Bhayander, Maharashtra — accessible to teams from across the country."],
          ].map(([title, body]) => (
            <div key={title} className="bg-background p-6 sm:p-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-2">{title}</div>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 py-20 max-w-5xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-3">[ STATS ]</h2>
        <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic mb-10">By The Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {[["4","DAYS"],["17+","EVENTS"],["5000+","EXPECTED"],["2026","OCT–NOV"]].map(([n,l]) => (
            <div key={l} className="bg-background p-6 sm:p-8">
              <div className="font-mono font-black text-3xl sm:text-4xl text-primary">{n}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <TeamGrid />
    </SiteShell>
  );
}
