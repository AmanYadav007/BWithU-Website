import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SectionHeader } from '../components/SectionHeader'
import { Wave } from '../components/Wave'

const LANGS = [
  { id: 'en', chip: 'English', line: 'How was your day, really?', lang: 'en' },
  { id: 'hi', chip: 'हिंदी', line: 'आज का दिन कैसा था?', lang: 'hi' },
  { id: 'hing', chip: 'Hinglish', line: 'Aaj ka din kaisa tha, sach batao?', lang: 'hi-Latn' },
  { id: 'es', chip: 'Español', line: '¿Cómo estuvo tu día, de verdad?', lang: 'es' },
]

export function Languages() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!auto || reduce) return
    const t = window.setInterval(() => setI((v) => (v + 1) % LANGS.length), 3600)
    return () => window.clearInterval(t)
  }, [auto, reduce])
  const cur = LANGS[i]

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Speaks your language" title="Talk the way you talk." align="center" />
        <div role="tablist" aria-label="Languages" className="mt-10 flex flex-wrap justify-center gap-2.5">
          {LANGS.map((l, k) => (
            <button
              key={l.id}
              type="button"
              role="tab"
              aria-selected={k === i}
              onClick={() => { setI(k); setAuto(false) }}
              className={`rounded-full border px-5 py-2.5 text-[15px] font-medium transition-colors ${k === i ? 'border-aurora-soft bg-aurora/20 text-ink' : 'border-line-2 text-ink-2 hover:text-ink'}`}
            >
              {l.chip}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-[760px] rounded-[28px] border border-line bg-space-2/70 px-6 py-10 text-center sm:px-12 sm:py-14">
          <div className="mx-auto mb-6 h-7 w-40"><Wave bars={26} /></div>
          <div className="flex min-h-[4.5em] items-center justify-center" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.p
                key={cur.id}
                lang={cur.lang}
                initial={reduce ? false : { opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl bg-space/80 px-5 py-3 text-[clamp(1.4rem,3.6vw,2.2rem)] leading-snug font-semibold tracking-[-0.015em]"
              >
                {cur.line}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
