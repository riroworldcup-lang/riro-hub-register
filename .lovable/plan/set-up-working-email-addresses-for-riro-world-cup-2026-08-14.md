# Set up working email addresses for RIRO WORLD CUP

Set up `info@riroworldcup.in` as the official sender address for app emails, and surface both `info@riroworldcup.in` and `Nikhil.jadhav@riroworldcup.in` as contact/reply-to addresses on the site.

## What this will do

1. **Configure the email sender domain** `riroworldcup.in` through the Lovable email setup flow. This requires the user to add NS delegation records at the domain registrar.
2. **Provision email infrastructure** (`pgmq` queues, send log, suppression handling, queue processor) once the domain is active.
3. **Scaffold transactional email server routes and templates** so the app can send branded emails.
4. **Create a registration confirmation email template** and register it in the template registry.
5. **Replace the `email.server.ts` stub** with a real send helper that calls `/lovable/email/transactional/send` using the service role, sending participant confirmations from `info@riroworldcup.in`.
6. **Add visitor registration admin notification** so a new visitor registration also sends a notice to `info@riroworldcup.in` (or `Nikhil.jadhav@riroworldcup.in` as configured).
7. **Update site contact details** to display `info@riroworldcup.in` and `Nikhil.jadhav@riroworldcup.in` on the Contact page and in the footer where relevant.
8. **Verify end-to-end** by submitting a registration and confirming the email reaches the queue/send log.

## Prerequisites handled by the user first

- Own the domain `riroworldcup.in`.
- Add the NS delegation records shown in the email setup dialog at the domain registrar.
- Wait for DNS propagation so the domain status becomes active.

## Technical notes

- Lovable delegates a subdomain (e.g., `notify.riroworldcup.in`) for email sending. The visible From address can be configured as `info@riroworldcup.in` when `display_from_root` is enabled.
- All transactional emails will be queued through `pgmq` and processed by the `/lovable/email/queue/process` route.
- Suppression/bounce handling is automatic; we will not bypass it.
- No marketing emails will be added; only action-triggered registration confirmations and admin notifications.
