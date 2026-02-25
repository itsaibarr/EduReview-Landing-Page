# SolutionStudent Interactive Demo — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the static student mockup into an interactive tabbed demo with three views (Progress, Momentum, Journey), animated transitions, and emotional storytelling.

**Architecture:** Single file edit (`SolutionStudent.tsx`) + translation files. All changes follow the pattern established in `SolutionInstitution.tsx`.

**Tech Stack:** React, TypeScript, Framer Motion, Lucide React, Tailwind CSS (project tokens only).

**Design doc:** `docs/plans/2026-02-25-solution-student-demo-design.md`

---

## Task 1: Add state management, tab types, and mock data constants

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add AnimatePresence import and new Lucide icons

Find line 3-4 (the imports). Update them:

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Flame, TrendingUp, Zap, Target, Award } from 'lucide-react'
```

### Step 2: Add tab type and mock data constants

Add these constants after the existing constants (after `SCORE_DASH` definition, around line 18):

```tsx
// ─── Tab State ────────────────────────────────────────────────────────────────

type Tab = 'progress' | 'momentum' | 'journey'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PROGRESS_STATS = {
  score: 82,
  scoreChange: 6,
  growth: 14,
  streak: 9,
  rank: 18,
}

const CONSISTENCY_DAYS = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: false },
]

const MILESTONES = [
  { week: 1, label: 'Started', score: 38 },
  { week: 3, label: 'Improving', score: 52 },
  { week: 5, label: 'Building', score: 68 },
  { week: 7, label: 'Strong', score: 82 },
]

const JOURNEY_BEFORE = { score: 38, rank: 67, streak: 0 }
const JOURNEY_NOW = { score: 82, rank: 18, streak: 9 }
```

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. New constants are defined but not yet used.

### Step 4: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add tab type and mock data constants for student demo"
```

---

## Task 2: Create useCounter hook and buildLinePath utility

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add useCounter hook

Add this hook after the constants section (after `JOURNEY_NOW`, before `FadeUp`):

```tsx
// ─── Hooks ────────────────────────────────────────────────────────────────────

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

function buildLinePath(points: number[], max: number, width: number, height: number) {
  const coords = points.map((v, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - (v / max) * height,
  }))
  const line = coords.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const fill = `${line} L ${coords[coords.length - 1].x.toFixed(1)} ${height} L 0 ${height} Z`
  return { line, fill, lastX: coords[coords.length - 1].x, lastY: coords[coords.length - 1].y }
}
```

### Step 2: Add useState import

Update line 1 to include useState:

```tsx
import { useState, useEffect } from 'react'
```

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 4: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add useCounter hook and buildLinePath utility for student demo"
```

---

## Task 3: Create ProgressView panel component

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add ProgressView component

Add this component after the `FadeUp` component, before `ProgressMockup`:

```tsx
// ─── Panel Components ────────────────────────────────────────────────────────

function ProgressView() {
  const score = useCounter(PROGRESS_STATS.score)
  const growth = useCounter(PROGRESS_STATS.growth)
  const streak = useCounter(PROGRESS_STATS.streak)
  const rank = useCounter(PROGRESS_STATS.rank)

  return (
    <div className="flex flex-col gap-5">

      {/* Engagement score ring */}
      <div className="flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="#DBEAFE" strokeWidth="8" />
            <motion.circle
              cx="48" cy="48" r={RADIUS}
              fill="none"
              stroke="#2563EB"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${SCORE_DASH} ${CIRC}`}
              transform="rotate(-90 48 48)"
              initial={{ strokeDasharray: `0 ${CIRC}` }}
              animate={{ strokeDasharray: `${SCORE_DASH} ${CIRC}` }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.34, 1.1, 0.64, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[1.375rem] font-bold text-text-primary leading-none">{score}</span>
          </div>
        </div>
        <div>
          <p className="text-label font-semibold text-text-primary">Engagement Score</p>
          <p className="mt-1 text-caption text-success font-medium">↑ +{PROGRESS_STATS.scoreChange} from last week</p>
          <p className="mt-2 text-caption text-text-muted leading-snug">
            Based on attendance, submissions,<br />and improvement trend.
          </p>
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
          <p className="text-[1.1rem] font-bold text-brand leading-none">+{growth}%</p>
          <p className="text-caption text-text-muted text-center">Growth</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-0.5">
            <Flame size={13} className="text-warning" />
            <p className="text-[1.1rem] font-bold text-text-primary leading-none">{streak}</p>
          </div>
          <p className="text-caption text-text-muted text-center">Day streak</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
          <p className="text-[1.1rem] font-bold text-text-primary leading-none">Top {rank}%</p>
          <p className="text-caption text-text-muted text-center">Rank</p>
        </div>
      </div>

      {/* Weekly bars */}
      <div className="flex flex-col gap-2">
        <p className="text-caption text-text-muted font-medium">This week</p>
        <div className="flex items-end gap-1.5 h-12">
          {WEEK_BARS.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                className="w-full rounded-sm"
                style={{
                  background: i === WEEK_BARS.length - 1
                    ? '#2563EB'
                    : `rgba(37,99,235,${0.12 + (i / WEEK_BARS.length) * 0.4})`,
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(v / BAR_MAX) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
              />
              <span className="text-[10px] text-text-muted">{WEEK_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
```

### Step 2: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 3: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add ProgressView panel component for student demo"
```

---

## Task 4: Create MomentumView panel component

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add MomentumView component

Add this component after `ProgressView`:

```tsx
function MomentumView() {
  const streak = useCounter(PROGRESS_STATS.streak)
  const completedDays = CONSISTENCY_DAYS.filter(d => d.completed).length

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Consistency</p>
        <span className="text-[10px] font-semibold text-success bg-success-tint rounded-full px-2.5 py-0.5">
          {completedDays}/5 this week
        </span>
      </div>

      {/* Weekly consistency calendar */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Weekly Consistency</p>
        <div className="flex gap-2">
          {CONSISTENCY_DAYS.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
              className={`flex-1 flex flex-col items-center gap-1.5 p-2 rounded-lg border ${
                d.completed
                  ? 'bg-brand-50 border-brand/20'
                  : 'bg-surface border-border'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                d.completed ? 'bg-brand' : 'bg-border'
              }`}>
                {d.completed && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[10px] text-text-muted">{d.day}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Streak card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warning/20">
          <Flame size={24} className="text-warning" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[1.5rem] font-bold text-text-primary leading-none">{streak}</span>
            <span className="text-label text-text-muted">Day Streak</span>
          </div>
          <p className="mt-0.5 text-caption text-text-secondary">Keep going! 1 more day to reach 10.</p>
        </div>
      </motion.div>

      {/* Momentum indicator */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Momentum</p>
        <div className="relative h-2 rounded-full bg-surface border border-border overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand to-brand-400"
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-[10px] text-text-muted">Building</span>
          <span className="text-[10px] font-semibold text-brand">Strong</span>
        </div>
      </div>

      {/* Message */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-success-tint border border-success/20">
        <Zap size={14} className="text-success flex-shrink-0" />
        <p className="text-label text-text-secondary">
          Your consistency is paying off — <span className="font-semibold text-success">+12% improvement</span> this month
        </p>
      </div>

    </div>
  )
}
```

### Step 2: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 3: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add MomentumView panel component for student demo"
```

---

## Task 5: Create JourneyView panel component

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add JourneyView component

Add this component after `MomentumView`:

```tsx
function JourneyView() {
  const beforeScore = useCounter(JOURNEY_BEFORE.score)
  const nowScore = useCounter(JOURNEY_NOW.score)
  const scoreDiff = JOURNEY_NOW.score - JOURNEY_BEFORE.score

  const W = 340
  const H = 80
  const points = MILESTONES.map(m => m.score)
  const { line, fill, lastX, lastY } = buildLinePath(points, 100, W, H)
  const pathLen = W * 1.3

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Growth Journey</p>
        <span className="text-[10px] font-semibold text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5">
          7 weeks
        </span>
      </div>

      {/* Journey line chart */}
      <div className="flex flex-col gap-2 rounded-lg bg-surface border border-border p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 80 }} preserveAspectRatio="none">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0} y1={H * t}
              x2={W} y2={H * t}
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="1"
            />
          ))}
          {/* Fill area */}
          <path d={fill} fill="rgba(37,99,235,0.08)" />
          {/* Line */}
          <motion.path
            d={line}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: pathLen, strokeDashoffset: pathLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
          />
          {/* End point */}
          <motion.circle
            cx={lastX}
            cy={lastY}
            r={4}
            fill="#2563EB"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 1.1 }}
          />
        </svg>

        {/* Milestone labels */}
        <div className="flex justify-between mt-2">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.week}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] font-semibold text-brand">{m.label}</span>
              <span className="text-[9px] text-text-muted">W{m.week}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Before vs Now comparison */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
          className="flex flex-col gap-2 p-4 rounded-xl bg-surface border border-border"
        >
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Before</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[1.25rem] font-bold text-text-muted leading-none">{beforeScore}</span>
            <span className="text-caption text-text-muted">score</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] text-text-muted">Rank: <span className="font-medium text-text-secondary">Top {JOURNEY_BEFORE.rank}%</span></p>
            <p className="text-[10px] text-text-muted">Streak: <span className="font-medium text-text-secondary">{JOURNEY_BEFORE.streak} days</span></p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
          className="flex flex-col gap-2 p-4 rounded-xl bg-brand-50 border border-brand/20"
        >
          <p className="text-[10px] font-semibold text-brand uppercase tracking-wide">Now</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[1.25rem] font-bold text-brand leading-none">{nowScore}</span>
            <span className="text-caption text-brand/70">score</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-[10px] text-brand/70">Rank: <span className="font-semibold text-brand">Top {JOURNEY_NOW.rank}%</span></p>
            <p className="text-[10px] text-brand/70">Streak: <span className="font-semibold text-brand">{JOURNEY_NOW.streak} days</span></p>
          </div>
        </motion.div>
      </div>

      {/* Achievement message */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
        className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/20">
          <Award size={20} className="text-brand" />
        </div>
        <div>
          <p className="text-label font-semibold text-text-primary">+{scoreDiff} points gained</p>
          <p className="text-caption text-text-secondary">Your effort is visible.</p>
        </div>
      </motion.div>

    </div>
  )
}
```

### Step 2: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 3: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add JourneyView panel component for student demo"
```

---

## Task 6: Create StudentDemoWindow component with tabs

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Add StudentDemoWindow component

Add this component after `JourneyView`, before the `SolutionStudent` export:

```tsx
// ─── Demo Window ──────────────────────────────────────────────────────────────

const TAB_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'progress', label: 'Progress', icon: <TrendingUp size={14} strokeWidth={1.75} /> },
  { id: 'momentum', label: 'Momentum', icon: <Zap size={14} strokeWidth={1.75} /> },
  { id: 'journey', label: 'Journey', icon: <Target size={14} strokeWidth={1.75} /> },
]

function StudentDemoWindow() {
  const [activeTab, setActiveTab] = useState<Tab>('progress')

  const panels: Record<Tab, React.ReactNode> = {
    progress: <ProgressView />,
    momentum: <MomentumView />,
    journey: <JourneyView />,
  }

  return (
    <div className="w-full max-w-[420px] rounded-2xl border border-border bg-white shadow-lg overflow-hidden">

      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="ml-3 text-caption text-text-muted font-medium">Your Learning Progress</span>
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-white">
        {TAB_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={[
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label transition-all duration-200',
              activeTab === id
                ? 'bg-brand-50 text-brand font-semibold'
                : 'text-text-muted hover:text-text-secondary hover:bg-surface',
            ].join(' ')}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="p-6 min-h-[340px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {panels[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  )
}
```

### Step 2: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 3: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: add StudentDemoWindow component with tabbed navigation"
```

---

## Task 7: Update SolutionStudent section to use new demo window

**Files:**
- Modify: `src/components/sections/SolutionStudent.tsx`

### Step 1: Replace the section component

Replace the entire `SolutionStudent` function with:

```tsx
export function SolutionStudent() {
  const t = useTranslations('SolutionStudent')
  const features = t.raw('features') as string[]

  return (
    <section id="how-it-works" className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left — interactive demo */}
        <div className="flex-1 flex justify-center lg:justify-start w-full">
          <StudentDemoWindow />
        </div>

        {/* Right — text */}
        <div className="flex-1 max-w-[480px]">
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
            <p className="text-body-lg text-text-secondary leading-relaxed">
              {t('description')}
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-8 flex flex-col gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle2 size={17} className="text-brand flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <p className="text-body text-text-secondary leading-snug">{f}</p>
              </div>
            ))}
          </FadeUp>
        </div>

      </div>
    </section>
  )
}
```

### Step 2: Remove the old ProgressMockup component

Delete the `ProgressMockup` function (it's now replaced by the panel components).

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. The section now uses the new interactive demo.

### Step 4: Commit

```bash
git add src/components/sections/SolutionStudent.tsx
git commit -m "feat: integrate StudentDemoWindow into SolutionStudent section"
```

---

## Task 8: Add translation keys for new content

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/kk.json`
- Modify: `messages/ru.json`

### Step 1: Update English translations

Find the `SolutionStudent` section in `messages/en.json` and ensure it has:

```json
{
  "SolutionStudent": {
    "eyebrow": "How It Works",
    "headline": {
      "line1": "See your real",
      "line2": "pro",
      "highlight": "gress"
    },
    "description": "Track your learning journey with clarity. See how your effort translates into visible improvement over time.",
    "features": [
      "Visual progress tracking that makes sense",
      "Consistency metrics that motivate",
      "Clear growth journey visualization"
    ]
  }
}
```

### Step 2: Update Kazakh translations

Update `messages/kk.json`:

```json
{
  "SolutionStudent": {
    "eyebrow": "Қалай жұмыс істейді",
    "headline": {
      "line1": "Өзіңіздің нақты",
      "line2": "білім деңгейіңізді",
      "highlight": "көріңіз"
    },
    "description": "Білім алу жолыңызды анықтықпен бақылаңыз. Қажырлығыңыз қалай көрінетін жетістікке айналатынын көріңіз.",
    "features": [
      "Түсінікті білім прогрессінің трекері",
      "Мотивация беретін тұрақтылық метрикалары",
      "Анық өсу жолының визуализациясы"
    ]
  }
}
```

### Step 3: Update Russian translations

Update `messages/ru.json`:

```json
{
  "SolutionStudent": {
    "eyebrow": "Как это работает",
    "headline": {
      "line1": "Видите свой",
      "line2": "реальный про",
      "highlight": "гресс"
    },
    "description": "Отслеживайте свой образовательный путь с ясностью. Видите, как ваши усилия превращаются в видимый прогресс.",
    "features": [
      "Понятный визуальный трекинг прогресса",
      "Метрики постоянства, которые мотивируют",
      "Четкая визуализация пути роста"
    ]
  }
}
```

### Step 4: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

### Step 5: Commit

```bash
git add messages/en.json messages/kk.json messages/ru.json
git commit -m "feat: update translation keys for student demo section"
```

---

## Task 9: Final verification and testing

### Step 1: Run development server

```bash
npm run dev
```

### Step 2: Manual testing checklist

- [ ] Section renders correctly on desktop
- [ ] Section renders correctly on mobile (stacked layout)
- [ ] All three tabs are clickable
- [ ] Tab transitions are smooth
- [ ] Progress view shows animated ring and bars
- [ ] Momentum view shows consistency calendar and streak
- [ ] Journey view shows growth line and before/after comparison
- [ ] All counters animate on view
- [ ] No console errors

### Step 3: Build verification

```bash
npm run build
```

Expected: successful build with no errors.

### Step 4: Final commit (if any fixes needed)

```bash
git add -A
git commit -m "fix: final adjustments for student interactive demo"
```

---

## Summary

This implementation plan transforms the static student mockup into an interactive, tabbed demo experience. The key changes:

1. **Three tabbed views** — Progress, Momentum, Journey
2. **Animated transitions** — Smooth content switching with Framer Motion
3. **Counter animations** — Numbers count up on view
4. **Chart animations** — Line charts draw in, bars grow
5. **Emotional storytelling** — Before/after comparison, milestone journey

The architecture mirrors the institution demo but focuses on personal progress rather than administrative analytics.

---

## END OF IMPLEMENTATION PLAN
