import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const VisitorSchema = z.object({
  full_name: z.string().trim().min(1).max(120),
  contact_number: z.string().trim().min(7).max(20),
  address_line_1: z.string().trim().max(200).optional().or(z.literal("")),
  address_line_2: z.string().trim().max(200).optional().or(z.literal("")),
  address_line_3: z.string().trim().max(200).optional().or(z.literal("")),
  address_line_4: z.string().trim().max(200).optional().or(z.literal("")),
  father_name: z.string().trim().max(120).optional().or(z.literal("")),
  father_mobile: z.string().trim().max(20).optional().or(z.literal("")),
  mother_name: z.string().trim().max(120).optional().or(z.literal("")),
  mother_mobile: z.string().trim().max(20).optional().or(z.literal("")),
  standard: z.string().trim().max(50).optional().or(z.literal("")),
  division: z.string().trim().max(50).optional().or(z.literal("")),
  school_college_name: z.string().trim().max(200).optional().or(z.literal("")),
});

export type VisitorInput = z.infer<typeof VisitorSchema>;

export const submitVisitorRegistration = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => VisitorSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const row: Record<string, unknown> = { ...data, user_id: userId };
    for (const k of Object.keys(row)) {
      if (typeof row[k] === "string" && (row[k] as string).trim() === "") row[k] = null;
    }
    const { error, data: inserted } = await supabase
      .from("visitor_registrations")
      .insert(row as never)
      .select("id")
      .single();
    if (error) {
      console.error("Visitor registration insert failed", error);
      throw new Error(error.message || "Could not submit visitor registration.");
    }
    return { ok: true, id: inserted.id };
  });
