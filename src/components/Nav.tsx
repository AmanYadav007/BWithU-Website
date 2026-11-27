import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FACES } from '../lib/companions'
import { callLink } from '../lib/site'
import { Logo } from './Logo'

const links = [
  { href: '/#companions', label: 'Companions' },
  { href: '/#how', label: 'How it works' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/#faq', label: 'FAQ' },
]

export function Nav({ faceId }: { faceId: string }) {
  const face = FACES.find((f) => f.id === faceId) ?? FACES[0]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-line bg-space-2/85 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between lg:h-[84px]">
        <a href="/" aria-label="BwithU home">
          <Logo size={34} />
        </a>

        <div className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] font-medium text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a href={callLink(face.id)} className="btn btn-primary h-11 px-5 text-[15px] sm:px-6">
            Call now
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-ink lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[calc(100dvh-64px)] flex-col border-t border-line bg-space px-5 pt-4 pb-8 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i }}
                className="border-b border-line py-5 text-[24px] font-semibold tracking-[-0.012em] text-ink"
              >
                {l.label}
              </motion.a>
            ))}
            <a href={callLink(face.id)} className="btn btn-primary mt-auto h-14 text-[16px]">
              Call now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
