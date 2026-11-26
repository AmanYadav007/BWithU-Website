import { site } from '../lib/site'
import { Logo } from './Logo'

const links = [
  { label: 'Companions', href: '/#faces' },
  { label: 'Feedback', href: site.feedback },
  { label: 'Privacy', href: site.privacy },
  { label: 'Terms', href: site.terms },
  { label: 'Contact', href: `mailto:${site.email}` },
  { label: 'X', href: site.x, external: true },
]

export function Footer() {
  return (
    <footer className="relative">
      <div className="container-x">
        <div className="flex flex-col items-center gap-8 border-t border-line py-14 text-center">
          <Logo size={32} />
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {links.map((l) => (
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
        <div className="flex flex-col justify-between gap-2 border-t border-line py-6 text-[13.5px] text-ink-3 sm:flex-row">
          <p>© {new Date().getFullYear()} BwithU. For people 18 and over.</p>
          <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
        </div>
      </div>
    </footer>
  )
}
