'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export function Footer() {
  const t = useTranslations('Footer')

  const NAV = [
    {
      heading: t('nav.product.heading'),
      links: [
        { label: t('nav.product.howItWorks'), href: '#how-it-works' },
        { label: t('nav.product.forInstitutions'), href: '/?role=institution' },
        { label: t('nav.product.forStudents'), href: '/?role=student' },
        { label: t('nav.product.joinPilot'), href: '#pilot-cta' },
      ],
    },
    {
      heading: t('nav.company.heading'),
      links: [
        { label: t('nav.company.about'), href: '#' },
        { label: t('nav.company.contact'), href: 'mailto:hello@edureview.kz' },
        { label: t('nav.company.privacy'), href: '#' },
        { label: t('nav.company.terms'), href: '#' },
      ],
    },
  ]

  return (
    <footer className="border-t border-border-subtle bg-white">
      {/* Top row */}
      <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-10 flex flex-col sm:flex-row items-start justify-between gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-3 max-w-[260px]">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" stroke="#2563EB" strokeWidth="1.5" />
              <path d="M6.5 16 Q12 8 17.5 16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="12" cy="12" r="2.5" fill="#2563EB" />
            </svg>
            <span className="text-[16px] font-bold text-text-primary tracking-tight">EduReview</span>
          </div>
          <p className="text-caption text-text-muted leading-relaxed">
            {t('tagline')}
          </p>
          <a
            href="mailto:hello@edureview.kz"
            className="text-caption text-brand font-medium hover:underline underline-offset-2 w-fit"
          >
            hello@edureview.kz →
          </a>
        </div>

        {/* Nav columns */}
        <div className="flex gap-16">
          {NAV.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <p className="text-caption font-semibold text-text-primary tracking-wide uppercase">
                {heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href as any}
                      className="text-body text-text-muted hover:text-text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-border-subtle">
        <div className="max-w-[1100px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-text-muted">
            {t('copyright')}
          </p>

          {/* Language switcher — natural home in footer */}
          <div className="flex items-center gap-3">
            <span className="text-caption text-text-muted">{t('language')}</span>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-text-primary transition-colors duration-150"
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
