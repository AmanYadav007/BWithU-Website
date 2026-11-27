import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useRef } from 'react'

/** Day at the top of the band, night by the bottom. A sun, then a moon, ride an arc as you scroll. */
export function AlwaysHere() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const t = useTransform(scrollYProgress, [0.15, 0.85], [0, 1])
  const night = useTransform(t, [0.25, 0.7], [0, 1])
  const day = useTransform(t, [0.25, 0.7], [1, 0])
  const sunOp = useTransform(t, [0, 0.5, 0.58], [1, 1, 0])
  const moonOp = useTransform(t, [0.45, 0.58, 1], [0, 1, 1])
  const x = useTransform(t, [0, 1], ['6%', '90%'])
  const y = useTransform(t, (v) => `${(1 - Math.sin(Math.PI * v)) * 70 + 8}%`)
  const stars = useTransform(t, [0.5, 0.9], [0, 0.8])

  return (
    <section ref={ref} aria-label="Always here" className="relative overflow-hidden py-28 sm:py-40">
      <motion.div aria-hidden style={{ opacity: reduce ? 0 : day }} className="absolute inset-0 bg-gradient-to-b from-[#27447f] via-[#4a6fb0] to-[#8a8fc0]" />
      <motion.div aria-hidden style={{ opacity: reduce ? 1 : night }} className="absolute inset-0 bg-gradient-to-b from-[#05060d] via-[#0d1230] to-[#1c1b4a]" />
      <motion.div
        aria-hidden
        style={{
          opacity: reduce ? 0.7 : stars,
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 10% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 30% 60%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 55% 15%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 75% 45%, #fff 50%, transparent 51%), radial-gradient(1.5px 1.5px at 90% 25%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 65% 75%, #fff 50%, transparent 51%)',
        }}
        className="absolute inset-0"
      />
      <motion.div aria-hidden style={{ left: x, top: y }} className="absolute h-14 w-14 -translate-x-1/2 sm:h-20 sm:w-20">
        <motion.span style={{ opacity: sunOp }} className="absolute inset-0 grid place-items-center rounded-full bg-[#ffd9a0] text-[#8a5a1c]"><Sun size={28} /></motion.span>
        <motion.span style={{ opacity: moonOp }} className="absolute inset-0 grid place-items-center rounded-full bg-[#e9ecff] text-[#2d3270]"><Moon size={28} /></motion.span>
      </motion.div>
      <div className="container-x relative text-center">
        <span className="eyebrow !text-white/85">Always here</span>
        <h2 className="h2 mx-auto mt-4 max-w-3xl text-white">3 am or 3 pm. She picks up.</h2>
      </div>
    </section>
  )
}
