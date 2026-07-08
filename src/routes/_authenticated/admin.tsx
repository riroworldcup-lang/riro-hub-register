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
  listAuthUsers,
  sendPasswordResetForUser,
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
import {
  listTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "@/lib/team.functions";


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
        <TeamPanel />
        <CompetitionsPanel />
        <UsersPanel />




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

function GalleryPanel() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listGallery);
  const create = useServerFn(createGalleryImage);
  const update = useServerFn(updateGalleryImage);
  const del = useServerFn(deleteGalleryImage);

  const q = useQuery({ queryKey: ["admin-gallery"], queryFn: () => fetchList() });
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [sort, setSort] = useState(0);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    qc.invalidateQueries({ queryKey: ["gallery"] });
  };

  const addMut = useMutation({
    mutationFn: () =>
      create({ data: { image_url: url, caption: caption || null, sort_order: sort } }),
    onSuccess: () => {
      toast.success("Image added.");
      setUrl(""); setCaption(""); setSort(0);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { toast.success("Removed."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updMut = useMutation({
    mutationFn: (v: { id: string; caption: string; sort_order: number }) =>
      update({ data: v }),
    onSuccess: () => { toast.success("Updated."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const images = q.data?.images ?? [];

  return (
    <section className="border border-border rounded-sm p-6">
      <h2 className="font-mono text-primary text-sm mb-2">[ HOMEPAGE GALLERY ]</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Paste any public image URL. Images appear as a slider on the homepage.
      </p>
      <div className="grid sm:grid-cols-[2fr_1.4fr_80px_auto] gap-3 mb-6">
        <input value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://image.url/photo.jpg"
          className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input value={caption} onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption (optional)"
          className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input type="number" value={sort} onChange={(e) => setSort(Number(e.target.value))}
          placeholder="Order"
          className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <button onClick={() => url && addMut.mutate()} disabled={addMut.isPending || !url}
          className="px-4 py-2 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm disabled:opacity-50">
          {addMut.isPending ? "Adding..." : "Add"}
        </button>
      </div>
      {q.isLoading ? (
        <div className="p-6 text-center text-muted-foreground font-mono">Loading...</div>
      ) : images.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground font-mono border border-border rounded-sm">No images yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img: any) => (
            <GalleryEditCard key={img.id} img={img}
              onSave={(caption: string, order: number) => updMut.mutate({ id: img.id, caption, sort_order: order })}
              onDelete={() => { if (confirm("Delete this image?")) delMut.mutate(img.id); }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function GalleryEditCard({ img, onSave, onDelete }: any) {
  const [caption, setCaption] = useState(img.caption || "");
  const [order, setOrder] = useState(img.sort_order ?? 0);
  return (
    <div className="border border-border rounded-sm overflow-hidden bg-background">
      <img src={img.image_url} alt={img.caption || ""} className="w-full aspect-[4/3] object-cover" />
      <div className="p-3 space-y-2">
        <input value={caption} onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption"
          className="w-full bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
        <div className="flex gap-2">
          <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))}
            className="w-20 bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
          <button onClick={() => onSave(caption, order)}
            className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
            Save
          </button>
          <button onClick={onDelete}
            className="px-3 py-1.5 border border-destructive text-destructive font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
            Del
          </button>
        </div>
      </div>
    </div>
  );
}

function CompetitionsPanel() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listCompetitions);
  const create = useServerFn(createCompetition);
  const update = useServerFn(updateCompetition);
  const del = useServerFn(deleteCompetition);

  const q = useQuery({ queryKey: ["admin-competitions"], queryFn: () => fetchList() });

  const [form, setForm] = useState({ name: "", category: "Robotics", description: "", levels: "", sort_order: 0, image_url: "" });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-competitions"] });
    qc.invalidateQueries({ queryKey: ["competitions"] });
  };

  const parseLevels = (s: string) =>
    s.split(",").map((x) => x.trim()).filter(Boolean);

  const addMut = useMutation({
    mutationFn: () => create({
      data: {
        name: form.name,
        category: form.category,
        description: form.description,
        levels: parseLevels(form.levels),
        sort_order: form.sort_order,
        image_url: form.image_url || null,
      },
    }),
    onSuccess: () => {
      toast.success("Competition added.");
      setForm({ name: "", category: "Robotics", description: "", levels: "", sort_order: 0, image_url: "" });
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { toast.success("Deleted."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updMut = useMutation({
    mutationFn: (v: any) => update({ data: v }),
    onSuccess: () => { toast.success("Saved."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = q.data?.competitions ?? [];

  return (
    <section className="border border-border rounded-sm p-6">
      <h2 className="font-mono text-primary text-sm mb-2">[ COMPETITIONS ]</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Add, edit, or remove competitions shown on the homepage carousel.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name" className="lg:col-span-2 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category" className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input value={form.levels} onChange={(e) => setForm({ ...form, levels: e.target.value })}
          placeholder="Levels (comma)" className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
          placeholder="Order" className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <button onClick={() => form.name && form.description && addMut.mutate()} disabled={addMut.isPending}
          className="px-4 py-2 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm disabled:opacity-50">
          {addMut.isPending ? "Adding..." : "Add"}
        </button>
        <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="Image URL (optional)" className="lg:col-span-3 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description" rows={2}
          className="lg:col-span-6 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
      </div>

      {q.isLoading ? (
        <div className="p-6 text-center text-muted-foreground font-mono">Loading...</div>
      ) : rows.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground font-mono border border-border rounded-sm">No competitions yet.</div>
      ) : (
        <div className="space-y-2">
          {rows.map((c: any) => (
            <CompetitionRow key={c.id} comp={c}
              onSave={(v: any) => updMut.mutate({ id: c.id, ...v })}
              onDelete={() => { if (confirm(`Delete "${c.name}"?`)) delMut.mutate(c.id); }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function CompetitionRow({ comp, onSave, onDelete }: any) {
  const [v, setV] = useState({
    name: comp.name, category: comp.category, description: comp.description,
    levels: (comp.levels || []).join(", "), sort_order: comp.sort_order ?? 0,
    image_url: comp.image_url || "",
    participants: (comp.participants || []).join(", "),
  });
  return (
    <div className="border border-border rounded-sm p-3 grid sm:grid-cols-2 lg:grid-cols-6 gap-2">
      {v.image_url && (
        <div className="lg:col-span-6">
          <img src={v.image_url} alt={v.name} className="w-full h-24 object-cover rounded-sm" />
        </div>
      )}
      <input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })}
        className="lg:col-span-2 bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <input value={v.category} onChange={(e) => setV({ ...v, category: e.target.value })}
        className="bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <input value={v.levels} onChange={(e) => setV({ ...v, levels: e.target.value })}
        placeholder="Junior, Senior"
        className="bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <input type="number" value={v.sort_order} onChange={(e) => setV({ ...v, sort_order: Number(e.target.value) })}
        className="bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <div className="flex gap-2">
        <button onClick={() => onSave({
          name: v.name, category: v.category, description: v.description,
          levels: v.levels.split(",").map((x: string) => x.trim()).filter(Boolean),
          sort_order: v.sort_order,
          image_url: v.image_url || null,
          participants: v.participants.split(",").map((x: string) => x.trim()).filter(Boolean),
        })}
          className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
          Save
        </button>
        <button onClick={onDelete}
          className="px-3 py-1.5 border border-destructive text-destructive font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
          Del
        </button>
      </div>
      <input value={v.image_url} onChange={(e) => setV({ ...v, image_url: e.target.value })}
        placeholder="Image URL"
        className="lg:col-span-3 bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <textarea value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })}
        rows={2} placeholder="Description"
        className="lg:col-span-6 bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
      <textarea value={v.participants} onChange={(e) => setV({ ...v, participants: e.target.value })}
        rows={2} placeholder="Participants (comma separated names)"
        className="lg:col-span-6 bg-white/5 border border-border rounded-sm px-2 py-1.5 text-xs" />
    </div>
  );
}

function TeamPanel() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listTeamMembers);
  const create = useServerFn(createTeamMember);
  const update = useServerFn(updateTeamMember);
  const del = useServerFn(deleteTeamMember);

  const q = useQuery({ queryKey: ["admin-team"], queryFn: () => fetchList() });
  const [form, setForm] = useState({ name: "", designation: "", image_url: "", sort_order: 0 });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-team"] });
    qc.invalidateQueries({ queryKey: ["team-members"] });
  };

  const addMut = useMutation({
    mutationFn: () => create({ data: form }),
    onSuccess: () => {
      toast.success("Member added.");
      setForm({ name: "", designation: "", image_url: "", sort_order: 0 });
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { toast.success("Removed."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const updMut = useMutation({
    mutationFn: (v: any) => update({ data: v }),
    onSuccess: () => { toast.success("Saved."); invalidate(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const members = q.data?.members ?? [];

  return (
    <section className="border border-border rounded-sm p-6">
      <h2 className="font-mono text-primary text-sm mb-2">[ TEAM MEMBERS ]</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Passport-size photos shown on the About page. Paste any public image URL.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Full name" className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })}
          placeholder="Designation" className="bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          placeholder="Photo URL" className="lg:col-span-2 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <input type="number" value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            placeholder="Order" className="w-20 bg-white/5 border border-border rounded-sm px-3 py-2 text-sm" />
          <button onClick={() => form.name && form.designation && form.image_url && addMut.mutate()}
            disabled={addMut.isPending}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm disabled:opacity-50">
            {addMut.isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
      {q.isLoading ? (
        <div className="p-6 text-center text-muted-foreground font-mono">Loading...</div>
      ) : members.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground font-mono border border-border rounded-sm">No team members yet.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {members.map((m: any) => (
            <TeamEditCard key={m.id} m={m}
              onSave={(v: any) => updMut.mutate({ id: m.id, ...v })}
              onDelete={() => { if (confirm(`Remove "${m.name}"?`)) delMut.mutate(m.id); }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function TeamEditCard({ m, onSave, onDelete }: any) {
  const [v, setV] = useState({
    name: m.name, designation: m.designation, image_url: m.image_url, sort_order: m.sort_order ?? 0,
  });
  return (
    <div className="border border-border rounded-sm overflow-hidden bg-background">
      <img src={v.image_url} alt={v.name} className="w-full aspect-square object-cover" />
      <div className="p-2 space-y-1.5">
        <input value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-sm px-2 py-1 text-xs" />
        <input value={v.designation} onChange={(e) => setV({ ...v, designation: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-sm px-2 py-1 text-xs" />
        <input value={v.image_url} onChange={(e) => setV({ ...v, image_url: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-sm px-2 py-1 text-[10px]" />
        <div className="flex gap-1">
          <input type="number" value={v.sort_order}
            onChange={(e) => setV({ ...v, sort_order: Number(e.target.value) })}
            className="w-14 bg-white/5 border border-border rounded-sm px-2 py-1 text-xs" />
          <button onClick={() => onSave(v)}
            className="flex-1 px-2 py-1 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
            Save
          </button>
          <button onClick={onDelete}
            className="px-2 py-1 border border-destructive text-destructive font-mono font-bold uppercase tracking-widest text-[10px] rounded-sm">
            X
          </button>
        </div>
      </div>
    </div>
  );
}

function UsersPanel() {
  const fetchList = useServerFn(listAuthUsers);
  const sendReset = useServerFn(sendPasswordResetForUser);
  const q = useQuery({ queryKey: ["admin-users"], queryFn: () => fetchList() });

  const resetMut = useMutation({
    mutationFn: (email: string) =>
      sendReset({ data: { email, redirectTo: `${window.location.origin}/reset-password` } }),
    onSuccess: () => toast.success("Password reset email sent."),
    onError: (e: Error) => toast.error(e.message),
  });

  const users = q.data?.users ?? [];

  return (
    <section className="border border-border rounded-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-mono text-primary text-sm mb-1">[ USERS ]</h2>
          <p className="text-sm text-muted-foreground">
            Registered accounts. Passwords are stored securely and cannot be viewed. Send a reset link to let a user set a new one.
          </p>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{users.length} total</span>
      </div>
      {q.isLoading ? (
        <div className="p-6 text-center text-muted-foreground font-mono">Loading...</div>
      ) : users.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground font-mono border border-border rounded-sm">No users yet.</div>
      ) : (
        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Confirmed</th>
                <th className="text-left p-3">Created</th>
                <th className="text-left p-3">Last Sign-In</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-t border-border hover:bg-white/[0.02]">
                  <td className="p-3 font-medium break-all">{u.email}</td>
                  <td className="p-3 font-mono text-[10px] text-muted-foreground">
                    {u.email_confirmed_at ? "Yes" : "No"}
                  </td>
                  <td className="p-3 font-mono text-[10px] text-muted-foreground">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 font-mono text-[10px] text-muted-foreground">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleString() : "—"}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Send password reset email to ${u.email}?`)) resetMut.mutate(u.email);
                      }}
                      disabled={resetMut.isPending}
                      className="font-mono text-[10px] uppercase tracking-widest text-primary hover:underline disabled:opacity-50"
                    >
                      Send Reset Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

