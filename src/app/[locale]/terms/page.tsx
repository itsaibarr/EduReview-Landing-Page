import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export default function TermsPage() {
  const t = useTranslations('Terms')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-white/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" stroke="#2563EB" strokeWidth="1.5" />
              <path d="M6.5 16 Q12 8 17.5 16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <circle cx="12" cy="12" r="2.5" fill="#2563EB" />
            </svg>
            <span className="text-[15px] font-semibold text-text-primary tracking-tight group-hover:text-brand transition-colors">EduReview</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              href="/" 
              className="text-[13px] font-medium text-text-muted hover:text-brand transition-colors flex items-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {t('backToHome')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-brand-50 text-brand text-[11px] font-semibold uppercase tracking-wider">
              Legal
            </span>
          </div>
          <h1 className="text-h2 text-text-primary mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
            {t('title')}
          </h1>
          <p className="text-body text-text-muted">
            {t('lastUpdated')}: <time dateTime="2026-02-25">February 25, 2026</time>
          </p>
        </div>

        {/* Content */}
        <article className="prose-policy">
          <p className="text-body-lg text-text-secondary leading-relaxed mb-8">
            {t('intro')}
          </p>

          <Section number={1} title={t('sections.nature.title')}>
            <p>{t('sections.nature.intro')}</p>
            <ul>
              <li>{t('sections.nature.items.landing')}</li>
              <li>{t('sections.nature.items.waitlist')}</li>
            </ul>
            <p className="text-text-muted">{t('sections.nature.note')}</p>
            <p className="text-text-muted">{t('sections.nature.noGuarantee')}</p>
          </Section>

          <Section number={2} title={t('sections.eligibility.title')}>
            <p>{t('sections.eligibility.intro')}</p>
            <ul>
              <li>{t('sections.eligibility.items.age')}</li>
              <li>{t('sections.eligibility.items.permission')}</li>
            </ul>
          </Section>

          <Section number={3} title={t('sections.waitlist.title')}>
            <p>{t('sections.waitlist.intro')}</p>
            <ul>
              <li>{t('sections.waitlist.items.contact')}</li>
              <li>{t('sections.waitlist.items.accurate')}</li>
            </ul>
            <p className="text-text-muted">{t('sections.waitlist.removal')}</p>
          </Section>

          <Section number={4} title={t('sections.acceptableUse.title')}>
            <p>{t('sections.acceptableUse.intro')}</p>
            <ul>
              <li>{t('sections.acceptableUse.items.unlawful')}</li>
              <li>{t('sections.acceptableUse.items.interfere')}</li>
              <li>{t('sections.acceptableUse.items.malicious')}</li>
              <li>{t('sections.acceptableUse.items.impersonate')}</li>
            </ul>
          </Section>

          <Section number={5} title={t('sections.intellectualProperty.title')}>
            <p>{t('sections.intellectualProperty.intro')}</p>
            <p className="text-text-muted">{t('sections.intellectualProperty.note')}</p>
          </Section>

          <Section number={6} title={t('sections.noWarranty.title')}>
            <p>{t('sections.noWarranty.intro')}</p>
            <p>{t('sections.noWarranty.notGuarantee')}</p>
            <ul>
              <li>{t('sections.noWarranty.items.availability')}</li>
              <li>{t('sections.noWarranty.items.accuracy')}</li>
              <li>{t('sections.noWarranty.items.uninterrupted')}</li>
            </ul>
          </Section>

          <Section number={7} title={t('sections.limitation.title')}>
            <p>{t('sections.limitation.intro')}</p>
            <ul>
              <li>{t('sections.limitation.items.losses')}</li>
              <li>{t('sections.limitation.items.inability')}</li>
              <li>{t('sections.limitation.items.reliance')}</li>
            </ul>
          </Section>

          <Section number={8} title={t('sections.changesService.title')}>
            <p>{t('sections.changesService.intro')}</p>
          </Section>

          <Section number={9} title={t('sections.changesTerms.title')}>
            <p>{t('sections.changesTerms.intro')}</p>
          </Section>

          <Section number={10} title={t('sections.contact.title')}>
            <p>{t('sections.contact.intro')}</p>
            <div className="callout callout-contact flex items-center gap-2">
              <div className="callout-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <a href="mailto:hello@sharedureview.site" className="text-brand font-medium hover:underline">
                hello@sharedureview.site
              </a>
            </div>
          </Section>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-text-muted">
            <p>© 2026 EduReview. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-brand transition-colors">{t('privacy')}</Link>
              <Link href="/terms" className="hover:text-brand transition-colors">{t('terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Section Component
function Section({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-3 text-h3 text-text-primary mb-4 group">
        <span className="flex-shrink-0 w-7 h-7 rounded-md bg-brand-50 text-brand text-[13px] font-bold flex items-center justify-center">
          {number}
        </span>
        {title}
      </h2>
      <div className="pl-10">
        {children}
      </div>
    </section>
  )
}