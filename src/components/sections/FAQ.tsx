'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

const EASE = [0.16, 1, 0.3, 1] as const

type Item = { q: string; a: string | string[] }

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
  const t = useTranslations('FAQInstitution')
  const items = t.raw('items') as Item[]

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
            {t('headline')}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-[440px] mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <FAQList items={items} />
      </div>
    </section>
  )
}

export function FAQStudent() {
  const t = useTranslations('FAQStudent')
  const items = t.raw('items') as Item[]

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
            {t('headline')}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-[440px] mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <FAQList items={items} />
      </div>
    </section>
  )
}
