'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

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

export function HeroInstitution() {
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
          maskImage: 'linear-gradient(to bottom, white 120%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 120%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-[700px] mx-auto">

        <FadeUp delay={0.1}>
          <Badge>For Schools &amp; Universities</Badge>
        </FadeUp>

        <FadeUp delay={0.22} className="mt-5">
          {/*
            Headline: two lines, explicit breaks.
            "learning." is the ONE word in blue — editorial, not decorative.
            No CSS gradient text.
          */}
          <h1 className="text-[2.625rem] md:text-display font-bold text-text-primary leading-[1.08] tracking-[-0.04em]">
            See who&apos;s{' '}
            <span className="text-brand">learning.</span>
            <br />
            Not just who&apos;s passing.
          </h1>
        </FadeUp>

        <FadeUp delay={0.36} className="mt-5">
          <p className="text-body-lg text-text-secondary max-w-[520px] leading-relaxed">
            Turn your existing academic data into engagement signals —
            with zero extra workload for teachers.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Button href="#pilot-cta" variant="primary" size="hero">
            Join the Pilot
          </Button>
          <Button href="#how-it-works" variant="text" size="hero" className="!px-0 !py-0 text-[15px]">
            See how it works <ArrowRight size={15} />
          </Button>
        </FadeUp>

        {/* Social proof strip */}
        <FadeUp delay={0.65} className="mt-14">
          <SocialProof />
        </FadeUp>
      </div>

      <ScrollHint />
    </section>
  )
}

function SocialProof() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-caption text-text-muted">Currently in early access with</p>
      <div className="flex items-center gap-8 opacity-40">
        {['Nazarbayev University', 'KIMEP', 'SDU'].map((name) => (
          <span key={name} className="text-label font-semibold text-text-secondary whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScrollHint() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Scroll down" role="img">
        <path d="M10 4v12M6 12l4 4 4-4" stroke="#8B92AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
