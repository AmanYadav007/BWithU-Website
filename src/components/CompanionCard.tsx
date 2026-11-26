import { Mic, PhoneOff } from 'lucide-react'
import { useEffect } from 'react'
import { demoOrigin, demoUrl, parseDemoMessage, DEMO_SECONDS, type DemoEvent } from '../lib/demo'
import { type Face, GREETING } from '../lib/companions'
import { appLink, site } from '../lib/site'
import { VoiceBars } from './VoiceBars'
import SpotlightCard from './reactbits/SpotlightCard'
import ShinyText from './reactbits/ShinyText'

export type DemoState = 'idle' | 'starting' | 'live' | 'ended'

type Props = {
  face: Face
  active: boolean
  state: DemoState
  onTry: () => void
  onEvent: (e: DemoEvent) => void
  /** Only the call frame, no Try button under it: used on top of the gallery's centre card (the hero draws the button). */
  overlay?: boolean
}

/**
 * One companion in the hero slider. Idle, it is a preview of the real call screen (status, 0:30 timer, live caption,
 * mic and hang up). After "Try 30 seconds" the same frame becomes the real call: the app runs in an iframe.
 */
export function CompanionCard({ face, active, state, onTry, onEvent, overlay = false }: Props) {
  const running = state === 'starting' || state === 'live'
  useEffect(() => {
    if (!running) return
    const onMessage = (e: MessageEvent) => {
      const ev = parseDemoMessage(e.origin, e.data, demoOrigin)
      if (ev) onEvent(ev)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [running, onEvent])

  return (
    <div className={`flex w-full flex-col items-center ${overlay ? 'h-full' : ''}`}>
      <SpotlightCard
        spotlightColor="rgb(168 85 247)"
        intensity={0.22}
        className={`relative ${overlay ? 'h-full' : 'aspect-[3/4]'} w-full overflow-hidden !rounded-[32px] !p-0 transition-shadow duration-[600ms] sm:!rounded-[36px] ${
          running ? 'shadow-[0_0_0_2px_rgb(168_85_247/0.75),0_0_70px_-6px_rgb(168_85_247/0.6)]' : 'shadow-[0_0_0_1px_rgb(245_247_255/0.1),0_40px_100px_-30px_rgb(0_0_0/0.9)]'
        }`}
      >
        <img
          src={face.image}
          alt={`${face.name}, a BwithU companion`}
          draggable={false}
          loading={face.id === 'aiko' ? 'eager' : 'lazy'}
          className={`absolute inset-0 h-full w-full object-cover transition duration-500 ${state === 'ended' ? 'scale-105 blur-[2px] brightness-50' : ''}`}
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-space/70 to-transparent" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-b from-transparent to-space/95" />

        {!running && state !== 'ended' && (
          <>
            {/* What the real call screen shows, as a preview. */}
            <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-space/60 px-3.5 py-2 text-[13px] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_var(--color-cyan)]" />
              <strong className="font-semibold">{face.name}</strong>
              <span className="text-ink-2">· Listening</span>
            </span>
            <span className="absolute top-4 right-4 rounded-full border border-white/10 bg-space/60 px-3.5 py-2 text-[14px] font-semibold tabular-nums backdrop-blur">
              0:{String(DEMO_SECONDS).padStart(2, '0')}
            </span>
            <span className="absolute inset-x-4 bottom-[88px] flex flex-col items-center gap-3 sm:inset-x-5">
              <VoiceBars active={active} />
              <span className="block w-full rounded-2xl bg-space/72 px-4 py-3 text-left text-[14.5px] leading-snug backdrop-blur-sm">
                {GREETING[face.id].en}
              </span>
            </span>
            <span aria-hidden className="absolute inset-x-0 bottom-4 flex justify-center gap-2.5">
              <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-white/10 backdrop-blur"><Mic size={21} /></span>
              <span className="grid h-[52px] w-[52px] place-items-center rounded-full bg-danger"><PhoneOff size={21} /></span>
            </span>
          </>
        )}

        {running && (
          <iframe
            title={`Test call with ${face.name}`}
            src={demoUrl(face.id)}
            allow="microphone; autoplay"
            className="absolute inset-0 h-full w-full border-0 bg-space-2"
          />
        )}

        {state === 'ended' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-[22px] font-semibold tracking-[-0.02em]">Stay on the line.</p>
            <a href={appLink({ face: face.id })} className="btn btn-primary h-14 px-9 text-[17px] font-semibold">
              Call now
            </a>
            <p className="text-[13.5px] text-ink-2">{site.freeMinutes} free minutes a day · No sign-up</p>
          </div>
        )}
      </SpotlightCard>

      {!overlay && (
      <div className="mt-6 h-[56px]">
        {active && state === 'idle' && (
          <button type="button" onClick={onTry} className="btn btn-primary h-14 px-9 text-[17px] font-semibold">
            <ShinyText text="Try 30 seconds" color="#ffffff" shineColor="#c4b5fd" speed={3} />
          </button>
        )}
        {active && state === 'starting' && <p className="pt-3.5 text-[15px] text-ink-2">Calling {face.name}…</p>}
      </div>
      )}
    </div>
  )
}
