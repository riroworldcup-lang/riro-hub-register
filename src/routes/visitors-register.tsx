import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { SiteShell } from "@/components/SiteNav";
import { supabase } from "@/integrations/supabase/client";
import { submitVisitorRegistration, type VisitorInput } from "@/lib/visitors.functions";

export const Route = createFileRoute("/visitors-register")({
  head: () => ({
    meta: [
      { title: "Visitor Registration | RIRO World Cup 2026" },
      { name: "description", content: "Register as a visitor to attend RIRO World Cup 2026 in Mira-Bhayander, Maharashtra." },
    ],
  }),
  component: VisitorsRegisterPage,
});

const initial: VisitorInput = {
  full_name: "",
  contact_number: "",
  address_line_1: "",
  address_line_2: "",
  address_line_3: "",
  address_line_4: "",
  father_name: "",
  father_mobile: "",
  mother_name: "",
  mother_mobile: "",
  standard: "",
  division: "",
  school_college_name: "",
};

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";
const labelCls =
  "block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5";

function VisitorsRegisterPage() {
  const [form, setForm] = useState<VisitorInput>(initial);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const submit = useServerFn(submitVisitorRegistration);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
      setAuthed(!!session?.user),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const mutation = useMutation({
    mutationFn: (data: VisitorInput) => submit({ data }),
    onSuccess: () => {
      toast.success("Visitor registration submitted. See you at the event!");
      setForm(initial);
    },
    onError: (err: Error) => toast.error(err.message || "Submission failed."),
  });

  const update = (k: keyof VisitorInput) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.contact_number.trim()) {
      toast.error("Full name and contact number are required.");
      return;
    }
    mutation.mutate(form);
  };

  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-3xl mx-auto">
        <h2 className="font-mono text-primary text-sm mb-2">[ VISITOR REGISTRATION ]</h2>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter italic mb-6 leading-tight">
          Come Witness the Championship.
        </h1>
        <p className="text-muted-foreground mb-10">
          Register as a visitor to attend RIRO World Cup 2026. No competition entry — just an
          all-access pass to experience the event.
        </p>

        <form onSubmit={onSubmit} className="space-y-8 bg-surface border border-border p-6 sm:p-8 rounded-sm">
          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">[ 01 ] Visitor Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={inputCls} value={form.full_name} onChange={update("full_name")} required />
              </div>
              <div>
                <label className={labelCls}>Contact Number *</label>
                <input type="tel" className={inputCls} value={form.contact_number} onChange={update("contact_number")} required />
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">[ 02 ] Address</h4>
            <div className="space-y-3">
              {([1, 2, 3, 4] as const).map((n) => (
                <input
                  key={n}
                  className={inputCls}
                  placeholder={`Address line ${n}`}
                  value={form[`address_line_${n}` as keyof VisitorInput]}
                  onChange={update(`address_line_${n}` as keyof VisitorInput)}
                />
              ))}
            </div>
          </section>

          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">[ 03 ] Parent Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Father's Name</label>
                <input className={inputCls} value={form.father_name} onChange={update("father_name")} />
              </div>
              <div>
                <label className={labelCls}>Father's Mobile</label>
                <input type="tel" className={inputCls} value={form.father_mobile} onChange={update("father_mobile")} />
              </div>
              <div>
                <label className={labelCls}>Mother's Name</label>
                <input className={inputCls} value={form.mother_name} onChange={update("mother_name")} />
              </div>
              <div>
                <label className={labelCls}>Mother's Mobile</label>
                <input type="tel" className={inputCls} value={form.mother_mobile} onChange={update("mother_mobile")} />
              </div>
            </div>
          </section>

          <section>
            <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">[ 04 ] Academic</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Standard</label>
                <input className={inputCls} value={form.standard} onChange={update("standard")} />
              </div>
              <div>
                <label className={labelCls}>Division</label>
                <input className={inputCls} value={form.division} onChange={update("division")} />
              </div>
              <div className="md:col-span-1">
                <label className={labelCls}>School / College Name</label>
                <input className={inputCls} value={form.school_college_name} onChange={update("school_college_name")} />
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-sm"
          >
            {mutation.isPending ? "Submitting..." : "Submit Visitor Registration"}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
