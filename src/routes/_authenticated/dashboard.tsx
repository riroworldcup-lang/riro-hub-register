import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteShell } from "@/components/SiteNav";
import { COMPETITION_OPTIONS } from "@/lib/competitions";
import {
  listMyRegistrations,
  updateMyRegistration,
} from "@/lib/registrations.functions";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard | RIRO World Cup 2026" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
  errorComponent: ({ error }) => (
    <SiteShell>
      <div className="max-w-2xl mx-auto p-8 font-mono text-sm text-destructive">
        {error.message}
      </div>
    </SiteShell>
  ),
});

type Registration = {
  id: string;
  full_name: string;
  competition_name: string;
  school_name: string;
  team_name: string | null;
  created_at: string;
} & Record<string, any>;

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-primary";
const labelCls =
  "block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5";

function DashboardPage() {
  const list = useServerFn(listMyRegistrations);
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-registrations"],
    queryFn: () => list(),
  });

  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-16 sm:py-20 max-w-5xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-2">[ MY DASHBOARD ]</h2>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic mb-3">
          Your Registrations
        </h1>
        <p className="text-muted-foreground mb-10">
          Review your submitted details and edit your team or competition any time.
        </p>

        {isLoading && <p className="text-muted-foreground font-mono text-xs">Loading…</p>}
        {error && <p className="text-destructive font-mono text-xs">{(error as Error).message}</p>}

        {data && data.registrations.length === 0 && (
          <div className="p-8 border border-border rounded-sm bg-surface text-center">
            <p className="text-muted-foreground mb-4">You haven't registered for any competitions yet.</p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs rounded-sm hover:bg-white transition-colors"
            >
              Register Now
            </Link>
          </div>
        )}

        <div className="space-y-6">
          {data?.registrations.map((r) => (
            <RegistrationCard key={r.id} reg={r as Registration} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function RegistrationCard({ reg }: { reg: Registration }) {
  const [editing, setEditing] = useState(false);
  const qc = useQueryClient();
  const updateFn = useServerFn(updateMyRegistration);

  const initial = useMemo(() => {
    const o: Record<string, string> = {
      id: reg.id,
      competition_name: reg.competition_name ?? "",
      team_name: reg.team_name ?? "",
    };
    for (let i = 1; i <= 10; i++) {
      o[`team_mate_${i}_name`] = reg[`team_mate_${i}_name`] ?? "";
      o[`team_mate_${i}_contact`] = reg[`team_mate_${i}_contact`] ?? "";
    }
    return o;
  }, [reg]);

  const [form, setForm] = useState(initial);
  const mutation = useMutation({
    mutationFn: (data: typeof form) => updateFn({ data: data as any }),
    onSuccess: () => {
      toast.success("Updated.");
      setEditing(false);
      qc.invalidateQueries({ queryKey: ["my-registrations"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const teammates = Array.from({ length: 10 }, (_, i) => i + 1)
    .map((i) => ({
      n: reg[`team_mate_${i}_name`] as string | null,
      c: reg[`team_mate_${i}_contact`] as string | null,
    }))
    .filter((t) => t.n || t.c);

  return (
    <article className="border border-border rounded-sm bg-surface p-5 sm:p-6">
      <header className="flex justify-between items-start gap-4 flex-wrap mb-4">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight">{reg.competition_name}</h3>
          {reg.registration_number && (
            <p className="mt-2 inline-block font-mono text-xs sm:text-sm text-primary border border-primary/40 bg-primary/5 px-2.5 py-1 rounded-sm tracking-widest">
              {reg.registration_number}
            </p>
          )}
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
            Submitted {new Date(reg.created_at).toLocaleDateString()}
          </p>
        </div>
        {!editing && (
          <button
            onClick={() => {
              setForm(initial);
              setEditing(true);
            }}
            className="px-4 py-2 border border-primary text-primary font-mono font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
          >
            Edit
          </button>
        )}
      </header>

      {!editing ? (
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <Field label="Participant" value={reg.full_name} />
          <Field label="School" value={reg.school_name} />
          <Field label="Team / Club Name" value={reg.team_name || "—"} />
          <Field label="Mobile" value={reg.mobile_number} />
          <div className="sm:col-span-2">
            <p className={labelCls}>Teammates</p>
            {teammates.length === 0 ? (
              <p className="text-muted-foreground text-sm">No teammates added.</p>
            ) : (
              <ul className="space-y-1.5 text-sm">
                {teammates.map((t, i) => (
                  <li key={i} className="flex gap-3 font-mono text-xs">
                    <span className="text-muted-foreground">#{i + 1}</span>
                    <span className="text-foreground">{t.n || "—"}</span>
                    <span className="text-primary">{t.c || ""}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(form);
          }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Competition *</label>
              <select
                className={inputCls}
                value={form.competition_name}
                onChange={(e) => setForm({ ...form, competition_name: e.target.value })}
                required
              >
                {COMPETITION_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-background">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Team / Club Name</label>
              <input
                className={inputCls}
                value={form.team_name}
                onChange={(e) => setForm({ ...form, team_name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <p className={labelCls}>Teammates (up to 10)</p>
            <div className="space-y-2">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                <div key={i} className="grid grid-cols-[2rem_1fr_1fr] gap-2 items-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">#{i}</span>
                  <input
                    className={inputCls}
                    placeholder="Full name"
                    value={form[`team_mate_${i}_name`]}
                    onChange={(e) => setForm({ ...form, [`team_mate_${i}_name`]: e.target.value })}
                  />
                  <input
                    type="tel"
                    className={inputCls}
                    placeholder="Contact"
                    value={form[`team_mate_${i}_contact`]}
                    onChange={(e) => setForm({ ...form, [`team_mate_${i}_contact`]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm hover:bg-white transition-colors disabled:opacity-50"
            >
              {mutation.isPending ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-5 py-2.5 border border-border text-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm hover:border-primary transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={labelCls}>{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  );
}
