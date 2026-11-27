import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { site } from '../lib/site'

export const faqs = [
  { q: 'Is it free?', a: `Yes. ${site.freeMinutes} free minutes a day, no sign-up.` },
  { q: 'Is it private?', a: 'We don’t store your call audio or transcripts. What she remembers about you is saved on your device, not our servers, and you can delete it anytime.' },
  { q: 'Which languages?', a: 'English, Hindi, Hinglish and Spanish.' },
  { q: 'Do I need an app?', a: 'No. It works in your browser, on your phone or computer.' },
  { q: 'Is she a real person?', a: 'No. She’s an AI companion, with a lifelike face and voice.' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="container-x max-w-[760px]">
        <SectionHeader eyebrow="FAQ" title="Quick answers." align="center" />
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`${base}-b${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-p${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[18px] font-semibold"
                  >
                    {f.q}
                    <Plus aria-hidden size={20} className={`shrink-0 text-ink-2 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${base}-p${i}`}
                      role="region"
                      aria-labelledby={`${base}-b${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
