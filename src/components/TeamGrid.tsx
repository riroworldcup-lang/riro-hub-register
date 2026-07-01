import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTeamMembers } from "@/lib/team.functions";

export function TeamGrid() {
  const fetchList = useServerFn(listTeamMembers);
  const q = useQuery({ queryKey: ["team-members"], queryFn: () => fetchList() });
  const members = q.data?.members ?? [];

  if (!members.length) return null;

  return (
    <section className="px-4 sm:px-6 py-20 max-w-6xl mx-auto">
      <h2 className="font-mono text-primary text-sm mb-3">[ TEAM ]</h2>
      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter italic mb-10">
        The People Behind RIRO
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {members.map((m: any) => (
          <div key={m.id} className="text-center group">
            <div className="aspect-square overflow-hidden border border-border rounded-sm mb-3 bg-white/[0.02]">
              <img
                src={m.image_url}
                alt={m.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="font-bold text-sm sm:text-base leading-tight">{m.name}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary mt-1">
              {m.designation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
