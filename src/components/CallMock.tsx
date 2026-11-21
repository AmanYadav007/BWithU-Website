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
    <div className="relative mx-auto w-full max-w-[480px] pb-10">
      {/* Glow behind the frame */}
      <div aria-hidden className="glow-aurora absolute -inset-24" />

      <div
        className={`relative aspect-[3/4] overflow-hidden rounded-[32px] bg-space-2 transition-shadow duration-[600ms] sm:rounded-[40px] ${
          speaking
            ? 'shadow-[0_0_0_2px_rgb(168_85_247/0.75),0_0_60px_-6px_rgb(168_85_247/0.6)]'
            : 'shadow-[0_0_0_1px_rgb(245_247_255/0.1),0_40px_100px_-30px_rgb(0_0_0/0.9)]'
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
        <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-space/60 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-space/95" />

        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-space/60 px-3.5 py-2 text-[13px] backdrop-blur sm:top-5 sm:left-5">
          <span
            className={`h-2 w-2 rounded-full ${speaking ? 'bg-aurora shadow-[0_0_10px_var(--color-aurora)]' : 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]'}`}
          />
          <strong className="font-semibold">{name}</strong>
          <span className="text-ink-2">· {speaking ? 'Speaking' : 'Listening'}</span>
        </div>
        <span className="absolute top-6 right-5 text-[13px] font-medium text-ink-2 tabular-nums sm:top-7 sm:right-6">{clock}</span>

        <div className="absolute inset-x-4 bottom-14 flex flex-col items-end gap-2.5 sm:inset-x-6 sm:bottom-16">
          <VoiceBars active={speaking} className="mx-auto mb-1" />
          <AnimatePresence mode="popLayout">
            {phase !== 'listening' && (
              <motion.p
                key={`you-${turn}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex max-w-[85%] items-baseline gap-2.5 rounded-2xl bg-white/16 px-3.5 py-2.5 text-[13.5px] font-medium leading-snug backdrop-blur-sm sm:text-[14.5px]"
              >
                <span className="text-[10.5px] font-bold tracking-[0.12em] text-ink-2 uppercase">You</span>
                {line.you}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="min-h-[64px] w-full">
            <AnimatePresence>
              {caption && (
                <motion.p
                  key={`them-${turn}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full rounded-2xl bg-space/72 px-4 py-3 text-[14.5px] leading-snug sm:text-[15.5px]"
                >
                  {caption}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Call controls overlap the bottom edge of the frame, as in the app. */}
      <div
        aria-hidden
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-space-2/95 p-1.5 shadow-[0_20px_40px_-10px_rgb(0_0_0/0.6)] sm:gap-3"
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/8 text-ink sm:h-[58px] sm:w-[58px]"><Mic size={22} /></span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-white/8 text-ink sm:h-[58px] sm:w-[58px]"><Volume2 size={22} /></span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-danger text-white sm:h-[58px] sm:w-[58px]"><PhoneOff size={22} /></span>
      </div>
    </div>
  )
}

/** Seven bars that move while the companion speaks. */
export function VoiceBars({ active, className = '' }: { active: boolean; className?: string }) {
  const heights = [10, 18, 26, 14, 22, 12, 8]
  return (
    <span aria-hidden className={`flex h-7 items-center gap-[5px] ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 origin-center rounded-full transition-opacity duration-300 ${i % 2 ? 'bg-cyan' : 'bg-aurora-soft'} ${active ? 'opacity-100' : 'opacity-0'}`}
          style={{ height: h, animation: active ? `vbar ${0.7 + (i % 3) * 0.15}s ${i * 0.08}s ease-in-out infinite` : undefined }}
        />
      ))}
    </span>
  )
}
