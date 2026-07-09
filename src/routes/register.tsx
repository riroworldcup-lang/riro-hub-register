import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";
import { RegistrationForm } from "@/components/RegistrationForm";
import { FeesTable } from "@/components/FeesTable";

export const Route = createFileRoute("/register")({
  validateSearch: (s: Record<string, unknown>) => ({
    competition: typeof s.competition === "string" ? s.competition : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Register | RIRO World Cup 2026" },
      { name: "description", content: "Pre-register your team for the RIRO World Cup 2026 — free pre-registration with priority slot booking and rulebook delivery." },
      { property: "og:title", content: "Register — RIRO World Cup 2026" },
      { property: "og:description", content: "Secure your slot in the championship." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
        <div>
          <h2 className="font-mono text-primary text-sm mb-2">[ REGISTRATION ]</h2>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
            Secure Your Slot.
          </h1>
          <p className="text-muted-foreground mb-8">
            Lock in your spot in the championship. Sign in, submit your details, and manage your
            team any time from your dashboard.
          </p>
          <ul className="space-y-3 text-sm mb-10">
            {[
              "Free pre-registration",
              "Confirmation email after submission",
              "Edit teammates & competition anytime from your dashboard",
              "Official rulebook delivered direct to your inbox",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="size-1.5 bg-primary mt-2 shrink-0" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
          <FeesTable />
        </div>
        <div className="bg-surface border border-border p-6 sm:p-8 rounded-sm">
          <RegistrationForm />
        </div>
      </section>
    </SiteShell>
  );
}
