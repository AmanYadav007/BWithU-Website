import { motion } from 'framer-motion'
import { Phone, Play, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Wave } from '../components/Wave'
import { FACES, GREETING, voiceSample } from '../lib/companions'
import { callLink } from '../lib/site'

export function Companions() {
  const [playing, setPlaying] = useState<string | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => () => audio.current?.pause(), [])

  const hear = (id: string) => {
    audio.current?.pause()
    if (playing === id) return setPlaying(null)
    const a = new Audio(voiceSample(id, 'en'))
    audio.current = a
    a.onended = () => setPlaying((p) => (p === id ? null : p))
    a.onerror = () => setPlaying(null)
    setPlaying(id)
    a.play().catch(() => setPlaying(null))
  }

  return (
    <section id="companions" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Meet the companions" title="Four people. Pick yours." align="center" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FACES.map((f, i) => {
            const on = playing === f.id
            return (
              <Reveal as="li" key={f.id} delay={i * 0.08}>
                <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.4 }} className="glass group flex h-full flex-col overflow-hidden rounded-[28px]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={f.image} alt={`${f.name}, a BwithU companion`} loading="lazy" decoding="async" width={640} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-space/90" />
                    <div aria-hidden className={`absolute inset-x-5 bottom-4 h-8 transition-opacity duration-300 ${on ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                      <Wave bars={28} active />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[24px] font-semibold tracking-[-0.015em]">{f.name}</h3>
                    <p className="mt-1 text-[16px] font-medium text-ink">{f.lead}</p>
                    <p className="mt-1.5 text-[14.5px] leading-snug text-ink-2">{f.more}</p>
                    <p className="mt-3 text-[13px] text-ink-3">English · हिंदी · Español</p>
                    <p className="mt-3 min-h-[3.4em] text-[13.5px] leading-snug text-ink-2 italic" aria-live="polite">{on ? `“${GREETING[f.id].en}”` : ''}</p>
                    <div className="mt-auto flex gap-2.5 pt-4">
                      <button type="button" onClick={() => hear(f.id)} aria-pressed={on} className="btn btn-ghost h-11 flex-1 px-4 text-[14.5px]">
                        {on ? <Square size={15} /> : <Play size={15} />} {on ? 'Stop' : 'Hear her'}
                      </button>
                      <a href={callLink(f.id)} className="btn btn-ghost h-11 flex-1 px-4 text-[14.5px] !border-aurora-soft/50">
                        <Phone size={15} /> Call her
                      </a>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
