import { appLink, site } from '../lib/site'
import { Logo } from './Logo'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Start a call', href: appLink() },
      { label: 'Faces', href: '/#faces' },
      { label: 'Voices', href: '/#voices' },
      { label: 'How it works', href: '/#how' },
      { label: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Privacy policy', href: site.privacy },
      { label: 'Terms', href: site.terms },
      { label: 'X / Twitter', href: site.x, external: true },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-3">{site.tagline} A warm AI companion you can video-call, right in your browser.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="font-display text-[13px] font-medium tracking-[0.02em] text-ink-3">{c.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[15px] text-ink-2 transition-colors hover:text-ink"
                    {...('external' in l && l.external && { target: '_blank', rel: 'noopener' })}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-[13px] text-ink-4 sm:flex-row">
        <p>© {new Date().getFullYear()} BwithU. All rights reserved.</p>
        <p>Never cold. Never robotic. Never overwhelming.</p>
      </div>
    </footer>
  )
}
