import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

export const faqs = [
  {
    q: 'Is BwithU free?',
    a: 'Yes. Everyone gets 10 free minutes a day, and a single call can run up to 10 minutes. No card, no trial.',
  },
  {
    q: 'Do I need to download an app or make an account?',
    a: 'No. Open app.bwithu.live in your browser, pick a companion and start talking. There’s nothing to install or sign up for.',
  },
  {
    q: 'Is it a real person?',
    a: 'No. Your companion is an AI with a lifelike face and voice. It will always tell you it’s an AI if you ask.',
  },
  {
    q: 'Are my calls recorded?',
    a: 'No. Your voice is sent to our AI providers to understand you and reply in real time, and then it’s gone. We don’t store audio or transcripts.',
  },
  {
    q: 'Which devices work?',
    a: 'Chrome, Safari and Edge on phones, tablets and computers. Headphones give the smoothest conversation, so your companion doesn’t hear itself.',
  },
  {
    q: 'What languages can I speak?',
    a: 'English works best today. Your companion understands many languages and tries to reply in the one you speak.',
  },
  {
    q: 'Can I make a companion from my own photo?',
    a: 'Soon. Join the list above and we’ll email you when it’s ready. Custom companions will be private to you.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="container-x max-w-[880px]">
        <SectionHeader eyebrow="FAQ" title="Questions, answered." />

        <Reveal className="mt-14">
          <ul className="glass divide-y divide-line overflow-hidden rounded-[28px]">
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`${base}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${base}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-[17px] font-medium transition-colors hover:bg-white/[0.02] sm:px-8 sm:py-6 sm:text-[18px]"
                    >
                      {f.q}
                      <Plus size={20} className={`shrink-0 text-ink-3 transition-transform duration-300 ${isOpen ? 'rotate-45 text-cyan' : ''}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${base}-a${i}`}
                        role="region"
                        aria-labelledby={`${base}-q${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl px-6 pb-6 text-[15.5px] leading-relaxed text-ink-3 sm:px-8">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
