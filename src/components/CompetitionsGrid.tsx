import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { listCompetitions } from "@/lib/content.functions";
import { COMPETITIONS as FALLBACK_COMPETITIONS } from "@/lib/competitions";

export function CompetitionsGrid({ limit }: { limit?: number }) {
  const fetchComps = useServerFn(listCompetitions);
  const q = useQuery({ queryKey: ["competitions"], queryFn: () => fetchComps() });
  const all = q.data?.competitions?.length
    ? q.data.competitions
    : FALLBACK_COMPETITIONS.map((c, i) => ({ ...c, id: String(i), levels: c.levels ?? [] }));
  const competitions = limit ? all.slice(0, limit) : all;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {competitions.map((c: any, i: number) => (
        <Link
          key={c.id ?? c.name}
          to="/register"
          search={{ competition: c.name } as any}
          className="glass-card glass-card-hover group relative h-full flex flex-col rounded-md overflow-hidden cursor-pointer"
        >
          {c.image_url && (
            <div className="relative overflow-hidden">
              <img
                src={c.image_url}
                alt={c.name}
                loading="lazy"
                className="w-full h-40 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent" />
            </div>
          )}
          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className="font-mono text-[10px] tracking-[0.2em] text-cyan/90 block">
                {String(i + 1).padStart(2, "0")} / {String(c.category).toUpperCase()}
              </span>
              {c.levels && c.levels.length > 0 && (
                <span className="font-mono text-xs font-bold text-primary border border-primary/50 px-2 py-0.5 rounded-sm">
                  {c.levels.join(" • ")}
                </span>
              )}
            </div>
            <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight mb-2 leading-tight transition-colors group-hover:text-cyan">
              {c.name}
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground flex-1">{c.description}</p>
            {(c.team_size || c.teamSize || c.age) && (
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan/80 mb-1">
                    Team Size
                  </div>
                  <div className="text-sm font-bold">{c.team_size || c.teamSize || "—"}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan/80 mb-1">
                    Age
                  </div>
                  <div className="text-sm font-bold">{c.age || "—"}</div>
                </div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Explore</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-cyan">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
