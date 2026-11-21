import { ArrowRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FACES } from '../lib/companions'
import { appLink, site } from '../lib/site'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="glow-aurora pointer-events-none absolute top-0 left-1/2 h-full w-[1000px] -translate-x-1/2 animate-drift" />
      <div aria-hidden className="glow-cyan pointer-events-none absolute right-[10%] bottom-0 h-[420px] w-[560px]" />
      <Reveal className="container-x relative text-center">
        <div className="relative mx-auto flex w-fit -space-x-3.5 sm:-space-x-4">
          {FACES.map((f) => (
            <img key={f.id} src={f.image} alt="" loading="lazy" className="h-[60px] w-[60px] rounded-full border-[3px] border-space object-cover object-[50%_25%] sm:h-[76px] sm:w-[76px]" />
          ))}
          <span aria-hidden className="absolute -right-1 bottom-0.5 h-4 w-4 rounded-full border-[3px] border-space bg-cyan" />
        </div>

        <h2 className="mx-auto mt-10 text-[clamp(2.3rem,6.4vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
          Someone’s waiting
          <br />
          to say hi.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-ink-2 sm:text-[19px]">It takes a minute. Bring headphones if you have them.</p>
        <a href={appLink()} className="btn btn-primary mt-9 h-[60px] w-full max-w-[350px] px-9 text-[17px] font-semibold sm:w-auto">
          Start a free call <ArrowRight size={19} />
        </a>
        <p className="mt-5 text-[14px] text-ink-3">{site.freeMinutes} free minutes a day · No sign-up</p>
      </Reveal>
    </section>
  )
}
