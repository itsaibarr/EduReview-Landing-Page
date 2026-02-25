# Design Doc — SolutionInstitution Interactive Demo Redesign

**Date:** 2026-02-25
**Section:** `SolutionInstitution` ("How It Works" — institution landing page)
**File:** `src/components/sections/SolutionInstitution.tsx`

---

## Problem

The current section uses a static split layout (text left, `DashboardMockup` right) with hardcoded numbers and no interactivity. The mockup communicates nothing meaningful about how the product works — it could belong to any analytics tool. Users cannot understand the product value without reading the copy.

---

## Goal

Replace the static split layout with a centered section containing a browser-frame interactive demo dashboard. Within 5–7 seconds of seeing the section, a university administrator should understand:

- The platform makes engagement visible
- It surfaces early warnings automatically
- Growth trends become readable over time

---

## Design Decisions

### Layout: Centered, not split

The section header (eyebrow, headline, description) is centered with `max-w-[600px] mx-auto text-center`. The demo window sits below at `max-w-[900px] mx-auto mt-16`. The copy column is removed — the demo speaks for itself.

This matches the feature spec directive: "If users must read long text to understand → demo failed."

### Demo window: browser-frame mockup

A `rounded-xl border border-border shadow-lg bg-white overflow-hidden` container styled as a browser window, with:

- **Chrome bar** (`bg-surface border-b border-border px-4 py-3`): three `bg-black/10` dot circles left, URL slug `edureview.app/dashboard` centered in `text-caption text-text-muted`
- **Body**: sidebar (left, `w-[176px]`) + content area (right, `flex-1`) separated by `border-r border-border`

### Sidebar navigation

Three tabs: Overview, Engagement, Growth. Each rendered as a nav button with a Lucide icon (`BarChart2`, `Activity`, `TrendingUp`, all `size={16} strokeWidth={1.5}`).

- Default state: `text-label text-text-secondary hover:bg-surface rounded-lg px-3 py-2`
- Active state: `bg-brand-50 text-brand font-semibold rounded-lg px-3 py-2`

Clicking a tab sets `activeTab` state and triggers content panel transition.

### State management

```ts
type Tab = 'overview' | 'engagement' | 'growth'
const [activeTab, setActiveTab] = useState<Tab>('overview')
```

`AnimatePresence` wraps the content panel. Panel key = `activeTab`, so every tab switch mounts a fresh panel and re-runs all chart animations.

### Transitions

```ts
// Exit
{ opacity: 0, x: -12 }  duration: 0.2s

// Enter
initial: { opacity: 0, x: 12 }
animate: { opacity: 1, x: 0 }
transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
```

Chart elements inside each panel animate on mount (not on viewport — they are already in view when tab is clicked). This means `whileInView` is NOT used for chart animations; instead use `animate` directly since the panel mounts into a visible container.

---

## The Three Panels

### Panel 1 — Overview (default)

**Content:**
- Header row: "Overview" (`text-h3 font-bold text-text-primary`) + "Week 7 of 12" (`text-caption text-text-muted`)
- Two metric cards side by side (`rounded-lg bg-surface border border-border p-4`):
  - **Class Avg.**: `Users` icon + animated counter → `78`, delta `↑ +4 pts` in `text-success`
  - **Active Students**: animated counter → `24 / 30`, caption "80% participation" in `text-text-muted`
- 7-day bar chart below:
  - 7 bars, values `[42, 58, 53, 67, 71, 74, 78]`, max `80`
  - Heights animate from `0` to final on panel mount, staggered `delay: i * 0.07`
  - Color: opacity ramp `rgba(37,99,235, 0.15 + i/7 * 0.35)`, last bar solid `#2563EB`
  - Day labels M T W T F S S in `text-caption text-text-muted`

**Message:** "See learning momentum at a glance."

### Panel 2 — Engagement

**Content:**
- Header row: "Engagement" + "Live signals"
- 5-bar attendance chart (Mon–Fri), values `[78, 85, 72, 91, 88]`, max `95`:
  - Bars animate upward from `0` on panel mount, staggered
  - Color: solid `bg-brand` at reduced opacity → last bar full `#2563EB`
  - Labels: Mon Tue Wed Thu Fri
- Two stat chips (`rounded-md bg-surface border border-border px-3 py-2 text-label`):
  - "Avg. Attendance **86%**"
  - "On-time Submissions **91%**"
- Early warning row (`rounded-lg border border-warning/30 bg-warning-tint p-3 flex gap-3`):
  - `AlertTriangle size={16} text-warning`
  - "3 students flagged for disengagement" (`text-label font-semibold text-text-primary`)
  - Sub-caption: "Review recommended before next assessment." (`text-caption text-text-secondary`)

**Message:** "Detect engagement patterns early."

### Panel 3 — Growth

**Content:**
- Header row: "Growth" + "7-week view"
- SVG line chart (`w-full h-[120px]`):
  - 7 data points (weeks 1–7), upward trajectory `[38, 45, 51, 58, 63, 71, 78]`
  - Line path animates via `strokeDashoffset` from full length → 0 on mount, duration 1.2s
  - Soft area fill: `rgba(37,99,235,0.06)` under the line path
  - Axis: light horizontal grid lines in `rgba(0,0,0,0.04)`, week labels in `text-caption text-text-muted`
- Two stat chips (same style as Engagement panel):
  - "Cohort Growth **+14%**" — value in `text-brand`
  - "Consistency Score **88**"

**Message:** "Progress becomes visible."

---

## Animation System

| Element | Type | Duration | Easing |
|---|---|---|---|
| Section header (eyebrow, H2, description) | FadeUp stagger | 0.65s | `[0.16,1,0.3,1]` |
| Demo window enter | fade + slideUp | 0.75s delay 0.2s | `[0.16,1,0.3,1]` |
| Panel exit | fade + slideLeft | 0.2s | default |
| Panel enter | fade + slideRight | 0.35s | `[0.16,1,0.3,1]` |
| Bar chart bars | height 0→final, staggered | 0.6s per bar | `[0.16,1,0.3,1]` |
| Counter numbers | count 0→value | 0.9s | `[0.34,1.1,0.64,1]` |
| Line chart path | strokeDashoffset | 1.2s | `[0.16,1,0.3,1]` |

Animated counters use a custom `useCounter(target, duration)` hook that lerps via `requestAnimationFrame`, starting when the panel mounts.

---

## Component Architecture

```
SolutionInstitution
├── FadeUp (reused local util)
├── DemoWindow
│   ├── ChromeBar
│   ├── Sidebar
│   │   └── NavItem × 3
│   └── ContentArea
│       └── AnimatePresence
│           ├── OverviewPanel
│           ├── EngagementPanel
│           └── GrowthPanel
```

All sub-components are local to `SolutionInstitution.tsx`. No new files needed.

---

## Design Token Usage

All tokens come from the existing `globals.css` design system — zero new values introduced.

| Usage | Token |
|---|---|
| Demo window border | `border-border` (`#E0E7FF`) |
| Demo window shadow | `shadow-lg` |
| Chrome bar background | `bg-surface` (`#F5F7FF`) |
| Active sidebar item | `bg-brand-50` (`#EFF6FF`) + `text-brand` |
| Metric card background | `bg-surface border-border` |
| Bar chart accent | `#2563EB` (brand) |
| Success delta | `text-success` (`#16A34A`) |
| Warning row | `bg-warning-tint border-warning/30` |
| Text hierarchy | `text-text-primary / secondary / muted` |

---

## What Is Removed

- `DashboardMockup` component (static, no interaction)
- Split layout (`flex-row` with text column left)
- `features` translation key render (checklist bullets)
- Static `BAR_VALUES` / `BAR_MAX` top-level constants (moved into panel components)

---

## Success Criteria

- User immediately understands the product has three visibility dimensions: class average, engagement patterns, growth trends
- Switching tabs re-animates charts — feels like real software responding
- No hardcoded numbers that confuse (all values tell a clear story: improving upward trend, one warning, healthy participation)
- Section reads as production-quality, consistent with the rest of the site's design system
