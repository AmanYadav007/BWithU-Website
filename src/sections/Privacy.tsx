import { ArrowUpRight, EyeOff, HardDrive, KeyRound, MicOff } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const points = [
  {
    icon: <MicOff size={20} />,
    title: 'Mic only when you say so',
    body: 'B hears you only while the mic is on. Audio is never recorded or stored.',
  },
  {
    icon: <EyeOff size={20} />,
    title: 'Reads tabs only when you talk',
    body: 'Page text is sent with your message so B can answer, and isn’t kept by us.',
  },
  {
    icon: <HardDrive size={20} />,
    title: 'Memories stay on your device',
    body: 'Your settings, chats and the things B remembers live in your browser.',
  },
  {
    icon: <KeyRound size={20} />,
    title: 'No account. No ads. Never sold.',
    body: 'We don’t build profiles or sell data. Usage counters are wiped after 48 hours.',
  },
]

export function Privacy() {
  return (
    <section id="privacy" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeader align="left" eyebrow="Privacy" title={<>A companion you can <span className="text-gradient">trust.</span></>}>
              Someone who sits beside you all day should be respectful. B only listens and looks when you ask.
            </SectionHeader>
            <Reveal delay={0.1}>
              <a href="/privacy" className="mt-8 inline-flex items-center gap-1.5 text-[15px] text-cyan hover:underline hover:underline-offset-4">
                Read the full privacy policy <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="glass rounded-[24px] p-6 sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">{p.icon}</span>
                <h3 className="mt-5 text-[18px] leading-snug font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-3">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
