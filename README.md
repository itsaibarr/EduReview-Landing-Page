# EduReview landing page

EduReview is a pitch for a student engagement layer for schools in Central Asia, one that reads records a school already has (attendance, submission timing, grade trends) and scores engagement, so students see their effort and institutions spot disengagement before grades drop. The site is that pitch in English, Russian, and Kazakh, with a student waitlist form and an institution pilot form that write to Supabase and send confirmation emails through Resend.

Status: one-off from February 2026, built over two days, live but not maintained. The sibling repo itsaibarr/edu-landing is a Laravel scaffold started the same morning and dropped. This Next.js repo is the one that shipped.
Live: https://www.sharedureview.site/

## Run

```
npm install
npm run dev
```

Opens on http://localhost:3000 and redirects to /en. The two forms need four env vars in `.env.local` (there is no `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
```

Supabase needs two tables, `waitlist_students` and `pilot_institutions`. The SQL is in `docs/plans/2026-02-24-supabase-email-backend-implementation.md`. Without the env vars the site renders but form submits fail.

## Layout

- `src/app/[locale]/` page, privacy, terms. `src/app/api/` the two form handlers (waitlist, pilot).
- `src/components/sections/` one file per landing section, split into student and institution variants.
- `messages/` en, ru, kk strings via next-intl.
- `context/` the product brief and reference screenshots the site was built from. `docs/` brand book and per-feature plans.
- `.agent/` a generic AI-agent toolkit copied in during development. Not part of the site.
