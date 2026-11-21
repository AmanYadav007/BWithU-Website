import { appLink, site } from '../lib/site'
import { Logo } from './Logo'

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Companions', href: '/#faces' },
      { label: 'Voices', href: '/#voices' },
      { label: 'How it works', href: '/#how' },
      { label: 'Start a call', href: appLink() },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Privacy', href: '/#privacy' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: `mailto:${site.email}` },
      { label: 'X (Twitter)', href: site.x, external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: site.privacy },
      { label: 'Terms', href: site.terms },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative">
      <div className="container-x">
        <div className="grid gap-12 border-t border-line py-16 md:grid-cols-[1fr_auto] md:gap-20">
          <div>
            <Logo size={32} />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-3">{site.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {cols.map((c) => (
              <div key={c.title}>
                <h3 className="text-[12px] font-semibold tracking-[0.15em] text-ink-2 uppercase">{c.title}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[15px] text-ink-3 transition-colors hover:text-ink"
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
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-line py-6 text-[13.5px] text-ink-3 sm:flex-row">
          <p>© {new Date().getFullYear()} BwithU. For people 18 and over.</p>
          <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
        </div>
      </div>
    </footer>
  )
}
