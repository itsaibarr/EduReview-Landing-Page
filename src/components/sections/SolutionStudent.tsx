'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Flame, TrendingUp, Zap, Target, Award, BookOpen, ClipboardList, Settings, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

const WEEK_BARS = [38, 52, 49, 61, 67, 74, 82]
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const BAR_MAX = 85

// Circle: r=40, circumference ≈ 251.3
const RADIUS = 40
const CIRC = 2 * Math.PI * RADIUS
const SCORE = 82
const SCORE_DASH = (SCORE / 100) * CIRC

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

// ─── Panel Components ────────────────────────────────────────────────────────

function ProgressView() {
  const score = useCounter(PROGRESS_STATS.score)
  const growth = useCounter(PROGRESS_STATS.growth)
  const streak = useCounter(PROGRESS_STATS.streak)
  const rank = useCounter(PROGRESS_STATS.rank)

  return (
    <div className="flex flex-col gap-4 md:gap-5">

      {/* Engagement score ring */}
      <div className="flex items-center gap-4 md:gap-5">
        <div className="relative flex-shrink-0">
          <svg width="80" height="80" viewBox="0 0 96 96" className="md:w-[96px] md:h-[96px]">
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
            <span className="text-[1.125rem] md:text-[1.375rem] font-bold text-text-primary leading-none">{score}</span>
          </div>
        </div>
        <div>
          <p className="text-label font-semibold text-text-primary">Engagement Score</p>
          <p className="mt-1 text-caption text-success font-medium">↑ +{PROGRESS_STATS.scoreChange} from last week</p>
          <p className="mt-2 text-caption text-text-muted leading-snug hidden md:block">
            Based on attendance, submissions,<br />and improvement trend.
          </p>
        </div>
      </div>

      {/* Stat chips */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl bg-surface border border-border">
          <p className="text-[1rem] md:text-[1.1rem] font-bold text-brand leading-none">+{growth}%</p>
          <p className="text-[10px] md:text-caption text-text-muted text-center">Growth</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl bg-surface border border-border">
          <div className="flex items-center gap-0.5">
            <Flame size={12} className="text-warning md:w-[13px] md:h-[13px]" />
            <p className="text-[1rem] md:text-[1.1rem] font-bold text-text-primary leading-none">{streak}</p>
          </div>
          <p className="text-[10px] md:text-caption text-text-muted text-center">Day streak</p>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl bg-surface border border-border">
          <p className="text-[1rem] md:text-[1.1rem] font-bold text-text-primary leading-none">Top {rank}%</p>
          <p className="text-[10px] md:text-caption text-text-muted text-center">Rank</p>
        </div>
      </div>

      {/* Weekly bars */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] md:text-caption text-text-muted font-medium">This week</p>
        <div className="flex items-end gap-1 md:gap-1.5 h-10 md:h-12">
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
              <span className="text-[9px] md:text-[10px] text-text-muted">{WEEK_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

function MomentumView() {
  const streak = useCounter(PROGRESS_STATS.streak)
  const completedDays = CONSISTENCY_DAYS.filter(d => d.completed).length

  return (
    <div className="flex flex-col gap-4 md:gap-5">

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
        <div className="flex gap-1.5 md:gap-2">
          {CONSISTENCY_DAYS.map((d, i) => (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05, ease: EASE }}
              className={`flex-1 flex flex-col items-center gap-1 md:gap-1.5 p-1.5 md:p-2 rounded-lg border ${
                d.completed
                  ? 'bg-brand-50 border-brand/20'
                  : 'bg-surface border-border'
              }`}
            >
              <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${
                d.completed ? 'bg-brand' : 'bg-border'
              }`}>
                {d.completed && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="md:w-[12px] md:h-[12px]">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[9px] md:text-[10px] text-text-muted">{d.day}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Streak card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
        className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl bg-gradient-to-r from-warning/10 to-warning/5 border border-warning/20"
      >
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-warning/20">
          <Flame size={20} className="text-warning md:w-[24px] md:h-[24px]" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[1.25rem] md:text-[1.5rem] font-bold text-text-primary leading-none">{streak}</span>
            <span className="text-[11px] md:text-label text-text-muted">Day Streak</span>
          </div>
          <p className="mt-0.5 text-[10px] md:text-caption text-text-secondary hidden md:block">Keep going! 1 more day to reach 10.</p>
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

      {/* Message - hidden on mobile */}
      <div className="hidden md:flex items-center gap-2 p-3 rounded-lg bg-success-tint border border-success/20">
        <Zap size={14} className="text-success flex-shrink-0" />
        <p className="text-label text-text-secondary">
          Your consistency is paying off — <span className="font-semibold text-success">+12% improvement</span> this month
        </p>
      </div>

    </div>
  )
}

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
    <div className="flex flex-col gap-4 md:gap-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-label font-bold text-text-primary">Growth Journey</p>
        <span className="text-[10px] font-semibold text-text-muted bg-surface border border-border rounded-full px-2.5 py-0.5">
          7 weeks
        </span>
      </div>

      {/* Journey line chart */}
      <div className="flex flex-col gap-2 rounded-lg bg-surface border border-border p-3 md:p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 70 }} preserveAspectRatio="none">
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
        <div className="flex justify-between mt-1 md:mt-2">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={m.week}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.1, ease: EASE }}
              className="flex flex-col items-center"
            >
              <span className="text-[9px] md:text-[10px] font-semibold text-brand">{m.label}</span>
              <span className="text-[8px] md:text-[9px] text-text-muted">W{m.week}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Before vs Now comparison */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
          className="flex flex-col gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl bg-surface border border-border"
        >
          <p className="text-[9px] md:text-[10px] font-semibold text-text-muted uppercase tracking-wide">Before</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[1rem] md:text-[1.25rem] font-bold text-text-muted leading-none">{beforeScore}</span>
            <span className="text-[10px] md:text-caption text-text-muted">score</span>
          </div>
          <div className="flex flex-col gap-0.5 hidden md:flex">
            <p className="text-[10px] text-text-muted">Rank: <span className="font-medium text-text-secondary">Top {JOURNEY_BEFORE.rank}%</span></p>
            <p className="text-[10px] text-text-muted">Streak: <span className="font-medium text-text-secondary">{JOURNEY_BEFORE.streak} days</span></p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6, ease: EASE }}
          className="flex flex-col gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl bg-brand-50 border border-brand/20"
        >
          <p className="text-[9px] md:text-[10px] font-semibold text-brand uppercase tracking-wide">Now</p>
          <div className="flex items-baseline gap-1">
            <span className="text-[1rem] md:text-[1.25rem] font-bold text-brand leading-none">{nowScore}</span>
            <span className="text-[10px] md:text-caption text-brand/70">score</span>
          </div>
          <div className="flex flex-col gap-0.5 hidden md:flex">
            <p className="text-[10px] text-brand/70">Rank: <span className="font-semibold text-brand">Top {JOURNEY_NOW.rank}%</span></p>
            <p className="text-[10px] text-brand/70">Streak: <span className="font-semibold text-brand">{JOURNEY_NOW.streak} days</span></p>
          </div>
        </motion.div>
      </div>

      {/* Achievement message - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
        className="hidden md:flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-brand/10 to-brand/5 border border-brand/20"
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

// ─── Demo Window ──────────────────────────────────────────────────────────────

const TAB_ITEMS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'progress', label: 'Progress', icon: <TrendingUp size={15} strokeWidth={1.5} /> },
  { id: 'momentum', label: 'Momentum', icon: <Zap size={15} strokeWidth={1.5} /> },
  { id: 'journey', label: 'Journey', icon: <Target size={15} strokeWidth={1.5} /> },
]

const INACTIVE_NAV_ITEMS = [
  { id: 'courses', label: 'Courses', icon: <BookOpen size={15} strokeWidth={1.5} /> },
  { id: 'schedule', label: 'Schedule', icon: <ClipboardList size={15} strokeWidth={1.5} /> },
  { id: 'achievements', label: 'Achievements', icon: <Award size={15} strokeWidth={1.5} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={15} strokeWidth={1.5} /> },
]

function getNavIcon(id: Tab) {
  switch (id) {
    case 'progress': return <TrendingUp size={15} strokeWidth={1.5} />
    case 'momentum': return <Zap size={15} strokeWidth={1.5} />
    case 'journey':   return <Target size={15} strokeWidth={1.5} />
  }
}

function StudentDemoWindow() {
  const [activeTab, setActiveTab] = useState<Tab>('progress')

  const panels: Record<Tab, React.ReactNode> = {
    progress: <ProgressView />,
    momentum: <MomentumView />,
    journey: <JourneyView />,
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
        <span className="absolute left-1/2 -translate-x-1/2 text-caption text-text-muted font-medium hidden sm:block">
          edureview.app/student
        </span>
      </div>

      {/* Interior header */}
      <div className="flex items-center justify-between px-4 h-11 border-b border-border bg-white">
        <div className="flex items-center text-label">
          <span className="font-semibold text-text-primary">My Progress</span>
          <span className="text-text-muted mx-2 hidden sm:inline">/</span>
          <span className="text-text-muted hidden sm:inline">Fall 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold bg-surface border border-border rounded-full px-2.5 py-0.5 text-text-muted">
            Week 7
          </span>
          <div className="w-[26px] h-[26px] rounded-full bg-brand-50 flex items-center justify-center">
            <span className="text-[9px] font-bold text-brand">AS</span>
          </div>
        </div>
      </div>

      {/* Mobile tab bar - visible only on mobile */}
      <div className="flex border-b border-border bg-white md:hidden">
        {TAB_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={[
              'flex-1 flex items-center justify-center gap-1.5 py-3 text-label transition-colors duration-150',
              activeTab === id
                ? 'text-brand font-semibold border-b-2 border-brand'
                : 'text-text-muted',
            ].join(' ')}
          >
            {icon}
            <span className="text-[11px]">{label}</span>
          </button>
        ))}
      </div>

      {/* Body: sidebar + content */}
      <div className="flex min-h-[320px] md:min-h-[540px] relative">

        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:flex w-[200px] flex-shrink-0 border-r border-border bg-white flex-col">

          {/* Workspace header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <div className="w-[22px] h-[22px] rounded-md bg-brand flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-white">E</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label font-bold text-text-primary leading-none">EduReview</p>
              <p className="text-[10px] text-text-muted leading-none mt-0.5">Student</p>
            </div>
            <ChevronDown size={14} className="text-text-muted flex-shrink-0" />
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-1 p-3 flex-1">
            <p className="px-3 text-[10px] font-semibold text-text-muted uppercase tracking-wide mb-1">
              Progress
            </p>
            {TAB_ITEMS.map(({ id, label }) => (
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
              Menu
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="p-4 md:p-6"
            >
              {panels[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />

      </div>
    </div>
  )
}

export function SolutionStudent() {
  const t = useTranslations('SolutionStudent')

  return (
    <section id="how-it-works" className="py-16 md:py-28 px-4 md:px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        {/* Centered header */}
        <div className="text-center max-w-[600px] mx-auto">
          <FadeUp>
            <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
              {t('eyebrow')}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-4">
            <h2 className="text-h2 md:text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
              {t('headline.line1')}
              <br />
              {t('headline.line2')}<span className="text-brand">{t('headline.highlight')}</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-5">
            <p className="text-body md:text-body-lg text-text-secondary leading-relaxed max-w-[480px] mx-auto">
              {t('description')}
            </p>
          </FadeUp>
        </div>

        {/* Demo window */}
        <FadeUp delay={0.3} className="mt-10 md:mt-16">
          <div className="md:scale-[0.85] md:origin-top md:flex md:justify-center">
            <StudentDemoWindow />
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
