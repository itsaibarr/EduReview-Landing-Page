'use client'

import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type Role = 'institution' | 'student' | null

const NAV_LINKS: Record<NonNullable<Role>, Array<{ label: string; href: string }>> = {
  institution: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'For Schools',  href: '#for-schools' },
    { label: 'For Teachers', href: '#for-teachers' },
    { label: 'About',        href: '#about' },
  ],
  student: [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Progress',     href: '#progress' },
    { label: 'About',        href: '#about' },
  ],
}

const CTA: Record<NonNullable<Role>, { label: string; href: string }> = {
  institution: { label: 'Join the Pilot',  href: '#pilot-cta' },
  student:     { label: 'Join Waitlist',   href: '#waitlist-cta' },
}

/**
 * Floating island navbar — centered bordered container, NOT edge-to-edge.
 * Logo left, links center, CTA right — all within one rounded container.
 * Hidden when no role is selected (split entry screen).
 */
export function Navbar() {
  const searchParams = useSearchParams()
  const param = searchParams.get('role')
  const role: Role = param === 'institution' || param === 'student' ? param : null

  return (
    <AnimatePresence>
      {role && (
        <motion.div
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
        >
          {/*
            The island container.
            pl-5: logo gets comfortable left padding
            pr-2: CTA button sits flush to the right edge with its own padding
            Asymmetry is intentional — mirrors CoreShift composition.
          */}
          <nav
            className="
              flex items-center gap-8
              pl-5 pr-4 py-4
              bg-white/92 backdrop-blur-[16px]
              border border-border rounded-2xl
              shadow-nav
              min-w-[1000px] md:min-w-[1200px]
            "
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 text-[17px] font-bold text-text-primary tracking-tight hover:opacity-75 transition-opacity duration-150"
            >
              <LogoMark />
              EduReview
            </Link>

            {/* Nav links — centered, hidden on mobile */}
            <ul className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {NAV_LINKS[role].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-label text-text-secondary hover:text-text-primary transition-colors duration-150 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA — rounded-md (10px), not pill. Pill is for hero CTA only. */}
            <Button
              href={CTA[role].href}
              variant="primary"
              size="default"
              className="shrink-0"
            >
              {CTA[role].label}
            </Button>
          </nav>
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
