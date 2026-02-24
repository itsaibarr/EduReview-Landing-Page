'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Flame } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const FEATURES = [
  'See your real engagement score — not just a grade',
  'Track growth relative to your own personal baseline',
  'Watch your momentum build week over week',
]

const WEEK_BARS = [38, 52, 49, 61, 67, 74, 82]
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const BAR_MAX = 85

// Circle: r=40, circumference ≈ 251.3
const RADIUS = 40
const CIRC = 2 * Math.PI * RADIUS
const SCORE = 82
const SCORE_DASH = (SCORE / 100) * CIRC

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

function ProgressMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
      className="w-full max-w-[420px] rounded-2xl border border-border bg-white shadow-lg overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="ml-3 text-caption text-text-muted font-medium">Learning Momentum</span>
      </div>

      <div className="p-6 flex flex-col gap-5">

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
                whileInView={{ strokeDasharray: `${SCORE_DASH} ${CIRC}` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[1.375rem] font-bold text-text-primary leading-none">{SCORE}</span>
            </div>
          </div>
          <div>
            <p className="text-label font-semibold text-text-primary">Engagement Score</p>
            <p className="mt-1 text-caption text-success font-medium">↑ +6 from last week</p>
            <p className="mt-2 text-caption text-text-muted leading-snug">
              Based on attendance, submissions,<br />and improvement trend.
            </p>
          </div>
        </div>

        {/* Stat chips */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
            <p className="text-[1.1rem] font-bold text-brand leading-none">+14%</p>
            <p className="text-caption text-text-muted text-center">Growth</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-0.5">
              <Flame size={13} className="text-warning" />
              <p className="text-[1.1rem] font-bold text-text-primary leading-none">9</p>
            </div>
            <p className="text-caption text-text-muted text-center">Day streak</p>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-surface border border-border">
            <p className="text-[1.1rem] font-bold text-text-primary leading-none">Top 18%</p>
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
                  whileInView={{ height: `${(v / BAR_MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: EASE }}
                />
                <span className="text-[10px] text-text-muted">{WEEK_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export function SolutionStudent() {
  return (
    <section className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left — progress mockup */}
        <div className="flex-1 flex justify-center lg:justify-start w-full">
          <ProgressMockup />
        </div>

        {/* Right — text */}
        <div className="flex-1 max-w-[480px]">
          <FadeUp>
            <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
              Your Progress
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-4">
            <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
              See your effort become
              <br />
              visible <span className="text-brand">growth.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-5">
            <p className="text-body-lg text-text-secondary leading-relaxed">
              EduReview builds a real-time picture of your learning momentum —
              tracking the behaviors that actually drive progress, not just the
              score at the end of the semester.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-8 flex flex-col gap-3">
            {FEATURES.map((f) => (
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
