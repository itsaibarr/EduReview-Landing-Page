# Design: SplitEntry Locale Name Switcher

**Date:** 2026-02-25
**Scope:** Add a language switcher to the SplitEntry (role-chooser) screen using full locale names styled as plain text — distinct from the existing footer pill switcher.

---

## Context

The existing `LanguageSwitcher` component (pill-style `EN | RU | KK`) lives only in the Footer. New visitors landing on the SplitEntry screen have no way to switch language until they scroll to the footer — or choose a role first.

The SplitEntry design philosophy is "the clarity IS the design" — full-screen white, two choice cards, no decoration. Any new element must respect this constraint.

---

## Design Decision

**Option chosen:** Full locale names below the cards, as plain centered text. No container, no border, no background.

Rejected alternatives:
- Ghost text links (top-right corner) — too hidden, poor discoverability
- Segmented bordered tabs (top-right corner) — more visual weight than needed

---

## Visual Specification

**Placement:** Centered, below the two role-choice cards. `mt-8` top margin.

**Content:** `English · Русский · Қазақша`

**Typography:**
- Font size: `text-[13px]`
- Active locale: `font-semibold text-text-primary`
- Inactive locales: `text-text-muted`, hover → `text-text-secondary`
- Separator `·`: `text-text-muted/40`, non-interactive `aria-hidden`

**Animation:** Fade-up with the rest of the SplitEntry stagger. Delay `~0.32s` after the cards — enters last, quietly.

**No container. No border. No background.** Pure text row.

---

## Implementation Notes

- New component: `LocaleNameSwitcher` in `/src/components/ui/`
- Reuses existing routing logic from `LanguageSwitcher` (`useLocale`, `useRouter`, `usePathname`, `useSearchParams`, `useTransition`)
- Rendered inside `SplitEntry.tsx`, below the cards `div`
- The existing footer `LanguageSwitcher` is untouched

---

## What Changes

| File | Change |
|------|--------|
| `/src/components/ui/LocaleNameSwitcher.tsx` | New component |
| `/src/components/sections/SplitEntry.tsx` | Import + render `<LocaleNameSwitcher />` below cards |

No translation file changes needed — locale names are hardcoded (they are proper nouns).
