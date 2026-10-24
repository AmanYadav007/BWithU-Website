import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { FACES } from '../lib/companions'
import { appLink } from '../lib/site'

export function Faces() {
  return (
    <section id="faces" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="The faces" title="Pick who you talk to.">
          Eight companions to start with. Rename any of them, and give them the voice you like.
        </SectionHeader>

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {FACES.map((f, i) => (
            <Reveal as="li" key={f.id} delay={(i % 4) * 0.05}>
              <a
                href={appLink({ face: f.id })}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-[#090e21] ring-1 ring-white/[0.08] transition duration-500 hover:-translate-y-1 hover:ring-aurora/50 hover:shadow-[0_24px_60px_-20px_rgb(168_85_247/0.55)]"
              >
                <img
                  src={f.image}
                  alt={`${f.name}, a BwithU companion`}
                  loading="lazy"
                  width={480}
                  height={640}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#090e21] via-[#090e21]/70 to-transparent px-4 pt-10 pb-3.5">
                  <span className="font-display text-[16px] font-semibold">{f.name}</span>
                  <span className="flex items-center gap-1 text-[13px] text-ink-3 opacity-0 transition duration-300 group-hover:opacity-100">
                    Call <ArrowUpRight size={14} />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
