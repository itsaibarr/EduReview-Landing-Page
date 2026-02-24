# Supabase + Resend Backend Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wire both CTA forms to a real Supabase database and send confirmation + admin emails via Resend.

**Architecture:** Two Next.js API routes (`/api/waitlist`, `/api/pilot`) receive form POSTs, insert rows into Supabase using the service role key (server-side only), then fire two emails each via Resend — one confirmation to the submitter, one admin notification to `hello@sharedureview.site`.

**Tech Stack:** Next.js 16 App Router, Supabase JS v2, Resend SDK, TypeScript

---

## Prerequisites (manual steps before coding)

These require browser actions — do them before starting tasks.

1. **Create Supabase project** at https://supabase.com → new project → note the Project URL and service role key (Settings → API)
2. **Create Resend account** at https://resend.com → create API key → verify the sending domain `sharedureview.site` (Domains tab)
3. **Create `.env.local`** in project root:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   RESEND_API_KEY=re_xxxx
   RESEND_FROM_EMAIL=noreply@sharedureview.site
   ```
4. **Add same vars to Vercel** dashboard (Project → Settings → Environment Variables)

---

## Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm)

**Step 1: Install both packages**

```bash
npm install @supabase/supabase-js resend
```

Expected output: added 2 packages, no vulnerabilities.

**Step 2: Verify they appear in package.json**

```bash
grep -E "supabase|resend" package.json
```

Expected:
```
"@supabase/supabase-js": "^2.x.x",
"resend": "^4.x.x",
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install @supabase/supabase-js and resend"
```

---

## Task 2: Create Supabase tables

**Where:** Supabase dashboard → SQL Editor (or Table Editor)

Run this SQL in the Supabase SQL Editor:

```sql
-- Student waitlist
create table waitlist_students (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  school      text not null,
  frustration text,
  locale      text not null,
  created_at  timestamptz not null default now()
);

-- Institution pilot applications
create table pilot_institutions (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  institution text not null,
  email       text not null unique,
  challenge   text,
  locale      text not null,
  created_at  timestamptz not null default now()
);
```

**Step 2: Verify tables exist**

In Supabase dashboard → Table Editor, you should see both `waitlist_students` and `pilot_institutions`.

**No commit needed** — this is a database change, not a code change.

---

## Task 3: Create server-side Supabase client

**Files:**
- Create: `src/lib/supabase.ts`

**Step 1: Create the file**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// This client uses the service role key — only import in server-side code (API routes).
// Never import this in components or client code.
export const supabase = createClient(supabaseUrl, supabaseServiceKey)
```

**Step 2: Verify the file exists and TypeScript is happy**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/supabase.ts
git commit -m "feat: add server-side Supabase client"
```

---

## Task 4: Create Resend email helper

**Files:**
- Create: `src/lib/resend.ts`

**Step 1: Create the file**

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

const FROM = process.env.RESEND_FROM_EMAIL!
const ADMIN = 'hello@sharedureview.site'

export async function sendWaitlistEmails({
  name,
  email,
  school,
  locale,
}: {
  name: string
  email: string
  school: string
  locale: string
}) {
  await Promise.all([
    // Confirmation to student
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "You're on the EduReview waitlist",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for joining the EduReview waitlist! We're building something we think you'll love.</p>
        <p>We'll keep you updated as we grow — and we promise we will never spam you.</p>
        <p>— The EduReview Team</p>
      `,
    }),
    // Admin notification
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: 'New waitlist signup',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>School:</strong> ${school}</p>
        <p><strong>Locale:</strong> ${locale}</p>
      `,
    }),
  ])
}

export async function sendPilotEmails({
  name,
  email,
  role,
  institution,
  locale,
}: {
  name: string
  email: string
  role: string
  institution: string
  locale: string
}) {
  await Promise.all([
    // Confirmation to institution contact
    resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your EduReview pilot application',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for applying to the EduReview pilot programme. We've received your application.</p>
        <p>We'll review it and reach out within 48 hours.</p>
        <p>— The EduReview Team</p>
      `,
    }),
    // Admin notification
    resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: 'New pilot application',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Institution:</strong> ${institution}</p>
        <p><strong>Locale:</strong> ${locale}</p>
      `,
    }),
  ])
}
```

**Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/lib/resend.ts
git commit -m "feat: add Resend email helpers for waitlist and pilot"
```

---

## Task 5: Create `/api/waitlist` route

**Files:**
- Create: `src/app/api/waitlist/route.ts`

**Step 1: Create the file**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWaitlistEmails } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, school, frustration, locale } = body

  if (!name || !email || !school || !locale) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    )
  }

  const { error: dbError } = await supabase
    .from('waitlist_students')
    .insert({ name, email, school, frustration: frustration ?? null, locale })

  if (dbError) {
    if (dbError.code === '23505') {
      // unique_violation — email already exists
      return NextResponse.json(
        { error: 'duplicate' },
        { status: 409 }
      )
    }
    console.error('[/api/waitlist] DB error:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  try {
    await sendWaitlistEmails({ name, email, school, locale })
  } catch (emailError) {
    // Don't fail the request if email fails — data is already saved
    console.error('[/api/waitlist] Email error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
```

**Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/app/api/waitlist/route.ts
git commit -m "feat: add POST /api/waitlist route"
```

---

## Task 6: Create `/api/pilot` route

**Files:**
- Create: `src/app/api/pilot/route.ts`

**Step 1: Create the file**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendPilotEmails } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, role, institution, email, challenge, locale } = body

  if (!name || !role || !institution || !email || !locale) {
    return NextResponse.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    )
  }

  const { error: dbError } = await supabase
    .from('pilot_institutions')
    .insert({ name, role, institution, email, challenge: challenge ?? null, locale })

  if (dbError) {
    if (dbError.code === '23505') {
      return NextResponse.json(
        { error: 'duplicate' },
        { status: 409 }
      )
    }
    console.error('[/api/pilot] DB error:', dbError)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }

  try {
    await sendPilotEmails({ name, email, role, institution, locale })
  } catch (emailError) {
    console.error('[/api/pilot] Email error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
```

**Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/app/api/pilot/route.ts
git commit -m "feat: add POST /api/pilot route"
```

---

## Task 7: Wire up CTAStudent form

**Files:**
- Modify: `src/components/sections/CTAStudent.tsx`

**Step 1: Replace the component with the wired version**

Replace the entire file content with:

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass = [
  'w-full px-4 py-3 rounded-md border border-border bg-white',
  'text-body text-text-primary placeholder:text-text-muted',
  'transition-all duration-150',
  'focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand',
].join(' ')

export function CTAStudent() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [school, setSchool] = useState('')
  const [frustration, setFrustration] = useState('')
  const t = useTranslations('CTAStudent')
  const locale = useLocale()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, school, frustration, locale }),
      })

      if (res.ok) {
        setStatus('success')
        return
      }

      const data = await res.json()
      if (res.status === 409) {
        setErrorMsg("You're already on the list.")
      } else {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      }
      setStatus('error')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="waitlist-cta" className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[600px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center"
        >
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
            {t('headline.line1')}
            <br />
            <span className="text-brand">{t('headline.highlight')}</span>
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary leading-relaxed max-w-[420px] mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 p-8 rounded-2xl border border-border bg-white shadow-sm"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 size={28} className="text-brand" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-h3 font-semibold text-text-primary">{t('success.title')}</p>
                <p className="mt-2 text-body text-text-secondary">
                  {t('success.body')}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">{t('form.name.label')}</label>
                  <input
                    required
                    className={inputClass}
                    placeholder={t('form.name.placeholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">{t('form.email.label')}</label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder={t('form.email.placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">{t('form.school.label')}</label>
                <input
                  required
                  className={inputClass}
                  placeholder={t('form.school.placeholder')}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">
                  {t('form.question.label')}{' '}
                  <span className="text-text-muted font-normal">{t('form.question.optional')}</span>
                </label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder={t('form.question.placeholder')}
                  value={frustration}
                  onChange={(e) => setFrustration(e.target.value)}
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-brand text-white! font-semibold text-[15px] [box-shadow:0_4px_0_0_#1D4ED8] hover:translate-y-0.5 hover:[box-shadow:0_2px_0_0_#1D4ED8] active:translate-y-1 active:[box-shadow:0_0px_0_0_#1D4ED8] transition-all duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:[box-shadow:0_4px_0_0_#1D4ED8]"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>{t('form.submit')} <ArrowRight size={16} /></>
                )}
              </button>

              <p className="text-caption text-text-muted text-center">
                {t('form.privacy')}
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
```

**Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/components/sections/CTAStudent.tsx
git commit -m "feat: wire CTAStudent form to /api/waitlist"
```

---

## Task 8: Wire up CTAInstitution form

**Files:**
- Modify: `src/components/sections/CTAInstitution.tsx`

**Step 1: Replace the entire file content with:**

```typescript
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass = [
  'w-full px-4 py-3 rounded-md border border-border bg-white',
  'text-body text-text-primary placeholder:text-text-muted',
  'transition-all duration-150',
  'focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand',
].join(' ')

export function CTAInstitution() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [institution, setInstitution] = useState('')
  const [email, setEmail] = useState('')
  const [challenge, setChallenge] = useState('')
  const t = useTranslations('CTAInstitution')
  const locale = useLocale()
  const roleOptions = t.raw('form.role.options') as string[]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg(null)

    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, institution, email, challenge, locale }),
      })

      if (res.ok) {
        setStatus('success')
        return
      }

      const data = await res.json()
      if (res.status === 409) {
        setErrorMsg("You've already applied.")
      } else {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
      }
      setStatus('error')
    } catch {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="pilot-cta" className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[700px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center"
        >
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            {t('eyebrow')}
          </p>
          <h2 className="mt-4 text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
            {t('headline.line1')}<span className="text-brand">{t('headline.highlight')}</span>
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary leading-relaxed max-w-[480px] mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 p-8 rounded-2xl border border-border bg-white shadow-sm"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 size={28} className="text-brand" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-h3 font-semibold text-text-primary">{t('success.title')}</p>
                <p className="mt-2 text-body text-text-secondary">
                  {t('success.body')}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">{t('form.name.label')}</label>
                  <input
                    required
                    className={inputClass}
                    placeholder={t('form.name.placeholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">{t('form.role.label')}</label>
                  <select
                    required
                    className={inputClass}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">{t('form.role.placeholder')}</option>
                    {roleOptions.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">{t('form.institution.label')}</label>
                <input
                  required
                  className={inputClass}
                  placeholder={t('form.institution.placeholder')}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">{t('form.email.label')}</label>
                <input
                  required
                  type="email"
                  className={inputClass}
                  placeholder={t('form.email.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">
                  {t('form.question.label')}{' '}
                  <span className="text-text-muted font-normal">{t('form.question.optional')}</span>
                </label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder={t('form.question.placeholder')}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-500 text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-brand text-white! font-semibold text-[15px] [box-shadow:0_4px_0_0_#1D4ED8] hover:translate-y-0.5 hover:[box-shadow:0_2px_0_0_#1D4ED8] active:translate-y-1 active:[box-shadow:0_0px_0_0_#1D4ED8] transition-all duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:[box-shadow:0_4px_0_0_#1D4ED8]"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>{t('form.submit')} <ArrowRight size={16} /></>
                )}
              </button>

              <p className="text-caption text-text-muted text-center">
                {t('form.disclaimer')}
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
```

**Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

**Step 3: Commit**

```bash
git add src/components/sections/CTAInstitution.tsx
git commit -m "feat: wire CTAInstitution form to /api/pilot"
```

---

## Task 9: Build verification

**Step 1: Run a production build locally**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no errors. Two new API routes should appear in the output:
```
Route (app)
├ /api/pilot
└ /api/waitlist
```

**Step 2: If build passes, push**

```bash
git push
```

---

## Task 10: Manual smoke test (after deploy)

After Vercel deploys:

1. Open the student page (`/?role=student`), scroll to waitlist form
2. Submit with a real email address you control
3. Verify: success state shows in the browser
4. Verify: confirmation email arrives in your inbox
5. Verify: admin notification arrives at `hello@sharedureview.site`
6. Verify: row appears in Supabase → Table Editor → `waitlist_students`
7. Repeat for institution form (`/?role=institution`) → `pilot_institutions` table

8. Test duplicate prevention: submit the same email again → should show "You're already on the list."
