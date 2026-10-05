import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Lock, RotateCw, Star } from 'lucide-react'
import { useRef } from 'react'
import { CallPanel } from '../components/CallPanel'
import { ChromeIcon } from '../components/ChromeIcon'
import { heroScenarios } from '../lib/scripts'
import { installHref, installLabel, isLive } from '../lib/site'
import { useConversation } from '../lib/useConversation'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const { beat } = useConversation({ autoplay: heroScenarios, paused: !inView || !!reduce })

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-28">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <motion.a
            href="#get-b"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-3 pl-1.5 text-[13px] text-ink-2 hover:text-ink"
          >
            <span className="rounded-full bg-aurora/20 px-2 py-0.5 font-display text-[12px] font-medium text-aurora-soft">Beta</span>
            Now on Chrome. Desktop is next.
            <ArrowRight size={14} />
          </motion.a>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="mt-7 text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.045em]"
          >
            Your AI companion,
            <br />
            <span className="text-gradient">always with you.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease }}
            className="mx-auto mt-6 max-w-xl text-[18px] leading-relaxed text-ink-2 sm:text-[19px]"
          >
            A little friend who lives in your browser. Talk out loud, ask about your tabs, look things up. It talks back, warmly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href={installHref} className="btn btn-primary h-13 w-full px-7 text-[16px] sm:w-auto" {...(isLive && { target: '_blank', rel: 'noopener' })}>
              <ChromeIcon className="h-[18px] w-[18px]" />
              {installLabel}
            </a>
            <a href="#demo" className="btn btn-ghost h-13 w-full px-7 text-[16px] sm:w-auto">
              Try the demo
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-5 text-[13px] text-ink-3"
          >
            Free in beta · No account · No API keys
          </motion.p>
        </div>

        {/* Product shot: a Chrome window with B in the side panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="relative mx-auto mt-16 max-w-[1080px] sm:mt-20"
        >
          <div
            aria-hidden
            className="absolute -inset-x-10 -inset-y-8 -z-10 rounded-[48px] opacity-70 blur-3xl"
            style={{ background: 'radial-gradient(60% 60% at 70% 40%, rgb(168 85 247 / 0.35), transparent), radial-gradient(50% 50% at 30% 70%, rgb(56 189 248 / 0.2), transparent)' }}
          />

          {/* Desktop: full browser */}
          <div className="glass hidden overflow-hidden rounded-[22px] md:block">
            <BrowserChrome />
            <div className="flex h-[560px]">
              <FakeArticle />
              <div className="w-[360px] shrink-0 border-l border-black/40">
                <CallPanel avatar="female" name="Mira" beat={beat} scale={3} className="h-full" />
              </div>
            </div>
          </div>

          {/* Mobile: just the panel */}
          <div className="mx-auto max-w-[360px] overflow-hidden rounded-[22px] ring-1 ring-line-2 md:hidden">
            <CallPanel avatar="female" name="Mira" beat={beat} scale={3} className="h-[520px]" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BrowserChrome() {
  return (
    <div className="border-b border-line bg-[#0d1029]/90">
      <div className="flex items-center gap-2 px-4 pt-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-4 flex items-end gap-1">
          <div className="flex items-center gap-2 rounded-t-lg bg-[#171b3d] px-3.5 py-2 text-[12px] text-ink-2">
            <span className="h-3 w-3 rounded-sm bg-emerald-400/80" />
            How to sleep better, in 3 steps
          </div>
          <div className="px-3.5 py-2 text-[12px] text-ink-4">Landing page v3 — Figma</div>
          <div className="hidden px-3.5 py-2 text-[12px] text-ink-4 lg:block">Inbox (3)</div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-[#171b3d] px-4 py-2">
        <RotateCw size={14} className="text-ink-4" />
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#0b0e24] px-3.5 py-1.5 text-[12px] text-ink-3">
          <Lock size={11} />
          wellnessweekly.com/sleep-better
        </div>
        <Star size={14} className="text-ink-4" />
        <img src="/brand/mark.svg" alt="" className="h-[18px] w-[18px]" />
      </div>
    </div>
  )
}

function FakeArticle() {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden bg-[#f6f4ef] px-12 py-10 text-[#1c1a17]">
      <div className="text-[12px] font-semibold tracking-[0.14em] text-[#a06a2c] uppercase">Wellness Weekly</div>
      <h3 className="mt-3 max-w-md font-display text-[34px] leading-[1.1] font-semibold tracking-[-0.02em]">How to sleep better, in three small steps</h3>
      <p className="mt-3 text-[14px] text-[#6b665e]">8 min read · Updated this week</p>
      <div className="mt-7 h-40 rounded-xl bg-gradient-to-br from-[#e9dcc9] via-[#dfe6ef] to-[#c9d6e8]" />
      <div className="mt-7 max-w-lg space-y-2.5">
        {[100, 96, 88, 98, 72].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-[#1c1a17]/10" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-6 max-w-lg space-y-2.5">
        {[94, 100, 60].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-[#1c1a17]/10" style={{ width: `${w}%` }} />
        ))}
      </div>

      {/* The small floating orb the extension puts on every page */}
      <div className="absolute right-6 bottom-6 grid h-14 w-14 place-items-center rounded-full bg-[#120c24] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.45)] ring-4 ring-[#38bdf8]/40">
        <img src="/brand/mark.svg" alt="" className="h-8 w-8 animate-breathe" />
      </div>
    </div>
  )
}
