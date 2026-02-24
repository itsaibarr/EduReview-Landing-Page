# Supabase + Resend Backend Design

**Date:** 2026-02-24
**Scope:** Wire both CTA forms to a real backend — Supabase for storage, Resend for email.

---

## Problem

Both `CTAStudent` and `CTAInstitution` forms currently discard all submitted data via a fake `setTimeout`. No API routes exist. No data is saved anywhere.

---

## Approach

Next.js API routes (Option A). Two `POST` endpoints in the existing Next.js app. Each route inserts into Supabase and fires two emails via Resend. No extra infrastructure.

---

## Database (Supabase)

### `waitlist_students`
| column | type | constraints |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `name` | `text` | not null |
| `email` | `text` | not null, unique |
| `school` | `text` | not null |
| `frustration` | `text` | nullable |
| `locale` | `text` | not null |
| `created_at` | `timestamptz` | default `now()` |

### `pilot_institutions`
| column | type | constraints |
|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` |
| `name` | `text` | not null |
| `role` | `text` | not null |
| `institution` | `text` | not null |
| `email` | `text` | not null, unique |
| `challenge` | `text` | nullable |
| `locale` | `text` | not null |
| `created_at` | `timestamptz` | default `now()` |

---

## API Routes

### `POST /api/waitlist`
**Body:** `{ name, email, school, frustration?, locale }`

1. Validate required fields → `400` if missing
2. Insert into `waitlist_students` → `409` if email already exists
3. Send confirmation email to submitter
4. Send admin notification to `hello@sharedureview.site`
5. Return `200`

### `POST /api/pilot`
**Body:** `{ name, role, institution, email, challenge?, locale }`

1. Validate required fields → `400` if missing
2. Insert into `pilot_institutions` → `409` if email already exists
3. Send confirmation email to submitter
4. Send admin notification to `hello@sharedureview.site`
5. Return `200`

---

## Email Flows

### Student confirmation (to submitter)
- **Subject:** You're on the EduReview waitlist
- **Body:** Thank you, we'll keep you updated on progress, we promise no spam

### Institution confirmation (to submitter)
- **Subject:** Your EduReview pilot application
- **Body:** Thank you, we'll review and reach out within 48 hours

### Admin notification (both forms → `hello@sharedureview.site`)
- **Subject:** `New waitlist signup` / `New pilot application`
- **Body:** All submitted fields + locale + timestamp

---

## Error Handling

| Code | Cause | User-facing message |
|---|---|---|
| `400` | Missing required fields | "Please fill in all required fields." |
| `409` | Email already submitted | "You're already on the list." |
| `500` | DB or email failure | "Something went wrong — please try again." |

Forms gain an `'error'` state to display these messages inline.

---

## Frontend Changes

Both `CTAStudent` and `CTAInstitution`:
- Add controlled state for each field
- Add `error: string | null` state
- Replace `setTimeout` with `fetch()` to the API route
- Pass `locale` from `useLocale()` in the request body

---

## New Files

```
src/app/api/waitlist/route.ts
src/app/api/pilot/route.ts
src/lib/supabase.ts           # server-side Supabase client (service role key)
src/lib/resend.ts             # sendEmail() helper wrapping Resend SDK
```

## Modified Files

```
src/components/sections/CTAStudent.tsx
src/components/sections/CTAInstitution.tsx
```

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=            # e.g. noreply@sharedureview.site
```

Added to `.env.local` (local) and Vercel dashboard (production).

---

## Dependencies

```
@supabase/supabase-js
resend
```
