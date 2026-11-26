import { motion, useReducedMotion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FACES } from '../lib/companions'
import type { useGreeting } from '../lib/useGreeting'

/** Mixed-language bubbles that drift in, the way people really talk. */
const BUBBLES = [
  { text: 'Aaj ka din kaisa tha?', side: 'left' },
  { text: 'Thoda tired, but good.', side: 'right' },
  { text: 'Chalo, coffee break lete hain.', side: 'left' },
] as const

type Props = { faceId: string; greeting: ReturnType<typeof useGreeting> }

export function Hinglish({ faceId, greeting }: Props) {
  const reduce = useReducedMotion()
  const face = FACES.find((f) => f.id === faceId) ?? FACES[0]
  const on = greeting.playing?.id === face.id && greeting.playing.lang === 'hi'

  return (
    <section id="hinglish" className="relative overflow-x-clip py-20 sm:py-28">
      <div className="container-x flex flex-col items-center text-center">
        <Reveal>
          <h2 className="h2">
            Bolo <span className="text-gradient">jaise bolte ho.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 flex w-full max-w-[420px] flex-col gap-3" aria-label="Example Hinglish chat">
          {BUBBLES.map((b, i) => (
            <motion.li
              key={b.text}
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`max-w-[85%] rounded-3xl px-5 py-3 text-[17px] ${
                b.side === 'left' ? 'self-start rounded-bl-md bg-white/10 text-ink' : 'self-end rounded-br-md bg-aurora/25 text-ink'
              }`}
            >
              {b.text}
            </motion.li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => (on ? greeting.stop() : greeting.play(face.id, 'hi'))}
          aria-pressed={on}
          className="btn btn-ghost mt-10 h-12 px-6 text-[15px]"
        >
          {on ? <Pause size={17} /> : <Play size={17} className="translate-x-[1px]" />} Hear {face.name} in Hinglish
        </button>
      </div>
    </section>
  )
}
