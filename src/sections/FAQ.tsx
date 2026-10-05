import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

export const faqs = [
  {
    q: 'Is BwithU free?',
    a: 'Yes. During the beta it’s free, with friendly daily limits so it stays fast for everyone. Live voice calls run up to 10 minutes each.',
  },
  {
    q: 'Do I need an API key or an account?',
    a: 'No. Install it, pick a companion, and start talking. There’s nothing to sign up for and no keys to paste.',
  },
  {
    q: 'Is B listening all the time?',
    a: 'No. B only hears you while the mic is on, and you turn it on yourself. Your audio is never recorded or stored.',
  },
  {
    q: 'What can B see on my screen?',
    a: 'When you talk to B, it reads the title, address and visible text of your open tabs (up to 12) so it can answer questions about them. It doesn’t look at pages when you’re not using it.',
  },
  {
    q: 'Can B control my browser?',
    a: 'A little, and only with your OK. B can open a site, switch to a tab, run a search, or draft a Google Calendar invite for you to review. It asks before doing any of these.',
  },
  {
    q: 'Which browsers does it work in?',
    a: 'Chrome 116 or newer, on Mac, Windows, Linux and ChromeOS. Desktop apps for macOS and Windows are on the way.',
  },
  {
    q: 'Can I change my companion’s name or face?',
    a: 'Yes. You name them on day one, and you can pick between companions. Custom companions made from your own photo are coming soon.',
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
