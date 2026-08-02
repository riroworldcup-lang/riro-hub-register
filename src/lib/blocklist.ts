export const BLOCKED_HELPLINE = "+91-809 7070 383";

export const BLOCKED_MESSAGE =
  `Registration is not available for St. Aloysius (Bhayander). Please contact ${BLOCKED_HELPLINE} for assistance.`;

const norm = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Blocks registrations from St. Aloysius (Bhayander).
 * Any school/address field mentioning "Aloysius" is blocked.
 */
export function isBlockedEntry(...fields: (string | null | undefined)[]): boolean {
  const blob = norm(fields.filter(Boolean).join(" "));
  return blob.includes("aloysius");
}
