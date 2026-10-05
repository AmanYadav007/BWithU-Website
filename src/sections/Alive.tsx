import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { PixelCompanion } from '../pixel/PixelCompanion'
import type { CompanionAvatar, CompanionState } from '../pixel/types'

const STATES: Array<{ state: CompanionState; avatar: CompanionAvatar; label: string; note: string; speech?: string; bg: string }> = [
  { state: 'listen', avatar: 'female', label: 'Listening', note: 'Nods and tilts their head while you talk.', bg: '#2d2158' },
  { state: 'think', avatar: 'male', label: 'Thinking', note: 'Looks up, a little thought bubble pops.', bg: '#3b2d70' },
  { state: 'talk', avatar: 'female', label: 'Talking', note: 'Lips move with the words. Face matches the mood.', speech: 'That is great news!', bg: '#3f3a86' },
  { state: 'happy', avatar: 'male', label: 'Happy', note: 'Blushes. Sometimes a tiny heart.', bg: '#5a2d6e' },
  { state: 'sleepy', avatar: 'female', label: 'Sleepy', note: 'Gets drowsy when it’s late. Zzz.', bg: '#1f1640' },
]

export function Alive() {
  return (
    <section id="alive" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Alive, not animated" title={<>They blink. They nod. <span className="text-gradient">They notice you.</span></>}>
          Every face is drawn live, pixel by pixel. Eyes follow your cursor, expressions match what’s being said, and nothing ever loops the same way twice.
        </SectionHeader>

        <div className="-mx-4 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {STATES.map((s, i) => (
            <Reveal key={s.state} delay={i * 0.06} className="w-[72%] shrink-0 snap-center sm:w-auto">
              <figure className="glass h-full overflow-hidden rounded-[24px] p-2">
                <div className="relative overflow-hidden rounded-[18px]" style={{ background: `radial-gradient(120% 90% at 50% 100%, ${s.bg}, #120c24)` }}>
                  <PixelCompanion avatar={s.avatar} state={s.state} speech={s.speech} scale={3} className="mx-auto !h-auto !w-full max-w-[192px]" />
                </div>
                <figcaption className="px-3 pt-4 pb-3">
                  <div className="flex items-center gap-2 font-display text-[16px] font-medium">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
                    {s.label}
                  </div>
                  <p className="mt-1.5 text-[14px] leading-snug text-ink-3">{s.note}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
