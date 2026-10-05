import { Command, ImagePlus, Monitor } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { PixelCompanion } from '../pixel/PixelCompanion'

export function ComingNext() {
  return (
    <section id="next" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Coming next" title={<>Beyond the <span className="text-gradient">browser.</span></>}>
          Chrome is just the start. Here’s what we’re building now.
        </SectionHeader>

        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {/* Desktop */}
          <Reveal className="glass relative overflow-hidden rounded-[28px] p-7 sm:p-9">
            <div className="flex items-center gap-2 text-[13px] text-ink-3">
              <Monitor size={15} /> macOS & Windows
            </div>
            <h3 className="mt-4 text-[26px] leading-tight font-semibold tracking-[-0.02em]">Your companion on the desktop</h3>
            <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-3">
              A small floating friend that stays on top of everything, lives in your menu bar, and pops up with one shortcut.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-[14px] text-ink-2">
              {['⌘', '⌥', 'B'].map((k) => (
                <kbd key={k} className="grid h-8 min-w-8 place-items-center rounded-lg bg-white/[0.06] px-2 font-display text-[14px] ring-1 ring-line-2 shadow-[0_2px_0_rgb(255_255_255/0.06)]">
                  {k}
                </kbd>
              ))}
              <span className="ml-2 text-ink-3">to summon</span>
            </div>

            {/* Mini desktop scene */}
            <div aria-hidden className="relative mt-8 h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b1f4b] via-[#251a52] to-[#0f2a4a] ring-1 ring-line">
              <div className="flex h-6 items-center justify-end gap-3 bg-black/30 px-3 text-[11px] text-ink-3">
                <img src="/brand/mark.svg" alt="" className="h-3.5 w-3.5" />
                <Command size={11} />
                <span>9:41</span>
              </div>
              <div className="absolute top-12 left-6 h-28 w-56 rounded-xl bg-white/[0.07] ring-1 ring-white/10" />
              <div className="absolute top-16 left-20 h-28 w-60 rounded-xl bg-white/[0.1] ring-1 ring-white/10" />
              <div className="absolute right-6 bottom-3 animate-breathe">
                <PixelCompanion avatar="male" state="wave" scale={2} />
              </div>
            </div>
          </Reveal>

          {/* Custom */}
          <Reveal delay={0.08} className="glass relative overflow-hidden rounded-[28px] p-7 sm:p-9">
            <div className="flex items-center gap-2 text-[13px] text-ink-3">
              <ImagePlus size={15} /> Custom companions
            </div>
            <h3 className="mt-4 text-[26px] leading-tight font-semibold tracking-[-0.02em]">Someone familiar, in pixels</h3>
            <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-3">
              Turn a photo of someone you love into your own pixel companion. Same warmth, a face that’s yours.
            </p>

            <div aria-hidden className="mt-8 flex h-52 items-center justify-center gap-5 rounded-2xl bg-white/[0.02] ring-1 ring-line sm:gap-8">
              <div className="grid h-36 w-28 place-items-center rounded-xl bg-gradient-to-br from-[#efcba5] to-[#c89a7a] ring-4 ring-white/80 shadow-xl -rotate-3">
                <ImagePlus size={30} className="text-[#6b4a3a]/70" />
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-2 w-2 animate-pulse bg-aurora-soft" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
              <div className="overflow-hidden rounded-xl bg-[#efcba5] ring-1 ring-white/10">
                <PixelCompanion avatar="female" state="happy" scale={2} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
