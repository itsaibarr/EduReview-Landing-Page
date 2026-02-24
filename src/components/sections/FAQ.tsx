'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

type Item = { q: string; a: string | string[] }

const INSTITUTION_FAQS: Item[] = [
  {
    q: 'What data does EduReview actually use?',
    a: [
      'Attendance records and consistency patterns',
      'Assignment submission timing and completion rates',
      'Grade improvement trends over time',
      'No new data collection — only what your school already produces',
    ],
  },
  {
    q: 'Does this require any teacher input or extra workload?',
    a: 'No. EduReview reads existing academic data automatically. Teachers do not need to change any workflows, learn new tools, or enter additional information.',
  },
  {
    q: 'How does the pilot programme work?',
    a: 'We onboard your institution, connect to your data source (CSV import to start, full integration later), and deliver a working engagement dashboard within two weeks. The pilot runs for one semester with full support from our team.',
  },
  {
    q: 'How is student data handled and kept private?',
    a: 'Student data is stored securely and never sold or shared with third parties. Individual scores are only visible to authorised institution staff. All data handling complies with applicable data protection regulations.',
  },
  {
    q: 'Which systems do you currently integrate with?',
    a: 'We currently support manual and CSV-based data import. Native integration with Kundelik is in active development and will be available in the next phase.',
  },
  {
    q: 'Is there a cost to join the pilot?',
    a: 'The pilot programme is free for the initial semester. We are focused on validating the product with a small number of institutions before moving to a paid model.',
  },
]

const STUDENT_FAQS: Item[] = [
  {
    q: 'What does the Engagement Score actually measure?',
    a: [
      'Attendance consistency and punctuality patterns',
      'Assignment completion rate and submission timing',
      'Grade improvement relative to your own personal baseline',
      'Overall learning momentum across the semester',
    ],
  },
  {
    q: 'Can my teachers or school see my score?',
    a: 'Your Engagement Score is personal by default. Aggregated, anonymised data may be visible to your institution, but your individual score and details are yours alone unless you choose to share them.',
  },
  {
    q: 'When will I get access to the platform?',
    a: 'We are rolling out access school by school. Join the waitlist and we will notify you as soon as your school is on board. Priority access goes to students who sign up early.',
  },
  {
    q: 'Is this just another grade tracker?',
    a: 'No. EduReview does not track grades — it tracks learning behavior. We measure the patterns that predict growth: consistency, effort, improvement trend. Your score can rise even when a single grade stays flat.',
  },
  {
    q: 'Is EduReview free for students?',
    a: 'Yes. EduReview is free for students, always. The platform is funded through institutional partnerships, so you never pay.',
  },
]

function AccordionItem({ item, isOpen, onToggle }: {
  item: Item
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-border-subtle last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-body font-semibold text-text-primary group-hover:text-brand transition-colors duration-150">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex-shrink-0 text-text-muted group-hover:text-brand transition-colors duration-150"
        >
          <ChevronDown size={18} strokeWidth={1.75} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-8">
              {Array.isArray(item.a) ? (
                <ul className="flex flex-col gap-2">
                  {item.a.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-[7px]" />
                      <p className="text-body text-text-secondary leading-relaxed">{line}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-body text-text-secondary leading-relaxed">{item.a}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQList({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-12 max-w-[760px] mx-auto">
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  )
}

export function FAQInstitution() {
  return (
    <section id="faq" className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center"
        >
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-[440px] mx-auto leading-relaxed">
            Everything you need to know before applying for the pilot.
          </p>
        </motion.div>

        <FAQList items={INSTITUTION_FAQS} />
      </div>
    </section>
  )
}

export function FAQStudent() {
  return (
    <section id="faq" className="py-28 px-6 bg-white border-t border-border-subtle">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: EASE }}
          className="text-center"
        >
          <h2 className="text-h1 font-bold text-text-primary leading-[1.1] tracking-[-0.03em]">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-[440px] mx-auto leading-relaxed">
            Everything you need to know before joining the waitlist.
          </p>
        </motion.div>

        <FAQList items={STUDENT_FAQS} />
      </div>
    </section>
  )
}
