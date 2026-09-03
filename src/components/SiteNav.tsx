import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function MarqueeBanner() {
  return (
    <div className="bg-deep-black text-white-soft py-2.5 overflow-hidden whitespace-nowrap border-b border-white/10">
      <div className="flex animate-marquee gap-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="font-mono font-medium text-[10px] sm:text-xs uppercase tracking-[0.28em] shrink-0 text-silver"
          >
            RIRO World Cup 2026 <span className="text-cyan">•</span> 14 – 17 November 2026{" "}
            <span className="text-cyan">•</span> Mira-Bhayander, Maharashtra{" "}
            <span className="text-primary">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/competitions", label: "Competitions" },
  { to: "/judges", label: "Judges" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/rulebook", label: "Rulebook" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit" },
] as const;

function useAuthed() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setAuthed(!!session?.user),
    );
    return () => sub.subscription.unsubscribe();
  }, []);
  return authed;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authed = useAuthed();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.9)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="absolute inset-x-0 bottom-0 h-px hairline-cyan opacity-40 pointer-events-none" />
      <nav
        aria-label="Main"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between"
      >
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5 group"
          onClick={() => setOpen(false)}
        >
          <span className="relative size-8 shrink-0 grid place-items-center">
            <span className="absolute inset-0 rotate-45 rounded-sm bg-linear-to-br from-primary to-gold-dark transition-transform duration-500 group-hover:rotate-[135deg]" />
            <span className="relative size-2.5 rounded-sm bg-deep-black" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block font-display text-sm sm:text-base font-bold uppercase tracking-tight truncate">
              RIRO World Cup
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-cyan/80">
              2026
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex gap-5 font-mono text-[11px] uppercase tracking-[0.18em] text-silver/70 items-center">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative py-1 transition-colors hover:text-white-soft after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-cyan after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-cyan after:w-full" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {authed ? (
            <>
              <Link
                to="/dashboard"
                className="transition-colors hover:text-white-soft"
                activeProps={{ className: "text-cyan" }}
              >
                Dashboard
              </Link>
              <button onClick={signOut} className="transition-colors hover:text-white-soft">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="transition-colors hover:text-white-soft">
              Sign In
            </Link>
          )}
          <Link
            to="/register"
            search={{}}
            className="px-4 py-2.5 bg-primary text-primary-foreground font-bold tracking-[0.18em] rounded-sm transition-transform duration-300 hover:scale-[1.03]"
          >
            Register Now
          </Link>
        </div>

        <button
          className="lg:hidden font-mono text-[10px] uppercase tracking-[0.25em] text-white-soft border border-white/15 bg-white/[0.04] backdrop-blur-md px-3.5 py-2.5 rounded-sm min-h-11"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl px-4 sm:px-6 pb-6 pt-4">
          <div className="flex flex-col divide-y divide-white/5 font-mono text-xs uppercase tracking-[0.2em] text-silver/80">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3.5 transition-colors hover:text-cyan"
                activeProps={{ className: "text-cyan" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {authed ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className="py-3.5 transition-colors hover:text-cyan"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="py-3.5 text-left transition-colors hover:text-cyan"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                onClick={() => setOpen(false)}
                className="py-3.5 transition-colors hover:text-cyan"
              >
                Sign In
              </Link>
            )}
          </div>
          <Link
            to="/register"
            search={{}}
            onClick={() => setOpen(false)}
            className="mt-5 block text-center px-5 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-[0.2em] text-xs rounded-sm"
          >
            Register Now
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-deep-black">
      <div className="absolute inset-x-0 top-0 h-px hairline-cyan opacity-60" />
      <div className="absolute inset-0 tech-grid opacity-[0.35] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <span className="size-6 rotate-45 rounded-sm bg-linear-to-br from-primary to-gold-dark" />
            <span className="font-display font-bold uppercase tracking-tight text-lg">
              RIRO World Cup 2026
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80 mb-4">
            Robotics • Innovation • Science • Technology
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            A four-day international championship and technology exhibition in Mira-Bhayander,
            Maharashtra, India. 14 – 17 November 2026.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="label-mono mb-4">Navigate</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-silver/75">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-cyan">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="label-mono mb-4">Contact</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-silver/75">
            <li>
              <a href="mailto:info@riroworldcup.in" className="transition-colors hover:text-cyan">
                info@riroworldcup.in
              </a>
            </li>
            <li>
              <a href="mailto:Nikhil.jadhav@riroworldcup.in" className="transition-colors hover:text-cyan">
                Nikhil.jadhav@riroworldcup.in
              </a>
            </li>
            <li>
              <a href="tel:+918097070383" className="transition-colors hover:text-cyan">
                +91 80970 70383
              </a>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-cyan">
                Visit / Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="label-mono mb-4">Participate</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-silver/75">
            <li>
              <Link to="/register" search={{}} className="transition-colors hover:text-cyan">
                Team Registration
              </Link>
            </li>
            <li>
              <Link to="/visitors-register" className="transition-colors hover:text-cyan">
                Visitor Registration
              </Link>
            </li>
            <li>
              <Link to="/sponsors" className="transition-colors hover:text-cyan">
                Become a Sponsor
              </Link>
            </li>
            <li>
              <Link to="/auth" className="transition-colors hover:text-cyan">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          © 2026 RIRO World Cup — All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-background text-foreground font-sans selection:bg-cyan selection:text-deep-black min-h-screen flex flex-col">
      <MarqueeBanner />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
