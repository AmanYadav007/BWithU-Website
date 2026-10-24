import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Mic, PhoneOff, Volume2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/** A scripted look at the call screen: the same layout and caption behaviour as the real app. */
const SCRIPT = [
  { you: 'I had such a long day.', them: 'Oh no. Want to tell me about it, or should we talk about something nicer?' },
  { you: 'Something nicer, please.', them: 'Deal. What’s one small thing that made you smile today?' },
  { you: 'My coffee was perfect this morning.', them: 'A perfect coffee is a real win. I want the full story.' },
]
const CHARS_PER_SECOND = 16 // same reveal pace as the app's captions

type Phase = 'listening' | 'thinking' | 'speaking' | 'pause'

type Props = {
  name?: string
  /** Resting frame, shown while listening. */
  idle?: string
  /** Silent loop of the real 3D avatar talking (recorded from the app); idle is its first frame. */
  talking?: string
}

export function CallMock({ name = 'Maya', idle = '/faces/maya-idle.jpg', talking = '/faces/maya-talking.mp4' }: Props) {
  const reduce = useReducedMotion()
  const video = useRef<HTMLVideoElement>(null)
  const [turn, setTurn] = useState(0)
  const [phase, setPhase] = useState<Phase>(reduce ? 'speaking' : 'listening')
  const [shown, setShown] = useState(reduce ? SCRIPT[0].them.length : 0)
  const [seconds, setSeconds] = useState(42)
  const line = SCRIPT[turn % SCRIPT.length]

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    let timer: number
    if (phase === 'listening') timer = window.setTimeout(() => setPhase('thinking'), 1700)
    else if (phase === 'thinking') timer = window.setTimeout(() => setPhase('speaking'), 900)
    else if (phase === 'speaking') {
      if (shown < line.them.length) timer = window.setTimeout(() => setShown((n) => n + 1), 1000 / CHARS_PER_SECOND)
      else timer = window.setTimeout(() => setPhase('pause'), 1800)
    } else {
      timer = window.setTimeout(() => {
        setShown(0)
        setTurn((t) => t + 1)
        setPhase('listening')
      }, 500)
    }
    return () => clearTimeout(timer)
  }, [phase, shown, line.them.length, reduce])

  const speaking = phase === 'speaking'

  // Lips move only while the caption is being "spoken".
  useEffect(() => {
    const v = video.current
    if (!v || reduce) return
    if (speaking) v.play().catch(() => {})
    else v.pause()
  }, [speaking, reduce])
  const caption = line.them.slice(0, shown)
  const clock = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className="relative mx-auto w-[min(100%,340px)]">
      {/* Glow behind the phone */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-aurora/25 blur-[80px]" />
      <div aria-hidden className="absolute -inset-6 translate-x-10 translate-y-16 rounded-full bg-cyan/15 blur-[70px]" />

      <div className="relative rounded-[44px] border border-white/10 bg-space-2/80 p-3 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9)] backdrop-blur">
        <div className="flex items-center justify-between px-3 pt-1 pb-3 text-[12px] text-ink-3">
          <span className="font-display font-semibold text-ink">
            <span className="text-aurora-soft">B</span>with<span className="text-cyan">U</span>
          </span>
          <span className="tabular-nums">{clock}</span>
        </div>

        <div
          className={`relative aspect-[3/4] overflow-hidden rounded-[30px] bg-[#090e21] transition-shadow duration-500 ${
            speaking ? 'shadow-[0_0_0_2px_rgb(168_85_247/0.7),0_0_40px_-6px_rgb(168_85_247/0.8)]' : 'shadow-[0_0_0_1px_rgb(245_247_255/0.08)]'
          }`}
        >
          <div className="absolute inset-0 animate-breathe">
            <img src={idle} alt={`${name}, a BwithU companion, on a video call`} className="absolute inset-0 h-full w-full object-cover" />
            {!reduce && (
              <video
                ref={video}
                src={talking}
                poster={idle}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${speaking ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[12px] backdrop-blur">
            <span className={`h-2 w-2 rounded-full ${speaking ? 'bg-aurora shadow-[0_0_10px_var(--color-aurora)] animate-pulse' : 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]'}`} />
            <strong className="font-semibold">{name}</strong>
            <span className="text-ink-3">{speaking ? 'Speaking' : 'Listening'}</span>
          </div>

          <div className="absolute inset-x-3 bottom-3 flex flex-col items-end gap-2">
            <AnimatePresence mode="popLayout">
              {phase !== 'listening' && (
                <motion.p
                  key={`you-${turn}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-[85%] rounded-[16px] rounded-br-[6px] bg-white/15 px-3 py-2 text-[12.5px] leading-snug text-ink/90 backdrop-blur"
                >
                  <span className="block text-[10px] font-semibold tracking-wider text-ink-3 uppercase">You</span>
                  {line.you}
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {caption && (
                <motion.p
                  key={`them-${turn}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full rounded-[16px] bg-[rgb(6_8_22/0.75)] px-3.5 py-2.5 text-center text-[13px] leading-snug"
                >
                  {caption}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div aria-hidden className="flex items-center justify-center gap-5 pt-4 pb-2">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-2"><Mic size={18} /></span>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f43f5e] text-white shadow-[0_8px_24px_-8px_#f43f5e]"><PhoneOff size={20} /></span>
          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-2"><Volume2 size={18} /></span>
        </div>
      </div>
    </div>
  )
}
