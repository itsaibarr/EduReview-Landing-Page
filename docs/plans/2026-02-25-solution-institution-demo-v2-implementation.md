# SolutionInstitution Demo v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the existing interactive demo dashboard to production density — richer sidebar with workspace header, interior breadcrumb bar, denser panels with more data, taller window, bottom fade-out effect, and snappier tab transitions.

**Architecture:** Single file edit (`SolutionInstitution.tsx`). All changes are additive — new constants, new components, new JSX. No new files, no new dependencies. Six self-contained tasks, each ends with a build verify + commit.

**Tech Stack:** React, TypeScript, Framer Motion, Lucide React, Tailwind CSS (project tokens only).

**Design doc:** `docs/plans/2026-02-25-solution-institution-demo-v2-design.md`

---

## Task 1: Add new Lucide imports + ContentHeader bar

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Update the Lucide import line

Find line 6 (the lucide-react import). Replace it:

```tsx
import { BarChart2, Activity, TrendingUp, AlertTriangle, BookOpen, Users, ClipboardList, FileText, PieChart, Settings, ChevronDown } from 'lucide-react'
```

### Step 2: Add the `ContentHeader` component

Add this new component immediately above the `DemoWindow` function (after `GrowthPanel` ends, before the `// ─── DemoWindow` comment):

```tsx
function ContentHeader() {
  return (
    <div className="flex items-center justify-between px-4 h-11 border-b border-border bg-white">
      <div className="flex items-center text-label">
        <span className="font-semibold text-text-primary">CS-401 · Algorithms</span>
        <span className="text-text-muted mx-2">/</span>
        <span className="text-text-muted">Week 7 Dashboard</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-semibold bg-surface border border-border rounded-full px-2.5 py-0.5 text-text-muted">
          Spring 2026
        </span>
        <div className="w-[26px] h-[26px] rounded-full bg-brand-50 flex items-center justify-center">
          <span className="text-[9px] font-bold text-brand">AD</span>
        </div>
      </div>
    </div>
  )
}
```

### Step 3: Mount ContentHeader in DemoWindow

In `DemoWindow`, find the current structure:

```tsx
      {/* Chrome bar */}
      <div className="relative flex items-center px-4 py-3 bg-surface border-b border-border">
        ...
      </div>

      {/* Body: sidebar + content */}
      <div className="flex">
```

Insert `<ContentHeader />` between the chrome bar and the body div:

```tsx
      {/* Chrome bar */}
      <div className="relative flex items-center px-4 py-3 bg-surface border-b border-border">
        ...
      </div>

      {/* Interior header */}
      <ContentHeader />

      {/* Body: sidebar + content */}
      <div className="flex">
```

### Step 4: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. The demo window now has a three-row top section: chrome bar → breadcrumb header → body.

### Step 5: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add ContentHeader bar with breadcrumb, semester badge, and avatar"
```

---

## Task 2: Upgrade sidebar — workspace header + expanded nav

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Add `INACTIVE_NAV_ITEMS` constant

Add this constant directly below the existing `NAV_ITEMS` array (around line 430):

```tsx
const INACTIVE_NAV_ITEMS = [
  { id: 'classes',     label: 'Classes',     icon: <BookOpen     size={15} strokeWidth={1.5} /> },
  { id: 'students',    label: 'Students',    icon: <Users        size={15} strokeWidth={1.5} /> },
  { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={15} strokeWidth={1.5} /> },
  { id: 'reports',     label: 'Reports',     icon: <FileText     size={15} strokeWidth={1.5} /> },
  { id: 'analytics',   label: 'Analytics',   icon: <PieChart     size={15} strokeWidth={1.5} /> },
  { id: 'settings',    label: 'Settings',    icon: <Settings     size={15} strokeWidth={1.5} /> },
]
```

### Step 2: Replace the entire sidebar div in DemoWindow

Find the sidebar div (starts with `{/* Sidebar */}`). Replace it entirely:

```tsx
        {/* Sidebar */}
        <div className="w-[200px] flex-shrink-0 border-r border-border bg-white flex flex-col">

          {/* Workspace header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <div className="w-[22px] h-[22px] rounded-md bg-brand flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-white">E</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label font-bold text-text-primary leading-none">EduReview</p>
              <p className="text-[10px] text-text-muted leading-none mt-0.5">Admin</p>
            </div>
            <ChevronDown size={14} className="text-text-muted flex-shrink-0" />
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-1 p-3 flex-1">
            <p className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">
              Analytics
            </p>
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={[
                  'w-full text-left px-3 py-2 rounded-lg text-label transition-colors duration-150 flex items-center gap-2',
                  activeTab === id
                    ? 'bg-brand-50 text-brand font-semibold'
                    : 'text-text-secondary hover:bg-surface',
                ].join(' ')}
              >
                {getNavIcon(id)}
                {label}
              </button>
            ))}

            <p className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-wide mt-3 mb-1">
              Manage
            </p>
            {INACTIVE_NAV_ITEMS.map(({ id, label, icon }) => (
              <div
                key={id}
                className="w-full text-left px-3 py-2 rounded-lg text-label flex items-center gap-2 text-text-secondary opacity-40"
              >
                {icon}
                {label}
              </div>
            ))}
          </div>

        </div>
```

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Sidebar now shows workspace header at top, "ANALYTICS" group with 3 clickable items, "MANAGE" group with 6 greyed-out items.

### Step 4: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: upgrade sidebar with workspace header, section labels, and 6 inactive nav items"
```

---

## Task 3: Upgrade OverviewPanel — 6 stats + Last Active column + Recent Activity feed

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Add `lastActive` field to STUDENTS data

Find the `STUDENTS` array (around line 18). Replace it:

```tsx
const STUDENTS: { initials: string; name: string; score: number; trend: number[]; status: StudentStatus; lastActive: string }[] = [
  { initials: 'AJ', name: 'Asel J.',   score: 84, trend: [70, 75, 76, 82, 80, 84], status: 'on-track', lastActive: '2m ago'  },
  { initials: 'DK', name: 'Dmitry K.', score: 79, trend: [68, 70, 74, 77, 75, 79], status: 'on-track', lastActive: '1h ago'  },
  { initials: 'FN', name: 'Fatima N.', score: 91, trend: [83, 85, 87, 90, 89, 91], status: 'top',      lastActive: 'Just now' },
  { initials: 'BP', name: 'Bogdan P.', score: 61, trend: [65, 60, 58, 62, 59, 61], status: 'risk',     lastActive: '3d ago'  },
  { initials: 'ZS', name: 'Zara S.',   score: 74, trend: [69, 72, 70, 73, 71, 74], status: 'on-track', lastActive: '45m ago' },
]
```

### Step 2: Replace `OverviewPanel`

Replace the entire `OverviewPanel` function:

```tsx
function OverviewPanel() {
  const classAvg       = useCounter(78)
  const submitted      = useCounter(93)
  const activeCount    = useCounter(24)
  const avgAssignment  = useCounter(74)
  const completionRate = useCounter(88)

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Overview</p>
        <span className="text-[10px] font-semibold text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5">
          Week 7 of 12
        </span>
      </div>

      {/* 6-stat grid */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface border border-border">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Class Avg.</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">{classAvg}</p>
          <p className="text-[10px] text-success font-semibold">↑ +4 pts</p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface border border-border">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Submitted</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">{submitted}%</p>
          <p className="text-[10px] text-success font-semibold">↑ +2%</p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface border border-border">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Active</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">
            {activeCount}<span className="text-xs text-text-muted font-normal"> /30</span>
          </p>
          <p className="text-[10px] text-text-muted font-medium">80% rate</p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-warning-tint border border-warning/20">
          <p className="text-[10px] text-warning font-medium uppercase tracking-wide">At Risk</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">3</p>
          <p className="text-[10px] text-warning font-semibold">↑ 1 new</p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface border border-border">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Avg. Assignment</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">{avgAssignment}</p>
          <p className="text-[10px] text-success font-semibold">↑ +2 pts</p>
        </div>
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface border border-border">
          <p className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Completion</p>
          <p className="text-[1.25rem] font-bold text-text-primary leading-none">{completionRate}%</p>
          <p className="text-[10px] text-success font-semibold">↑ +3%</p>
        </div>
      </div>

      {/* 7-day bar chart */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">7-Day Engagement Trend</p>
          <p className="text-[10px] text-text-muted">avg. 63.3</p>
        </div>
        <div className="flex items-end gap-1.5 h-16">
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

      {/* Student table */}
      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_2.5rem_3rem_5.5rem_4rem] items-center py-1.5 border-b border-border gap-x-3">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Student</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide text-right">Avg</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Trend</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Status</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Last Active</p>
        </div>
        {STUDENTS.map((s, i) => (
          <motion.div
            key={s.initials}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.06, ease: EASE }}
            className="grid grid-cols-[1fr_2.5rem_3rem_5.5rem_4rem] items-center py-2 border-b border-border/60 last:border-0 gap-x-3"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-brand">{s.initials}</span>
              </div>
              <span className="text-label text-text-primary truncate">{s.name}</span>
            </div>
            <span className="text-label font-semibold text-text-primary text-right">{s.score}</span>
            <Sparkline values={s.trend} />
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-center ${STATUS_STYLE[s.status].cls}`}>
              {STATUS_STYLE[s.status].label}
            </span>
            <span className="text-[10px] text-text-muted">{s.lastActive}</span>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-0.5">Recent Activity</p>
        {[
          { text: 'Fatima N. submitted Assignment 7', time: '2m ago',  dot: 'bg-brand'   },
          { text: 'Asel J. completed Quiz 3',         time: '18m ago', dot: 'bg-brand'   },
          { text: 'Bogdan P. missed session',         time: '1h ago',  dot: 'bg-warning' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.dot}`} />
            <span className="text-[10px] text-text-secondary flex-1">{item.text}</span>
            <span className="text-[10px] text-text-muted">{item.time}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
```

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Overview tab shows 6 stat tiles (3×2 grid), 7-day chart, student table with Last Active column, Recent Activity feed.

### Step 4: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: enrich OverviewPanel — 6-stat grid, Last Active column, Recent Activity feed"
```

---

## Task 4: Upgrade EngagementPanel — 4 chips + taller chart + 5 flagged rows

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Expand `AT_RISK_ROWS`

Find the `AT_RISK_ROWS` constant (around line 32). Replace it:

```tsx
const AT_RISK_ROWS = [
  { initials: 'BP', name: 'Bogdan P.', since: '3d ago', attend: 62 },
  { initials: 'KL', name: 'Kira L.',   since: '2d ago', attend: 68 },
  { initials: 'OS', name: 'Omar S.',   since: '5d ago', attend: 55 },
  { initials: 'ML', name: 'Mila L.',   since: '1d ago', attend: 71 },
  { initials: 'TN', name: 'Timur N.', since: '4d ago', attend: 58 },
]
```

### Step 2: Replace `EngagementPanel`

Replace the entire `EngagementPanel` function:

```tsx
function EngagementPanel() {
  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Engagement</p>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-success bg-success-tint rounded-full px-2.5 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          Live signals
        </span>
      </div>

      {/* Attendance bar chart */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Daily Attendance</p>
          <p className="text-[10px] text-text-muted">This week</p>
        </div>
        <div className="flex items-end gap-3 h-28">
          {ENGAGEMENT_BARS.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-semibold text-text-muted">{v}%</span>
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

      {/* 4 stat chips */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Avg. Attendance</span>
          <span className="text-label font-bold text-text-primary">86%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">On-time Submit</span>
          <span className="text-label font-bold text-text-primary">91%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Avg. Session</span>
          <span className="text-label font-bold text-text-primary">34 min</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Repeat Visits</span>
          <span className="text-label font-bold text-text-primary">78%</span>
        </div>
      </div>

      {/* Flagged student rows */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-1.5 border-b border-border">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Flagged Students</p>
          <p className="text-[10px] text-text-muted">Last active · Attendance</p>
        </div>
        {AT_RISK_ROWS.map((r, i) => (
          <motion.div
            key={r.initials}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.07, ease: EASE }}
            className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0"
          >
            <AlertTriangle size={13} className="text-warning flex-shrink-0" strokeWidth={2} />
            <div className="w-6 h-6 rounded-full bg-warning-tint flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-warning">{r.initials}</span>
            </div>
            <span className="text-label text-text-primary flex-1">{r.name}</span>
            <span className="text-[10px] text-text-muted">{r.since}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              r.attend < 65 ? 'bg-danger-tint text-danger' : 'bg-warning-tint text-warning'
            }`}>
              {r.attend}%
            </span>
          </motion.div>
        ))}
      </div>

      {/* Warning banner */}
      <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/30 bg-warning-tint">
        <AlertTriangle size={14} className="text-warning flex-shrink-0 mt-0.5" strokeWidth={2} />
        <div>
          <p className="text-label font-semibold text-text-primary">5 students flagged for disengagement</p>
          <p className="mt-0.5 text-[10px] text-text-secondary leading-relaxed">
            Review recommended before next assessment on Friday.
          </p>
        </div>
      </div>

    </div>
  )
}
```

Note: the warning banner text updated to "5 students" to match the expanded row count.

### Step 3: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Engagement tab shows taller bar chart with value labels above bars, 4 stat chips in 2×2 grid, 5 flagged rows, warning banner.

### Step 4: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: enrich EngagementPanel — taller chart, 4 stat chips, 5 flagged rows"
```

---

## Task 5: Upgrade GrowthPanel — 3 stat chips + Top Performers list

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Replace `GrowthPanel`

Replace the entire `GrowthPanel` function:

```tsx
function GrowthPanel() {
  const W = 460
  const H = 110
  const { line, fill, lastX, lastY } = buildLinePath(GROWTH_POINTS, GROWTH_MAX, W, H)
  const pathLen = W * 1.4

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Growth</p>
        <span className="text-[10px] font-semibold text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5">
          7-week view
        </span>
      </div>

      {/* SVG line chart */}
      <div className="flex flex-col gap-1 rounded-lg bg-surface border border-border p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 110 }} preserveAspectRatio="none">
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={0} y1={H * t}
              x2={W} y2={H * t}
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="1"
            />
          ))}
          <path d={fill} fill="rgba(37,99,235,0.06)" />
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
        <div className="flex justify-between mt-1">
          {GROWTH_POINTS.map((_, i) => (
            <span key={i} className="text-[10px] text-text-muted">W{i + 1}</span>
          ))}
        </div>
      </div>

      {/* 3 stat chips */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Cohort Growth</span>
          <span className="text-label font-bold text-brand">+14%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Consistency</span>
          <span className="text-label font-bold text-text-primary">88</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Top Performer</span>
          <span className="text-label font-bold text-brand">Fatima N.</span>
        </div>
      </div>

      {/* Weekly breakdown */}
      <div className="flex flex-col">
        <div className="grid grid-cols-[2rem_2.5rem_1fr_4.5rem] items-center py-1.5 border-b border-border gap-x-3">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Wk</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Avg</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Progress</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide text-right">Change</p>
        </div>
        {GROWTH_POINTS.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.5 + i * 0.05 }}
            className="grid grid-cols-[2rem_2.5rem_1fr_4.5rem] items-center py-2 border-b border-border/60 last:border-0 gap-x-3"
          >
            <span className="text-[10px] font-semibold text-text-muted">W{i + 1}</span>
            <span className="text-label font-semibold text-text-primary">{v}</span>
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-brand"
                initial={{ width: 0 }}
                animate={{ width: `${(v / GROWTH_MAX) * 100}%` }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.05, ease: EASE }}
              />
            </div>
            <span className={`text-[10px] font-semibold text-right ${i === 0 ? 'text-text-muted' : 'text-success'}`}>
              {GROWTH_DELTA[i]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Top Performers */}
      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-0.5">Top Performers</p>
        {[
          { rank: 1, initials: 'FN', name: 'Fatima N.', score: 91 },
          { rank: 2, initials: 'AJ', name: 'Asel J.',   score: 84 },
          { rank: 3, initials: 'ZS', name: 'Zara S.',   score: 74 },
        ].map((p) => (
          <div key={p.rank} className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-text-muted w-4">{p.rank}</span>
            <div className="w-[22px] h-[22px] rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
              <span className="text-[9px] font-bold text-brand">{p.initials}</span>
            </div>
            <span className="text-label text-text-primary flex-1">{p.name}</span>
            <span className="text-label font-bold text-brand">{p.score}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
```

### Step 2: Verify build

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors. Growth tab shows 3-chip row, weekly breakdown, Top Performers list with avatars.

### Step 3: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: enrich GrowthPanel — 3 stat chips, Top Performers mini-list"
```

---

## Task 6: Window height + bottom fade + snappier tab transition

**Files:**
- Modify: `src/components/sections/SolutionInstitution.tsx`

### Step 1: Add `min-h-[540px]` and `relative` to body div

In `DemoWindow`, find:

```tsx
      {/* Body: sidebar + content */}
      <div className="flex">
```

Replace with:

```tsx
      {/* Body: sidebar + content */}
      <div className="flex min-h-[540px] relative">
```

### Step 2: Add bottom fade overlay inside the body div

Inside the body div, add the fade overlay as the **last child** (after the content area closing `</div>` and before the body div's own closing `</div>`):

```tsx
        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
```

The body div should now look like:

```tsx
      {/* Body: sidebar + content */}
      <div className="flex min-h-[540px] relative">

        {/* Sidebar */}
        <div className="w-[200px] ...">
          ...
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          ...
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

      </div>
```

### Step 3: Tighten tab transition

In `DemoWindow`, find the `motion.div` inside `AnimatePresence`:

```tsx
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="p-6"
            >
```

Replace with:

```tsx
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="p-6"
            >
```

### Step 4: Verify build + visual smoke test

```bash
npm run build 2>&1 | tail -20
```

Expected: no errors.

Then run dev and check manually:

```bash
npm run dev
```

Open `http://localhost:3000/en?role=institution`, scroll to the section and verify:

- Demo window is noticeably taller (~540px+ of content area)
- Bottom of window fades smoothly to white — no hard edge visible
- Sidebar shows: workspace header (blue E icon + EduReview + Admin + chevron) → ANALYTICS group → MANAGE group (greyed)
- Interior header bar shows breadcrumb + Spring 2026 badge + AD avatar
- Overview tab: 6 tiles (3×2), chart, 5-column student table, Recent Activity feed
- Engagement tab: taller bar chart with % labels, 4 chips, 5 flagged rows
- Growth tab: 3 chips, weekly breakdown, Top Performers list
- Tab switching: slide distance feels more decisive, animation slightly faster

### Step 5: Commit

```bash
git add src/components/sections/SolutionInstitution.tsx
git commit -m "feat: add window min-height, bottom fade overlay, snappier tab transitions"
```

---

## Summary of All Commits

| Commit | Change |
|---|---|
| `feat: add ContentHeader bar with breadcrumb, semester badge, and avatar` | Task 1 |
| `feat: upgrade sidebar with workspace header, section labels, and 6 inactive nav items` | Task 2 |
| `feat: enrich OverviewPanel — 6-stat grid, Last Active column, Recent Activity feed` | Task 3 |
| `feat: enrich EngagementPanel — taller chart, 4 stat chips, 5 flagged rows` | Task 4 |
| `feat: enrich GrowthPanel — 3 stat chips, Top Performers mini-list` | Task 5 |
| `feat: add window min-height, bottom fade overlay, snappier tab transitions` | Task 6 |

**Total files changed:** `src/components/sections/SolutionInstitution.tsx` only.
