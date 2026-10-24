import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { VOICES, VOICE_SAMPLE_LINE } from '../lib/companions'

export function Voices() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<string | null>(null)

  useEffect(() => () => audio.current?.pause(), [])

  const toggle = (id: string) => {
    if (!audio.current) {
      audio.current = new Audio()
      audio.current.onended = audio.current.onerror = () => setPlaying(null)
    }
    const a = audio.current
    a.pause()
    if (playing === id) {
      setPlaying(null)
      return
    }
    a.src = `/voices/${id}.mp3`
    setPlaying(id)
    a.play().catch(() => setPlaying(null))
  }

  return (
    <section id="voices" className="relative py-20 sm:py-28">
      <div className="container-x max-w-[980px]">
        <SectionHeader eyebrow="The voices" title="Hear them before you call.">
          Six natural voices, American and Indian English. Each one is saying {VOICE_SAMPLE_LINE}
        </SectionHeader>

        <Reveal className="mt-14 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {VOICES.map((v) => {
            const on = playing === v.id
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => toggle(v.id)}
                aria-label={`${on ? 'Stop' : 'Play'} ${v.name}, ${v.gender.toLowerCase()} ${v.accent} English voice`}
                aria-pressed={on}
                className={`glass flex items-center gap-4 rounded-[22px] p-4 text-left transition duration-300 hover:bg-white/[0.04] ${
                  on ? 'ring-1 ring-aurora/60 shadow-[0_0_40px_-12px_rgb(168_85_247/0.7)]' : ''
                }`}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${
                    on ? 'bg-gradient-to-br from-aurora to-cyan text-white' : 'bg-white/[0.06] text-ink-2 ring-1 ring-white/10'
                  }`}
                >
                  {on ? <Pause size={18} /> : <Play size={18} className="translate-x-[1px]" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-semibold">{v.name}</span>
                  <span className="block text-[14px] text-ink-3">
                    {v.gender} · {v.accent}
                  </span>
                </span>
                <Bars active={on} />
              </button>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

/** Little equalizer that moves while a sample plays. */
function Bars({ active }: { active: boolean }) {
  return (
    <span aria-hidden className="flex h-6 items-end gap-[3px]">
      {[0.55, 1, 0.7, 0.85].map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${active ? 'bg-cyan' : 'bg-white/15'}`}
          style={{
            height: active ? undefined : `${h * 40}%`,
            animation: active ? `eq 0.9s ${i * 0.12}s ease-in-out infinite alternate` : undefined,
          }}
        />
      ))}
    </span>
  )
}
