import { AnimatePresence, motion } from 'framer-motion'
import { Cloud, FileText, Heart, LayoutGrid, Mic, Search, Send, Settings2, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { PixelCompanion } from '../pixel/PixelCompanion'
import type { CompanionAvatar } from '../pixel/types'
import type { Beat, Display, DisplayKind } from '../lib/scripts'

const STATUS: Record<string, string> = {
  listen: 'Listening…',
  think: 'Thinking…',
  searching: 'Searching…',
  talk: 'Speaking…',
}

const KIND: Record<DisplayKind, { label: string; bar: string; icon: ReactNode }> = {
  weather: { label: 'Weather', bar: 'var(--px-blue)', icon: <Cloud size={14} /> },
  search: { label: 'Found this', bar: 'var(--px-green)', icon: <Search size={14} /> },
  info: { label: 'Look', bar: 'var(--px-yellow)', icon: <FileText size={14} /> },
  tab_picker: { label: 'Your tabs', bar: 'var(--px-yellow)', icon: <LayoutGrid size={14} /> },
  confirmation: { label: 'Okay?', bar: 'var(--px-red)', icon: <Sparkles size={14} /> },
  memory: { label: 'I remember', bar: 'var(--px-lavender)', icon: <Heart size={14} /> },
}

function DisplayCard({ display }: { display: Display }) {
  const kind = KIND[display.kind]
  return (
    <motion.div
      key={display.title}
      initial={{ opacity: 0, y: -10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="px-box bg-[var(--px-cream)] text-[var(--px-ink)]"
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 text-[15px] text-white" style={{ background: kind.bar }}>
        {kind.icon}
        <span className={display.kind === 'info' || display.kind === 'memory' || display.kind === 'tab_picker' ? 'text-[var(--px-ink)]' : ''}>
          {kind.label}
        </span>
      </div>
      <div className="px-3 py-2">
        <div className="text-[19px] leading-none">{display.title}</div>
        <ul className="mt-1.5 space-y-0.5 text-[16px] leading-tight opacity-80">
          {display.lines.map((l) => (
            <li key={l}>• {l}</li>
          ))}
        </ul>
        {display.kind === 'confirmation' && (
          <div className="mt-2 flex gap-2 text-[16px]">
            <span className="px-box bg-[var(--px-green)] px-2.5 text-white">Yes</span>
            <span className="px-box bg-white px-2.5">Not now</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

type Props = {
  avatar: CompanionAvatar
  name: string
  beat: Beat
  scale?: number
  className?: string
  /** Replaces the static control bar, e.g. with a working input. */
  controls?: ReactNode
}

/** The extension's side-panel "call" screen, rebuilt for the site. */
export function CallPanel({ avatar, name, beat, scale = 3, className = '', controls }: Props) {
  const status = STATUS[beat.state] ?? 'Ready'
  const live = beat.state !== 'idle'

  return (
    <div className={`px-world flex flex-col overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 border-[var(--px-ink)] bg-[var(--px-night)] px-3.5 py-2.5">
        <div className="leading-none">
          <div className="text-[13px] tracking-[1.5px] text-[var(--px-yellow)]">BWITHU</div>
          <div className="mt-0.5 text-[22px] text-[var(--px-cream)]">{name} Call</div>
        </div>
        <span
          className="px-box flex items-center gap-1.5 px-2 py-0.5 text-[16px] text-[var(--px-ink)] transition-colors"
          style={{ background: live ? 'var(--px-yellow)' : 'var(--px-lavender)', boxShadow: '3px 3px 0 var(--px-ink)' }}
        >
          {live && <span className="h-2 w-2 animate-pulse bg-[var(--px-red)]" />}
          {status}
        </span>
      </div>

      {/* Stage */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="absolute inset-x-3 top-3 z-10">
          <AnimatePresence mode="wait">{beat.display && <DisplayCard display={beat.display} />}</AnimatePresence>
        </div>

        <div className="flex min-h-0 flex-1 items-end justify-center">
          <PixelCompanion avatar={avatar} state={beat.state} speech={beat.bot} scale={scale} />
        </div>

        <div className="relative z-10 flex min-h-[96px] flex-col justify-end gap-2 px-3 pt-1 pb-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {beat.user && !beat.display && (
              <motion.div
                key={`u-${beat.user}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-bubble-user ml-auto max-w-[85%] px-3 py-1.5 text-[18px] leading-[1.1]"
              >
                {beat.user}
              </motion.div>
            )}
            {beat.bot && (
              <motion.div
                key={`b-${beat.bot}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="px-bubble-bot mr-auto max-w-[92%] px-3 py-1.5 text-[18px] leading-[1.1]"
              >
                {beat.bot}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {controls ?? (
        <div className="flex items-center gap-1.5 border-t-4 border-[var(--px-ink)] bg-[var(--px-night)] p-2.5">
          <span
            className={`px-box grid h-9 w-9 shrink-0 place-items-center ${beat.state === 'listen' ? 'bg-[var(--px-red)] text-white' : 'bg-[var(--px-yellow)] text-[var(--px-ink)]'}`}
            style={{ boxShadow: '3px 3px 0 var(--px-ink)' }}
          >
            <Mic size={16} />
          </span>
          <span className="px-box flex h-9 min-w-0 flex-1 items-center bg-[var(--px-cream)] px-2.5 text-[17px] text-[var(--px-ink)]/50" style={{ boxShadow: 'none' }}>
            Message {name}
          </span>
          {[Send, FileText, Settings2].map((Icon, i) => (
            <span key={i} className="px-box grid h-9 w-9 shrink-0 place-items-center bg-[var(--px-lavender)] text-[var(--px-ink)]" style={{ boxShadow: '3px 3px 0 var(--px-ink)' }}>
              <Icon size={15} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
