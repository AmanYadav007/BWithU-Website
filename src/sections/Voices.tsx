import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { FACES, LANGUAGES, type LanguageId, voiceSample } from '../lib/companions'

export function Voices() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [lang, setLang] = useState<LanguageId>('en')
  const [playing, setPlaying] = useState<string | null>(null)

  useEffect(() => () => audio.current?.pause(), [])

  const stop = () => {
    audio.current?.pause()
    setPlaying(null)
  }

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
    a.src = voiceSample(id, lang)
    setPlaying(id)
    a.play().catch(() => setPlaying(null))
  }

  const langLabel = LANGUAGES.find((l) => l.id === lang)?.label ?? ''

  return (
    <section id="voices" className="relative py-20 sm:py-28">
      <div className="container-x max-w-[980px]">
        <SectionHeader eyebrow="The voices" title="Hear them before you call.">
          Every companion has their own voice, and talks with you in English, Hindi and Hinglish, or Spanish. Pick a
          language and press play.
        </SectionHeader>

        <Reveal className="mt-10 flex justify-center">
          <div role="radiogroup" aria-label="Language of the samples" className="glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1">
            {LANGUAGES.map((l) => {
              const on = l.id === lang
              return (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  lang={l.id}
                  onClick={() => {
                    stop()
                    setLang(l.id)
                  }}
                  className={`h-10 rounded-full px-5 text-[15px] font-medium transition ${
                    on ? 'bg-gradient-to-br from-aurora to-cyan text-white' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {FACES.map((f) => {
            const on = playing === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggle(f.id)}
                aria-label={`${on ? 'Stop' : 'Play'} ${f.name}, ${langLabel}`}
                aria-pressed={on}
                className={`glass flex items-center gap-4 rounded-[22px] p-4 text-left transition duration-300 hover:bg-white/[0.04] ${
                  on ? 'ring-1 ring-aurora/60 shadow-[0_0_40px_-12px_rgb(168_85_247/0.7)]' : ''
                }`}
              >
                <span className="relative h-12 w-12 shrink-0">
                  <img src={f.image} alt="" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10" />
                  <span
                    className={`absolute inset-0 grid place-items-center rounded-full transition ${
                      on ? 'bg-gradient-to-br from-aurora/90 to-cyan/90 text-white' : 'bg-black/35 text-white'
                    }`}
                  >
                    {on ? <Pause size={18} /> : <Play size={18} className="translate-x-[1px]" />}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[17px] font-semibold">{f.name}</span>
                  <span className="block text-[14px] text-ink-3" lang={lang}>
                    {langLabel}
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
