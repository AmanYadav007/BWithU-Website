import { Mic, MousePointerClick, Smile } from 'lucide-react'
import { ChromeIcon } from '../components/ChromeIcon'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const steps = [
  {
    icon: <ChromeIcon className="h-5 w-5" />,
    title: 'Add BwithU to Chrome',
    body: 'One click. No account, no API keys, nothing to set up.',
  },
  {
    icon: <Smile size={20} />,
    title: 'Pick a companion and name them',
    body: 'Choose a face you like. They’ll ask what you want to call them.',
  },
  {
    icon: <MousePointerClick size={20} />,
    title: 'Click the icon to open the side panel',
    body: 'They live next to whatever you’re doing. A tiny orb waits on every page.',
  },
  {
    icon: <Mic size={20} />,
    title: 'Press the mic and talk',
    body: 'Ask, vent, plan, wonder out loud. Your companion is listening.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="How it works" title={<>Up and talking in <span className="text-gradient">under a minute.</span></>} />

        <div className="relative mt-16">
        <div aria-hidden className="absolute top-[48px] right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-aurora/0 via-aurora/40 to-cyan/0 lg:block" />
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative">
              <div className="glass h-full rounded-[24px] p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-space-3 text-ink ring-1 ring-aurora/40 shadow-[0_0_24px_-4px_rgb(168_85_247/0.6)]">{s.icon}</span>
                  <span className="font-display text-[44px] leading-none font-semibold text-white/[0.06]">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-[18px] leading-snug font-semibold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}
