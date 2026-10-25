# SECURITY — Meridian Immigration Group

Privacy here is a safety feature: a leak can put a family in danger. Collect the minimum, keep it briefly, and
route every outside request through the managing attorney.

## Reporting a vulnerability
Email TODO_EMAIL with the subject "Security". Do not include client data. We acknowledge within 2 business days.

## Baseline controls
- No sensitive fields anywhere: no A-number, SSN, immigration status, passport, or criminal-history narrative.
- Supabase RLS on every table. The `anon` role never has SELECT. Inserts go through scoped RPCs. The service-role
  key exists only in `server-only` modules and Vercel server env vars, never with a `NEXT_PUBLIC_` prefix.
- Cookies: only `NEXT_LOCALE`. Analytics: Vercel Web Analytics (cookieless). No ad or third-party trackers.
- Sentry: PII scrubbing on, request bodies never sent, `sendDefaultPii: false`.
- Headers: HSTS, nosniff, `X-Frame-Options: DENY`, strict Permissions-Policy (CSP in Phase 6).
- Error pages never show stack traces or internal identifiers.
- Retention (Vercel Cron, Phase 3+): unconverted intakes 90 days, referral uploads 30 days, reminders 7 days after
  the appointment. Each purge writes an audit-log row.

## Breach-response checklist
1. **Contain** (first hour): rotate the exposed keys (see below). Disable the affected route or feature flag. Turn on
   Vercel Attack Challenge Mode if traffic is hostile.
2. **Notify Attorney Mark Lawton immediately.** He directs every next step and all client communication.
3. **Preserve evidence:** export Vercel, Supabase, and Sentry logs and the audit log to restricted storage. Don't delete anything.
4. **Assess scope:** which tables or files, which people, what time window. Use the audit log and Supabase logs.
5. **Legal duties:** Massachusetts G.L. c. 93H requires notice to affected residents, the Attorney General, and
   OCABR "as soon as practicable and without unreasonable delay". The attorney also reviews ethics obligations
   (RPC 1.4, 1.6) toward clients.
6. **Notify** affected people in their own language, in plain words, with what happened and what to do.
7. **Remediate and review:** root cause, fix, regression test, update this file. Post-incident review within 14 days.

## Legal-process response procedure
Covers subpoenas, warrants, ICE/DHS or other government requests, preservation letters, and informal "can you tell
us..." calls or emails.
1. **Do not respond, confirm, or deny anything.** Staff and contractors (including developers and vendors) say only:
   "All requests go to our managing attorney," and forward the request.
2. **Route to Attorney Mark Lawton first**, the same business day.
3. **Log every request** in `legal_process_requests` (received time, agency, form of request, routed time, outcome),
   even if it is withdrawn or informal.
4. The attorney evaluates validity, scope, privilege (RPC 1.6), and notice to the client. Nothing is produced
   without his written approval.
5. Vendors (Vercel, Supabase, Stripe, Resend, Twilio, Sentry): keep their transparency and notice policies on file and
   review them yearly.

## Key-rotation steps
Rotate on any suspected exposure, when someone with access leaves, and at least yearly.
| Secret | Where | How |
|---|---|---|
| Supabase service-role / JWT secret | Supabase → Settings → API | Roll the JWT secret. Update `SUPABASE_SERVICE_ROLE_KEY` and the anon key in Vercel. Redeploy. |
| Stripe secret + webhook secret | Stripe Dashboard → Developers | Roll the key with a short expiry on the old one. Add a new webhook endpoint secret. Update Vercel. Redeploy. |
| Resend API key | Resend → API Keys | Create the new key, update Vercel, redeploy, delete the old key. |
| Twilio auth token | Twilio Console | Promote the secondary token, update Vercel, redeploy, then delete the old token. |
| Turnstile secret | Cloudflare → Turnstile | Rotate the secret, update Vercel, redeploy. |
| `CRON_SECRET` | Vercel env | Generate 32+ random bytes, update, redeploy. |
| Sentry DSN | Sentry project settings | Revoke the key and create a new one (the DSN is low-risk but rate-abusable). |
After every rotation, confirm in Vercel → Deployments that the new deployment is live, and log the rotation in the audit log.

## Dependency-update policy
- Lockfile committed. `pnpm install --frozen-lockfile` in CI.
- Security advisories: patch within 7 days (critical/high within 48 hours) using `pnpm audit`.
- Routine updates monthly, one PR at a time, and only after the full phase gate passes.
- New dependencies need a DECISIONS.md entry (purpose, size, maintenance health, license).
- Pin exact versions for framework packages (next, react, next-intl, @playwright/test).
