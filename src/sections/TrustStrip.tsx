import { Clock, Globe, MonitorSmartphone, UserX } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { site } from '../lib/site'

const ITEMS = [
  { icon: UserX, text: 'No sign-up' },
  { icon: Clock, text: `${site.freeMinutes} free minutes a day` },
  { icon: Globe, text: 'English · हिंदी · Hinglish · Español' },
  { icon: MonitorSmartphone, text: 'Works in your browser' },
]

export function TrustStrip() {
  return (
    <section aria-label="The basics" className="relative py-6 sm:py-10">
      <div className="container-x">
        <ul className="grid grid-cols-2 gap-3 rounded-[28px] border border-line bg-white/[0.02] p-3 lg:grid-cols-4 lg:p-4">
          {ITEMS.map(({ icon: Icon, text }, i) => (
            <Reveal as="li" key={text} delay={i * 0.07} className="flex flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center sm:flex-row sm:text-left lg:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line-2 bg-white/5">
                <Icon size={21} strokeWidth={1.75} className="text-cyan-soft" />
              </span>
              <span className="text-[15px] leading-snug font-medium text-ink">{text}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
