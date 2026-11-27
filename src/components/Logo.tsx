type Props = { className?: string; withWordmark?: boolean; size?: number }

// Brand 2.0: the white lockup (icon + outlined wordmark) or the bare B. `size` is the icon height in px;
// the lockup is drawn so its B is about 1.5x the cap height, so it is scaled to match the old mark + text.
export function Logo({ className = '', withWordmark = true, size = 34 }: Props) {
  return withWordmark ? (
    <img
      src="/brand/lockup-white.svg"
      alt="BwithU"
      height={size}
      className={`block w-auto ${className}`}
      style={{ height: size }}
    />
  ) : (
    <img src="/brand/icon-white.svg" alt="BwithU" width={size} height={size} className={`block ${className}`} />
  )
}
