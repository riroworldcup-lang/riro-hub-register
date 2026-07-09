export type Competition = {
  name: string;
  category: string;
  description: string;
  levels?: string[];
  teamSize?: string;
  age?: string;
};

export const COMPETITIONS: Competition[] = [
  { name: "Innovation Challenge", category: "Innovation", description: "Showcase original STEM solutions.", levels: ["Junior", "Senior"], teamSize: "1–10", age: "6–14 / OTA" },
  { name: "Sumo Bot", category: "Robotics", description: "High-torque combat in the ring.", levels: ["Junior", "Senior"], teamSize: "1–4", age: "6–14 / OTA" },
  { name: "Robo Soccer", category: "Robotics", description: "Tactical robotic football matches.", levels: ["Junior", "Senior"], teamSize: "1–10", age: "6–14 / OTA" },
  { name: "Robo Race", category: "Robotics", description: "Line-following speed circuits.", levels: ["Junior", "Senior"], teamSize: "1–4", age: "6–14 / OTA" },
  { name: "Assembly Robot Race", category: "Robotics", description: "Build, then race against the clock.", levels: ["Junior"], teamSize: "1–4", age: "6–14" },
  { name: "Water Rocket", category: "Aerospace", description: "Pressure propulsion altitude trials.", levels: ["Junior", "Senior"], teamSize: "1–10", age: "OTA" },
  { name: "Drone Racing", category: "Aerospace", description: "FPV racing through obstacle gates.", teamSize: "1–2", age: "OTA" },
  { name: "Robo Hockey", category: "Robotics", description: "Multi-bot team strategy on ice.", levels: ["Junior", "Senior"], teamSize: "1–4", age: "6–14 / OTA" },
  { name: "Aero Modeling Challenge", category: "Aerospace", description: "Custom fixed-wing precision flight.", levels: ["Junior", "Senior"], teamSize: "1–4", age: "OTA" },
  { name: "FPV Car Racing", category: "Robotics", description: "First-person view ground racing.", levels: ["Junior", "Senior"], teamSize: "1–4", age: "6–14 / OTA" },
  { name: "ROBOWAR", category: "Robotics", description: "Full-contact mechanical combat.", levels: ["Junior", "Senior"], teamSize: "1–10", age: "6–14 / OTA" },
  { name: "Reel Making Challenge", category: "Media", description: "Short-form video storytelling.", teamSize: "1–3", age: "OTA" },
  { name: "BGMI Championship", category: "Gaming", description: "Squad-based mobile esports battle.", teamSize: "1–5", age: "OTA" },
  { name: "Amateur Astronomer Conference", category: "STEM", description: "Present celestial research findings.", teamSize: "1", age: "OTA" },
  { name: "World Record Attempt", category: "Special", description: "Be part of a mass participation world record attempt. ₹99/- per participant.", teamSize: "1", age: "OTA" },
];

export const COMPETITION_OPTIONS: string[] = [
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
  "ROBOWAR (Junior)",
  "ROBOWAR (Senior)",
  "Reel Making Challenge",
  "BGMI Championship",
  "Amateur Astronomer Conference",
  "World Record Attempt",
];
