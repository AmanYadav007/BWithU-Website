import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { site } from '../lib/site'

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
    a: 'English, Hindi and Hinglish, or Spanish. Pick your language before the call, and your companion talks with you in it, in a natural voice. In Hinglish they mix Hindi and English the way friends really do.',
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
      <div className="container-x grid gap-12 border-t border-line pt-20 sm:pt-28 lg:grid-cols-[440px_1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="h2 mt-4">
            Questions, <br className="hidden lg:block" />
            answered.
          </h2>
          <p className="mt-8 text-[15px] text-ink-3">Still curious?</p>
          <a href={`mailto:${site.email}`} className="mt-2 inline-flex items-center gap-2.5 text-[16px] font-semibold text-ink hover:text-cyan-soft">
            <Mail size={20} className="text-cyan-soft" /> {site.email}
          </a>
        </Reveal>

        <Reveal>
          <ul>
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      id={`${base}-q${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`${base}-a${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold tracking-[-0.01em] sm:text-[19px]"
                    >
                      {f.q}
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                          isOpen ? 'border-cyan/60 bg-cyan/12 text-cyan' : 'border-white/12 bg-white/5 text-ink-2 group-hover:text-ink'
                        }`}
                      >
                        <Plus size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                      </span>
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
                        <p className="max-w-[36rem] pb-7 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
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
