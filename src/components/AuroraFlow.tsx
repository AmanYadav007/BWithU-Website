import { useEffect, useRef } from 'react'

/**
 * Hero aurora: four big gradient ribbons drifting in the brand colours. Transforms only (GPU layers), static
 * gradients, no filter or background animation. A gentle lerped mouse parallax on desktop only. Pauses off-screen and in
 * hidden tabs; static with reduced motion (see .aurora-blob in index.css).
 */
export function AuroraFlow() {
  const root = useRef<HTMLDivElement>(null)
  const par = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    const layer = par.current
    if (!el || !layer) return
    let visible = true
    let tab = !document.hidden
    const apply = () => el.classList.toggle('aurora-paused', !(visible && tab))
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; apply(); kick() })
    io.observe(el)
    const onVis = () => { tab = !document.hidden; apply(); kick() }
    document.addEventListener('visibilitychange', onVis)

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0
    const tick = () => {
      raf = 0
      x += (tx - x) * 0.05
      y += (ty - y) * 0.05
      layer.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) kick()
    }
    function kick() { if (!raf && fine && !reduce && visible && tab) raf = requestAnimationFrame(tick) }
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * -40
      ty = (e.clientY / window.innerHeight - 0.5) * -24
      kick()
    }
    if (fine && !reduce) window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div ref={par} className="absolute inset-0 will-change-transform">
        <span className="aurora-blob aurora-a" />
        <span className="aurora-blob aurora-b" />
        <span className="aurora-blob aurora-c" />
        <span className="aurora-blob aurora-d" />
      </div>
    </div>
  )
}
