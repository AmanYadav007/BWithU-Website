import { Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { FACES, LANGUAGE_HINT, LANGUAGES, SAMPLE_SECONDS, type LanguageId, voiceSample } from '../lib/companions'

// One fixed waveform shape for every sample, so the list reads as a set.
const WAVE = [8, 14, 22, 30, 18, 26, 34, 20, 12, 24, 32, 16, 10, 22, 28, 14, 8, 18, 26, 12, 20, 30, 16, 10, 14, 24, 18, 8, 12, 6]
const clock = (s: number) => `0:${String(Math.max(0, Math.round(s))).padStart(2, '0')}`

export function Voices() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [lang, setLang] = useState<LanguageId>('en')
  const [playing, setPlaying] = useState<string | null>(null)
  const [time, setTime] = useState({ now: 0, total: 1 })

  useEffect(() => () => audio.current?.pause(), [])

  const stop = () => {
    audio.current?.pause()
    setPlaying(null)
  }

  const toggle = (id: string) => {
    if (!audio.current) {
      const a = new Audio()
      a.onended = a.onerror = () => setPlaying(null)
      a.ontimeupdate = () => setTime({ now: a.currentTime, total: a.duration || 1 })
      audio.current = a
    }
    const a = audio.current
    a.pause()
    if (playing === id) return setPlaying(null)
    a.src = voiceSample(id, lang)
    setTime({ now: 0, total: SAMPLE_SECONDS[id][lang] })
    setPlaying(id)
    a.play().catch(() => setPlaying(null))
  }

  const langLabel = LANGUAGES.find((l) => l.id === lang)?.label ?? ''

  return (
    <section id="voices" className="relative overflow-x-clip bg-space-2 py-20 sm:py-28">
      <div aria-hidden className="glow-cyan pointer-events-none absolute top-10 right-0 h-[680px] w-[680px]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_600px] lg:gap-16">
        <Reveal>
          <span className="eyebrow">Voices</span>
          <h2 className="h2 mt-4">
            Hear them before <br className="hidden sm:block" />
            you call.
          </h2>
          <p className="mt-6 max-w-[26rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
            Each companion has her own voice in every language. These are the same voices you’ll hear on a call.
          </p>

          <div role="radiogroup" aria-label="Language of the samples" className="mt-9 flex w-full max-w-[420px] rounded-full border border-ink-4 bg-white/[0.03] p-1.5">
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
                  className={`h-10 flex-1 rounded-full px-2 text-[14px] font-semibold whitespace-nowrap transition sm:h-11 sm:text-[15px] ${
                    on ? 'bg-white/12 text-ink ring-1 ring-aurora/80' : 'text-ink-2 hover:text-ink'
                  } ${l.id === 'hi' ? 'flex-[1.4]' : ''}`}
                >
                  {l.label}
                </button>
              )
            })}
          </div>
          <p className="mt-4 text-[14px] text-ink-3">{LANGUAGE_HINT[lang]}. Tap a voice to play.</p>
        </Reveal>

        <ul className="flex flex-col gap-3 sm:gap-4">
          {FACES.map((f, i) => {
            const on = playing === f.id
            const progress = on ? time.now / time.total : 0
            const total = SAMPLE_SECONDS[f.id][lang]
            return (
              <Reveal as="li" key={f.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-label={`${on ? 'Stop' : 'Play'} ${f.name}, ${langLabel}`}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition duration-300 sm:gap-5 sm:rounded-3xl sm:p-6 ${
                    on
                      ? 'border-aurora/60 bg-white/[0.07] shadow-[0_20px_50px_-20px_rgb(168_85_247/0.5)]'
                      : 'border-line bg-white/[0.03] hover:bg-white/[0.05]'
                  }`}
                >
                  <img src={f.image} alt="" className={`h-12 w-12 shrink-0 rounded-full object-cover ring-2 sm:h-16 sm:w-16 ${on ? 'ring-aurora' : 'ring-white/10'}`} />
                  <span className="w-20 shrink-0 sm:w-24">
                    <span className="block text-[17px] font-semibold sm:text-[19px]">{f.name}</span>
                    <span className="block text-[13px] text-ink-3" lang={lang}>
                      {lang === 'hi' ? 'Hinglish' : langLabel}
                    </span>
                  </span>
                  <span aria-hidden className="flex h-10 min-w-0 flex-1 items-center justify-between overflow-hidden">
                    {WAVE.map((h, k) => {
                      const lit = on && k / WAVE.length < progress
                      return (
                        <span
                          key={k}
                          className={`w-1 shrink-0 rounded-full transition-colors duration-150 ${k > 17 ? 'hidden sm:block' : ''} ${
                            lit ? (k % 2 ? 'bg-cyan' : 'bg-aurora-soft') : 'bg-ink/20'
                          }`}
                          style={{ height: h }}
                        />
                      )
                    })}
                  </span>
                  <span className="hidden w-10 shrink-0 text-right text-[13px] font-medium text-ink-3 tabular-nums sm:block">
                    {on ? clock(time.now) : clock(total)}
                  </span>
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 ${
                      on ? 'bg-white text-space' : 'border border-white/20 bg-white/8 text-ink'
                    }`}
                  >
                    {on ? <Pause size={20} /> : <Play size={20} className="translate-x-[1px]" />}
                  </span>
                </button>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
