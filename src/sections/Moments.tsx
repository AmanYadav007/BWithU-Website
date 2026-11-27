import { motion } from 'framer-motion'
import { Coffee, Flag, GraduationCap, Lightbulb, MoonStar } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const MOMENTS = [
  { icon: Coffee, text: 'After a long day' },
  { icon: GraduationCap, text: 'Practise your English' },
  { icon: MoonStar, text: 'Late-night talks' },
  { icon: Lightbulb, text: 'Think out loud' },
  { icon: Flag, text: 'Before a big moment' },
]

export function Moments() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Moments" title="For the moments in between." align="center" />
        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-6">
          {MOMENTS.map(({ icon: Icon, text }, i) => (
            <Reveal as="li" key={text} delay={i * 0.07} className={`${i < 3 ? 'md:col-span-2' : 'md:col-span-3'} ${i === 4 ? 'col-span-2 md:col-span-3' : ''}`}>
              <motion.div whileHover={{ y: -5 }} className="glass flex h-full items-center gap-4 rounded-[22px] p-5 sm:p-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/5"><Icon size={22} strokeWidth={1.6} className="text-aurora-soft" /></span>
                <span className="text-[16px] leading-snug font-semibold sm:text-[18px]">{text}</span>
              </motion.div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
