import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | RIRO World Cup 2026" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Signing you in...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary inline-block mb-8">
          ← Back to site
        </Link>
        <div className="bg-surface border border-border p-8 rounded-sm">
          <h1 className="font-mono text-primary text-sm mb-2">[ ADMIN ACCESS ]</h1>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-6">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm disabled:opacity-50"
            >
              {loading ? "Working..." : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
            First user to sign up becomes admin automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
