import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { appLink } from '../lib/site'
import { Logo } from './Logo'

const links = [
  { href: '/#features', label: 'What it’s like' },
  { href: '/#faces', label: 'Faces' },
  { href: '/#voices', label: 'Voices' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/#faq', label: 'FAQ' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`container-x !px-0 transition-all duration-500 ${scrolled ? 'max-w-[1080px]' : 'max-w-[1200px]'}`}
      >
        <nav
          aria-label="Main"
          className={`flex h-14 items-center justify-between rounded-full pr-2 pl-3 transition-all duration-500 sm:pl-4 ${
            scrolled ? 'glass' : 'border border-transparent'
          }`}
        >
          <a href="/" aria-label="BwithU home">
            <Logo />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[14px] text-ink-2 transition-colors hover:bg-white/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href={appLink()} className="btn btn-primary h-10 px-4 text-[14px]">
              <span className="hidden sm:inline">Start a free call</span>
              <span className="sm:hidden">Start a call</span>
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-ink-2 hover:bg-white/5 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-1 mt-2 rounded-3xl p-2 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3.5 font-display text-[17px] text-ink-2 hover:bg-white/5 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
