import { Brain, Cloud, FileText, Heart, LayoutGrid, Mic, Search, Send } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { CallPanel } from '../components/CallPanel'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { PixelCompanion } from '../pixel/PixelCompanion'
import { COMPANIONS } from '../pixel/types'
import type { CompanionAvatar } from '../pixel/types'
import { scenarios } from '../lib/scripts'
import type { Scenario } from '../lib/scripts'
import { useConversation } from '../lib/useConversation'

const ICONS: Record<string, ReactNode> = {
  file: <FileText size={16} />,
  cloud: <Cloud size={16} />,
  heart: <Heart size={16} />,
  tabs: <LayoutGrid size={16} />,
  search: <Search size={16} />,
  brain: <Brain size={16} />,
}

const KEYWORDS: Array<[RegExp, string]> = [
  [/weather|rain|umbrella|temperature|forecast/i, 'weather'],
  [/article|page|summar|about|read/i, 'page'],
  [/tab|switch|figma|go to|take me/i, 'tabs'],
  [/news|latest|today|search|look up|ai/i, 'news'],
  [/remember|exam|birthday|my name/i, 'memory'],
  [/video|youtube|tired|procrast|lazy|one more/i, 'nudge'],
]

/** Free-text answers when nothing matches, so the demo never pretends to be the real model. */
function fallback(text: string): Scenario {
  return {
    id: 'fallback',
    prompt: text,
    icon: 'heart',
    beats: [
      { state: 'listen', user: text, ms: 1300 },
      { state: 'think', user: text, ms: 1000 },
      { state: 'talk', bot: 'In the real app I’d answer that live. Here I only know a few tricks. Try one of the chips!', ms: 4200 },
    ],
  }
}

export function Demo() {
  const [avatar, setAvatar] = useState<CompanionAvatar>('male')
  const [name, setName] = useState('Bumi')
  const [draft, setDraft] = useState('')
  const { beat, activeId, play } = useConversation()

  const run = (s: Scenario) => play(s)

  const submit = () => {
    const text = draft.trim()
    if (!text) return
    setDraft('')
    const id = KEYWORDS.find(([re]) => re.test(text))?.[1]
    const base = id ? scenarios.find((s) => s.id === id)! : null
    run(base ? { ...base, beats: base.beats.map((b) => (b.user ? { ...b, user: text } : b)) } : fallback(text))
  }

  const busy = activeId !== null
  const displayName = name.trim() || 'B'

  return (
    <section id="demo" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Try it" title={<>Say hi to your <span className="text-gradient">companion.</span></>}>
          Pick a face, give them a name, and tap a prompt. This is a scripted preview. The real one listens and talks back live.
        </SectionHeader>

        <div className="mt-16 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-14">
          <Reveal className="order-2 space-y-8 lg:order-1">
            {/* Step 1: choose */}
            <div className="glass rounded-3xl p-6 sm:p-7">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[18px] font-semibold">1. Choose your companion</h3>
                <span className="hidden text-[13px] text-ink-4 sm:inline">Same as the extension’s first screen</span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3" role="radiogroup" aria-label="Companion">
                {(Object.keys(COMPANIONS) as CompanionAvatar[]).map((a) => {
                  const selected = a === avatar
                  return (
                    <button
                      key={a}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => {
                        setAvatar(a)
                        run({ id: 'hello', prompt: '', icon: '', beats: [{ state: 'wave', bot: `Hi! I'm ${displayName}.`, ms: 2200 }] })
                      }}
                      className={`group rounded-2xl border p-2 text-left transition-all duration-300 ${
                        selected ? 'border-aurora/70 bg-aurora/10 shadow-[0_0_0_4px_rgb(168_85_247/0.12)]' : 'border-line hover:border-line-2 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="block overflow-hidden rounded-xl" style={{ background: COMPANIONS[a].cardColor }}>
                        <PixelCompanion avatar={a} state={selected && beat.state === 'wave' ? 'happy' : 'idle'} scale={2} className="mx-auto !h-auto !w-full max-w-[128px]" />
                      </span>
                      <span className="mt-2 block px-1 font-display text-[15px] font-medium">{COMPANIONS[a].label}</span>
                      <span className="block px-1 text-[12px] text-ink-4">Voice: {COMPANIONS[a].voice}</span>
                    </button>
                  )
                })}
                <div className="flex flex-col rounded-2xl border border-dashed border-line-2 p-2 opacity-80">
                  <span className="grid aspect-square place-items-center rounded-xl bg-white/[0.03] font-display text-[34px] text-ink-4">+</span>
                  <span className="mt-2 flex items-center gap-1.5 px-1 font-display text-[15px] font-medium">
                    Custom <span className="rounded-full bg-cyan/15 px-1.5 py-px text-[10px] text-cyan">Soon</span>
                  </span>
                  <span className="block px-1 text-[12px] leading-snug text-ink-4">From a photo of someone you love</span>
                </div>
              </div>

              <label className="mt-6 block">
                <span className="text-[14px] text-ink-3">2. What should we call them?</span>
                <input
                  value={name}
                  maxLength={14}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-12 w-full rounded-xl border border-line-2 bg-white/[0.03] px-4 text-[16px] text-ink outline-none transition focus:border-aurora/60 focus:bg-white/[0.05]"
                />
              </label>
            </div>

            {/* Step 2: talk */}
            <div className="glass hidden rounded-3xl p-6 sm:p-7 lg:block">
              <h3 className="text-[18px] font-semibold">3. Ask {displayName} something</h3>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {scenarios.map((s) => {
                  const active = activeId === s.id
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => run(s)}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] transition-all duration-300 ${
                        active ? 'border-cyan/60 bg-cyan/10 text-ink' : 'border-line text-ink-2 hover:border-line-2 hover:bg-white/[0.04] hover:text-ink'
                      }`}
                    >
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${active ? 'bg-cyan/20 text-cyan' : 'bg-white/5 text-ink-3'}`}>{ICONS[s.icon]}</span>
                      “{s.prompt}”
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:sticky lg:top-28 lg:order-2">
            <div className="relative mx-auto max-w-[400px]">
              <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-aurora/25 blur-3xl" />
              <div className="overflow-hidden rounded-[24px] ring-1 ring-line-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)]">
                <CallPanel
                  avatar={avatar}
                  name={displayName}
                  beat={beat}
                  scale={3}
                  className="h-[560px]"
                  controls={
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        submit()
                      }}
                      className="flex items-center gap-1.5 border-t-4 border-[var(--px-ink)] bg-[var(--px-night)] p-2.5"
                    >
                      <button
                        type="button"
                        onClick={() => run(scenarios[Math.floor(Math.random() * scenarios.length)])}
                        aria-label="Talk (plays a random example)"
                        className={`px-box grid h-10 w-10 shrink-0 place-items-center ${beat.state === 'listen' ? 'bg-[var(--px-red)] text-white' : 'bg-[var(--px-yellow)] text-[var(--px-ink)]'}`}
                        style={{ boxShadow: '3px 3px 0 var(--px-ink)' }}
                      >
                        <Mic size={17} />
                      </button>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        disabled={busy}
                        placeholder={`Message ${displayName}`}
                        aria-label={`Message ${displayName}`}
                        className="px-box h-10 min-w-0 flex-1 bg-[var(--px-cream)] px-2.5 text-[18px] text-[var(--px-ink)] outline-none placeholder:text-[var(--px-ink)]/45 disabled:opacity-70"
                        style={{ boxShadow: 'none' }}
                      />
                      <button
                        type="submit"
                        aria-label="Send"
                        className="px-box grid h-10 w-10 shrink-0 place-items-center bg-[var(--px-lavender)] text-[var(--px-ink)]"
                        style={{ boxShadow: '3px 3px 0 var(--px-ink)' }}
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  }
                />
              </div>
              {/* On small screens the prompts sit right under the panel so the reaction stays in view. */}
              <div className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
                {scenarios.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => run(s)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[14px] ${
                      activeId === s.id ? 'border-cyan/60 bg-cyan/10 text-ink' : 'border-line-2 text-ink-2'
                    }`}
                  >
                    {ICONS[s.icon]}
                    {s.prompt}
                  </button>
                ))}
              </div>
              <p className="mt-4 hidden text-center text-[13px] text-ink-4 lg:block">Move your cursor. {displayName} is watching.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
