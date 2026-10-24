import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Camera, Check, Loader2, Sparkles } from 'lucide-react'
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
        <Reveal className="relative overflow-hidden rounded-[36px] p-[1px]">
          <div aria-hidden className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-aurora/50 via-white/10 to-cyan/40" />
          <div className="relative grid items-center gap-12 overflow-hidden rounded-[35px] bg-space-2 px-6 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1fr_0.9fr]">
            <div aria-hidden className="absolute top-[-40%] left-[-10%] h-[120%] w-[70%] rounded-full bg-aurora/20 blur-[120px]" />

            <div className="relative">
              <span className="eyebrow">
                <Sparkles size={14} /> Coming soon
              </span>
              <h2 className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] leading-[1.06] font-semibold tracking-[-0.03em]">
                Your own companion,
                <br />
                <span className="text-gradient">from one photo.</span>
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-2">
                Upload a picture and we’ll turn it into a companion you can call. Only you will see it, and the photo is
                deleted once your companion is made.
              </p>

              {/* Signups are appended to the Google Sheet by google-sheets/waitlist.gs. */}
              <form onSubmit={submit} className="relative mt-8 flex max-w-md flex-col gap-2.5 sm:flex-row">
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
                  className="h-13 min-h-[52px] min-w-0 flex-1 rounded-full border border-line-2 bg-white/[0.04] px-5 text-[16px] text-ink outline-none transition placeholder:text-ink-4 focus:border-aurora/60 focus:bg-white/[0.06]"
                />
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary min-h-[52px] px-6 text-[15px] disabled:opacity-80">
                  {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <>Tell me first <ArrowRight size={16} /></>}
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
              <p className="mt-4 text-[13px] text-ink-4">Only photos of yourself, or of someone who said yes. No spam, ever.</p>
            </div>

            {/* Photo -> companion */}
            <div aria-hidden className="relative flex items-center justify-center gap-4 sm:gap-6">
              <div className="grid aspect-[3/4] w-[40%] max-w-[180px] place-items-center rounded-[22px] border-2 border-dashed border-white/15 bg-white/[0.02] text-ink-3">
                <span className="flex flex-col items-center gap-2 text-[13px]">
                  <Camera size={26} /> Your photo
                </span>
              </div>
              <ArrowRight className="shrink-0 text-ink-3" size={22} />
              <div className="relative w-[48%] max-w-[220px]">
                <div className="absolute -inset-4 rounded-[30px] bg-aurora/25 blur-2xl" />
                <img src="/faces/aiko.jpg" alt="" className="relative aspect-[3/4] w-full rounded-[22px] object-cover ring-1 ring-aurora/40 animate-breathe" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
