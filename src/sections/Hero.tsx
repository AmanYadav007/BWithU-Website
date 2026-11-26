import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { VoiceBars } from '../components/VoiceBars'
import { FACES, GREETING } from '../lib/companions'
import { appLink, site } from '../lib/site'
import type { useGreeting } from '../lib/useGreeting'

const ease = [0.22, 1, 0.36, 1] as const
/** Only Maya has a recorded talking loop so far; the other faces use their still plus breathing and voice bars. */
const TALKING: Record<string, { idle: string; video: string }> = {
  maya: { idle: '/faces/maya-idle.jpg', video: '/faces/maya-talking.mp4' },
}

type Props = { faceId: string; greeting: ReturnType<typeof useGreeting> }

export function Hero({ faceId, greeting }: Props) {
  const reduce = useReducedMotion()
  const face = FACES.find((f) => f.id === faceId) ?? FACES[0]
  const speaking = greeting.playing?.id === face.id
  const text = speaking && greeting.playing ? GREETING[face.id][greeting.playing.lang] : ''
  const shown = text.slice(0, Math.ceil(text.length * Math.min(1, greeting.progress * 1.15)))
  const talk = TALKING[face.id]
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (speaking && !reduce) v.play().catch(() => {})
    else v.pause()
  }, [speaking, reduce, face.id])

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  })

  return (
    <section className="relative overflow-x-clip pt-24 pb-16 sm:pt-28 lg:pt-32 lg:pb-24">
      <div aria-hidden className="glow-aurora pointer-events-none absolute top-0 left-1/2 h-[820px] w-[900px] -translate-x-1/2" />
      <div className="container-x relative flex flex-col items-center text-center">
        <motion.h1 {...rise(0)} className="text-[clamp(2.6rem,6.4vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
          Someone to talk to.
          <br />
          <span className="text-gradient">Face to face.</span>
          <span className="sr-only"> An AI companion you can video-call, in English, Hindi and Hinglish.</span>
        </motion.h1>

        <motion.div {...rise(0.12)} className="relative mt-9 w-full max-w-[400px]">
          <button
            type="button"
            onClick={() => (speaking ? greeting.stop() : greeting.play(face.id, 'en'))}
            aria-pressed={speaking}
            aria-label={speaking ? `Stop ${face.name}` : `Tap to hear ${face.name} say hi`}
            className={`group relative block aspect-[3/4] w-full overflow-hidden rounded-[32px] bg-space-2 text-left transition-shadow duration-[600ms] sm:rounded-[40px] ${
              speaking
                ? 'shadow-[0_0_0_2px_rgb(168_85_247/0.75),0_0_60px_-6px_rgb(168_85_247/0.6)]'
                : 'shadow-[0_0_0_1px_rgb(245_247_255/0.1),0_40px_100px_-30px_rgb(0_0_0/0.9)]'
            }`}
          >
            <span className="absolute inset-0 animate-breathe">
              <img
                key={face.id}
                src={talk?.idle ?? face.image}
                alt={`${face.name}, a BwithU companion, on a video call`}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {talk && !reduce && (
                <video
                  ref={video}
                  src={talk.video}
                  poster={talk.idle}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${speaking ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
            </span>
            <span aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-space/60 to-transparent" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent to-space/95" />

            <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-space/60 px-3.5 py-2 text-[13px] backdrop-blur sm:top-5 sm:left-5">
              <span className={`h-2 w-2 rounded-full ${speaking ? 'bg-aurora shadow-[0_0_10px_var(--color-aurora)]' : 'bg-cyan shadow-[0_0_8px_var(--color-cyan)]'}`} />
              <strong className="font-semibold">{face.name}</strong>
              <span className="text-ink-2">· {speaking ? 'Speaking' : 'Listening'}</span>
            </span>

            <span className="absolute inset-x-5 bottom-6 flex flex-col items-center gap-3 sm:bottom-8">
              <VoiceBars active={speaking} />
              <span className="min-h-[64px] w-full">
                {speaking ? (
                  <span className="block w-full rounded-2xl bg-space/72 px-4 py-3 text-[15px] leading-snug sm:text-[16px]">{shown}</span>
                ) : (
                  <span className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-white/14 bg-space/60 px-4 py-2.5 text-[14px] font-medium text-ink backdrop-blur">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora opacity-70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-aurora" />
                    </span>
                    Tap to hear {face.name}
                  </span>
                )}
              </span>
            </span>
          </button>
        </motion.div>

        <motion.div {...rise(0.24)} className="mt-10 flex flex-col items-center gap-4">
          <a href={appLink({ face: face.id })} className="btn btn-primary h-14 px-9 text-[17px] font-semibold">
            Call {face.name} <ArrowRight size={19} />
          </a>
          <p className="text-[14px] text-ink-3">{site.freeMinutes} free minutes a day · No sign-up</p>
        </motion.div>
      </div>
    </section>
  )
}
