'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, TrendingUp, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

const BAR_VALUES = [42, 58, 53, 67, 71, 74, 78]
const BAR_MAX = 80

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

function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
      className="w-full max-w-[460px] rounded-2xl border border-border bg-white shadow-lg overflow-hidden"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-surface">
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
        <span className="ml-3 text-caption text-text-muted font-medium">Engagement Overview</span>
        <span className="ml-auto text-caption text-text-muted">Week 7 of 12</span>
      </div>

      <div className="p-6 flex flex-col gap-4">

        {/* Top stat row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Class average */}
          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-1.5 text-caption text-text-muted">
              <Users size={12} strokeWidth={1.5} />
              Class Avg.
            </div>
            <p className="text-[2rem] font-bold text-text-primary leading-none tracking-tight">78</p>
            <div className="flex items-center gap-1 text-caption text-success font-medium">
              <TrendingUp size={11} strokeWidth={2} />
              +4 pts this week
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex flex-col gap-1.5 p-4 rounded-xl bg-surface border border-border">
            <p className="text-caption text-text-muted">7-Day Trend</p>
            <div className="flex items-end gap-1 h-10 mt-auto">
              {BAR_VALUES.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${(v / BAR_MAX) * 100}%`,
                    background: i === BAR_VALUES.length - 1
                      ? '#2563EB'
                      : `rgba(37,99,235,${0.15 + (i / BAR_VALUES.length) * 0.35})`,
                  }}
                />
              ))}
            </div>
            <p className="text-caption text-success font-medium">↑ 12% growth</p>
          </div>
        </div>

        {/* Active students bar */}
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface border border-border">
          <div className="flex items-center justify-between">
            <p className="text-caption text-text-muted font-medium">Engagement Spread</p>
            <p className="text-caption text-text-secondary font-semibold">24 / 30 active</p>
          </div>
          <div className="h-2 w-full rounded-full bg-brand-100 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-brand"
              initial={{ width: 0 }}
              whileInView={{ width: '80%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>
        </div>

        {/* Early warning */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-warning/30 bg-warning-tint">
          <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" strokeWidth={1.75} />
          <div>
            <p className="text-label font-semibold text-text-primary">Early Warning</p>
            <p className="mt-0.5 text-caption text-text-secondary leading-relaxed">
              3 students showing disengagement signals — review recommended before next assessment.
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export function SolutionInstitution() {
  const t = useTranslations('SolutionInstitution')
  const features = t.raw('features') as string[]

  return (
    <section id="how-it-works" className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

        {/* Left — text */}
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

        {/* Right — dashboard mockup */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <DashboardMockup />
        </div>

      </div>
    </section>
  )
}
