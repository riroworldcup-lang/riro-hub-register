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

/* Professional studio portraits (Unsplash), cropped to passport-style squares */
const PORTRAITS = [
  "photo-1560250097-0b93528c311a",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1580489944761-15a19d654956",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1544005313-94ddf0286df2",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1568602471122-7832951cc4c5",
  "photo-1517841905240-472988babdf9",
  "photo-1558222218-b7b54eede3f3",
  "photo-1600180758890-6b94519a8ba6",
  "photo-1610216705422-caa3fcb6d158",
  "photo-1607990281513-2c110a25bd8c",
  "photo-1596075780750-81249df16d19",
  "photo-1592621385612-4d7129426394",
  "photo-1623582854588-d60de57fa33f",
  "photo-1615109398623-88346a601842",
  "photo-1595152772835-219674b2a8a6",
  "photo-1633332755192-727a05c4013d",
  "photo-1573497019940-1c28c88b4f3e",
  "photo-1598550874175-4d0ef436c909",
  "photo-1531123897727-8f129e1688ce",
  "photo-1621905251189-08b45d6a269e",
];

const portraitUrl = (i: number) =>
  `https://images.unsplash.com/${PORTRAITS[i % PORTRAITS.length]}?auto=format&fit=facearea&facepad=2.8&w=480&h=480&q=80`;

const JUDGES = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 7) % LAST_NAMES.length]}`,
  designation: DESIGNATIONS[i % DESIGNATIONS.length],
  organisation: ORGANISATIONS[(i * 3) % ORGANISATIONS.length],
  expertise: EXPERTISE[(i * 5) % EXPERTISE.length],
  region: REGIONS[(i * 2) % REGIONS.length],
  years: 8 + ((i * 3) % 22),
  image: portraitUrl(i),
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
