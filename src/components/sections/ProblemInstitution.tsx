'use client'

import { motion } from 'framer-motion'
import { BarChart3, Clock, DatabaseZap } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

const PROBLEMS = [
  {
    Icon: BarChart3,
    title: 'Grades miss the picture',
    body: 'Schools track scores, not learning behavior. Disengagement builds silently — invisible until it\'s too late to act.',
  },
  {
    Icon: Clock,
    title: 'Signals arrive too late',
    body: 'By the time grades drop, intervention windows have passed. The warning was always there — just unreadable.',
  },
  {
    Icon: DatabaseZap,
    title: 'Data exists. Insight doesn\'t.',
    body: 'Academic systems collect mountains of data but surface no engagement signal. Numbers sit idle, decisions stay guesswork.',
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

export function ProblemInstitution() {
  return (
    <section className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center">
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            The Challenge
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-4 text-center">
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em] max-w-[600px] mx-auto">
            Grades show results.
            <br />
            They hide <span className="text-brand">progress.</span>
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary max-w-[500px] mx-auto leading-relaxed">
            The gap between how students experience learning and how institutions
            measure it — that&apos;s where disengagement hides.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {PROBLEMS.map(({ Icon, title, body }, i) => (
            <FadeUp key={title} delay={0.18 + i * 0.1}>
              <div className="h-full flex flex-col gap-5 p-7 rounded-xl border border-border bg-white hover:border-brand-200 hover:shadow-sm transition-all duration-200">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                  <Icon size={18} strokeWidth={1.5} className="text-brand" />
                </div>
                <div>
                  <h3 className="text-h3 font-semibold text-text-primary">{title}</h3>
                  <p className="mt-2.5 text-body text-text-secondary leading-relaxed">{body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
