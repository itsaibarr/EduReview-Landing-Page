'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { BarChart2, Activity, TrendingUp, AlertTriangle, BookOpen, Users, ClipboardList, FileText, PieChart, Settings, ChevronDown } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

// ─── Data ────────────────────────────────────────────────────────────────────

const OVERVIEW_BARS = [42, 58, 53, 67, 71, 74, 78]
const OVERVIEW_BAR_MAX = 80
const OVERVIEW_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

type StudentStatus = 'top' | 'on-track' | 'risk'

const STUDENTS: { initials: string; name: string; score: number; trend: number[]; status: StudentStatus }[] = [
  { initials: 'AJ', name: 'Asel J.',   score: 84, trend: [70, 75, 76, 82, 80, 84], status: 'on-track' },
  { initials: 'DK', name: 'Dmitry K.', score: 79, trend: [68, 70, 74, 77, 75, 79], status: 'on-track' },
  { initials: 'FN', name: 'Fatima N.', score: 91, trend: [83, 85, 87, 90, 89, 91], status: 'top'      },
  { initials: 'BP', name: 'Bogdan P.', score: 61, trend: [65, 60, 58, 62, 59, 61], status: 'risk'     },
  { initials: 'ZS', name: 'Zara S.',   score: 74, trend: [69, 72, 70, 73, 71, 74], status: 'on-track' },
]

const STATUS_STYLE: Record<StudentStatus, { label: string; cls: string }> = {
  top:        { label: 'Top',      cls: 'bg-success-tint text-success'   },
  'on-track': { label: 'On Track', cls: 'bg-brand-50 text-brand'         },
  risk:       { label: 'At Risk',  cls: 'bg-warning-tint text-warning'   },
}

const AT_RISK_ROWS = [
  { initials: 'BP', name: 'Bogdan P.', since: '3d ago', attend: 62 },
  { initials: 'KL', name: 'Kira L.',   since: '2d ago', attend: 68 },
  { initials: 'OS', name: 'Omar S.',   since: '5d ago', attend: 55 },
]

const ENGAGEMENT_BARS    = [78, 85, 72, 91, 88]
const ENGAGEMENT_BAR_MAX = 95
const ENGAGEMENT_LABELS  = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const GROWTH_POINTS = [38, 45, 51, 58, 63, 71, 78]
const GROWTH_MAX    = 85
const GROWTH_DELTA  = ['Baseline', '+7 pts', '+6 pts', '+7 pts', '+5 pts', '+8 pts', '+7 pts']

// ─── Hooks ───────────────────────────────────────────────────────────────────

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

// ─── Micro-components ────────────────────────────────────────────────────────

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

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-[2px] h-[14px] w-[42px]">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-[1px]"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === values.length - 1
              ? '#2563EB'
              : `rgba(37,99,235,${0.2 + (i / values.length) * 0.4})`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Panels ──────────────────────────────────────────────────────────────────

type Tab = 'overview' | 'engagement' | 'growth'

function OverviewPanel() {
  const classAvg    = useCounter(78)
  const submitted   = useCounter(93)
  const activeCount = useCounter(24)

  return (
    <div className="flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Overview</p>
        <span className="text-[10px] font-semibold text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5">
          Week 7 of 12
        </span>
      </div>

      {/* 4-stat row */}
      <div className="grid grid-cols-4 gap-2">
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
        <div className="grid grid-cols-[1fr_2.5rem_3rem_5.5rem] items-center py-1.5 border-b border-border gap-x-3">
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Student</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide text-right">Avg</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Trend</p>
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">Status</p>
        </div>
        {STUDENTS.map((s, i) => (
          <motion.div
            key={s.initials}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.06, ease: EASE }}
            className="grid grid-cols-[1fr_2.5rem_3rem_5.5rem] items-center py-2 border-b border-border/60 last:border-0 gap-x-3"
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
          </motion.div>
        ))}
      </div>

    </div>
  )
}

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
        <div className="flex items-end gap-3 h-20">
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

      {/* Stat chips */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Avg. Attendance</span>
          <span className="text-label font-bold text-text-primary">86%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">On-time Submit</span>
          <span className="text-label font-bold text-text-primary">91%</span>
        </div>
      </div>

      {/* At-risk student rows */}
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

      {/* Warning summary */}
      <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/30 bg-warning-tint">
        <AlertTriangle size={14} className="text-warning flex-shrink-0 mt-0.5" strokeWidth={2} />
        <div>
          <p className="text-label font-semibold text-text-primary">3 students flagged for disengagement</p>
          <p className="mt-0.5 text-[10px] text-text-secondary leading-relaxed">
            Review recommended before next assessment on Friday.
          </p>
        </div>
      </div>

    </div>
  )
}

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

      {/* Stat chips */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Cohort Growth</span>
          <span className="text-label font-bold text-brand">+14%</span>
        </div>
        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-surface border border-border">
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wide">Consistency</span>
          <span className="text-label font-bold text-text-primary">88</span>
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

    </div>
  )
}

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

// ─── DemoWindow ───────────────────────────────────────────────────────────────

const NAV_ITEMS: { id: Tab; label: string }[] = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'engagement', label: 'Engagement' },
  { id: 'growth',     label: 'Growth'     },
]

const INACTIVE_NAV_ITEMS = [
  { id: 'classes',     label: 'Classes',     icon: <BookOpen     size={15} strokeWidth={1.5} /> },
  { id: 'students',    label: 'Students',    icon: <Users        size={15} strokeWidth={1.5} /> },
  { id: 'assignments', label: 'Assignments', icon: <ClipboardList size={15} strokeWidth={1.5} /> },
  { id: 'reports',     label: 'Reports',     icon: <FileText     size={15} strokeWidth={1.5} /> },
  { id: 'analytics',   label: 'Analytics',   icon: <PieChart     size={15} strokeWidth={1.5} /> },
  { id: 'settings',    label: 'Settings',    icon: <Settings     size={15} strokeWidth={1.5} /> },
]

function getNavIcon(id: Tab) {
  switch (id) {
    case 'overview':   return <BarChart2  size={15} strokeWidth={1.5} />
    case 'engagement': return <Activity   size={15} strokeWidth={1.5} />
    case 'growth':     return <TrendingUp size={15} strokeWidth={1.5} />
  }
}

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

      {/* Interior header */}
      <ContentHeader />

      {/* Body: sidebar + content */}
      <div className="flex">

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

        {/* Content area */}
        <div className="flex-1 overflow-hidden">
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

// ─── Section ─────────────────────────────────────────────────────────────────

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
