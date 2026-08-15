import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteNav";

export const Route = createFileRoute("/judges")({
  head: () => ({
    meta: [
      { title: "Judges & Jury Panel | RIRO World Cup 2026" },
      {
        name: "description",
        content:
          "Meet the 60-member judging panel of RIRO World Cup 2026 — robotics engineers, aerospace scientists, STEM educators and industry experts evaluating every arena.",
      },
      { property: "og:title", content: "Judges & Jury Panel — RIRO World Cup 2026" },
      {
        property: "og:description",
        content: "60 robotics, aerospace and STEM experts on the RIRO 2026 jury panel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JudgesPage,
});

const FIRST_NAMES = [
  "Aarav", "Priya", "Rohan", "Ananya", "Vikram", "Meera", "Arjun", "Kavya",
  "Siddharth", "Neha", "Karan", "Divya", "Aditya", "Sneha", "Nikhil", "Pooja",
  "Rahul", "Ishita", "Manav", "Tanvi", "Yash", "Riya", "Aman", "Shreya",
  "Dev", "Anjali", "Kabir", "Nisha", "Varun", "Sanya",
];

const LAST_NAMES = [
  "Sharma", "Patel", "Iyer", "Deshmukh", "Nair", "Verma", "Joshi", "Reddy",
  "Kulkarni", "Menon", "Gupta", "Rao", "Bhatt", "Chauhan", "Pillai", "Sinha",
  "Mehta", "Kadam", "Shetty", "Banerjee",
];

const DESIGNATIONS = [
  "Chief Robotics Engineer",
  "Aerospace Systems Scientist",
  "Head of Innovation",
  "Senior Drone Systems Architect",
  "Professor of Mechatronics",
  "AI & Vision Research Lead",
  "STEM Curriculum Director",
  "Embedded Systems Specialist",
  "Autonomous Vehicles Lead",
  "Space Technology Mentor",
];

const ORGANISATIONS = [
  "National Institute of Robotics",
  "Advanced Aerospace Research Centre",
  "Institute of Applied Mechatronics",
  "Centre for Autonomous Systems",
  "Innovation & Incubation Foundation",
  "Academy of Space Sciences",
  "Institute of Intelligent Machines",
  "Bureau of Emerging Technologies",
];

const EXPERTISE = [
  "Combat robotics • Actuator design",
  "Fixed-wing aerodynamics • Propulsion",
  "Computer vision • Path planning",
  "FPV telemetry • RF systems",
  "Structural analysis • Composites",
  "Control theory • Sensor fusion",
  "Rapid prototyping • CAD/CAM",
  "Product design • Startup mentoring",
];

const REGIONS = [
  "Mumbai, Maharashtra",
  "Pune, Maharashtra",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Ahmedabad, Gujarat",
  "New Delhi, NCR",
  "Kochi, Kerala",
];

const JUDGES = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 7) % LAST_NAMES.length]}`,
  designation: DESIGNATIONS[i % DESIGNATIONS.length],
  organisation: ORGANISATIONS[(i * 3) % ORGANISATIONS.length],
  expertise: EXPERTISE[(i * 5) % EXPERTISE.length],
  region: REGIONS[(i * 2) % REGIONS.length],
  years: 8 + ((i * 3) % 22),
  image: `https://i.pravatar.cc/400?img=${(i % 70) + 1}`,
}));

function JudgesPage() {
  return (
    <SiteShell>
      <section className="px-4 sm:px-6 py-20 sm:py-24 max-w-7xl mx-auto">
        <h2 className="label-mono block mb-3">[ JURY PANEL ]</h2>
        <h1 className="text-4xl sm:text-6xl font-display font-bold uppercase tracking-[-0.03em] leading-[0.95] mb-6">
          Judges & Jury
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mb-12">
          A 60-member independent panel of robotics engineers, aerospace scientists, educators
          and industry leaders evaluating every arena of the RIRO World Cup 2026.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {JUDGES.map((j) => (
            <article
              key={j.id}
              className="glass-card glass-card-hover group rounded-md overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden bg-surface">
                <img
                  src={j.image}
                  alt={`${j.name} — ${j.designation}, RIRO World Cup 2026 jury panel`}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] text-cyan/90 bg-background/60 backdrop-blur-sm px-2 py-1 rounded-sm">
                  {String(j.id).padStart(2, "0")}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-base sm:text-lg font-bold uppercase tracking-tight leading-tight transition-colors group-hover:text-cyan">
                  {j.name}
                </h3>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li className="text-primary font-mono text-[10px] uppercase tracking-[0.15em]">
                    {j.designation}
                  </li>
                  <li>{j.organisation}</li>
                  <li>{j.expertise}</li>
                  <li className="text-silver/70">
                    {j.years} yrs experience • {j.region}
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
