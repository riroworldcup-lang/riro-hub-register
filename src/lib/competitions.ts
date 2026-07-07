export type Competition = {
  name: string;
  category: string;
  description: string;
  levels?: string[];
};

export const COMPETITIONS: Competition[] = [
  { name: "Innovation Challenge", category: "Innovation", description: "Showcase original STEM solutions.", levels: ["Junior", "Senior"] },
  { name: "Sumo Bot", category: "Robotics", description: "High-torque combat in the ring." },
  { name: "Robo Soccer", category: "Robotics", description: "Tactical robotic football matches.", levels: ["Junior", "Senior"] },
  { name: "Robo Race", category: "Robotics", description: "Line-following speed circuits.", levels: ["Junior", "Senior"] },
  { name: "Assembly Robot Race", category: "Robotics", description: "Build, then race against the clock.", levels: ["Junior"] },
  { name: "Water Rocket", category: "Aerospace", description: "Pressure propulsion altitude trials.", levels: ["Junior", "Senior"] },
  { name: "Drone Racing", category: "Aerospace", description: "FPV racing through obstacle gates." },
  { name: "Robo Hockey", category: "Robotics", description: "Multi-bot team strategy on ice.", levels: ["Junior", "Senior"] },
  { name: "Aero Modeling Challenge", category: "Aerospace", description: "Custom fixed-wing precision flight.", levels: ["Junior", "Senior"] },
  { name: "FPV Car Racing", category: "Robotics", description: "First-person view ground racing.", levels: ["Junior", "Senior"] },
  { name: "Aeromodelling Racing", category: "Aerospace", description: "RC aircraft head-to-head time trials.", levels: ["Junior", "Senior"] },
  { name: "ROBOWAR", category: "Robotics", description: "Full-contact mechanical combat.", levels: ["Junior", "Senior"] },
  { name: "Reel Making Challenge", category: "Media", description: "Short-form video storytelling." },
  { name: "BGMI Championship", category: "Gaming", description: "Squad-based mobile esports battle." },
  { name: "Amateur Astronomer Conference", category: "STEM", description: "Present celestial research findings." },
  { name: "World Record Attempt", category: "Special", description: "Be part of a mass participation world record attempt. ₹99/- per participant." },
];

export const COMPETITION_OPTIONS: string[] = [
  "Chakravyuh",
  "Innovation Challenge (Junior)",
  "Innovation Challenge (Senior)",
  "Sumo Bot",
  "Robo Soccer (Junior)",
  "Robo Soccer (Senior)",
  "Robo Race (Junior)",
  "Robo Race (Senior)",
  "Assembly Robot Race (Junior)",
  "Water Rocket (Junior)",
  "Water Rocket (Senior)",
  "Drone Racing",
  "Robo Hockey (Junior)",
  "Robo Hockey (Senior)",
  "Aero Modeling Challenge (Junior)",
  "Aero Modeling Challenge (Senior)",
  "FPV Car Racing (Junior)",
  "FPV Car Racing (Senior)",
  "Aeromodelling Racing (Junior)",
  "Aeromodelling Racing (Senior)",
  "Web / IT Technology",
  "ROBOWAR (Junior)",
  "ROBOWAR (Senior)",
  "Reel Making Challenge",
  "BGMI Championship",
  "Amateur Astronomer Conference",
];
