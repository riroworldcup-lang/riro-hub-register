import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset Password | RIRO World Cup 2026" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast.error("Invalid or expired reset link. Please request a new one.");
      }
      setReady(true);
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (password !== confirm) return toast.error("Passwords do not match.");
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You're signed in.");
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Could not update password.");
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
          <h1 className="font-mono text-primary text-sm mb-2">[ RESET PASSWORD ]</h1>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-6">Set new password</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">New password</label>
              <input
                type="password" required minLength={8}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5">Confirm password</label>
              <input
                type="password" required minLength={8}
                value={confirm} onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit" disabled={loading || !ready}
              className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
