'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import { scrollTo } from '@/lib/scroll'

const EASE = [0.16, 1, 0.3, 1] as const

function FadeUp({ children, delay = 0, className }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function AnnouncementBadge({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-black/[0.08] bg-white text-[13px] leading-none select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
      <span className="font-semibold text-text-primary">{label}</span>
      <span className="w-px h-3 bg-black/[0.12] flex-shrink-0" />
      <span className="text-text-muted">{detail}</span>
      <ArrowRight size={12} className="text-text-muted flex-shrink-0" />
    </div>
  )
}

export function HeroStudent() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">
      {/* Grid texture — isolated in its own layer so the mask doesn't affect content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: [
            'linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, white 45%, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 45%, transparent 75%)',
        }}
      />

      <div className="flex flex-col items-center text-center max-w-[840px] mx-auto">

        <FadeUp delay={0.1}>
          <AnnouncementBadge label="Beta" detail="Join the student waitlist" />
        </FadeUp>

        <FadeUp delay={0.22} className="mt-5">
          <h1 className="text-[2.625rem] md:text-display font-bold text-text-primary leading-[1.08] tracking-[-0.04em]">
            Your effort{' '}
            <span className="text-brand">deserves</span>
            <br />
            to be seen.
          </h1>
        </FadeUp>

        <FadeUp delay={0.36} className="mt-5">
          <p className="text-body-lg text-text-secondary max-w-[520px] leading-relaxed">
            Track your real progress, not just your grades.
            See your learning momentum grow.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Button
            href="#waitlist-cta"
            onClick={(e) => { e.preventDefault(); scrollTo('#waitlist-cta') }}
            variant="primary"
            size="hero"
          >
            Join Waitlist
          </Button>
          <Button
            href="#how-it-works"
            onClick={(e) => { e.preventDefault(); scrollTo('#how-it-works') }}
            variant="text"
            size="hero"
            className="!px-0 !py-0 text-[15px]"
          >
            Learn more <ArrowRight size={15} />
          </Button>
        </FadeUp>

        <FadeUp delay={0.65} className="mt-14">
          <p className="text-caption text-text-muted">
            Join students from Almaty, Astana, and beyond
          </p>
        </FadeUp>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Scroll down" role="img">
          <path d="M10 4v12M6 12l4 4 4-4" stroke="#8B92AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
