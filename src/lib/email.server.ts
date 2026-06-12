// Best-effort confirmation email via Lovable Emails app-email send route.
// If the email infrastructure is not yet configured, this throws and the
// caller swallows the error so registration still succeeds.

export async function sendConfirmationEmail(opts: {
  to: string;
  name: string;
  competition: string;
}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  if (!supabaseUrl) throw new Error("SUPABASE_URL missing");

  // For now, just log. Email infrastructure will be wired once the user
  // sets up their email domain via the dashboard.
  console.log("[email] would send confirmation to", opts.to, opts);
}
