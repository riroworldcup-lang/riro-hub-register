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

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
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
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("Account created. Signing you in...");
        navigate({ to: "/dashboard" });
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("If that email exists, a reset link has been sent.");
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const title = mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Forgot Password";
  const cta = mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send reset link";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary inline-block mb-8">
          ← Back to site
        </Link>
        <div className="bg-surface border border-border p-8 rounded-sm">
          <h1 className="font-mono text-primary text-sm mb-2">[ ACCOUNT ACCESS ]</h1>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-6">{title}</h2>
          <p className="text-muted-foreground text-sm mb-4">
            {mode === "forgot"
              ? "Enter your email and we'll send you a reset link."
              : "Sign in to register for competitions and manage your team from your dashboard."}
          </p>
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
            {mode !== "forgot" && (
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
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm disabled:opacity-50"
            >
              {loading ? "Working..." : cta}
            </button>
          </form>
          <div className="mt-6 flex flex-col gap-2">
            {mode === "signin" && (
              <>
                <button type="button" onClick={() => setMode("forgot")}
                  className="w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
                  Forgot your password?
                </button>
                <button type="button" onClick={() => setMode("signup")}
                  className="w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
                  Need an account? Sign up
                </button>
              </>
            )}
            {mode === "signup" && (
              <button type="button" onClick={() => setMode("signin")}
                className="w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
                Already have an account? Sign in
              </button>
            )}
            {mode === "forgot" && (
              <button type="button" onClick={() => setMode("signin")}
                className="w-full font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
                ← Back to sign in
              </button>
            )}
          </div>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
            First user to sign up becomes site admin automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
