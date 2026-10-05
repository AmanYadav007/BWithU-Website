import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
}

export function SectionHeader({ eyebrow, title, children, align = 'center' }: Props) {
  const centered = align === 'center'
  return (
    <Reveal className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--color-cyan)]" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
        {title}
      </h2>
      {children && <p className="mt-5 text-[17px] leading-relaxed text-ink-3">{children}</p>}
    </Reveal>
  )
}
