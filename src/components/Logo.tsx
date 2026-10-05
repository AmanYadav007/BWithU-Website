type Props = { className?: string; withWordmark?: boolean; size?: number }

export function Logo({ className = '', withWordmark = true, size = 34 }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/brand/mark.svg"
        alt=""
        width={size}
        height={size}
        className="drop-shadow-[0_0_14px_rgba(168,85,247,0.45)]"
      />
      {withWordmark && (
        <span className="font-display text-[20px] font-semibold tracking-[-0.03em]">
          <span className="text-aurora-soft">B</span>with<span className="text-cyan">U</span>
        </span>
      )}
    </span>
  )
}
