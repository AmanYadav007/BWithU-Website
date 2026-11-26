/** Seven bars that move while a companion speaks. */
export function VoiceBars({ active, className = '' }: { active: boolean; className?: string }) {
  const heights = [10, 18, 26, 14, 22, 12, 8]
  return (
    <span aria-hidden className={`flex h-7 items-center gap-[5px] ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-1 origin-center rounded-full transition-opacity duration-300 ${i % 2 ? 'bg-cyan' : 'bg-aurora-soft'} ${active ? 'opacity-100' : 'opacity-0'}`}
          style={{ height: h, animation: active ? `vbar ${0.7 + (i % 3) * 0.15}s ${i * 0.08}s ease-in-out infinite` : undefined }}
        />
      ))}
    </span>
  )
}
