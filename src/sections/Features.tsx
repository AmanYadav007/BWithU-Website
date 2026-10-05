import { motion } from 'framer-motion'
import { AppWindow, Calendar, Globe, HeartHandshake, LayoutGrid, Mic, Search, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

function Card({ className = '', children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} className={`glass group relative overflow-hidden rounded-[28px] p-7 sm:p-8 ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-aurora/0 blur-3xl transition-colors duration-700 group-hover:bg-aurora/20"
      />
      {children}
    </Reveal>
  )
}

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-aurora/25 to-cyan/15 text-ink ring-1 ring-white/10">{children}</span>
  )
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="mt-5 text-[22px] leading-tight font-semibold tracking-[-0.02em]">{children}</h3>
}

function Body({ children }: { children: ReactNode }) {
  return <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-3">{children}</p>
}

/** Live voice waveform. */
function Wave() {
  const bars = [0.35, 0.6, 0.9, 0.5, 1, 0.7, 0.4, 0.85, 0.55, 0.95, 0.45, 0.75, 0.3, 0.65, 0.9, 0.5, 0.35, 0.7, 0.5, 0.3]
  return (
    <div className="flex h-20 items-center gap-[5px]" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[5px] rounded-full bg-gradient-to-t from-aurora to-cyan"
          animate={{ height: [`${h * 30}%`, `${h * 100}%`, `${h * 45}%`] }}
          transition={{ duration: 1.1 + (i % 4) * 0.18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="What B does" title={<>Helpful, without <span className="text-gradient">getting in the way.</span></>}>
          Your companion sits quietly in the side panel. Call on them when you need a hand, or just some company.
        </SectionHeader>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {/* Voice */}
          <Card className="md:col-span-4">
            <div className="flex h-full flex-col justify-between gap-8 sm:flex-row sm:items-center">
              <div className="max-w-sm">
                <Icon><Mic size={20} /></Icon>
                <Title>Talk like you’re on a call</Title>
                <Body>Press the mic and just talk. Live voice, natural pauses, and you can cut in any time. Rather type? That works too.</Body>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <Wave />
                <span className="rounded-full bg-white/5 px-3 py-1 text-[12px] text-ink-3 ring-1 ring-line">Calls up to 10 minutes</span>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Card className="md:col-span-2" delay={0.05}>
            <Icon><LayoutGrid size={20} /></Icon>
            <Title>Knows your tabs</Title>
            <Body>“What’s this page about?” “Which tab had the flight?” B reads your open tabs when you ask.</Body>
            <div className="mt-6 space-y-2" aria-hidden>
              {['Flights to Lisbon — 3 results', 'Q3 plan.docx', 'How to sleep better'].map((t, i) => (
                <div key={t} className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] ring-1 ${i === 0 ? 'bg-cyan/10 text-ink ring-cyan/30' : 'bg-white/[0.03] text-ink-3 ring-line'}`}>
                  <AppWindow size={14} className={i === 0 ? 'text-cyan' : ''} />
                  {t}
                </div>
              ))}
            </div>
          </Card>

          {/* Search */}
          <Card className="md:col-span-2" delay={0.05}>
            <Icon><Search size={20} /></Icon>
            <Title>Looks things up</Title>
            <Body>News, weather, prices, facts. B searches the web and puts the answer on a little screen, with sources.</Body>
          </Card>

          {/* Actions */}
          <Card className="md:col-span-2" delay={0.1}>
            <Icon><Globe size={20} /></Icon>
            <Title>Does the small stuff</Title>
            <Body>Opens sites, switches tabs, drafts a calendar invite. B always asks before it acts.</Body>
            <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
              {[
                { i: <Globe size={13} />, t: 'Open YouTube' },
                { i: <LayoutGrid size={13} />, t: 'Switch tab' },
                { i: <Calendar size={13} />, t: 'Draft invite' },
              ].map((c) => (
                <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-ink-2 ring-1 ring-line">
                  {c.i}
                  {c.t}
                </span>
              ))}
            </div>
          </Card>

          {/* Memory */}
          <Card className="md:col-span-2" delay={0.15}>
            <Icon><Sparkles size={20} /></Icon>
            <Title>Remembers you</Title>
            <Body>Your name, your big week, what you care about. Saved on your device, not on a server.</Body>
          </Card>

          {/* Personality */}
          <Card className="md:col-span-6" delay={0.05}>
            <div className="grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
              <div>
                <Icon><HeartHandshake size={20} /></Icon>
                <Title>Cares how you’re doing</Title>
                <Body>
                  B isn’t a cold assistant. Drift to your fourth YouTube video and you’ll hear about it, kindly. Be too hard on yourself and B will say so. Warm, a little protective, always on your side.
                </Body>
              </div>
              <ul className="space-y-3" aria-label="Examples of what B says">
                {[
                  { who: 'you', text: 'Ugh, I messed up the slides again.' },
                  { who: 'b', text: 'Hey. One typo isn’t a mess. Fix it, breathe, and send it. You’re doing great.' },
                  { who: 'b', text: 'It’s 1 AM. Save the rest for tomorrow?' },
                ].map((m, i) => (
                  <li key={i} className={`flex ${m.who === 'you' ? 'justify-end' : ''}`}>
                    <span
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                        m.who === 'you' ? 'rounded-br-md bg-[#3f6fd8] text-white' : 'rounded-bl-md bg-white/[0.06] text-ink ring-1 ring-line'
                      }`}
                    >
                      {m.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
