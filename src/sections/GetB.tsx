import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { ChromeIcon } from '../components/ChromeIcon'
import { Reveal } from '../components/Reveal'
import { PixelCompanion } from '../pixel/PixelCompanion'
import { isLive, site } from '../lib/site'

type Status = 'idle' | 'sending' | 'done' | 'error'

export function GetB() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!site.sheetsUrl) {
      setStatus('error')
      return
    }
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
          source: 'website',
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
    <section id="get-b" className="relative py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[36px] p-[1px]">
          <div aria-hidden className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-aurora/60 via-white/10 to-cyan/50" />
          <div className="relative overflow-hidden rounded-[35px] bg-space-2 px-6 py-16 text-center sm:px-12 sm:py-20">
            <div aria-hidden className="absolute top-[-40%] left-1/2 h-[120%] w-[90%] -translate-x-1/2 rounded-full bg-aurora/25 blur-[120px]" />
            <div aria-hidden className="absolute right-[-10%] bottom-[-50%] h-[90%] w-[60%] rounded-full bg-cyan/15 blur-[120px]" />

            <div className="relative mx-auto mb-8 w-fit overflow-hidden rounded-[20px] bg-[#2d2158] ring-1 ring-white/10 shadow-[0_20px_60px_-20px_rgb(168_85_247/0.7)]">
              <PixelCompanion avatar="female" state="wave" scale={2} />
            </div>

            <h2 className="relative text-[clamp(2.2rem,5.4vw,3.75rem)] leading-[1.04] font-semibold tracking-[-0.04em]">
              Someone’s waiting
              <br />
              to meet you.
            </h2>
            <p className="relative mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-ink-2">
              {isLive ? 'Add BwithU to Chrome and say hi. It takes a minute.' : 'We’re letting people in a few at a time. Leave your email and we’ll send your invite.'}
            </p>

            {isLive ? (
              <a href={site.chromeStoreUrl} target="_blank" rel="noopener" className="btn btn-primary relative mt-9 h-14 px-8 text-[16px]">
                <ChromeIcon className="h-[18px] w-[18px]" /> Add to Chrome, it’s free
              </a>
            ) : (
              // Signups are appended to the Google Sheet by google-sheets/waitlist.gs.
              <form onSubmit={submit} className="relative mx-auto mt-9 flex max-w-md flex-col gap-2.5 sm:flex-row">
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
                  className="h-14 min-w-0 flex-1 rounded-full border border-line-2 bg-white/[0.04] px-6 text-[16px] text-ink outline-none transition placeholder:text-ink-4 focus:border-aurora/60 focus:bg-white/[0.06]"
                />
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary h-14 px-7 text-[16px] disabled:opacity-80">
                  {status === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <>Get early access <ArrowRight size={17} /></>}
                </button>
              </form>
            )}

            <AnimatePresence>
              {status === 'done' && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="relative mt-4 inline-flex items-center gap-1.5 text-[15px] text-cyan">
                  <Check size={16} /> You’re on the list. We’ll be in touch soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="relative mt-4 text-[15px] text-ink-2">
                  That didn’t go through. Email us at{' '}
                  <a className="text-cyan underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a> instead?
                </motion.p>
              )}
            </AnimatePresence>

            <p className="relative mt-6 text-[13px] text-ink-4">Free in beta · Chrome 116+ · No spam, ever</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
