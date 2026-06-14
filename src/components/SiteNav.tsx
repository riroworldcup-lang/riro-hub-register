import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function MarqueeBanner() {
  return (
    <div className="bg-primary text-primary-foreground py-3 overflow-hidden whitespace-nowrap border-b border-white/10 sticky top-0 z-50">
      <div className="flex animate-marquee gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="font-mono font-bold text-xs sm:text-sm uppercase tracking-tighter shrink-0">
            Registration Charges & Rulebook Coming Soon • October–November 2026 • Mira-Bhayander, Maharashtra •
          </span>
        ))}
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/competitions", label: "Competitions" },
  { to: "/gallery", label: "Gallery" },
  { to: "/register", label: "Register" },
  { to: "/contact", label: "Contact" },
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
  const authed = useAuthed();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  return (
    <nav className="px-4 sm:px-6 py-5 border-b border-border max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="size-8 bg-primary rounded-sm rotate-45 flex items-center justify-center shrink-0">
            <div className="size-3.5 bg-background -rotate-45" />
          </div>
          <span className="font-mono font-bold text-sm sm:text-lg tracking-tighter uppercase">RIRO 2026</span>
        </Link>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-muted-foreground items-center">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {authed ? (
            <>
              <Link to="/dashboard" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>
                Dashboard
              </Link>
              <button onClick={signOut} className="hover:text-primary transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:text-primary transition-colors">Sign In</Link>
          )}
        </div>
        <button
          className="md:hidden font-mono text-xs uppercase tracking-widest text-foreground border border-border px-3 py-2 rounded-sm"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground border-t border-border pt-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          {authed ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <button onClick={() => { setOpen(false); signOut(); }} className="text-left hover:text-primary transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)} className="hover:text-primary transition-colors">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  return (
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
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="hover:text-primary">{l.label}</Link>
          ))}
          <Link to="/auth" className="hover:text-primary">Sign In</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground text-center">
        © 2026 RIRO World Cup. All Rights Reserved.
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col">
      <MarqueeBanner />
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
