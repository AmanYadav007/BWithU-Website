import { ArrowRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FACES } from '../lib/companions'
import { callLink, site } from '../lib/site'

export function FinalCTA({ faceId }: { faceId: string }) {
  const face = FACES.find((f) => f.id === faceId) ?? FACES[0]
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[36px] border border-line-2 bg-space-2 px-6 py-16 text-center sm:py-24">
          <div aria-hidden className="glow-aurora pointer-events-none absolute top-[-40%] left-1/2 h-[120%] w-[80%] -translate-x-1/2 opacity-60" />
          <div className="relative">
            <div className="mx-auto flex w-fit -space-x-4">
              {FACES.map((f) => (
                <img key={f.id} src={f.image} alt="" loading="lazy" width={76} height={76} className="h-[60px] w-[60px] rounded-full border-[3px] border-space-2 object-cover object-[50%_25%] sm:h-[76px] sm:w-[76px]" />
              ))}
            </div>
            <h2 className="mx-auto mt-8 max-w-3xl text-[clamp(2.3rem,6vw,4.25rem)] leading-[1.04] font-semibold tracking-[-0.03em]">She’s ready when you are.</h2>
            <a href={callLink(face.id)} className="btn btn-primary mt-10 h-[60px] w-full max-w-[320px] px-9 text-[17px] font-semibold sm:w-auto">
              Call now <ArrowRight size={19} />
            </a>
            <p className="mt-5 text-[14px] text-ink-3">{site.freeMinutes} free minutes a day · No sign-up</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
