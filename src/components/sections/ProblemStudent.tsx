'use client'

import { motion } from 'framer-motion'
import { EyeOff, TrendingDown, Compass } from 'lucide-react'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const
const ICONS = [EyeOff, TrendingDown, Compass]

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

export function ProblemStudent() {
  const t = useTranslations('ProblemStudent')
  const problems = t.raw('problems') as Array<{ title: string; body: string }>

  return (
    <section id="problem" className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center">
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            {t('eyebrow')}
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-4 text-center">
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em] max-w-[580px] mx-auto">
            {t('headline.line1')}
            <br />
            {t('headline.line2')}<span className="text-brand">{t('headline.highlight')}</span>
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary max-w-[480px] mx-auto leading-relaxed">
            {t('description')}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {problems.map(({ title, body }, i) => {
            const Icon = ICONS[i]
            return (
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
            )
          })}
        </div>

      </div>
    </section>
  )
}
