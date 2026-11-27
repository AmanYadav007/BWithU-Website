import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Mic, MousePointerClick, Video } from 'lucide-react'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const STEPS = [
  { icon: MousePointerClick, title: 'Pick someone', body: 'Choose a companion.' },
  { icon: Mic, title: 'Allow your mic', body: 'One tap, in your browser.' },
  { icon: Video, title: 'Talk face to face', body: 'She answers out loud.' },
]

export function HowItWorks() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const p = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="How it works" title="Three taps to hello." align="center" />
        <ol ref={ref} className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
          {/* the connecting line: horizontal on desktop, vertical on mobile */}
          <div aria-hidden className="absolute top-8 left-[16.6%] hidden h-px w-[66.6%] bg-line-2 md:block">
            <motion.div style={{ scaleX: reduce ? 1 : p }} className="h-full origin-left bg-gradient-to-r from-aurora-soft to-cyan" />
          </div>
          <div aria-hidden className="absolute top-8 bottom-8 left-8 w-px bg-line-2 md:hidden">
            <motion.div style={{ scaleY: reduce ? 1 : p }} className="h-full origin-top bg-gradient-to-b from-aurora-soft to-cyan" />
          </div>
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <Reveal as="li" key={title} delay={i * 0.12} className="relative flex items-start gap-5 md:flex-col md:items-center md:text-center">
              <span className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border border-line-2 bg-space-2">
                <Icon size={26} strokeWidth={1.6} className="text-aurora-soft" />
                <span className="absolute -top-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-space-3 text-[12px] font-semibold text-ink-2 ring-1 ring-line-2">{i + 1}</span>
              </span>
              <div>
                <h3 className="text-[22px] font-semibold tracking-[-0.012em]">{title}</h3>
                <p className="mt-1 text-[16px] text-ink-2">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
