import { Bot, HeartHandshake, MicOff, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { site } from '../lib/site'

const points: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MicOff,
    title: 'Nothing is recorded',
    body: 'Your voice is processed live to reply, then it’s gone. We don’t store audio or transcripts of your calls.',
  },
  {
    icon: Bot,
    title: 'Always honest about being AI',
    body: 'Your companion is an AI, says so if you ask, and never pretends to be a real person or a partner.',
  },
  {
    icon: HeartHandshake,
    title: 'Caring when it matters',
    body: 'If you’re going through something heavy, your companion responds with care and points you to real help.',
  },
  {
    icon: ShieldCheck,
    title: 'No account needed',
    body: `No sign-up, no email, no password. ${site.freeMinutes} free minutes a day for everyone, 18 and over.`,
  },
]

export function Privacy() {
  return (
    <section id="privacy" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Privacy & safety" title="Built to be trusted.">
          Talking to someone should feel safe. Here’s what that means for us.
        </SectionHeader>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.06} className="glass flex gap-5 rounded-[28px] p-7">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.05] text-cyan ring-1 ring-white/10">
                <p.icon size={20} />
              </span>
              <span>
                <h3 className="text-[18px] font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-3">{p.body}</p>
              </span>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 text-center text-[15px] text-ink-3">
          Read the full{' '}
          <a href={site.privacy} className="text-ink-2 underline decoration-white/20 underline-offset-4 hover:text-ink">privacy policy</a>
          {' '}and{' '}
          <a href={site.terms} className="text-ink-2 underline decoration-white/20 underline-offset-4 hover:text-ink">terms</a>.
        </Reveal>
      </div>
    </section>
  )
}
