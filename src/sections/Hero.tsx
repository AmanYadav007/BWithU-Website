import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, Hand, Play } from 'lucide-react'
import { CallMock } from '../components/CallMock'
import { appLink, site } from '../lib/site'

const ease = [0.22, 1, 0.36, 1] as const
const benefits = [
  { label: 'No app or sign-up', dot: 'bg-aurora' },
  { label: `${site.freeMinutes} free minutes a day`, dot: 'bg-iris' },
  { label: 'Phone or desktop', dot: 'bg-cyan' },
]

export function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section className="relative overflow-x-clip pt-24 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div aria-hidden className="glow-aurora pointer-events-none absolute -top-40 -left-40 h-[820px] w-[900px]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_440px] lg:gap-12 xl:grid-cols-[1fr_480px]">
        <div>
          <motion.span {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full border border-white/14 bg-white/[0.03] px-4 py-2 text-[13.5px] font-medium text-ink-2">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
            Live now · free in your browser
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-7 text-[clamp(3rem,6.4vw,4.4rem)] leading-[1.0] font-semibold tracking-[-0.045em]"
          >
            Someone to <br className="sm:hidden" />
            talk to.
            <br />
            <span className="text-gradient">Face to face.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-7 max-w-[31rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
            Have natural voice conversations with lifelike companions who listen, respond, and feel real.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={appLink()} className="btn btn-primary h-14 px-8 text-[16px] font-semibold">
              Start a free call <ArrowRight size={19} />
            </a>
            <a href="#voices" className="btn btn-ghost h-14 px-7 text-[16px] font-semibold">
              <Play size={17} /> Hear the voices
            </a>
          </motion.div>

          <motion.ul {...rise(0.32)} className="mt-8 flex flex-col gap-2.5 text-[14px] text-ink-3 sm:flex-row sm:flex-wrap sm:gap-7">
            {benefits.map((b) => (
              <li key={b.label} className="inline-flex items-center gap-2.5">
                <span className={`h-1.5 w-1.5 rounded-full ${b.dot}`} />
                {b.label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative"
        >
          <CallMock />
          <span className="chip absolute top-[16%] -left-2 hidden sm:inline-flex xl:-left-10">
            <Globe size={17} className="text-cyan-soft" /> English
          </span>
          <span className="chip absolute top-[40%] -right-2 hidden sm:inline-flex xl:-right-10">
            <Hand size={17} className="text-aurora-soft" /> Interrupt any time
          </span>
        </motion.div>
      </div>
    </section>
  )
}
