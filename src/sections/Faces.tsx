import { ArrowRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FACES } from '../lib/companions'
import { appLink } from '../lib/site'
import type { useGreeting } from '../lib/useGreeting'

type Props = { faceId: string; onPick: (id: string) => void; greeting: ReturnType<typeof useGreeting> }

/** Four faces in a row. Tap one: she says hi and takes over the hero card. */
export function Faces({ faceId, onPick, greeting }: Props) {
  const face = FACES.find((f) => f.id === faceId) ?? FACES[0]
  return (
    <section id="faces" className="relative overflow-x-clip py-20 sm:py-28">
      <div className="container-x relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="h2">Pick who you talk to.</h2>
        </Reveal>

        <ul className="mt-12 grid w-full max-w-[860px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {FACES.map((f, i) => {
            const picked = f.id === faceId
            const speaking = greeting.playing?.id === f.id
            return (
              <Reveal as="li" key={f.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(f.id)
                    greeting.play(f.id, 'en')
                  }}
                  aria-pressed={picked}
                  aria-label={`${f.name}, tap to hear her say hi`}
                  className="group block w-full text-center"
                >
                  <span
                    className={`relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-space-2 transition duration-500 ${
                      picked ? 'ring-2 ring-aurora shadow-[0_30px_70px_-20px_rgb(168_85_247/0.6)]' : 'ring-1 ring-white/[0.08] group-hover:-translate-y-1 group-hover:ring-aurora/60'
                    } ${speaking ? 'animate-breathe' : ''}`}
                  >
                    <img src={f.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-space/85" />
                  </span>
                  <span className={`mt-4 block text-[19px] font-semibold tracking-[-0.02em] ${picked ? 'text-ink' : 'text-ink-2'}`}>{f.name}</span>
                </button>
              </Reveal>
            )
          })}
        </ul>

        <Reveal className="mt-10">
          <a href={appLink({ face: face.id })} className="btn btn-primary h-14 px-9 text-[17px] font-semibold">
            Call {face.name} <ArrowRight size={19} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
