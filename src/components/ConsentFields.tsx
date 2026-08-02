import type { ChangeEvent } from "react";

export type Consents = {
  terms: boolean;
  updates: boolean;
  partners: boolean;
};

export const emptyConsents: Consents = {
  terms: false,
  updates: false,
  partners: false,
};

const items: { key: keyof Consents; label: string; required?: boolean }[] = [
  {
    key: "terms",
    label: "I agree to the event terms and privacy policy.",
    required: true,
  },
  { key: "updates", label: "I agree to receive updates about this event." },
  {
    key: "partners",
    label: "I agree to receive information from event partners and sponsors.",
  },
];

export function ConsentCheckboxes({
  value,
  onChange,
}: {
  value: Consents;
  onChange: (next: Consents) => void;
}) {
  const set = (k: keyof Consents) => (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.checked });

  return (
    <div className="space-y-3">
      {items.map((it) => (
        <label key={it.key} className="flex items-start gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={value[it.key]}
            onChange={set(it.key)}
            required={it.required}
            className="mt-0.5 size-4 shrink-0 accent-primary cursor-pointer"
          />
          <span className="text-foreground/90">
            {it.label}
            {it.required && <span className="text-primary"> *</span>}
          </span>
        </label>
      ))}
    </div>
  );
}

export function UndertakingNote() {
  return (
    <div className="border border-primary/40 bg-primary/5 p-4 rounded-sm space-y-2">
      <h5 className="font-mono text-[10px] uppercase tracking-widest text-primary">
        [ Undertaking ]
      </h5>
      <p className="text-sm text-foreground/90">
        I am aware that providing fake information (including incorrect mobile numbers) will
        lead to cancellation of the registration without refund.
      </p>
      <p className="text-sm text-foreground/90">
        School / College ID card is mandatory at the entry gate.
      </p>
    </div>
  );
}
