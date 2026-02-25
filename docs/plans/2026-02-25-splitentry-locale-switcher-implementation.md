# SplitEntry Locale Name Switcher Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a full-locale-name language switcher (`English · Русский · Қазақша`) below the role-choice cards on the SplitEntry screen.

**Architecture:** New `LocaleNameSwitcher` client component reuses the same `next-intl` routing logic as the existing `LanguageSwitcher`. It renders as plain centered text with no container. Rendered inside `SplitEntry.tsx` below the cards div.

**Tech Stack:** Next.js 15 App Router, `next-intl` v4, Framer Motion, TailwindCSS

---

### Task 1: Create `LocaleNameSwitcher` component

**Files:**
- Create: `src/components/ui/LocaleNameSwitcher.tsx`

**Step 1: Create the file**

```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'kk', label: 'Қазақша' },
];

export function LocaleNameSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      const search = searchParams.toString();
      const target = search ? `${pathname}?${search}` : pathname;
      router.replace(target, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center justify-center gap-2" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l.code} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-text-muted/40 select-none" aria-hidden>·</span>
          )}
          <button
            onClick={() => handleLocaleChange(l.code)}
            disabled={isPending || locale === l.code}
            className={`
              text-[13px] transition-colors duration-150 select-none
              ${locale === l.code
                ? 'font-semibold text-text-primary cursor-default'
                : 'font-normal text-text-muted hover:text-text-secondary'
              }
            `}
            aria-pressed={locale === l.code}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
```

**Step 2: Verify the file was created without syntax errors**

Run: `npx tsc --noEmit`
Expected: No errors (or only pre-existing errors unrelated to this file)

---

### Task 2: Add `LocaleNameSwitcher` to `SplitEntry`

**Files:**
- Modify: `src/components/sections/SplitEntry.tsx`

**Step 1: Add import at top of file (after existing imports)**

Add this line after the last import:
```tsx
import { LocaleNameSwitcher } from '@/components/ui/LocaleNameSwitcher'
```

**Step 2: Add the component after the closing `</div>` of the cards row**

The cards are inside:
```tsx
<div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
  {PATHS.map(...)}
</div>
```

After that closing `</div>`, add:
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.45, delay: 0.32, ease: EASE }}
  className="mt-8"
>
  <LocaleNameSwitcher />
</motion.div>
```

**Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add src/components/ui/LocaleNameSwitcher.tsx src/components/sections/SplitEntry.tsx
git commit -m "feat: add locale name switcher to SplitEntry screen"
```

---

### Task 3: Visual verification

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Open the SplitEntry screen**

Navigate to `http://localhost:3000/` (no role param). You should see:
- Two role cards
- Below them: `English · Русский · Қазақша` in small muted text
- Active locale bold/dark, others muted
- Text fades up after the cards

**Step 3: Test locale switching**

Click `Русский` — page should reload in Russian, `Русский` becomes bold.
Click `Қазақша` — page should reload in Kazakh, `Қазақша` becomes bold.
Click `English` — page should reload in English.

**Step 4: Verify footer switcher is unchanged**

Choose a role (click either card). Scroll to footer. The pill `EN | RU | KK` switcher should still be present and functional.

**Step 5: Verify animation**

Hard-reload the page. The locale names should animate in last (after the cards).

---
