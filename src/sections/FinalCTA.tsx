import { ArrowRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { FACES } from '../lib/companions'
import { appLink, site } from '../lib/site'

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[36px] px-6 py-16 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="absolute top-[-50%] left-1/2 h-[130%] w-[90%] -translate-x-1/2 rounded-full bg-aurora/20 blur-[120px]" />
          <div aria-hidden className="absolute right-[-10%] bottom-[-60%] h-[100%] w-[60%] rounded-full bg-cyan/12 blur-[120px]" />

          <div className="relative flex justify-center -space-x-3">
            {FACES.slice(0, 6).map((f) => (
              <img
                key={f.id}
                src={f.image}
                alt=""
                loading="lazy"
                className="h-14 w-14 rounded-full border-2 border-space object-cover object-[50%_30%] sm:h-16 sm:w-16"
              />
            ))}
          </div>

          <h2 className="relative mt-8 text-[clamp(2.2rem,5.4vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
            Someone’s waiting
            <br />
            to say hi.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-ink-2">
            It takes a minute. Bring headphones if you have them.
          </p>
          <a href={appLink()} className="btn btn-primary relative mt-9 h-14 px-8 text-[16px]">
            Start a free call <ArrowRight size={18} />
          </a>
          <p className="relative mt-5 text-[13px] text-ink-4">{site.freeMinutes} free minutes a day · No sign-up · 18+</p>
        </Reveal>
      </div>
    </section>
  )
}
