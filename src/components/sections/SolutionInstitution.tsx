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
