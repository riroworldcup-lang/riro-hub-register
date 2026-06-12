import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  listRegistrations,
  deleteRegistration,
  claimFirstAdmin,
  checkIsAdmin,
  updateChargesSetting,
} from "@/lib/admin.functions";
import {
  listGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  listCompetitions,
  createCompetition,
  updateCompetition,
  deleteCompetition,
} from "@/lib/content.functions";


export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | RIRO World Cup 2026" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const claim = useServerFn(claimFirstAdmin);
  const check = useServerFn(checkIsAdmin);
  const fetchList = useServerFn(listRegistrations);
  const del = useServerFn(deleteRegistration);
  const updateCharges = useServerFn(updateChargesSetting);

  const [adminReady, setAdminReady] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await claim();
        if (!r.ok) {
          toast.error("Not an admin. Ask the existing admin to grant you access.");
          setAdminReady(false);
          return;
        }
        const { isAdmin } = await check();
        setAdminReady(isAdmin);
        if (!isAdmin) toast.error("Admin role not active yet. Try refreshing.");
      } catch (e: any) {
        toast.error(e.message || "Could not verify admin access.");
        setAdminReady(false);
      }
    })();
  }, [claim, check]);

  const query = useQuery({
    queryKey: ["registrations"],
    queryFn: () => fetchList(),
    enabled: adminReady === true,
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Deleted.");
      qc.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const exportCsv = () => {
    const rows = query.data?.registrations ?? [];
    if (!rows.length) return toast.info("No registrations to export.");
    const cols = Object.keys(rows[0]);
    const escape = (v: any) => {
      if (v === null || v === undefined) return "";
      const s = String(v).replace(/"/g, '""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    };
    const csv = [cols.join(","), ...rows.map((r: any) => cols.map((c) => escape(r[c])).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `riro-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (adminReady === null) {
    return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground">Loading...</div>;
  }
  if (adminReady === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black uppercase mb-3">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You are signed in but not an admin.</p>
          <button onClick={signOut} className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs rounded-sm">Sign Out</button>
        </div>
      </div>
    );
  }

  const rows = query.data?.registrations ?? [];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 sm:px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="size-8 bg-primary rounded-sm rotate-45 flex items-center justify-center shrink-0">
              <div className="size-3.5 bg-background -rotate-45" />
            </Link>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-widest text-primary">[ ADMIN ]</div>
              <h1 className="font-mono font-bold uppercase tracking-tight truncate">RIRO Dashboard</h1>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={exportCsv} className="px-4 py-2 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">Export CSV</button>
            <button onClick={signOut} className="px-4 py-2 border border-border font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm hover:border-primary">Sign Out</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <ChargesPanel updateCharges={updateCharges} />
        <GalleryPanel />
        <CompetitionsPanel />


        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-mono text-primary text-sm">[ REGISTRATIONS ]</h2>
            <span className="font-mono text-xs text-muted-foreground">{rows.length} total</span>
          </div>
          {query.isLoading ? (
            <div className="p-8 text-center text-muted-foreground font-mono">Loading...</div>
          ) : rows.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground font-mono border border-border rounded-sm">No registrations yet.</div>
          ) : (
            <div className="overflow-x-auto border border-border rounded-sm">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Class</th>
                    <th className="text-left p-3">School</th>
                    <th className="text-left p-3">Mobile</th>
                    <th className="text-left p-3">Competition</th>
                    <th className="text-left p-3">Team</th>
                    <th className="text-left p-3">Submitted</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: any) => (
                    <tr key={r.id} className="border-t border-border hover:bg-white/[0.02]">
                      <td className="p-3 font-medium">{r.full_name}</td>
                      <td className="p-3 text-muted-foreground">{r.standard_class}</td>
                      <td className="p-3 text-muted-foreground">{r.school_name}</td>
                      <td className="p-3 font-mono text-xs">{r.mobile_number}</td>
                      <td className="p-3 text-xs">{r.competition_name}</td>
                      <td className="p-3 text-xs text-muted-foreground">{r.team_name || "—"}</td>
                      <td className="p-3 font-mono text-[10px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => { if (confirm("Delete this registration?")) delMut.mutate(r.id); }}
                          className="font-mono text-[10px] uppercase tracking-widest text-destructive hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function ChargesPanel({ updateCharges }: { updateCharges: any }) {
  const [enabled, setEnabled] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("INR");
  const [notice, setNotice] = useState("Registration Charges & Rulebook Coming Soon");

  const mut = useMutation({
    mutationFn: () => updateCharges({ data: { enabled, amount, currency, notice } }),
    onSuccess: () => toast.success("Settings updated."),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section className="border border-border rounded-sm p-6">
      <h2 className="font-mono text-primary text-sm mb-2">[ REGISTRATION CHARGES ]</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Update charges once finalized. Payment integration can be wired here later.
      </p>
      <div className="grid sm:grid-cols-4 gap-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Charges enabled
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm"
          placeholder="Amount"
        />
        <input
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm"
          placeholder="Currency"
        />
        <button
          onClick={() => mut.mutate()}
          disabled={mut.isPending}
          className="px-4 py-2 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm"
        >
          {mut.isPending ? "Saving..." : "Save"}
        </button>
        <input
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          className="sm:col-span-4 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm"
          placeholder="Banner text"
        />
      </div>
    </section>
  );
}
