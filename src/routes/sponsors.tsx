import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors & Partners | RIRO World Cup 2026" },
      {
        name: "description",
        content:
          "Sponsorship and partnership opportunities at RIRO World Cup 2026 — title, platinum, gold and arena partner slots for a four-day international robotics championship.",
      },
      { property: "og:title", content: "Sponsors & Partners — RIRO World Cup 2026" },
      {
        property: "og:description",
        content: "Partner with a four-day international robotics and STEM championship.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SponsorsPage,
});

const TIERS = [
  { tier: "Title Partner", slots: 1 },
  { tier: "Platinum Partner", slots: 4 },
  { tier: "Gold Partner", slots: 6 },
  { tier: "Arena Partner", slots: 8 },
  { tier: "Community Partner", slots: 8 },
] as const;

function LogoPlaceholder({ index }: { index: number }) {
  const shapes = ["rounded-full", "rounded-sm rotate-45", "rounded-md", "rounded-sm"];
  return (
    <div className="relative aspect-[16/9] w-full bg-surface overflow-hidden grid place-items-center">
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="relative flex flex-col items-center gap-3">
        <span
          className={`size-10 border border-primary/50 bg-linear-to-br from-primary/25 to-electric/15 ${
            shapes[index % shapes.length]
          }`}
        />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
          Sponsor Logo
        </span>
      </div>
    </div>
  );
}

function SponsorsPage() {
  let counter = 0;

  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto">
        <h2 className="label-mono block mb-3">[ PARTNERS ]</h2>
        <h1 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] mb-6">
          Sponsors & Partners
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12">
          Partner slots for RIRO World Cup 2026 are open. Each placeholder below is reserved for a
          confirmed partner logo and title — reach out to claim your tier.
        </p>

        <div className="space-y-14">
          {TIERS.map((t) => (
            <div key={t.tier}>
              <div className="flex items-baseline justify-between gap-3 flex-wrap mb-5">
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight">
                  {t.tier}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan/80">
                  {t.slots} {t.slots === 1 ? "slot" : "slots"} available
                </span>
              </div>
              <div className="h-px w-full bg-linear-to-r from-primary/50 via-electric/25 to-transparent mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {Array.from({ length: t.slots }, () => counter++).map((idx) => (
                  <div
                    key={idx}
                    className="glass-card glass-card-hover rounded-md overflow-hidden flex flex-col"
                  >
                    <LogoPlaceholder index={idx} />
                    <div className="p-4 border-t border-white/10">
                      <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                        Partner Name
                      </div>
                      <div className="h-4 w-3/4 rounded-sm bg-white/[0.06]" />
                      <div className="mt-2 h-3 w-1/2 rounded-sm bg-white/[0.04]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 glass-card rounded-md p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">
            Become A Sponsor
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Reach thousands of students, educators, innovators and families across four days of
            competition and exhibition in Mira-Bhayander, Maharashtra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:info@riroworldcup.in?subject=RIRO%20World%20Cup%202026%20Sponsorship"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-colors"
            >
              Request Deck
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs rounded-sm hover:border-primary transition-colors"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
