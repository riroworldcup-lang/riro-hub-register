import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isBlockedEntry, BLOCKED_MESSAGE } from "@/lib/blocklist";

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
    if (
      isBlockedEntry(
        data.school_college_name,
        data.address_line_1,
        data.address_line_2,
        data.address_line_3,
        data.address_line_4,
      )
    ) {
      throw new Error(BLOCKED_MESSAGE);
    }
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

    try {
      const { sendVisitorRegistrationNotification } = await import("./email.server");
      await sendVisitorRegistrationNotification({
        fullName: data.full_name,
        contactNumber: data.contact_number,
        schoolCollegeName: data.school_college_name,
        standard: data.standard,
        division: data.division,
        addressLine1: data.address_line_1,
        addressLine2: data.address_line_2,
        addressLine3: data.address_line_3,
        addressLine4: data.address_line_4,
        fatherName: data.father_name,
        fatherMobile: data.father_mobile,
        motherName: data.mother_name,
        motherMobile: data.mother_mobile,
      });
    } catch (e) {
      console.warn("Visitor notification email skipped:", (e as Error).message);
    }

    return { ok: true, id: inserted.id };
  });
