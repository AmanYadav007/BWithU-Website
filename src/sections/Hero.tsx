import { motion } from 'framer-motion'
import { ArrowRight, Headphones } from 'lucide-react'
import { CallMock } from '../components/CallMock'
import { appLink, site } from '../lib/site'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative overflow-x-clip pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow rounded-full border border-line-2 bg-white/[0.03] px-3.5 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" />
            Live now · free in your browser
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-6 text-[clamp(2.6rem,6.6vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
          >
            Someone to talk to.
            <br />
            <span className="text-gradient">Face to face.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-[34rem] text-[18px] leading-relaxed text-ink-2 lg:mx-0"
          >
            BwithU is an AI companion you can video-call. Pick a face, give them a name, and just talk. They listen,
            answer in a real voice, and look right at you while they do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a href={appLink()} className="btn btn-primary h-14 px-8 text-[16px]">
              Start a free call <ArrowRight size={18} />
            </a>
            <a href="#voices" className="btn btn-ghost h-14 px-7 text-[16px]">
              Hear the voices
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] text-ink-3 lg:justify-start"
          >
            <li>No app or sign-up</li>
            <li aria-hidden>·</li>
            <li>{site.freeMinutes} free minutes a day</li>
            <li aria-hidden>·</li>
            <li className="inline-flex items-center gap-1.5">
              <Headphones size={15} /> Phone or desktop
            </li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
        >
          <CallMock />
        </motion.div>
      </div>
    </section>
  )
}
