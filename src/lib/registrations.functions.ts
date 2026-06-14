import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const teammateName = z.string().trim().max(120).optional().or(z.literal(""));
const teammateContact = z.string().trim().max(20).optional().or(z.literal(""));

const teammateFields = Object.fromEntries(
  Array.from({ length: 10 }, (_, i) => i + 1).flatMap((i) => [
    [`team_mate_${i}_name`, teammateName],
    [`team_mate_${i}_contact`, teammateContact],
  ]),
) as Record<string, typeof teammateName>;

const BaseSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  standard_class: z.string().trim().min(1).max(50),
  mobile_number: z.string().trim().min(7).max(20),
  participant_email: z.string().trim().email().max(200).optional().or(z.literal("")),
  school_name: z.string().trim().min(1).max(200),
  science_teacher_name: z.string().trim().min(1).max(120),
  science_teacher_contact: z.string().trim().min(7).max(20),
  competition_name: z.string().trim().min(1).max(120),
  team_name: z.string().trim().max(120).optional().or(z.literal("")),
  comments: z.string().trim().max(1000).optional().or(z.literal("")),
  ...teammateFields,
});

export type RegistrationInput = z.infer<typeof BaseSchema>;

function emptyToNull<T extends Record<string, unknown>>(obj: T): T {
  const out: Record<string, unknown> = { ...obj };
  for (const k of Object.keys(out)) {
    if (typeof out[k] === "string" && (out[k] as string).trim() === "") out[k] = null;
  }
  return out as T;
}

export const submitRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => BaseSchema.parse(data))
  .handler(async ({ data, context }) => {
    const row = emptyToNull({ ...data, user_id: context.userId });

    const { data: inserted, error } = await context.supabase
      .from("registrations")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("Registration insert failed", error);
      throw new Error(error.message || "Could not submit registration.");
    }

    if (data.participant_email) {
      try {
        const { sendConfirmationEmail } = await import("./email.server");
        await sendConfirmationEmail({
          to: data.participant_email,
          name: data.full_name,
          competition: data.competition_name,
        });
      } catch (e) {
        console.warn("Confirmation email skipped:", (e as Error).message);
      }
    }

    return { ok: true, id: inserted.id };
  });

export const listMyRegistrations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("registrations")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { registrations: data ?? [] };
  });

const UpdateSchema = z.object({
  id: z.string().uuid(),
  competition_name: z.string().trim().min(1).max(120),
  team_name: z.string().trim().max(120).optional().or(z.literal("")),
  ...teammateFields,
});

export const updateMyRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => UpdateSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { id, ...rest } = data;
    const patch = emptyToNull(rest);
    const { error } = await context.supabase
      .from("registrations")
      .update(patch)
      .eq("id", id)
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
