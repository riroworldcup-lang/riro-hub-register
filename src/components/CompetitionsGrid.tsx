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
          className="bg-background border border-border h-full flex flex-col hover:bg-primary/5 hover:border-primary/40 transition-colors rounded-sm overflow-hidden cursor-pointer group"
        >
          {c.image_url && (
            <img
              src={c.image_url}
              alt={c.name}
              loading="lazy"
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <div className="flex justify-between items-start mb-3 gap-2">
              <span className="font-mono text-[10px] text-primary block">
                {String(i + 1).padStart(2, "0")} / {String(c.category).toUpperCase()}
              </span>
              {c.levels && c.levels.length > 0 && (
                <span className="font-mono text-xs font-bold text-primary border border-primary/50 px-2 py-0.5 rounded-sm">
                  {c.levels.join(" • ")}
                </span>
              )}
            </div>
            <h4 className="text-lg sm:text-xl font-bold uppercase mb-2 leading-tight">{c.name}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground flex-1">{c.description}</p>
            {(c.team_size || c.teamSize || c.age) && (
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-2">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1">Team Size</div>
                  <div className="text-sm font-bold">{c.team_size || c.teamSize || "—"}</div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-primary mb-1">Age</div>
                  <div className="text-sm font-bold">{c.age || "—"}</div>
                </div>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-border font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Rules → Soon
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
