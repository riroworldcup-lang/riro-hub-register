export const BLOCKED_HELPLINE = "+91-809 7070 383";

export const BLOCKED_MESSAGE =
  `Registration is not available for St. Aloysius (Bhayander). Please contact ${BLOCKED_HELPLINE} for assistance.`;

const norm = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Blocks registrations from St. Aloysius, Bhayander.
 * Matches the school name alone, or any address field mentioning both.
 */
export function isBlockedEntry(...fields: (string | null | undefined)[]): boolean {
  const blob = norm(fields.filter(Boolean).join(" "));
  const aloysius = /\b(st|saint)?\s*aloysius\b/.test(blob) || blob.includes("aloysius");
  const bhayander = /bhayand|bhayend/.test(blob);
  // School name match alone is enough; address mention of both also blocks.
  return aloysius && (bhayander || true) ? aloysius : aloysius && bhayander;
}
