export type FeeRow = {
  name: string;
  fees: string;
  teamSize: string;
  age: string;
};

export const PARTICIPATION_FEES: FeeRow[] = [
  { name: "Innovation Challenge", fees: "₹1999/-", teamSize: "1–10", age: "OTA" },
  { name: "Jr. Innovation Challenge", fees: "₹999/-", teamSize: "1–10", age: "6–14" },
  { name: "Robo Soccer", fees: "₹1999/-", teamSize: "1–10", age: "OTA" },
  { name: "Jr. Robo Soccer", fees: "₹499/-", teamSize: "1–4", age: "6–14" },
  { name: "Jr. FPV Car Racing", fees: "₹999/-", teamSize: "1–4", age: "6–14" },
  { name: "Water Rocket", fees: "₹999/-", teamSize: "1–10", age: "OTA" },
  { name: "Aero Modelling Challenge", fees: "₹1449/-", teamSize: "1–4", age: "OTA" },
  { name: "RoboWar", fees: "₹2999/-", teamSize: "1–10", age: "OTA" },
  { name: "Jr. RoboWar", fees: "₹199/-", teamSize: "1–4", age: "6–14" },
  { name: "Reel Making Challenge", fees: "₹99/-", teamSize: "1–3", age: "OTA" },
  { name: "BGMI", fees: "₹499/-", teamSize: "1–5", age: "OTA" },
  { name: "Astro Conference", fees: "₹199/-", teamSize: "1", age: "OTA" },
  { name: "World Record Attempt", fees: "₹99/-", teamSize: "1", age: "OTA" },
];
