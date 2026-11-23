/**
 * Wake the English voice GPU while a likely human is on the page, so it is ready when they open the call app.
 * Rules: only after a real interaction (scroll, pointer, touch, key) or when a call button is hovered, touched or
 * focused; at most once per page visit; skipped for Hindi/Spanish browsers; no cookies, no IDs, no body.
 * Bots that never interact never trigger it. The server caps these requests too (see warm_guard.py).
 */
export const WARM_URL = 'https://app.bwithu.live/bwithu/warm'

type Doc = {
  addEventListener: (type: string, listener: () => void, options?: AddEventListenerOptions) => void
  removeEventListener: (type: string, listener: () => void) => void
}

export function likelyEnglish(lang: string | undefined): boolean {
  const l = (lang || '').toLowerCase()
  return !(l.startsWith('hi') || l.startsWith('es'))
}

export function createWarmup(opts: {
  doc: Doc
  fetchFn: (url: string, init: RequestInit) => unknown
  lang?: string
  url?: string
}) {
  let sent = false
  const events = ['scroll', 'pointermove', 'touchstart', 'keydown']
  const fire = () => {
    if (sent) return
    sent = true
    stop()
    if (!likelyEnglish(opts.lang)) return
    try {
      const p = opts.fetchFn(opts.url || WARM_URL, { method: 'POST', keepalive: true, credentials: 'omit', mode: 'cors' })
      Promise.resolve(p).catch(() => {}) // best effort
    } catch {
      /* ignore */
    }
  }
  const stop = () => events.forEach((e) => opts.doc.removeEventListener(e, fire))
  events.forEach((e) => opts.doc.addEventListener(e, fire, { passive: true, once: true }))
  return { fire, stop, get sent() { return sent } }
}

/** Call once at startup in the browser. Call buttons (data-warm) also trigger it on hover, touch or focus. */
export function startWarmup() {
  const w = createWarmup({ doc: document, fetchFn: (u, i) => fetch(u, i), lang: navigator.language })
  const onCta = (e: Event) => {
    if ((e.target as Element | null)?.closest?.('a[href^="https://app.bwithu.live"]')) w.fire()
  }
  for (const ev of ['pointerover', 'touchstart', 'focusin']) document.addEventListener(ev, onCta, { passive: true })
}
