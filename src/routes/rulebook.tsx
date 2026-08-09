import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";
import rulebookAsset from "@/assets/riro-rulebook.pdf.asset.json";

export const Route = createFileRoute("/rulebook")({
  head: () => ({
    meta: [
      { title: "Rulebook | RIRO World Cup 2026" },
      {
        name: "description",
        content:
          "Official RIRO World Cup 2026 rulebook — competition rules, eligibility, team sizes and arena specifications. View or download the PDF.",
      },
      { property: "og:title", content: "RIRO World Cup 2026 Official Rulebook" },
      {
        property: "og:description",
        content: "Read or download the official rulebook for all RIRO World Cup 2026 competitions.",
      },
    ],
  }),
  component: RulebookPage,
});

function RulebookPage() {
  const url = rulebookAsset.url;

  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto">
        <h2 className="label-mono block mb-3">[ RULEBOOK ]</h2>
        <h1 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] mb-6">
          Official Rulebook
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-8">
          Every rule, eligibility criterion and arena specification for RIRO World Cup 2026.
          Read it in full before registering your team.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href={url}
            download="RIRO-World-Cup-2026-Rulebook.pdf"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-white hover:text-background"
          >
            Download PDF
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-border px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Open In New Tab
          </a>
        </div>

        <div className="border border-border rounded-sm overflow-hidden bg-background">
          <object data={url} type="application/pdf" className="w-full h-[70vh] min-h-[480px]">
            <iframe src={url} title="RIRO World Cup 2026 Rulebook" className="w-full h-[70vh] min-h-[480px]" />
          </object>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Trouble viewing on mobile? Use the download button above.
        </p>
      </section>
    </SiteShell>
  );
}
