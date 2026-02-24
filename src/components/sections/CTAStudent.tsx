'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

type Status = 'idle' | 'loading' | 'success'

const inputClass = [
  'w-full px-4 py-3 rounded-md border border-border bg-white',
  'text-body text-text-primary placeholder:text-text-muted',
  'transition-all duration-150',
  'focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand',
].join(' ')

export function CTAStudent() {
  const [status, setStatus] = useState<Status>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1400)
  }

  return (
    <section id="waitlist-cta" className="py-28 px-6 bg-surface border-t border-border-subtle">
      <div className="max-w-[600px] mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center"
        >
          <p className="text-caption text-brand font-semibold tracking-[0.12em] uppercase">
            Early Access
          </p>
          <h2 className="mt-4 text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
            Be first to see your
            <br />
            <span className="text-brand">real progress.</span>
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary leading-relaxed max-w-[420px] mx-auto">
            Join the waitlist. We&apos;re opening early access for students
            whose schools are part of the pilot.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mt-10 p-8 rounded-2xl border border-border bg-white shadow-sm"
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-50">
                <CheckCircle2 size={28} className="text-brand" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-h3 font-semibold text-text-primary">You&apos;re on the list</p>
                <p className="mt-2 text-body text-text-secondary">
                  We&apos;ll notify you when access opens at your school. Thank you.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">Your name</label>
                  <input required className={inputClass} placeholder="Amir Seitkali" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label font-medium text-text-primary">Email</label>
                  <input required type="email" className={inputClass} placeholder="you@mail.com" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">School or university</label>
                <input required className={inputClass} placeholder="Nazarbayev University" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label font-medium text-text-primary">
                  What frustrates you most about how grades work?{' '}
                  <span className="text-text-muted font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="e.g. I study more than my friends but get the same grade…"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-brand text-white! font-semibold text-[15px] [box-shadow:0_4px_0_0_#1D4ED8] hover:translate-y-0.5 hover:[box-shadow:0_2px_0_0_#1D4ED8] active:translate-y-1 active:[box-shadow:0_0px_0_0_#1D4ED8] transition-all duration-[120ms] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:[box-shadow:0_4px_0_0_#1D4ED8]"
              >
                {status === 'loading' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>Join the Waitlist <ArrowRight size={16} /></>
                )}
              </button>

              <p className="text-caption text-text-muted text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  )
}
