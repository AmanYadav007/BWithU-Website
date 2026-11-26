import { ChevronLeft, ChevronRight } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { CompanionCard, type DemoState } from '../components/CompanionCard'
import BlurText from '../components/reactbits/BlurText'
import { type DemoEvent } from '../lib/demo'
import { FACES } from '../lib/companions'
import { useDesktopMotion } from '../lib/useDesktopMotion'
import { site } from '../lib/site'

// The WebGL aurora is only fetched on a big screen with motion allowed (see useDesktopMotion).
const Aurora = lazy(() => import('../components/reactbits/Aurora'))

/**
 * Hero: a slider of the four companions. Swipe or use the arrows; "Try 30 seconds" on the centre card runs the real
 * call right there. Moving to another card ends a running test.
 */
export function Hero({ onFace }: { onFace: (id: string) => void }) {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<DemoState>('idle')
  const track = useRef<HTMLUListElement>(null)
  const desktopMotion = useDesktopMotion()
  const face = FACES[index]

  useEffect(() => onFace(face.id), [face.id, onFace])

  const go = useCallback((i: number) => {
    const row = track.current
    const card = row?.children[Math.max(0, Math.min(FACES.length - 1, i))] as HTMLElement | undefined
    // Scroll the row itself (scrollIntoView would also move the page up and down).
    if (row && card) row.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - row.clientWidth / 2, behavior: 'smooth' })
  }, [])

  // Which card is in the middle: the one whose centre is nearest the track's centre.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const mid = el.scrollLeft + el.clientWidth / 2
      let best = 0
      let dist = Infinity
      Array.from(el.children).forEach((c, i) => {
        const card = c as HTMLElement
        const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid)
        if (d < dist) [best, dist] = [i, d]
      })
      setIndex((prev) => {
        if (prev !== best) setState('idle') // a different companion: any test call ends
        return best
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const onEvent = useCallback((e: DemoEvent) => {
    if (e.type === 'ready') setState((s) => (s === 'starting' ? 'live' : s))
    else setState('ended')
  }, [])

  return (
    <section id="faces" className="relative overflow-x-clip pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-20">
      <div aria-hidden className="glow-aurora pointer-events-none absolute top-0 left-1/2 h-[820px] w-[900px] -translate-x-1/2" />
      {desktopMotion && (
        <Suspense fallback={null}>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[640px] [mask-image:linear-gradient(to_bottom,black,transparent)]">
            <Aurora colorStops={['#7c3aed', '#38bdf8', '#a855f7']} amplitude={0.9} blend={0.6} speed={0.5} opacity={0.55} dpr={1} />
          </div>
        </Suspense>
      )}

      <div className="container-x relative flex flex-col items-center text-center">
        <h1 className="text-[clamp(2.6rem,6.4vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
          <BlurText text="Someone to talk to." trigger="load" animateBy="words" delay={90} className="justify-center" />
          <span className="text-gradient block">Face to face.</span>
          <span className="sr-only"> An AI companion you can video-call, in English, Hindi and Hinglish.</span>
        </h1>
        <p className="mt-4 text-[17px] text-ink-2">Pick someone. Say hi for 30 seconds.</p>

        {/* Slider: native scroll-snap, so swiping is the browser's own and stays smooth on phones. */}
        <div className="relative mt-9 w-full">
          <ul
            ref={track}
            aria-label="Companions"
            className="no-scrollbar flex snap-x snap-mandatory items-start gap-5 overflow-x-auto px-[calc(50%-min(39vw,170px))] pb-2"
          >
            {FACES.map((f, i) => (
              <li
                key={f.id}
                className={`w-[min(78vw,340px)] shrink-0 snap-center transition duration-500 ${i === index ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-50'}`}
                onClick={() => i !== index && go(i)}
                aria-current={i === index}
              >
                <div className={i === index ? '' : 'pointer-events-none'}>
                  <CompanionCard
                    face={f}
                    active={i === index}
                    state={i === index ? state : 'idle'}
                    onTry={() => setState('starting')}
                    onEvent={onEvent}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-1 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <button type="button" aria-label="Previous companion" onClick={() => go(index - 1)} disabled={index === 0} className="btn btn-ghost h-10 w-10 p-0 disabled:opacity-30">
              <ChevronLeft size={20} />
            </button>
          <div className="flex items-center gap-2" role="tablist" aria-label="Choose a companion">
            {FACES.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={f.name}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-7 bg-aurora-soft' : 'w-2 bg-white/25'}`}
              />
            ))}
          </div>
            <button type="button" aria-label="Next companion" onClick={() => go(index + 1)} disabled={index === FACES.length - 1} className="btn btn-ghost h-10 w-10 p-0 disabled:opacity-30">
              <ChevronRight size={20} />
            </button>
          </div>
          <p className="text-[18px] font-semibold tracking-[-0.01em]">{face.name}</p>
          <p className="-mt-2 text-[15px] text-ink-2">{face.lead}</p>
          <p className="text-[14px] text-ink-3">{site.freeMinutes} free minutes a day · No sign-up</p>
        </div>
      </div>
    </section>
  )
}
