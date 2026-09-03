import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | RIRO World Cup 2026" },
      { name: "description", content: "Get in touch with RIRO World Cup 2026 — email and WhatsApp for registration, sponsorship and event queries." },
      { property: "og:title", content: "Contact — RIRO World Cup 2026" },
      { property: "og:description", content: "Reach out via email or WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-28 max-w-5xl mx-auto text-center">
        <h2 className="label-mono block mb-2">[ CONTACT ]</h2>
        <h1 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-[-0.03em] mb-10">
          Mission Control
        </h1>
        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border max-w-2xl mx-auto mb-6">
          <div className="bg-background p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">General Inquiries</div>
            <a href="mailto:info@riroworldcup.in" className="font-mono text-sm sm:text-base text-primary break-all">
              info@riroworldcup.in
            </a>
          </div>
          <div className="bg-background p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Organiser</div>
            <a href="mailto:Nikhil.jadhav@riroworldcup.in" className="font-mono text-sm sm:text-base text-primary break-all">
              Nikhil.jadhav@riroworldcup.in
            </a>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-px bg-border border border-border max-w-2xl mx-auto">
          <div className="bg-background p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">WhatsApp</div>
            <div className="flex flex-col gap-1">
              <a href="https://wa.me/918097070383" target="_blank" rel="noopener" className="font-mono text-sm sm:text-base text-primary">
                +91 80970 70383
              </a>
              <a href="https://wa.me/918976719791" target="_blank" rel="noopener" className="font-mono text-sm sm:text-base text-primary">
                +91 8976 719791
              </a>
            </div>
          </div>
          <div className="bg-background p-8">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Call Us</div>
            <div className="flex flex-col gap-1">
              <a href="tel:+918097070383" className="font-mono text-sm sm:text-base text-primary">
                +91 80970 70383
              </a>
              <a href="tel:+918976719791" className="font-mono text-sm sm:text-base text-primary">
                +91 8976 719791
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href="mailto:info@riroworldcup.in" className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm">
            Email Us
          </a>
          <a href="https://wa.me/918097070383" target="_blank" rel="noopener" className="px-6 py-3 border border-white/20 font-mono font-bold uppercase tracking-widest text-xs hover:border-primary transition-colors rounded-sm">
            WhatsApp Us
          </a>
        </div>

        <div className="mt-20 text-left max-w-3xl mx-auto">
          <h3 className="label-mono block mb-3">[ NOTICE ]</h3>
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
    </SiteShell>
  );
}
