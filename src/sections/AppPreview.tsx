import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Mic, PhoneOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Wave } from '../components/Wave'
import { useTypedWords } from '../lib/useTypedWords'

const LINES = [
  'Hi, I’m Maya. How was your day?',
  'That sounds heavy. Want to talk it through?',
  'I’m right here. Take your time.',
]

function useTimer(run: boolean) {
  const [s, setS] = useState(0)
  useEffect(() => {
    if (!run) return
    const t = window.setInterval(() => setS((v) => (v + 1) % 420), 1000)
    return () => window.clearInterval(t)
  }, [run])
  const left = 420 - s
  return `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`
}

/** The call screen drawn in code. The face is never covered: captions and the wave live in a solid panel below it. */
function CallScreen({ run, compact = false }: { run: boolean; compact?: boolean }) {
  const { text } = useTypedWords(LINES, run)
  const time = useTimer(run)
  const chip = compact ? 'text-[11px] px-2.5 py-1' : 'text-[12px] px-2.5 py-1'
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-space-2">
      <div className="relative min-h-0 flex-1">
        <img src="/faces/hd/maya.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_18%]" />
        <span aria-hidden className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-space/70 to-transparent" />
        <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-2">
          <span className={`flex min-w-0 items-center gap-1.5 rounded-full border border-white/10 bg-space/60 backdrop-blur ${chip}`}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
            <strong className="font-semibold">Maya</strong>
            <span className="truncate text-ink-2">· Speaking</span>
          </span>
          <span className={`shrink-0 rounded-full border border-white/10 bg-space/60 font-semibold tabular-nums backdrop-blur ${chip}`}>{time}</span>
        </div>
      </div>
      <div className="shrink-0 bg-space px-3 pt-2.5 pb-3">
        <p aria-live="off" className={`min-h-[2.6em] leading-snug text-ink ${compact ? 'text-[13px]' : 'text-[14px]'}`}>
          {text}
          <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-cyan" />
        </p>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-7 min-w-0 flex-1"><Wave bars={compact ? 22 : 34} active={run} /></div>
          <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10"><Mic size={15} /></span>
          <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-danger"><PhoneOff size={15} /></span>
        </div>
      </div>
    </div>
  )
}

export function AppPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const lift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, 0])
  const phoneLift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [110, 0])
  const tilt = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [10, 0])

  return (
    <section id="see" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="See it in action" title="A call that feels like a call." align="center" />
        <div ref={ref} className="relative mx-auto mt-14 max-w-[1000px] [perspective:1400px]">
          <div aria-hidden className="glow-aurora pointer-events-none absolute inset-x-[10%] top-[10%] h-[70%] opacity-40" />
          <motion.div style={{ y: lift, rotateX: tilt }} className="relative mx-auto hidden w-[84%] md:block">
            <div className="rounded-t-[18px] border border-white/15 bg-[#0c0f1b] p-[2.2%] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
                <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-[1.35fr_1fr]">
                  <div className="relative"><CallScreen run={inView} /></div>
                  <div className="hidden flex-col justify-start gap-3 border-l border-line bg-space p-5 pt-6 sm:flex">
                    <p className="text-[12px] font-semibold tracking-[0.15em] text-ink-3 uppercase">Live captions</p>
                    <p className="text-[15px] leading-snug text-ink-2">Every word, as she says it.</p>
                    <div className="h-10 rounded-xl border border-line bg-white/[0.03] p-2"><Wave bars={30} active={inView} /></div>
                    <p className="text-[13px] text-ink-3">7 free minutes a day</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-[18px] bg-gradient-to-b from-[#2a2f45] to-[#14172a]" />
          </motion.div>

          <motion.div
            style={{ y: phoneLift }}
            className="relative mx-auto w-[min(72vw,290px)] md:absolute md:right-[2%] md:bottom-[-12%] md:mx-0 md:w-[28%] md:min-w-[150px] md:max-w-[230px]"
          >
            <div className="rounded-[24px] border border-white/20 bg-[#0c0f1b] p-[5px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.95)] sm:rounded-[34px] sm:p-[7px]">
              <div className="relative aspect-[9/18] overflow-hidden rounded-[19px] sm:rounded-[28px]">
                <CallScreen run={inView} compact />
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mt-10 text-center md:mt-28 text-[15px] text-ink-3">Captions, voice and timer, just like the real call.</p>
      </div>
    </section>
  )
}
