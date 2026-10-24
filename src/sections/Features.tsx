import { Captions, Hand, MonitorSmartphone, Palette, ScanFace, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ScanFace,
    title: 'A face that’s really there',
    body: 'A lifelike 3D face looks at you, and its lips move with every word it says.',
  },
  {
    icon: Zap,
    title: 'Answers in a second or two',
    body: 'No typing and no waiting on a spinner. Talk, pause, and they reply the way a friend would.',
  },
  {
    icon: Hand,
    title: 'Interrupt any time',
    body: 'Changed your mind mid-sentence? Just start talking. They stop and listen.',
  },
  {
    icon: Captions,
    title: 'Captions both ways',
    body: 'See what you said and what they’re saying, so nothing gets lost on a noisy day.',
  },
  {
    icon: Palette,
    title: 'Make them yours',
    body: 'Choose a face, a name, a voice and a vibe: warm, playful or focused.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Nothing to install',
    body: 'Works in Chrome, Safari and Edge on your phone or computer. Open the link and say hi.',
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="What it’s like" title={<>Feels like a call, <span className="text-gradient">not a chatbot.</span></>}>
          Most AI makes you type and read. BwithU just talks with you, face to face.
        </SectionHeader>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={(i % 3) * 0.06} className="glass group rounded-[28px] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-aurora/25 to-cyan/20 text-ink ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-0.5">
                <f.icon size={20} />
              </span>
              <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.01em]">{f.title}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-3">{f.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
