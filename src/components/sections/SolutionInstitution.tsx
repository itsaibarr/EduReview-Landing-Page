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
