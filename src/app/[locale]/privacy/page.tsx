import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

export default function PrivacyPage() {
  const t = useTranslations('Privacy')

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

          <Section number={1} title={t('sections.infoWeCollect.title')}>
            <SubSection title={t('sections.infoWeCollect.infoYouProvide')}>
              <p>{t('sections.infoWeCollect.intro')}</p>
              <ul>
                <li>{t('sections.infoWeCollect.items.email')}</li>
                <li>{t('sections.infoWeCollect.items.name')}</li>
                <li>{t('sections.infoWeCollect.items.role')}</li>
                <li>{t('sections.infoWeCollect.items.organization')}</li>
                <li>{t('sections.infoWeCollect.items.voluntary')}</li>
              </ul>
            </SubSection>

            <SubSection title={t('sections.infoWeCollect.infoAuto')}>
              <p>{t('sections.infoWeCollect.autoIntro')}</p>
              <ul>
                <li>{t('sections.infoWeCollect.autoItems.browser')}</li>
                <li>{t('sections.infoWeCollect.autoItems.ip')}</li>
                <li>{t('sections.infoWeCollect.autoItems.pages')}</li>
                <li>{t('sections.infoWeCollect.autoItems.referral')}</li>
                <li>{t('sections.infoWeCollect.autoItems.analytics')}</li>
              </ul>
              <p className="text-text-muted">{t('sections.infoWeCollect.autoPurpose')}</p>
            </SubSection>
          </Section>

          <Section number={2} title={t('sections.howWeUse.title')}>
            <p>{t('sections.howWeUse.intro')}</p>
            <ul>
              <li>{t('sections.howWeUse.items.waitlist')}</li>
              <li>{t('sections.howWeUse.items.updates')}</li>
              <li>{t('sections.howWeUse.items.patterns')}</li>
              <li>{t('sections.howWeUse.items.improve')}</li>
              <li>{t('sections.howWeUse.items.respond')}</li>
            </ul>
            <div className="callout callout-info flex items-center gap-2">
              <div className="callout-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              </div>
              <p><strong>{t('sections.howWeUse.noSale')}</strong></p>
            </div>
          </Section>

          <Section number={3} title={t('sections.thirdParty.title')}>
            <p>{t('sections.thirdParty.intro')}</p>
            <ul>
              <li>{t('sections.thirdParty.items.hosting')}</li>
              <li>{t('sections.thirdParty.items.analytics')}</li>
              <li>{t('sections.thirdParty.items.email')}</li>
            </ul>
            <p className="text-text-muted">{t('sections.thirdParty.note')}</p>
          </Section>

          <Section number={4} title={t('sections.dataStorage.title')}>
            <p>{t('sections.dataStorage.intro')}</p>
            <p className="text-text-muted">{t('sections.dataStorage.security')}</p>
          </Section>

          <Section number={5} title={t('sections.dataRetention.title')}>
            <p>{t('sections.dataRetention.intro')}</p>
            <ul>
              <li>{t('sections.dataRetention.items.operate')}</li>
              <li>{t('sections.dataRetention.items.communicate')}</li>
              <li>{t('sections.dataRetention.items.plan')}</li>
            </ul>
            <p>{t('sections.dataRetention.deletion')}</p>
          </Section>

          <Section number={6} title={t('sections.children.title')}>
            <p>{t('sections.children.intro')}</p>
            <ul>
              <li>{t('sections.children.items.informational')}</li>
              <li>{t('sections.children.items.noTracking')}</li>
              <li>{t('sections.children.items.noRecords')}</li>
            </ul>
            <p className="text-text-muted">{t('sections.children.contact')}</p>
          </Section>

          <Section number={7} title={t('sections.cookies.title')}>
            <p>{t('sections.cookies.intro')}</p>
            <ul>
              <li>{t('sections.cookies.items.functioning')}</li>
              <li>{t('sections.cookies.items.patterns')}</li>
              <li>{t('sections.cookies.items.performance')}</li>
            </ul>
            <p className="text-text-muted">{t('sections.cookies.control')}</p>
          </Section>

          <Section number={8} title={t('sections.externalLinks.title')}>
            <p>{t('sections.externalLinks.intro')}</p>
          </Section>

          <Section number={9} title={t('sections.changes.title')}>
            <p>{t('sections.changes.intro')}</p>
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

// SubSection Component
function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-body font-semibold text-text-primary mb-3">{title}</h3>
      {children}
    </div>
  )
}
