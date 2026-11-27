import { useReducedMotion } from 'framer-motion'

/** A row of bars that breathe like a voice. Pure CSS (scaleY), so nothing reflows. */
export function Wave({ bars = 24, className = '', active = true }: { bars?: number; className?: string; active?: boolean }) {
  const reduce = useReducedMotion()
  return (
    <span aria-hidden className={`flex h-full items-center justify-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }, (_, i) => {
        const h = 30 + ((i * 37) % 70)
        return (
          <span
            key={i}
            className="w-[3px] flex-1 max-w-[4px] origin-center rounded-full bg-aurora-soft/90"
            style={{
              height: `${h}%`,
              opacity: active ? 0.55 + (h % 45) / 100 : 0.3,
              animation: active && !reduce ? `vbar ${0.6 + (i % 5) * 0.14}s ${(i % 7) * 0.07}s ease-in-out infinite` : undefined,
              transform: active ? undefined : 'scaleY(0.25)',
            }}
          />
        )
      })}
    </span>
  )
}
