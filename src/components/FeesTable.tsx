import { PARTICIPATION_FEES } from "@/lib/fees";

export function FeesTable() {
  return (
    <div className="bg-surface border border-border rounded-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-baseline justify-between gap-2 flex-wrap">
        <h3 className="font-mono text-xs uppercase tracking-widest text-primary">
          [ Participation Fees ]
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          OTA = Open To All
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-white/[0.02] text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <th className="px-3 py-2 w-10">#</th>
              <th className="px-3 py-2">Challenge</th>
              <th className="px-3 py-2 whitespace-nowrap">Fees</th>
              <th className="px-3 py-2 whitespace-nowrap">Team</th>
              <th className="px-3 py-2 whitespace-nowrap">Age</th>
            </tr>
          </thead>
          <tbody>
            {PARTICIPATION_FEES.map((r, i) => (
              <tr key={r.name} className="border-b border-border/60 last:border-0">
                <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{i + 1}</td>
                <td className="px-3 py-2.5 font-medium">{r.name}</td>
                <td className="px-3 py-2.5 font-mono text-primary whitespace-nowrap">{r.fees}</td>
                <td className="px-3 py-2.5 whitespace-nowrap">{r.teamSize}</td>
                <td className="px-3 py-2.5 whitespace-nowrap">{r.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
