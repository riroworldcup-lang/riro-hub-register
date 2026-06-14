import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { submitRegistration } from "@/lib/registrations.functions";
import { COMPETITION_OPTIONS } from "@/lib/competitions";
import { supabase } from "@/integrations/supabase/client";

type FormState = {
  full_name: string;
  standard_class: string;
  mobile_number: string;
  participant_email: string;
  school_name: string;
  science_teacher_name: string;
  science_teacher_contact: string;
  competition_name: string;
  team_name: string;
  comments: string;
} & Record<`team_mate_${number}_name` | `team_mate_${number}_contact`, string>;

const buildInitial = (): FormState => {
  const base = {
    full_name: "",
    standard_class: "",
    mobile_number: "",
    participant_email: "",
    school_name: "",
    science_teacher_name: "",
    science_teacher_contact: "",
    competition_name: "",
    team_name: "",
    comments: "",
  } as FormState;
  for (let i = 1; i <= 10; i++) {
    (base as any)[`team_mate_${i}_name`] = "";
    (base as any)[`team_mate_${i}_contact`] = "";
  }
  return base;
};

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";
const labelCls =
  "block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5";

export function RegistrationForm() {
  const [form, setForm] = useState<FormState>(buildInitial);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const submit = useServerFn(submitRegistration);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setAuthed(!!data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthed(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const mutation = useMutation({
    mutationFn: (data: FormState) => submit({ data }),
    onSuccess: () => {
      toast.success("Registration submitted. We'll be in touch.");
      setForm(buildInitial());
      navigate({ to: "/dashboard" });
    },
    onError: (err: Error) => toast.error(err.message || "Submission failed."),
  });

  const update = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof FormState)[] = [
      "full_name",
      "standard_class",
      "mobile_number",
      "school_name",
      "science_teacher_name",
      "science_teacher_contact",
      "competition_name",
    ];
    for (const k of required) {
      if (!String(form[k]).trim()) {
        toast.error(`Please fill in ${String(k).replace(/_/g, " ")}`);
        return;
      }
    }
    mutation.mutate(form);
  };

  if (authed === false) {
    return (
      <div className="p-6 border border-border rounded-sm bg-white/[0.02] text-sm">
        <h3 className="font-mono text-primary text-xs uppercase tracking-widest mb-2">
          [ Sign in required ]
        </h3>
        <p className="text-muted-foreground mb-4">
          Create a free account so you can manage and edit your registration from your dashboard later.
        </p>
        <Link
          to="/auth"
          className="inline-block px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors rounded-sm"
        >
          Sign in / Create account
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section>
        <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
          [ 01 ] Participant Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Full Name *</label>
            <input className={inputCls} value={form.full_name} onChange={update("full_name")} required />
          </div>
          <div>
            <label className={labelCls}>Standard / Class *</label>
            <input className={inputCls} value={form.standard_class} onChange={update("standard_class")} required />
          </div>
          <div>
            <label className={labelCls}>Mobile Number *</label>
            <input type="tel" className={inputCls} value={form.mobile_number} onChange={update("mobile_number")} required />
          </div>
          <div>
            <label className={labelCls}>Email (for confirmation)</label>
            <input type="email" className={inputCls} value={form.participant_email} onChange={update("participant_email")} />
          </div>
          <div className="md:col-span-2">
            <label className={labelCls}>School Name *</label>
            <input className={inputCls} value={form.school_name} onChange={update("school_name")} required />
          </div>
          <div>
            <label className={labelCls}>Science Teacher Name *</label>
            <input className={inputCls} value={form.science_teacher_name} onChange={update("science_teacher_name")} required />
          </div>
          <div>
            <label className={labelCls}>Science Teacher Contact *</label>
            <input type="tel" className={inputCls} value={form.science_teacher_contact} onChange={update("science_teacher_contact")} required />
          </div>
        </div>
      </section>

      <section>
        <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
          [ 02 ] Competition
        </h4>
        <label className={labelCls}>Competition Name *</label>
        <select className={inputCls} value={form.competition_name} onChange={update("competition_name")} required>
          <option value="" className="bg-background">Select a competition...</option>
          {COMPETITION_OPTIONS.map((c) => (
            <option key={c} value={c} className="bg-background">{c}</option>
          ))}
        </select>
      </section>

      <section>
        <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
          [ 03 ] Team Details (Optional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Team Name</label>
            <input className={inputCls} value={form.team_name} onChange={update("team_name")} />
          </div>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          Add up to 10 teammates (leave blank if not applicable)
        </p>
        <div className="space-y-3">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
            <div key={i} className="grid grid-cols-[2.25rem_1fr_1fr] gap-2 sm:gap-3 items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
                #{i}
              </span>
              <input
                className={inputCls}
                placeholder={`Teammate ${i} full name`}
                value={(form as any)[`team_mate_${i}_name`]}
                onChange={update(`team_mate_${i}_name` as keyof FormState)}
              />
              <input
                type="tel"
                className={inputCls}
                placeholder="Contact number"
                value={(form as any)[`team_mate_${i}_contact`]}
                onChange={update(`team_mate_${i}_contact` as keyof FormState)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <label className={labelCls}>Comments / Special Requirements</label>
        <textarea rows={3} className={inputCls} value={form.comments} onChange={update("comments")} />
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={mutation.isPending || authed === null}
          className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-sm"
        >
          {mutation.isPending ? "Submitting..." : "Submit Registration"}
        </button>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Registration charges & rulebook coming soon. Payment will be enabled later.
        </p>
      </div>
    </form>
  );
}
