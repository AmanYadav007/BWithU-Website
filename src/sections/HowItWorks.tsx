import { motion, useReducedMotion } from 'framer-motion'
import { Globe, UserRound, Video, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'

const steps: { icon: LucideIcon; ring: string; title: string; body: string }[] = [
  { icon: UserRound, ring: 'border-aurora', title: 'Pick a companion', body: 'Four companions, each with her own voice and personality. Listen to each one first.' },
  { icon: Globe, ring: 'border-iris', title: 'Pick your language', body: 'English, Hindi and Hinglish, or Spanish. On your first call they ask what to call you.' },
  { icon: Video, ring: 'border-cyan', title: 'Start talking', body: 'Allow the microphone and they pick up and say hi. Speak naturally. That’s it.' },
]

const ease = [0.22, 1, 0.36, 1] as const

export function HowItWorks() {
  const reduce = useReducedMotion()
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="sm:text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="h2 mt-4">Talking in under a minute.</h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-6">
          {/* The line that joins the steps: across on desktop, down on phones. */}
          <span aria-hidden className="absolute top-9 right-[16.6%] left-[16.6%] hidden h-0.5 bg-white/10 md:block" />
          <motion.span
            aria-hidden
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.2, ease }}
            className="absolute top-9 right-[16.6%] left-[16.6%] hidden h-0.5 origin-left bg-gradient-to-r from-aurora via-iris to-cyan md:block"
          />
          <motion.span
            aria-hidden
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.2, ease }}
            className="absolute top-9 bottom-24 left-[35px] w-0.5 origin-top bg-gradient-to-b from-aurora via-iris to-cyan md:hidden"
          />

          {steps.map((s, i) => {
            const last = i === steps.length - 1
            return (
              <motion.li
                key={s.title}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.6, delay: 0.4 * i, ease }}
                className="relative flex gap-6 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <span
                  className={`relative grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full border-2 ${s.ring} ${
                    last ? 'bg-gradient-to-br from-aurora-deep via-violet to-cyan' : 'bg-space-2'
                  } shadow-[0_0_40px_-6px_rgb(168_85_247/0.5)]`}
                >
                  <s.icon size={26} />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold tracking-[0.15em] text-ink-3 md:mt-8">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.015em] sm:text-[24px]">{s.title}</h3>
                  <p className="mt-2 max-w-[18.5rem] text-[15.5px] leading-relaxed text-ink-3 md:mx-auto">{s.body}</p>
                </span>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
