'use client'

import { motion } from 'framer-motion'
import { BarChart3, Zap, Target } from 'lucide-react'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const
const ICONS = [BarChart3, Zap, Target]

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
  const t = useTranslations('ValueBlocks')
  const blocks = t.raw('blocks') as Array<{ role: string; title: string; points: string[] }>

  return (
    <section id="value-blocks" className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">

        <FadeUp className="text-center">
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            {t('eyebrow')}
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="mt-4 text-center">
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em] max-w-[560px] mx-auto">
            {t('headline.line1')}
            <br />
            {t('headline.line2')}<span className="text-brand">{t('headline.highlight')}</span>
          </h2>
          <p className="mt-5 text-body-lg text-text-secondary max-w-[480px] mx-auto leading-relaxed">
            {t('description')}
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {blocks.map(({ role, title, points }, i) => {
            const Icon = ICONS[i]
            return (
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
            )
          })}
        </div>

      </div>
    </section>
  )
}
