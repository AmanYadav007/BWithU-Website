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

/** The call screen drawn in code: face, captions that arrive word by word, a voice wave and a timer. */
function CallScreen({ run, compact = false }: { run: boolean; compact?: boolean }) {
  const { text } = useTypedWords(LINES, run)
  const time = useTimer(run)
  return (
    <div className="absolute inset-0 overflow-hidden bg-space-2">
      <img src="/faces/hd/maya.webp" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[50%_20%]" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-space/70 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-b from-transparent to-space/95" />
      <span className={`absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-space/60 px-2.5 py-1 backdrop-blur ${compact ? 'text-[10px]' : 'text-[12px]'}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
        <strong className="font-semibold">Maya</strong>
        <span className="text-ink-2">· Speaking</span>
      </span>
      <span className={`absolute top-3 right-3 rounded-full border border-white/10 bg-space/60 px-2.5 py-1 font-semibold tabular-nums backdrop-blur ${compact ? 'text-[10px]' : 'text-[12px]'}`}>{time}</span>
      <div className="absolute inset-x-3 bottom-14 flex flex-col items-center gap-2 sm:bottom-16">
        <div className="h-6 w-28"><Wave bars={18} active={run} /></div>
        <p aria-live="off" className={`min-h-[3.2em] w-full rounded-xl bg-space/75 px-2 py-1.5 sm:px-3 sm:py-2 leading-snug backdrop-blur-sm ${compact ? 'text-[9px] sm:text-[11px]' : 'text-[14px]'}`}>
          {text}
          <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-cyan" />
        </p>
      </div>
      <span aria-hidden className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 backdrop-blur"><Mic size={15} /></span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-danger"><PhoneOff size={15} /></span>
      </span>
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
          <motion.div style={{ y: lift, rotateX: tilt }} className="relative mx-auto w-[92%] sm:w-[84%]">
            <div className="rounded-t-[18px] border border-white/15 bg-[#0c0f1b] p-[2.2%] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9)]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
                <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-[1.35fr_1fr]">
                  <div className="relative"><CallScreen run={inView} /></div>
                  <div className="hidden flex-col justify-center gap-3 border-l border-line bg-space p-5 pr-[26%] sm:flex">
                    <p className="text-[12px] font-semibold tracking-[0.15em] text-ink-3 uppercase">Live captions</p>
                    <p className="text-[15px] leading-snug text-ink-2">Every word, as she says it.</p>
                    <div className="h-12 rounded-xl border border-line bg-white/[0.03] p-2"><Wave bars={30} active={inView} /></div>
                    <p className="text-[13px] text-ink-3">7 free minutes a day</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-[18px] bg-gradient-to-b from-[#2a2f45] to-[#14172a]" />
          </motion.div>

          <motion.div
            style={{ y: phoneLift }}
            className="absolute -right-1 bottom-[-8%] w-[28%] min-w-[104px] max-w-[230px] sm:right-[2%] sm:bottom-[-12%]"
          >
            <div className="rounded-[24px] border border-white/20 bg-[#0c0f1b] p-[5px] shadow-[0_30px_70px_-20px_rgb(0_0_0/0.95)] sm:rounded-[34px] sm:p-[7px]">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[19px] sm:rounded-[28px]">
                <CallScreen run={inView} compact />
              </div>
            </div>
          </motion.div>
        </div>
        <p className="mt-24 text-center text-[15px] text-ink-3 sm:mt-28">Captions, voice and timer, just like the real call.</p>
      </div>
    </section>
  )
}
