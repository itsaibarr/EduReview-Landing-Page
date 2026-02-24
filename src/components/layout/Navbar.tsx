'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { scrollTo } from '@/lib/scroll'

type Role = 'institution' | 'student' | null

const NAV_LINKS: Record<NonNullable<Role>, Array<{ label: string; href: string }>> = {
  institution: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Who it\'s for', href: '#value-blocks' },
    { label: 'FAQ',          href: '#faq' },
  ],
  student: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'FAQ',          href: '#faq' },
  ],
}

const CTA: Record<NonNullable<Role>, { label: string; href: string }> = {
  institution: { label: 'Join the Pilot', href: '#pilot-cta' },
  student:     { label: 'Join Waitlist',  href: '#waitlist-cta' },
}

const EASE = [0.16, 1, 0.3, 1] as const

export function Navbar() {
  const searchParams = useSearchParams()
  const param = searchParams.get('role')
  const role: Role = param === 'institution' || param === 'student' ? param : null
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <AnimatePresence>
      {role && (
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          /* Mobile: stretch edge-to-edge with margin. Desktop: center as island. */
          className="fixed top-4 sm:top-6 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50"
        >
          {/* ── Island bar ── */}
          <nav className="
            flex items-center gap-4
            pl-4 sm:pl-5 pr-3 sm:pr-4 py-3 sm:py-3.5
            bg-white/92 backdrop-blur-[16px]
            border border-border rounded-2xl
            shadow-nav
            sm:min-w-[600px] lg:min-w-[820px]
          ">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 text-[16px] font-bold text-text-primary tracking-tight hover:opacity-75 transition-opacity duration-150"
            >
              <LogoMark />
              EduReview
            </Link>

            {/* Desktop nav links — hidden on mobile */}
            <ul className="hidden sm:flex items-center gap-6 flex-1 justify-center">
              {NAV_LINKS[role].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                    className="text-label text-text-secondary hover:text-text-primary transition-colors duration-150 whitespace-nowrap cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <Button
              href={CTA[role].href}
              onClick={(e) => { e.preventDefault(); scrollTo(CTA[role].href) }}
              variant="primary"
              size="default"
              className="hidden sm:inline-flex shrink-0 ml-auto"
            >
              {CTA[role].label}
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="sm:hidden ml-auto p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-all duration-150"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </nav>

          {/* ── Mobile dropdown menu ── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="sm:hidden mt-2 flex flex-col gap-1 p-3 bg-white/96 backdrop-blur-[16px] border border-border rounded-2xl shadow-nav"
              >
                {NAV_LINKS[role].map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                      // Small delay lets the menu animate out before scrolling
                      setTimeout(() => scrollTo(link.href), 160)
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.18, ease: EASE }}
                    className="px-4 py-3 rounded-xl text-body text-text-secondary hover:text-text-primary hover:bg-surface transition-all duration-150 cursor-pointer"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="mt-1 pt-2 border-t border-border-subtle">
                  <Button
                    href={CTA[role].href}
                    variant="primary"
                    size="default"
                    className="w-full justify-center"
                    onClick={(e) => {
                      e.preventDefault()
                      setMobileOpen(false)
                      setTimeout(() => scrollTo(CTA[role].href), 160)
                    }}
                  >
                    {CTA[role].label}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LogoMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M5.5 13 Q10 6.5 14.5 13" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="10" cy="10" r="2" fill="#2563EB" />
    </svg>
  )
}
