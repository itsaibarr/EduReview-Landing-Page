# SolutionInstitution Interactive Demo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static split-layout `SolutionInstitution` section with a centered browser-frame interactive demo dashboard with three switchable states (Overview, Engagement, Growth).

**Architecture:** Single component file (`SolutionInstitution.tsx`) — all sub-components are local. Tab state drives `AnimatePresence` panel swaps. Charts re-animate on every tab switch because panels mount fresh (key = activeTab). No new files, no new dependencies.

**Tech Stack:** React, TypeScript, Framer Motion (`motion`, `AnimatePresence`), Lucide React, next-intl, Tailwind CSS (project design tokens only).

**Design doc:** `docs/plans/2026-02-25-solution-institution-demo-design.md`

---

## Task 1: Replace section shell with centered layout

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

The current section is a split layout (text left, mockup right). Replace it with a centered header + demo window below. Remove the `DashboardMockup` component and the `features` render. Keep `FadeUp`, keep translation keys `eyebrow`, `headline.*`, `description`.

**Step 1: Replace the entire file content**

Delete everything in `SolutionInstitution.tsx` and write this scaffold (panels are empty stubs for now):

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type Tab = 'overview' | 'engagement' | 'growth'

// Stub — replaced in Task 4
function OverviewPanel() {
  return <div className="h-48 flex items-center justify-center text-text-muted text-caption">Overview</div>
}

// Stub — replaced in Task 5
function EngagementPanel() {
  return <div className="h-48 flex items-center justify-center text-text-muted text-caption">Engagement</div>
}

// Stub — replaced in Task 6
function GrowthPanel() {
  return <div className="h-48 flex items-center justify-center text-text-muted text-caption">Growth</div>
}

// Stub — replaced in Task 2+3
function DemoWindow() {
  return (
    <div className="w-full rounded-xl border border-border shadow-lg bg-white overflow-hidden">
      <div className="px-4 py-3 bg-surface border-b border-border">
        <span className="text-caption text-text-muted">Demo placeholder</span>
      </div>
      <div className="p-6 h-48" />
    </div>
  )
}

export function SolutionInstitution() {
  const t = useTranslations('SolutionInstitution')

  return (
    <section id="how-it-works" className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        {/* Centered header */}
        <div className="text-center max-w-[600px] mx-auto">
          <FadeUp>
            <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
              {t('eyebrow')}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-4">
            <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
              {t('headline.line1')}
              <br />
              {t('headline.line2')}<span className="text-brand">{t('headline.highlight')}</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-5">
            <p className="text-body-lg text-text-secondary leading-relaxed max-w-[480px] mx-auto">
              {t('description')}
            </p>
          </FadeUp>
        </div>

        {/* Demo window */}
        <FadeUp delay={0.3} className="mt-16">
          <DemoWindow />
        </FadeUp>

      </div>
    </section>
  )
}
```

**Step 2: Verify it compiles**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds, no TypeScript errors.

**Step 3: Commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "refactor: replace SolutionInstitution split layout with centered shell"
```

---

## Task 2: Build DemoWindow chrome bar + layout

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

Replace the `DemoWindow` stub with the real chrome bar + sidebar + content area layout. Tab state and panel dispatch live here.

**Step 1: Replace the `DemoWindow` stub**

Find and replace the `DemoWindow` function with:

```tsx
const NAV_ITEMS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'engagement', label: 'Engagement' },
  { id: 'growth',     label: 'Growth'     },
]

function DemoWindow() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  const panels: Record<Tab, React.ReactNode> = {
    overview:   <OverviewPanel />,
    engagement: <EngagementPanel />,
    growth:     <GrowthPanel />,
  }

  return (
    <div className="w-full rounded-xl border border-border shadow-lg bg-white overflow-hidden">

      {/* Chrome bar */}
      <div className="relative flex items-center px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-black/10" />
          <span className="w-3 h-3 rounded-full bg-black/10" />
          <span className="w-3 h-3 rounded-full bg-black/10" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 text-caption text-text-muted font-medium">
          edureview.app/dashboard
        </span>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex min-h-[360px]">

        {/* Sidebar */}
        <div className="w-[176px] flex-shrink-0 border-r border-border bg-white p-3 flex flex-col gap-1">
          <p className="px-3 py-2 text-caption font-bold text-text-primary tracking-tight mb-1">
            EduReview
          </p>
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={[
                'w-full text-left px-3 py-2 rounded-lg text-label transition-colors duration-150',
                activeTab === id
                  ? 'bg-brand-50 text-brand font-semibold'
                  : 'text-text-secondary hover:bg-surface',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="p-6"
            >
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
```

**Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. The sidebar renders three nav items, clicking them swaps the stub content with a fade-slide transition.

**Step 3: Commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add DemoWindow chrome bar, sidebar nav, AnimatePresence panel transitions"
```

---

## Task 3: Build OverviewPanel (metric cards + animated counters + bar chart)

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

**Step 1: Add `useCounter` hook above `FadeUp`**

This hook counts from 0 to `target` over `duration`ms using easeOutExpo. It starts when the component mounts (panels mount when tab is active — no `whileInView` needed here).

```tsx
function useCounter(target: number, duration = 900) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.round(target * ease))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return count
}
```

Also add `useEffect` to the imports at the top:
```tsx
import { useState, useEffect } from 'react'
```

**Step 2: Replace `OverviewPanel` stub**

Constants to add above the component (after `EASE`):

```tsx
const OVERVIEW_BARS = [42, 58, 53, 67, 71, 74, 78]
const OVERVIEW_BAR_MAX = 80
const OVERVIEW_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
```

Replace the `OverviewPanel` stub:

```tsx
function OverviewPanel() {
  const classAvg = useCounter(78)
  const activeStudents = useCounter(24)

  return (
    <div className="flex flex-col gap-4">

      {/* Panel header */}
      <div className="flex items-baseline justify-between">
        <p className="text-h3 font-bold text-text-primary">Overview</p>
        <p className="text-caption text-text-muted">Week 7 of 12</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3">

        <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface border border-border">
          <p className="text-caption text-text-muted font-medium">Class Avg.</p>
          <p className="text-[2rem] font-bold text-text-primary leading-none tracking-tight">
            {classAvg}
          </p>
          <p className="text-caption text-success font-medium">↑ +4 pts this week</p>
        </div>

        <div className="flex flex-col gap-1.5 p-4 rounded-lg bg-surface border border-border">
          <p className="text-caption text-text-muted font-medium">Active Students</p>
          <p className="text-[2rem] font-bold text-text-primary leading-none tracking-tight">
            {activeStudents} <span className="text-h3 text-text-muted font-medium">/ 30</span>
          </p>
          <p className="text-caption text-text-muted font-medium">80% participation</p>
        </div>

      </div>

      {/* 7-day bar chart */}
      <div className="flex flex-col gap-2">
        <p className="text-caption text-text-muted font-medium">7-Day Engagement Trend</p>
        <div className="flex items-end gap-1.5 h-14">
          {OVERVIEW_BARS.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm"
                style={{
                  background: i === OVERVIEW_BARS.length - 1
                    ? '#2563EB'
                    : `rgba(37,99,235,${0.15 + (i / OVERVIEW_BARS.length) * 0.4})`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(v / OVERVIEW_BAR_MAX) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.07, ease: EASE }}
              />
              <span className="text-[10px] text-text-muted">{OVERVIEW_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
```

**Step 3: Verify build + visual check**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. In dev (`npm run dev`), open `/en?role=institution`, scroll to the section — Overview tab should show two counters counting up from 0, bars animating upward. Switching to another tab and back re-runs the counters and bars.

**Step 4: Commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add OverviewPanel with animated counters and bar chart"
```

---

## Task 4: Build EngagementPanel

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

**Step 1: Add imports at the top of file**

```tsx
import { AlertTriangle } from 'lucide-react'
```

**Step 2: Add constants above components**

```tsx
const ENGAGEMENT_BARS = [78, 85, 72, 91, 88]
const ENGAGEMENT_BAR_MAX = 95
const ENGAGEMENT_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
```

**Step 3: Replace `EngagementPanel` stub**

```tsx
function EngagementPanel() {
  return (
    <div className="flex flex-col gap-4">

      {/* Panel header */}
      <div className="flex items-baseline justify-between">
        <p className="text-h3 font-bold text-text-primary">Engagement</p>
        <p className="text-caption text-text-muted">Live signals</p>
      </div>

      {/* Attendance bar chart */}
      <div className="flex flex-col gap-2">
        <p className="text-caption text-text-muted font-medium">Daily Attendance</p>
        <div className="flex items-end gap-3 h-20">
          {ENGAGEMENT_BARS.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <motion.div
                className="w-full rounded-sm"
                style={{
                  background: i === ENGAGEMENT_BARS.length - 1
                    ? '#2563EB'
                    : `rgba(37,99,235,${0.2 + (i / ENGAGEMENT_BARS.length) * 0.45})`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(v / ENGAGEMENT_BAR_MAX) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.08, ease: EASE }}
              />
              <span className="text-[10px] text-text-muted">{ENGAGEMENT_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stat chips */}
      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2 rounded-md bg-surface border border-border text-label text-text-secondary">
          Avg. Attendance <span className="font-semibold text-text-primary">86%</span>
        </div>
        <div className="flex-1 px-3 py-2 rounded-md bg-surface border border-border text-label text-text-secondary">
          On-time Submissions <span className="font-semibold text-text-primary">91%</span>
        </div>
      </div>

      {/* Early warning */}
      <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/30 bg-warning-tint">
        <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="text-label font-semibold text-text-primary">3 students flagged for disengagement</p>
          <p className="mt-0.5 text-caption text-text-secondary leading-relaxed">
            Review recommended before next assessment.
          </p>
        </div>
      </div>

    </div>
  )
}
```

**Step 4: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Engagement tab shows attendance bars animating upward, two chips, amber warning row.

**Step 5: Commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add EngagementPanel with attendance chart, stat chips, and warning row"
```

---

## Task 5: Build GrowthPanel (SVG line chart)

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

The line chart animates its path from invisible (full `strokeDashoffset`) to fully drawn using a `motion` `strokeDashoffset` prop.

**Step 1: Add constants**

```tsx
const GROWTH_POINTS = [38, 45, 51, 58, 63, 71, 78]
const GROWTH_MAX = 85
```

**Step 2: Add `buildLinePath` helper above components**

This converts data points into an SVG polyline path and a closed fill path. Place it after the constants:

```tsx
function buildLinePath(
  points: number[],
  max: number,
  width: number,
  height: number,
): { line: string; fill: string } {
  const coords = points.map((v, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - (v / max) * height,
  }))

  const line = coords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const fill = `${line} L ${coords[coords.length - 1].x} ${height} L 0 ${height} Z`

  return { line, fill }
}
```

**Step 3: Replace `GrowthPanel` stub**

```tsx
function GrowthPanel() {
  const W = 460
  const H = 100
  const { line, fill } = buildLinePath(GROWTH_POINTS, GROWTH_MAX, W, H)

  // Approximate path length for strokeDashoffset animation
  // Real length computed by SVG but we over-estimate for safety
  const pathLen = W * 1.4

  return (
    <div className="flex flex-col gap-4">

      {/* Panel header */}
      <div className="flex items-baseline justify-between">
        <p className="text-h3 font-bold text-text-primary">Growth</p>
        <p className="text-caption text-text-muted">7-week view</p>
      </div>

      {/* SVG line chart */}
      <div className="w-full overflow-hidden rounded-lg bg-surface border border-border p-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: 100 }}
          preserveAspectRatio="none"
        >
          {/* Soft fill under line */}
          <path
            d={fill}
            fill="rgba(37,99,235,0.06)"
          />
          {/* Animated line */}
          <motion.path
            d={line}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: pathLen, strokeDashoffset: pathLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </svg>
        {/* Week labels */}
        <div className="flex justify-between mt-2 px-0">
          {GROWTH_POINTS.map((_, i) => (
            <span key={i} className="text-[10px] text-text-muted">W{i + 1}</span>
          ))}
        </div>
      </div>

      {/* Stat chips */}
      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2 rounded-md bg-surface border border-border text-label text-text-secondary">
          Cohort Growth <span className="font-semibold text-brand">+14%</span>
        </div>
        <div className="flex-1 px-3 py-2 rounded-md bg-surface border border-border text-label text-text-secondary">
          Consistency Score <span className="font-semibold text-text-primary">88</span>
        </div>
      </div>

    </div>
  )
}
```

**Step 4: Verify build + visual check**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Growth tab shows line drawing left-to-right over 1.2s, fill area visible, two chips below. Switching away and back re-triggers the draw animation.

**Step 5: Commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add GrowthPanel with animated SVG line chart"
```

---

## Task 6: Update all three locale files — remove `features` render (translation keys stay)

The `features` key is no longer rendered in this section. The component no longer calls `t.raw('features')`. The translation keys in all three locale files can stay (no harm, and avoids touching message files unnecessarily).

**Step 1: Verify `features` is not referenced in the component**

```bash
grep -n "features" src/components/sections/SolutionInstitution.tsx
```

Expected: no output. If `features` still appears, remove that render block.

**Step 2: Build check**

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors, no unused-translation warnings.

**Step 3: Final visual smoke test**

Run dev server and check manually:
```bash
npm run dev
```

Open `http://localhost:3000/en?role=institution` and verify:
- Section has centered eyebrow / headline / description
- Demo window appears below with browser chrome
- Sidebar shows Overview (active, blue), Engagement, Growth
- Overview: two counters count up, bars animate staggered, "Week 7 of 12" label
- Engagement: bars animate, two chips visible, amber warning row
- Growth: line draws left-to-right, fill area under line, chips below
- Switching tabs: old panel fades/slides left, new panel slides in from right, charts re-animate
- Check `/en?role=institution`, `/ru?role=institution`, `/kk?role=institution` — text renders correctly in all locales

**Step 4: Final commit**

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: complete SolutionInstitution interactive demo redesign"
```

---

## Summary of All Files Changed

| File | Change |
|---|---|
| `src/components/sections/SolutionInstitution.tsx` | Full rewrite — centered section, DemoWindow, 3 panels |

No other files need to change. Translation keys `eyebrow`, `headline.*`, `description` remain valid for all three locales. The `features` key stays in message files but is simply no longer rendered.
