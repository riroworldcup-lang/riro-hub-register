import { Trophy, Medal, Award } from "lucide-react";

const DEMO_SCHOOLS = [
  { rank: 1, name: "St. Mary's Robotics Club", location: "Mumbai", points: 1240, events: 8 },
  { rank: 2, name: "Don Bosco STEM Academy", location: "Thane", points: 1185, events: 7 },
  { rank: 3, name: "Ryan International Tech Club", location: "Mira Road", points: 1120, events: 7 },
  { rank: 4, name: "Navy Children School Drones", location: "Karanja", points: 980, events: 6 },
  { rank: 5, name: "Delhi Public School Innovators", location: "Borivali", points: 945, events: 6 },
  { rank: 6, name: "Little Flower Convent Coders", location: "Bhayander", points: 890, events: 5 },
  { rank: 7, name: "Sacred Heart Gaming Guild", location: "Vasai", points: 860, events: 5 },
  { rank: 8, name: "Christ Academy Makerspace", location: "Malad", points: 820, events: 5 },
  { rank: 9, name: "Kendriya Vidyalaya Aero Team", location: "Virar", points: 775, events: 4 },
  { rank: 10, name: "Greenlawns AI Society", location: "Andheri", points: 740, events: 4 },
];

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
  return <span className="font-mono font-bold text-sm text-muted-foreground w-5 text-center">{rank}</span>;
}

export function Leaderboard() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white/[0.02] border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 sm:mb-14 text-center">
          <h2 className="font-mono text-primary text-sm mb-2">[ LEADERBOARD ]</h2>
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter italic">
            Schools & Clubs
          </h3>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Rankings update live as schools and clubs earn points across competitions. More events, more points.
          </p>
        </div>

        <div className="border border-border rounded-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_100px_100px] sm:grid-cols-[48px_1fr_120px_120px] gap-3 items-center px-4 sm:px-6 py-3 bg-muted/30 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground border-b border-border">
            <span>Rank</span>
            <span>School / Club</span>
            <span className="text-right">Events</span>
            <span className="text-right">Points</span>
          </div>

          {/* Rows */}
          {DEMO_SCHOOLS.map((school, i) => (
            <div
              key={school.name}
              className={`grid grid-cols-[40px_1fr_100px_100px] sm:grid-cols-[48px_1fr_120px_120px] gap-3 items-center px-4 sm:px-6 py-3 sm:py-4 transition-colors hover:bg-muted/30 ${
                i < DEMO_SCHOOLS.length - 1 ? "border-b border-border" : ""
              } ${i < 3 ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-center justify-center">
                <RankIcon rank={school.rank} />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base leading-tight">{school.name}</div>
                <div className="font-mono text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                  {school.location}
                </div>
              </div>
              <div className="text-right font-mono text-xs sm:text-sm text-muted-foreground">
                {school.events}
              </div>
              <div className="text-right font-mono font-bold text-sm sm:text-base text-primary">
                {school.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-6">
          Demo data — Live rankings will update as competitions begin
        </p>
      </div>
    </section>
  );
}
