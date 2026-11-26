import { ShieldCheck } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { site } from '../lib/site'

/** One calm line. Only what the app's privacy page promises: no stored call audio or transcripts, memory on your device. */
export function Privacy() {
  return (
    <section id="privacy" className="relative py-16 sm:py-24">
      <Reveal className="container-x flex flex-col items-center text-center">
        <div aria-hidden className="relative grid h-[120px] w-[120px] place-items-center">
          <span className="glow-aurora absolute inset-0" />
          <span className="absolute h-[110px] w-[110px] animate-breathe rounded-full border border-white/10" />
          <span className="absolute h-[70px] w-[70px] rounded-full border border-aurora-soft/80" />
          <ShieldCheck size={30} className="relative" />
        </div>
        <p className="mt-8 max-w-[26rem] text-[clamp(1.35rem,3vw,1.75rem)] leading-snug font-semibold tracking-[-0.02em]">
          Your calls aren’t recorded. Your memories stay on your device.
        </p>
        <a href={site.privacy} className="mt-5 text-[15px] text-ink-3 underline decoration-white/20 underline-offset-4 hover:text-ink">
          Privacy policy
        </a>
      </Reveal>
    </section>
  )
}
