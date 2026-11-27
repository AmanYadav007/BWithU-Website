import { EyeOff, ShieldCheck, Trash2 } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { site } from '../lib/site'

const CARDS = [
  { icon: EyeOff, text: 'We don’t store your call audio or transcripts' },
  { icon: ShieldCheck, text: 'Her memory of you is saved on your device, not our servers' },
  { icon: Trash2, text: 'Delete it anytime' },
]

export function PrivateByDesign() {
  return (
    <section id="privacy" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Private by design" title="Yours. Only yours." align="center" />
        <ul className="mx-auto mt-14 grid max-w-[1000px] gap-5 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, text }, i) => (
            <Reveal as="li" key={text} delay={i * 0.09}>
              <SpotlightCard spotlightColor="rgb(56 189 248)" intensity={0.14} className="glass h-full !rounded-[24px] !p-7">
                <Icon size={28} strokeWidth={1.6} className="text-cyan-soft" />
                <p className="mt-6 text-[20px] leading-snug font-semibold tracking-[-0.012em]">{text}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <a href={site.privacy} className="text-[15px] text-ink-2 underline decoration-white/25 underline-offset-4 hover:text-ink">Read the privacy page</a>
        </p>
      </div>
    </section>
  )
}
