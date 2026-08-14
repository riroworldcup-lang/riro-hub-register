import { getRequest } from "@tanstack/react-start/server";

export const ADMIN_NOTIFICATION_EMAIL = "info@riroworldcup.in";
export const CONTACT_EMAIL = "info@riroworldcup.in";
export const ALT_CONTACT_EMAIL = "Nikhil.jadhav@riroworldcup.in";

interface SendOpts {
  templateName: "registration-confirmation" | "visitor-registration";
  recipientEmail: string;
  idempotencyKey: string;
  templateData: Record<string, string | number | undefined | null>;
}

export async function sendTransactionalEmail(opts: SendOpts) {
  const request = getRequest();
  if (!request) {
    throw new Error("sendTransactionalEmail must be called within a server request");
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing authenticated request context");
  }

  const url = new URL("/lovable/email/transactional/send", request.url);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify({
      templateName: opts.templateName,
      recipientEmail: opts.recipientEmail,
      idempotencyKey: opts.idempotencyKey,
      templateData: opts.templateData,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "unknown error");
    throw new Error(`Email send failed: ${res.status} ${body}`);
  }

  return res.json();
}

export async function sendConfirmationEmail(opts: {
  to: string;
  name: string;
  competition: string;
  registrationNumber?: string;
  teamName?: string;
  teamSize?: string;
}) {
  return sendTransactionalEmail({
    templateName: "registration-confirmation",
    recipientEmail: opts.to,
    idempotencyKey: `riro-reg-${opts.registrationNumber || opts.to}-${Date.now()}`,
    templateData: {
      name: opts.name,
      competition: opts.competition,
      registrationNumber: opts.registrationNumber ?? "",
      teamName: opts.teamName ?? "",
      teamSize: opts.teamSize ?? "",
    },
  });
}

export async function sendVisitorRegistrationNotification(opts: {
  fullName: string;
  contactNumber: string;
  schoolCollegeName?: string | null;
  standard?: string | null;
  division?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  fatherName?: string | null;
  fatherMobile?: string | null;
  motherName?: string | null;
  motherMobile?: string | null;
}) {
  return sendTransactionalEmail({
    templateName: "visitor-registration",
    recipientEmail: ADMIN_NOTIFICATION_EMAIL,
    idempotencyKey: `riro-visitor-${opts.contactNumber}-${Date.now()}`,
    templateData: {
      fullName: opts.fullName,
      contactNumber: opts.contactNumber,
      schoolCollegeName: opts.schoolCollegeName ?? "",
      standard: opts.standard ?? "",
      division: opts.division ?? "",
      addressLine1: opts.addressLine1 ?? "",
      addressLine2: opts.addressLine2 ?? "",
      addressLine3: opts.addressLine3 ?? "",
      addressLine4: opts.addressLine4 ?? "",
      fatherName: opts.fatherName ?? "",
      fatherMobile: opts.fatherMobile ?? "",
      motherName: opts.motherName ?? "",
      motherMobile: opts.motherMobile ?? "",
    },
  });
}
