import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'

const steps = [
  { n: '1', title: 'Pick a face and a voice', body: 'Choose from eight companions and six voices. You can listen to each voice first.' },
  { n: '2', title: 'Give them a name', body: 'Call them anything you like, set the vibe, and tell them what to call you.' },
  { n: '3', title: 'Start talking', body: 'Allow the microphone and they pick up and say hi. Speak naturally. That’s it.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="How it works" title="Talking in under a minute." />

        <ol className="relative mt-16 grid gap-4 md:grid-cols-3">
          <div aria-hidden className="hairline absolute top-[52px] right-[16%] left-[16%] hidden md:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08} className="relative text-center">
              <span className="relative mx-auto grid h-[104px] w-[104px] place-items-center rounded-full">
                <span aria-hidden className="absolute inset-0 rounded-full bg-gradient-to-br from-aurora/30 to-cyan/20 blur-xl" />
                <span className="glass relative grid h-16 w-16 place-items-center rounded-full font-display text-[24px] font-semibold">
                  {s.n}
                </span>
              </span>
              <h3 className="mt-4 text-[20px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[19rem] text-[15.5px] leading-relaxed text-ink-3">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
