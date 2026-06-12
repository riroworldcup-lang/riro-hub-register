import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { submitRegistration } from "@/lib/registrations.functions";
import { COMPETITION_OPTIONS } from "@/lib/competitions";

const initial = {
  full_name: "",
  standard_class: "",
  mobile_number: "",
  participant_email: "",
  school_name: "",
  science_teacher_name: "",
  science_teacher_contact: "",
  competition_name: "",
  team_name: "",
  team_mates: "",
  team_mate_numbers: "",
  comments: "",
};

const inputCls =
  "w-full bg-white/5 border border-white/10 rounded-sm px-3 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors";
const labelCls =
  "block font-mono text-[10px] uppercase tracking-widest text-primary mb-1.5";

export function RegistrationForm() {
  const [form, setForm] = useState(initial);
  const submit = useServerFn(submitRegistration);

  const mutation = useMutation({
    mutationFn: (data: typeof initial) => submit({ data }),
    onSuccess: () => {
      toast.success("Registration submitted. We'll be in touch.");
      setForm(initial);
    },
    onError: (err: Error) => toast.error(err.message || "Submission failed."),
  });

  const update = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const required: (keyof typeof initial)[] = [
      "full_name",
      "standard_class",
      "mobile_number",
      "school_name",
      "science_teacher_name",
      "science_teacher_contact",
      "competition_name",
    ];
    for (const k of required) {
      if (!form[k].trim()) {
        toast.error(`Please fill in ${k.replace(/_/g, " ")}`);
        return;
      }
    }
    mutation.mutate(form);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={labelCls}>Team Name</label>
            <input className={inputCls} value={form.team_name} onChange={update("team_name")} />
          </div>
          <div>
            <label className={labelCls}>Teammate Name(s)</label>
            <input className={inputCls} placeholder="Comma-separated" value={form.team_mates} onChange={update("team_mates")} />
          </div>
          <div>
            <label className={labelCls}>Teammate Mobile(s)</label>
            <input className={inputCls} placeholder="Comma-separated" value={form.team_mate_numbers} onChange={update("team_mate_numbers")} />
          </div>
        </div>
      </section>

      <section>
        <label className={labelCls}>Comments / Special Requirements</label>
        <textarea rows={3} className={inputCls} value={form.comments} onChange={update("comments")} />
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={mutation.isPending}
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
