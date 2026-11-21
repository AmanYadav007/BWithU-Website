import { Captions, Hand, ScanFace, Zap, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from '../components/Reveal'

const rows: { icon: LucideIcon; tint: string; title: string; body: string; visual: ReactNode }[] = [
  {
    icon: Zap,
    tint: 'text-aurora-soft',
    title: 'Answers in a second or two',
    body: 'No typing, no spinner. Talk, pause, and they reply the way a friend would.',
    visual: <ReplyVisual />,
  },
  {
    icon: Hand,
    tint: 'text-iris',
    title: 'Interrupt any time',
    body: 'Changed your mind mid-sentence? Just start talking. They stop and listen.',
    visual: <InterruptVisual />,
  },
  {
    icon: Captions,
    tint: 'text-cyan',
    title: 'Captions both ways',
    body: 'See what you said and what they’re saying, so nothing gets lost.',
    visual: <CaptionsVisual />,
  },
]

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1fr_440px] lg:items-end">
          <Reveal>
            <span className="eyebrow">What it’s like</span>
            <h2 className="h2 mt-4">
              Feels like a call,
              <br />
              <span className="text-gradient">not a chatbot.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-[17px] leading-relaxed text-ink-2 sm:text-[18px]">
              Most AI makes you type and read. BwithU just talks with you, face to face.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <Reveal>
            <FaceTile />
          </Reveal>

          <ul>
            {rows.map((r, i) => (
              <Reveal as="li" key={r.title} delay={0.08 * i} className={`flex gap-5 py-7 ${i ? 'border-t border-line' : 'lg:pt-0'}`}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5">
                  <r.icon size={21} className={r.tint} />
                </span>
                <span className="min-w-0 flex-1">
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em] sm:text-[20px]">{r.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-3">{r.body}</p>
                </span>
                <span aria-hidden className="hidden h-[84px] w-[120px] shrink-0 rounded-2xl border border-line bg-white/[0.03] p-3 sm:block">
                  {r.visual}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/** Aiko with face-tracking corners: the big "a face that's really there" tile. */
function FaceTile() {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-[28px] border border-line bg-space-2 sm:h-[480px] sm:rounded-[32px]">
      <img
        src="/faces/aiko.jpg"
        alt="Aiko, a BwithU companion"
        loading="lazy"
        className="absolute top-0 left-1/2 h-[400px] w-auto -translate-x-1/2 animate-breathe sm:left-auto sm:right-0 sm:h-[510px] sm:-translate-x-0 sm:-translate-y-10"
      />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,var(--color-space-2)_78%)] sm:bg-[linear-gradient(90deg,var(--color-space-2)_38%,transparent_70%),linear-gradient(180deg,transparent_65%,var(--color-space-2))]" />

      {/* Face tracking corners */}
      <div aria-hidden className="absolute top-[72px] left-1/2 h-[150px] w-[120px] -translate-x-1/2 sm:top-[70px] sm:right-[102px] sm:left-auto sm:h-[200px] sm:w-[160px] sm:translate-x-0">
        {['top-0 left-0 border-t-2 border-l-2', 'top-0 right-0 border-t-2 border-r-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-cyan ${c}`} />
        ))}
      </div>
      <span className="chip absolute top-[110px] left-[38%] hidden sm:inline-flex">
        <span className="h-2 w-2 rounded-full bg-cyan" /> Looks at you
      </span>
      <span className="chip absolute top-[236px] right-4 sm:top-[300px] sm:right-8">
        <span aria-hidden className="flex h-4 items-center gap-[3px]">
          {[6, 12, 16, 10, 14].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-aurora-soft" style={{ height: h }} />
          ))}
        </span>
        Lips in sync
      </span>

      <span className="absolute top-8 left-8 hidden h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/5 sm:grid">
        <ScanFace size={24} />
      </span>
      <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10 sm:max-w-[280px]">
        <h3 className="text-[26px] leading-[1.1] font-semibold tracking-[-0.025em] sm:text-[34px]">
          A face that’s <br className="hidden sm:block" />
          really there.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-3">A lifelike 3D face looks at you, and its lips move with every word it says.</p>
      </div>
    </div>
  )
}

function ReplyVisual() {
  return (
    <span className="flex h-full flex-col justify-center gap-1.5 text-[10px] text-ink-4">
      <span>you</span>
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-10 rounded-full bg-ink-3" />
        <span className="text-[11px] font-semibold text-cyan-soft">~1s</span>
      </span>
      <span className="h-1.5 w-full rounded-full bg-gradient-to-r from-aurora-soft to-cyan" />
      <span>reply</span>
    </span>
  )
}

function InterruptVisual() {
  return (
    <span className="relative flex h-full items-center">
      {[8, 16, 24, 12, 20, 10, 6].map((h, i) => (
        <span key={i} className={`mr-[3px] w-[3px] rounded-full bg-ink-3 ${i > 4 ? 'opacity-30' : ''}`} style={{ height: h }} />
      ))}
      <span className="mx-1 h-full w-[1.5px] bg-aurora-soft" />
      <span className="flex translate-y-3 items-center">
        {[10, 18, 24, 14, 8].map((h, i) => (
          <span key={i} className="mr-[4px] w-[3px] rounded-full bg-cyan" style={{ height: h }} />
        ))}
      </span>
    </span>
  )
}

function CaptionsVisual() {
  return (
    <span className="flex h-full flex-col justify-center gap-2">
      <span className="ml-auto h-[22px] w-[68px] rounded-lg bg-white/16 p-2">
        <span className="block h-1 w-10 rounded-full bg-ink-2" />
      </span>
      <span className="h-[26px] w-full rounded-lg border border-line bg-space p-2">
        <span className="block h-1 w-[85%] rounded-full bg-ink" />
        <span className="mt-1 block h-1 w-1/2 rounded-full bg-ink-3" />
      </span>
    </span>
  )
}
