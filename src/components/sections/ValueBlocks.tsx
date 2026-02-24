'use client'

import { motion } from 'framer-motion'
import { BarChart3, Zap, Target } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const BLOCKS = [
  {
    role: 'For Admins',
    Icon: BarChart3,
    title: 'Actionable engagement analytics',
    points: [
      'Class-level and student-level engagement scores',
      'Early warning signals before grades drop',
      'Weekly trend reports — no extra setup',
    ],
  },
  {
    role: 'For Teachers',
    Icon: Zap,
    title: 'Zero extra workload',
    points: [
      'No new tools to learn or workflows to change',
      'Insights derived from data you already produce',
      'Alerts surface automatically when they matter',
    ],
  },
  {
    role: 'For Institutions',
    Icon: Target,
    title: 'Decisions backed by real data',
    points: [
      'Detect disengagement patterns across cohorts',
      'KPI-ready engagement reporting built in',
      'Pilot-friendly — lightweight onboarding, fast results',
    ],
  },
]

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

export function ValueBlocks() {
  return (
    <section className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center">
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            Built for Everyone
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-4 text-center">
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em] max-w-[560px] mx-auto">
            One platform.
            <br />
            Three <span className="text-brand">audiences.</span>
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary max-w-[480px] mx-auto leading-relaxed">
            EduReview fits into how your school already works —
            delivering value at every level without disruption.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {BLOCKS.map(({ role, Icon, title, points }, i) => (
            <FadeUp key={role} delay={0.15 + i * 0.1}>
              <div className="h-full flex flex-col gap-6 p-7 rounded-xl border border-border bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                      <Icon size={17} strokeWidth={1.5} className="text-brand" />
                    </div>
                    <span className="text-caption text-brand font-semibold tracking-wide uppercase">
                      {role}
                    </span>
                  </div>
                  <h3 className="text-h3 font-semibold text-text-primary leading-snug">{title}</h3>
                </div>

                <ul className="flex flex-col gap-2.5 mt-auto">
                  {points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-[7px]" />
                      <p className="text-body text-text-secondary leading-snug">{pt}</p>
                    </li>
                  ))}
                </ul>

              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
