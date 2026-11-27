import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Phone, PhoneOff } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import BlurText from '../components/reactbits/BlurText'
import { FACES } from '../lib/companions'
import { demoOrigin, demoUrl, parseDemoMessage, type DemoEvent } from '../lib/demo'
import { callLink, site } from '../lib/site'
import { AuroraFlow } from '../components/AuroraFlow'

type State = 'idle' | 'starting' | 'live' | 'ended'
const ROTATE_MS = 5000

/**
 * Hero = an incoming call. One companion, big; the face crossfades to the next every few seconds.
 * "Accept" runs the real 30-second call (the app in an iframe) inside the same frame; "Not now" scrolls down.
 */
export function Hero({ onFace }: { onFace: (id: string) => void }) {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<State>('idle')
  const reduce = useReducedMotion()
  const face = FACES[index]
  const running = state === 'starting' || state === 'live'

  useEffect(() => onFace(face.id), [face.id, onFace])

  // Rotate while idle. Picking a tab restarts the clock (index is a dependency).
  useEffect(() => {
    if (state !== 'idle' || reduce) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % FACES.length), ROTATE_MS)
    return () => window.clearTimeout(t)
  }, [index, state, reduce])

  useEffect(() => {
    if (!running) return
    const onMessage = (e: MessageEvent) => {
      const ev: DemoEvent | null = parseDemoMessage(e.origin, e.data, demoOrigin)
      if (!ev) return
      if (ev.type === 'ready') setState((s) => (s === 'starting' ? 'live' : s))
      else setState('ended')
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [running])

  const pick = useCallback((i: number) => {
    setIndex(i)
    setState('idle')
  }, [])

  return (
    <section id="faces" className="relative overflow-x-clip pt-[84px] pb-12 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24 lg:pb-16">
      <AuroraFlow />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-space/60 via-space/10 to-transparent" />

      <div className="container-x relative grid items-center gap-8 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16">
        <div className="text-center lg:text-left">
          <h1 className="text-[clamp(2.1rem,7vw,3rem)] sm:text-[clamp(2.4rem,5vw,3.6rem)] lg:text-[clamp(2.6rem,4vw,3.9rem)] leading-[1.03] font-semibold tracking-[-0.03em]">
            <BlurText text="Someone to talk to." trigger="load" animateBy="words" delay={90} className="justify-center lg:justify-start" />
            <span className="text-gradient block">Face to face.</span>
            <span className="sr-only"> An AI companion you can video-call, in English, Hindi, Hinglish and Spanish.</span>
          </h1>
          <p className="mt-4 text-[17px] text-ink-2 lg:text-[19px]">Pick up. Say hi. 30 seconds, free.</p>
          <div className="mt-8 hidden flex-col items-start gap-3 lg:flex">
            <a href={callLink(face.id)} className="btn btn-primary h-[56px] px-9 text-[17px] font-semibold">Call now</a>
            <p className="text-[14px] text-ink-3">{site.freeMinutes} free minutes a day · No sign-up</p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[min(100%,440px)] lg:max-w-none">
          <div data-hero-card className="relative aspect-[3/4] w-full overflow-hidden rounded-[32px] shadow-[0_0_0_1px_rgb(245_247_255/0.12),0_50px_110px_-30px_rgb(0_0_0/0.95)] sm:rounded-[40px]">
            {FACES.map((f, i) => (
              <motion.div
                key={f.id}
                aria-hidden={i !== index}
                initial={false}
                animate={{ opacity: i === index ? 1 : 0 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <motion.img
                  src={f.image}
                  alt={i === index ? `${f.name}, a BwithU companion` : ''}
                  width={768}
                  height={1024}
                  draggable={false}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  animate={reduce ? undefined : { scale: i === index ? [1, 1.05] : 1 }}
                  transition={{ duration: ROTATE_MS / 1000 + 2, ease: 'linear' }}
                  className={`h-full w-full object-cover object-[50%_18%] ${state === 'ended' ? 'blur-[2px] brightness-50' : ''}`}
                />
              </motion.div>
            ))}
            <span aria-hidden className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-space/80 to-transparent" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-transparent to-space/95" />

            {state === 'idle' && (
              <>
                <div className="absolute top-5 left-5 right-5 text-left sm:top-7 sm:left-7">
                  <AnimatePresence mode="wait">
                    <motion.div key={face.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                      <p className="text-[clamp(1.6rem,4vw,2.2rem)] leading-none font-semibold tracking-[-0.02em]">{face.name}</p>
                      <p className="mt-2 flex items-center gap-2 text-[14px] text-ink-2">
                        <span aria-hidden className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
                        </span>
                        is calling you…
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="absolute inset-x-0 bottom-5 flex items-end justify-center gap-14 sm:bottom-7">
                  <button type="button" onClick={() => document.getElementById('see')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })} className="group flex flex-col items-center gap-2 text-[13px] text-ink-2">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/12 backdrop-blur transition group-hover:bg-white/20"><PhoneOff size={24} /></span>
                    Not now
                  </button>
                  <button type="button" onClick={() => setState('starting')} className="group flex flex-col items-center gap-2 text-[13px] font-semibold text-ink">
                    <span className="relative grid h-16 w-16 place-items-center rounded-full btn-primary">
                      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-aurora/50" />
                      <Phone size={26} className="relative" />
                    </span>
                    Accept
                  </button>
                </div>
              </>
            )}

            {running && (
              <iframe title={`Test call with ${face.name}`} src={demoUrl(face.id)} allow="microphone; autoplay" className="absolute inset-0 h-full w-full border-0 bg-space-2" />
            )}
            {state === 'starting' && <p className="absolute inset-x-0 top-1/2 text-center text-[15px] text-ink-2">Calling {face.name}…</p>}

            {state === 'ended' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-[24px] font-semibold tracking-[-0.012em]">Stay on the line.</p>
                <a href={callLink(face.id)} className="btn btn-primary h-14 px-9 text-[17px] font-semibold">Call now</a>
                <button type="button" onClick={() => setState('idle')} className="text-[14px] text-ink-2 underline underline-offset-4">Choose someone else</button>
              </div>
            )}
          </div>

          <div role="tablist" aria-label="Choose a companion" className="mt-5 flex justify-center gap-2 lg:gap-3">
            {FACES.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => pick(i)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${i === index ? 'bg-white/12 text-ink' : 'text-ink-3 hover:text-ink'}`}
              >
                {f.name}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-[14px] text-ink-3 lg:hidden">{site.freeMinutes} free minutes a day · No sign-up</p>
        </div>
      </div>
    </section>
  )
}
