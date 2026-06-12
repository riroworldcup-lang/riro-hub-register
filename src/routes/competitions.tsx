import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";
import { CompetitionsGrid } from "@/components/CompetitionsGrid";

export const Route = createFileRoute("/competitions")({
  head: () => ({
    meta: [
      { title: "Competitions | RIRO World Cup 2026" },
      { name: "description", content: "Explore all RIRO World Cup 2026 competition categories — robotics, drones, aerospace, gaming, STEM challenges across Junior and Senior divisions." },
      { property: "og:title", content: "RIRO 2026 — Championship Categories" },
      { property: "og:description", content: "17+ competitions across robotics, drones, gaming and STEM." },
    ],
  }),
  component: CompetitionsPage,
});

function CompetitionsPage() {
  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-3">[ CATEGORIES ]</h2>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter italic leading-[0.95] mb-6">
          Championship Grid
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12">
          17+ competitions across Senior and Junior divisions. Choose your arena.
        </p>
        <CompetitionsGrid />
        <div className="mt-16 text-center">
          <Link to="/register" className="inline-block px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors rounded-sm">
            Register Now
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
