# SolutionInstitution Demo v2 — Design Document

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create the implementation plan from this design.

**Goal:** Upgrade the existing interactive demo dashboard from a sparse single-panel layout to a production-density two-column app shell. Keep all existing animation logic. No new files, no new dependencies.

**Reference:** The Midline product screenshot — key patterns: workspace header in sidebar, many nav items (active + greyed), interior content header bar with breadcrumb + user avatar, dense panels with no wasted whitespace, bottom fade-out on the window body.

---

## 1. Window Chrome & Dimensions

**Min-height:** `min-h-[540px]` on the sidebar+content body div (up from implicit ~360px).

**Bottom fade:** A `pointer-events-none` absolutely-positioned overlay div at the bottom of the window body. Height `h-24`. Background `bg-gradient-to-t from-white to-transparent`. Stacks above content via `z-10`. Creates the "content extends below" illusion from the reference photo. The window has no hard bottom border visible — it dissolves.

**Chrome bar:** No change — 3 traffic-light dots + `edureview.app/dashboard` centered URL. Already correct.

---

## 2. Sidebar Upgrade

**Width:** 200px (up from 176px).

**Workspace header** (new, pinned to top of sidebar):
- Small square icon: 22×22px, `rounded-md`, `bg-brand`, white `"E"` letter in bold ~11px
- Right of icon: `"EduReview"` in `text-label font-bold text-text-primary`, `"Admin"` in `text-[10px] text-text-muted` below
- Far-right: `ChevronDown` icon 14px `text-text-muted` (decorative/static)
- Below header: thin `border-b border-border` divider + `mb-2` spacing

**Nav structure — 9 items total, two groups:**

Group 1 label: `"ANALYTICS"` — 10px uppercase muted, `mb-1`
- Overview (BarChart2 icon) — active/clickable
- Engagement (Activity icon) — clickable
- Growth (TrendingUp icon) — clickable

Group 2 label: `"MANAGE"` — same style, `mt-3 mb-1`
- Classes (BookOpen icon) — `opacity-40`, non-interactive
- Students (Users icon) — `opacity-40`, non-interactive
- Assignments (ClipboardList icon) — `opacity-40`, non-interactive
- Reports (FileText icon) — `opacity-40`, non-interactive
- Analytics (PieChart icon) — `opacity-40`, non-interactive
- Settings (Settings icon) — `opacity-40`, non-interactive

Active state: `bg-brand-50 text-brand font-semibold`. Inactive: `text-text-secondary hover:bg-surface`.

---

## 3. Interior Content Header Bar

A new static row inserted between the chrome bar and the sidebar+content split. Full-width, `bg-white border-b border-border`, height `h-11` (44px).

**Left side:** Breadcrumb — `"CS-401 · Algorithms"` in `text-label font-semibold text-text-primary`, then `"/"` in `text-text-muted mx-2`, then `"Week 7 Dashboard"` in `text-label text-text-muted`.

**Right side (flex gap-3 items-center):**
- Semester badge: `"Spring 2026"` — `text-[10px] font-semibold bg-surface border border-border rounded-full px-2.5 py-0.5 text-text-muted`
- User avatar: 26×26px circle, `bg-brand-50`, `"AD"` in `text-[9px] font-bold text-brand`

This bar is identical across all three tab states — no animation needed.

---

## 4. Panel Density Upgrades

### OverviewPanel

**Stats row:** 6 tiles in a `grid-cols-3 grid-rows-2` or `grid-cols-6` single row. New additions:
- Tile 5: `"Avg. Assignment"` → animated counter `74` → `text-[10px] text-text-muted ↑ +2 pts`
- Tile 6: `"Completion Rate"` → animated counter `88%` → `text-[10px] text-success ↑ +3%`

Existing 4 tiles stay unchanged.

**7-day bar chart:** No change.

**Student table:** Add a `"Last Active"` column (4th column). Values: `"2m ago"`, `"1h ago"`, `"Just now"`, `"3d ago"`, `"45m ago"`. Grid becomes `grid-cols-[1fr_2.5rem_3rem_5.5rem_4rem]`.

**Recent Activity feed (new, below table):**
- Section label: `"Recent Activity"` — 10px uppercase muted, `mt-2 mb-1.5`
- 3 rows, each: small dot `w-1.5 h-1.5 rounded-full bg-brand` + activity text `text-[10px] text-text-secondary` + timestamp `text-[10px] text-text-muted ml-auto`
  - `"Fatima N. submitted Assignment 7"` · `"2m ago"`
  - `"Asel J. completed Quiz 3"` · `"18m ago"`
  - `"Bogdan P. missed session"` · `"1h ago"` (dot: `bg-warning`)

### EngagementPanel

**Stat chips:** 4 chips in `grid-cols-2 grid-rows-2 gap-2` (add `"Avg. Session"` → `"34 min"` and `"Repeat Visits"` → `"78%"`). Existing 2 chips stay.

**Attendance bar chart:** Height `h-28` (up from `h-20`). Add percentage value labels above each bar (`text-[9px] font-semibold text-text-muted`). No other changes.

**Flagged students:** Expand from 3 rows to 5. Add:
- `{ initials: 'ML', name: 'Mila L.', since: '1d ago', attend: 71 }`
- `{ initials: 'TN', name: 'Timur N.', since: '4d ago', attend: 58 }`

**Warning banner:** No change.

### GrowthPanel

**Line chart:** No change (already good).

**Stat chips:** 3 chips in `grid-cols-3` (add `"Top Performer"` → `"Fatima N."` with `text-brand`). Existing 2 chips stay.

**Weekly breakdown table:** No change (already 7 rows).

**Top 3 Students mini-list (new, below breakdown):**
- Section label: `"Top Performers"` — 10px uppercase muted, `mt-2 mb-1.5`
- 3 rows: rank number (`text-[10px] font-bold text-text-muted w-4`) + avatar circle (22px) + name `text-label text-text-primary flex-1` + score `text-label font-bold text-brand`
  - `1. FN · Fatima N. · 91`
  - `2. AJ · Asel J. · 84`
  - `3. ZS · Zara S. · 74`

---

## 5. Tab Transition Upgrade

`AnimatePresence mode="wait"` — no change.

Motion values:
- `initial`: `{ opacity: 0, x: 20 }`
- `animate`: `{ opacity: 1, x: 0 }`
- `exit`: `{ opacity: 0, x: -20 }`
- `transition`: `{ duration: 0.25, ease: EASE }`

Duration tightened from 0.3 → 0.25 for snappiness. Slide distance increased from 12 → 20 for decisiveness.

---

## 6. New Lucide Icons Required

Add to existing import: `BookOpen, Users, ClipboardList, FileText, PieChart, Settings, ChevronDown`

All from `lucide-react` — already a project dependency.

---

## Files Changed

| File | Change |
|---|---|
| `src/components/sections/SolutionInstitution.tsx` | All changes — no other files |

No new files. No new dependencies. All translation keys remain valid.
