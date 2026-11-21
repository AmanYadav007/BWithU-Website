import { Bot, HeartHandshake, MicOff, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
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
      <div className="container-x grid gap-12 lg:grid-cols-[440px_1fr] lg:gap-16">
        <Reveal>
          <span className="eyebrow">Privacy & safety</span>
          <h2 className="h2 mt-4">
            Built to be <br className="hidden lg:block" />
            trusted.
          </h2>
          <p className="mt-6 max-w-[24rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
            Talking to someone should feel safe. Here’s what that means for us.
          </p>
          <p className="mt-8 text-[15px] font-semibold text-cyan-soft">
            Read the{' '}
            <a href={site.privacy} className="underline decoration-cyan-soft/30 underline-offset-4 hover:decoration-cyan-soft">privacy policy</a>
            {' '}and{' '}
            <a href={site.terms} className="underline decoration-cyan-soft/30 underline-offset-4 hover:decoration-cyan-soft">terms</a>
          </p>
          <div aria-hidden className="relative mt-12 hidden h-[180px] w-[180px] place-items-center lg:grid">
            <span className="glow-aurora absolute inset-0" />
            <span className="absolute h-[150px] w-[150px] rounded-full border border-white/10" />
            <span className="absolute h-[110px] w-[110px] rounded-full border border-white/10" />
            <span className="absolute h-[70px] w-[70px] rounded-full border border-aurora-soft/80" />
            <ShieldCheck size={32} className="relative" />
          </div>
        </Reveal>

        <ul className="grid sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={(i % 2) * 0.06}
              className={`border-line py-8 sm:px-10 sm:py-10 ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-t-0' : ''} ${i % 2 ? 'sm:border-l sm:pr-0' : 'sm:pl-0'}`}
            >
              <p.icon size={28} strokeWidth={1.75} className={i === 0 || i === 3 ? 'text-cyan' : 'text-aurora-soft'} />
              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.01em] sm:text-[21px]">{p.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-3">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
