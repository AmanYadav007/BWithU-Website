import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Reveal } from '../components/Reveal'
import { site } from '../lib/site'

type Status = 'idle' | 'sending' | 'done' | 'error'

export function YourOwn() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Apps Script doesn't send CORS headers, so the response is opaque: a resolved fetch
      // means the request reached Google. text/plain keeps it a "simple" request (no preflight).
      await fetch(site.sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email,
          source: 'custom-companion',
          website: new FormData(e.currentTarget).get('website') ?? '',
        }),
      })
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="your-own" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative rounded-[32px] bg-gradient-to-br from-aurora/70 via-white/10 to-cyan/60 p-px sm:rounded-[40px]">
          <div className="relative grid items-center gap-12 overflow-hidden rounded-[31px] bg-space-2 px-6 py-10 sm:rounded-[39px] sm:px-14 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
            <div aria-hidden className="glow-aurora pointer-events-none absolute -top-56 -left-24 h-[760px] w-[760px]" />
            <div aria-hidden className="glow-cyan pointer-events-none absolute -right-20 -bottom-40 h-[520px] w-[520px]" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-aurora/50 bg-aurora/14 px-3.5 py-1.5 text-[13px] font-semibold text-aurora-soft">
                <Sparkles size={15} /> Coming soon
              </span>
              <h2 className="mt-6 text-[clamp(2.1rem,4.4vw,3.25rem)] leading-[1.06] font-semibold tracking-[-0.035em]">
                Your own companion,
                <br />
                <span className="text-gradient">from one photo.</span>
              </h2>
              <p className="mt-5 max-w-[28rem] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
                Upload a picture and we’ll turn it into a companion you can call. Only you will see it, and the photo is
                deleted once your companion is made.
              </p>

              {/* Signups are appended to the Google Sheet by google-sheets/waitlist.gs. */}
              <form onSubmit={submit} className="relative mt-8 flex max-w-[470px] flex-col gap-3 sm:flex-row">
                {/* Honeypot: hidden from people, filled in by bots. */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== 'idle' && status !== 'sending') setStatus('idle')
                  }}
                  className="h-14 w-full min-w-0 shrink-0 rounded-full border border-ink-4 sm:w-auto sm:flex-1 bg-white/[0.04] px-6 text-[16px] text-ink outline-none transition placeholder:text-ink-4 focus:border-aurora/70 focus:bg-white/[0.06]"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn h-14 bg-ink px-7 text-[16px] font-semibold text-space hover:bg-white disabled:opacity-80"
                >
                  {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <>Tell me first <ArrowRight size={18} /></>}
                </button>
              </form>
              <AnimatePresence>
                {status === 'done' && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="mt-4 inline-flex items-center gap-1.5 text-[15px] text-cyan">
                    <Check size={16} /> You’re on the list. We’ll email you when it’s ready.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="mt-4 text-[15px] text-ink-2">
                    That didn’t go through. Email us at{' '}
                    <a className="text-cyan underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a> instead?
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="mt-4 text-[13.5px] text-ink-3">Only photos of yourself, or of someone who said yes. No spam, ever.</p>
            </div>

            <PhotoToCompanion />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Illustration: a snapshot becomes a companion on a call. Uses Zara's portrait for both, and says so. */
function PhotoToCompanion() {
  const reduce = useReducedMotion()
  return (
    <figure className="relative mx-auto w-full max-w-[540px]">
      <div aria-hidden className="relative h-[330px] sm:h-[430px]">
        <motion.div
          initial={reduce ? { rotate: -7 } : { opacity: 0, y: -20, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -7 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[22%] left-0 w-[40%] rounded-[10px] bg-[#edeef5] p-2 pb-9 shadow-[0_24px_40px_-10px_rgb(0_0_0/0.6)] sm:p-2.5 sm:pb-11"
        >
          <img src="/faces/zara.jpg" alt="" loading="lazy" className="aspect-[9/10] w-full rounded-[4px] object-cover grayscale" />
          <span className="absolute bottom-2.5 left-3 text-[11px] font-medium text-[#4b4f6b] sm:bottom-3.5 sm:text-[13px]">your-photo.jpg</span>
        </motion.div>

        <svg viewBox="0 0 170 90" className="absolute top-[12%] left-[30%] w-[30%]" fill="none">
          <motion.path
            d="M4 70 C 50 0, 120 0, 166 60"
            stroke="#C084FC"
            strokeWidth="2"
            strokeDasharray="2 8"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.4 }}
          />
          <path d="M156 50 L166 60 L152 64" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <motion.div
          initial={reduce ? false : { opacity: 0, filter: 'grayscale(1)' }}
          whileInView={{ opacity: 1, filter: 'grayscale(0)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute top-[10%] right-0 w-[48%] overflow-hidden rounded-[22px] shadow-[0_0_0_2px_rgb(168_85_247/0.8),0_0_60px_-4px_rgb(168_85_247/0.6)] sm:rounded-[30px]"
        >
          <img src="/faces/zara.jpg" alt="" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-space/90" />
          <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-space/60 px-3 py-1.5 text-[12px] font-semibold backdrop-blur sm:text-[13px]">
            <span className="h-2 w-2 rounded-full bg-aurora" /> Your companion
          </span>
          <span className="absolute inset-x-3 bottom-3 rounded-xl bg-space/72 px-3 py-2.5 text-[12px] font-medium sm:text-[14px]">Hi. It’s really nice to meet you.</span>
        </motion.div>

        <span className="chip absolute bottom-[4%] left-[18%] sm:top-[2%] sm:bottom-auto sm:left-[26%]">
          <Sparkles size={16} className="text-aurora-soft" /> Building her face · 72%
        </span>
      </div>
      <figcaption className="mt-3 text-right text-[12px] text-ink-3">Illustration, shown with a BwithU companion’s face.</figcaption>
    </figure>
  )
}
