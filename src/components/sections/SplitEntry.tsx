'use client'

import { useRouter } from '@/i18n/routing'
import { motion } from 'framer-motion'
import { Building2, GraduationCap } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { LocaleNameSwitcher } from '@/components/ui/LocaleNameSwitcher'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Split entry screen — minimal gateway, not a content section.
 * Two clean choice cards on white.
 * No visual decoration; the clarity IS the design.
 */
export function SplitEntry() {
  const router = useRouter()
  const t = useTranslations('SplitEntry')

  const PATHS = [
    {
      role: 'institution' as const,
      Icon: Building2,
      label: t('institution.label'),
      description: t('institution.description'),
    },
    {
      role: 'student' as const,
      Icon: GraduationCap,
      label: t('student.label'),
      description: t('student.description'),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="text-center mb-12"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="11" stroke="#2563EB" strokeWidth="1.5" />
            <path d="M6.5 16 Q12 8 17.5 16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <circle cx="12" cy="12" r="2.5" fill="#2563EB" />
          </svg>
          <span className="text-[17px] font-bold text-text-primary tracking-tight">EduReview</span>
        </div>

        <h2 className="text-h1 font-bold text-text-primary">{t('heading')}</h2>
        <p className="mt-3 text-body text-text-secondary">
          {t('subheading')}
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
        {PATHS.map(({ role, Icon, label, description }, i) => (
          <motion.button
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: EASE }}
            onClick={() => router.push(`/?role=${role}` as any)}
            className="
              group flex-1
              flex flex-col items-start gap-4
              p-8 rounded-xl
              border border-border bg-white text-left
              cursor-pointer
              hover:border-brand-200 hover:shadow-md hover:-translate-y-0.5
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2
            "
          >
            <div className="p-2.5 rounded-lg bg-brand-50 group-hover:bg-brand-100 transition-colors duration-150">
              <Icon size={20} strokeWidth={1.5} className="text-brand" />
            </div>
            <div>
              <p className="font-semibold text-[17px] text-text-primary tracking-tight">{label}</p>
              <p className="mt-1.5 text-body text-text-secondary leading-relaxed">{description}</p>
            </div>
            <div className="mt-auto flex items-center gap-1 text-label text-brand font-medium group-hover:gap-2 transition-all duration-150">
              {t('getStarted')}
              <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.32, ease: EASE }}
        className="mt-8"
      >
        <LocaleNameSwitcher />
      </motion.div>
    </div>
  )
}
