import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  align?: 'center' | 'left'
  className?: string
}

/** Overline + headline (+ optional intro). Left-aligned by default, as in the editorial layout. */
export function SectionHeader({ eyebrow, title, children, align = 'left', className = '' }: Props) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-4">{title}</h2>
      {children && <p className="mt-5 text-[18px] leading-relaxed text-ink-2">{children}</p>}
    </Reveal>
  )
}
