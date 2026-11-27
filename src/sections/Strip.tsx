import { Brain, Languages, Mic } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import SpotlightCard from '../components/reactbits/SpotlightCard'

const ITEMS = [
  { icon: Mic, title: 'A real voice', body: 'She talks back, out loud, as you speak.' },
  { icon: Brain, title: 'She remembers', body: 'Only what you share, and it stays on your device.' },
  { icon: Languages, title: 'Your language', body: 'English, Hindi and Hinglish.' },
]

/** Three short cards under the hero. */
export function Strip() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-x">
        <ul className="mx-auto grid max-w-[960px] gap-4 sm:grid-cols-3 sm:gap-5">
          {ITEMS.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08}>
              <SpotlightCard spotlightColor="rgb(56 189 248)" intensity={0.16} className="h-full !rounded-[24px] !p-6 text-left glass">
                <Icon size={26} className="text-aurora-soft" />
                <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.012em]">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-snug text-ink-2">{body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
