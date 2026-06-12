import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RegistrationSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  standard_class: z.string().trim().min(1).max(50),
  mobile_number: z.string().trim().min(7).max(20),
  participant_email: z.string().trim().email().max(200).optional().or(z.literal("")),
  school_name: z.string().trim().min(1).max(200),
  science_teacher_name: z.string().trim().min(1).max(120),
  science_teacher_contact: z.string().trim().min(7).max(20),
  competition_name: z.string().trim().min(1).max(120),
  team_name: z.string().trim().max(120).optional().or(z.literal("")),
  team_mates: z.string().trim().max(500).optional().or(z.literal("")),
  team_mate_numbers: z.string().trim().max(500).optional().or(z.literal("")),
  comments: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof RegistrationSchema>;

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => RegistrationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      ...data,
      participant_email: data.participant_email || null,
      team_name: data.team_name || null,
      team_mates: data.team_mates || null,
      team_mate_numbers: data.team_mate_numbers || null,
      comments: data.comments || null,
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("registrations")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("Registration insert failed", error);
      throw new Error("Could not submit registration. Please try again.");
    }

    // Best-effort confirmation email; do not block on failure.
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
