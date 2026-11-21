import { ArrowRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { FACES, voiceSample } from '../lib/companions'
import { appLink } from '../lib/site'

export function Faces() {
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
    if (playing === id) return setPlaying(null)
    a.src = voiceSample(id, 'en')
    setPlaying(id)
    a.play().catch(() => setPlaying(null))
  }

  return (
    <section id="faces" className="relative overflow-x-clip py-20 sm:py-28">
      <div aria-hidden className="glow-aurora pointer-events-none absolute top-1/3 left-1/2 h-[700px] w-[900px] -translate-x-1/2 opacity-60" />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-end">
          <Reveal>
            <span className="eyebrow">The companions</span>
            <h2 className="h2 mt-4">Pick who you talk to.</h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
              Four companions, each with her own face, voice and way of talking. Listen first, then pick.
            </p>
          </Reveal>
        </div>

        {/* Mobile: a swipeable rail. Desktop: four columns, every other one set lower. */}
        <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:mt-16 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0">
          {FACES.map((f, i) => {
            const on = playing === f.id
            return (
              <Reveal as="li" key={f.id} delay={i * 0.06} className={`w-[250px] shrink-0 snap-start md:w-auto ${i % 2 ? 'md:mt-14' : ''}`}>
                <div className="group relative">
                  <a
                    href={appLink({ face: f.id })}
                    aria-label={`Talk to ${f.name}`}
                    className={`relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-space-2 transition duration-500 md:rounded-[28px] ${
                      on
                        ? 'ring-2 ring-aurora shadow-[0_30px_70px_-20px_rgb(168_85_247/0.6)]'
                        : 'ring-1 ring-white/[0.08] hover:-translate-y-1 hover:ring-aurora/60 hover:shadow-[0_30px_70px_-20px_rgb(168_85_247/0.6)]'
                    }`}
                  >
                    <img src={f.image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-space/85" />
                    <span className="absolute top-4 left-5 text-[12px] font-semibold tracking-[0.12em] text-ink-2">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => toggle(f.id)}
                    aria-label={`${on ? 'Stop' : 'Hear'} ${f.name}`}
                    aria-pressed={on}
                    className={`absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full border backdrop-blur transition ${
                      on ? 'border-transparent bg-white text-space' : 'border-white/20 bg-white/14 text-ink hover:bg-white/24'
                    }`}
                  >
                    {on ? <Pause size={18} /> : <Play size={18} className="translate-x-[1px]" />}
                  </button>
                </div>
                <h3 className="mt-5 px-1 text-[22px] font-semibold tracking-[-0.02em] md:text-[26px]">{f.name}</h3>
                <p className={`mt-1 px-1 text-[15px] font-semibold ${on ? 'text-aurora-soft' : 'text-ink-2'}`}>{f.lead}</p>
                <p className="mt-1 px-1 text-[15px] leading-relaxed text-ink-3">{f.more}</p>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-10 md:mt-14">
          <a href={appLink()} className="group inline-flex items-center gap-2 text-[16px] font-semibold text-ink">
            Meet them in the app <ArrowRight size={19} className="text-cyan transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
