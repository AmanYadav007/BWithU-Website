import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { RisingLinesEngine } from './engine'

export type RisingLinesHandle = { launch: () => void; replay: () => void }
type Props = { density?: number; className?: string }

/**
 * Canvas background. aria-hidden, one rAF loop, paused off-screen and in hidden tabs, one static frame with reduced
 * motion. Pointer and click are read from the window (so the canvas can sit behind the content); taps on links,
 * buttons and the call frame are ignored.
 */
export const RisingLines = forwardRef<RisingLinesHandle, Props>(function RisingLines({ density = 1, className = '' }, ref) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const engine = useRef<RisingLinesEngine | null>(null)
  const api = useRef({ launch: () => {}, replay: () => {} })
  useImperativeHandle(ref, () => ({ launch: () => api.current.launch(), replay: () => api.current.replay() }), [])

  useEffect(() => {
    const el = canvas.current
    const ctx = el?.getContext('2d')
    if (!el || !ctx) return
    const coarse = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2)
    const eng = new RisingLinesEngine({ density, mobile: coarse })
    engine.current = eng
    let raf = 0
    let last = 0
    let visible = true
    let tabVisible = !document.hidden

    const size = () => {
      const r = el.getBoundingClientRect()
      el.width = Math.max(1, Math.round(r.width * dpr))
      el.height = Math.max(1, Math.round(r.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      eng.resize(r.width, r.height)
      if (reduce) { eng.settle(); eng.draw(ctx) }
    }
    const frame = (t: number) => {
      raf = 0
      const dt = last ? (t - last) / 1000 : 0.016
      last = t
      eng.update(dt)
      eng.draw(ctx)
      schedule()
    }
    const schedule = () => {
      if (!raf && !reduce && visible && tabVisible) { last = 0; raf = requestAnimationFrame(frame) }
    }
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0 }

    size()
    const ro = new ResizeObserver(size)
    ro.observe(el)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? schedule() : stop() })
    io.observe(el)
    const onVis = () => { tabVisible = !document.hidden; tabVisible ? schedule() : stop() }
    document.addEventListener('visibilitychange', onVis)

    const local = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top, inside: e.clientY >= r.top && e.clientY <= r.bottom }
    }
    const onMove = (e: PointerEvent) => { const p = local(e); eng.setPointer(p.inside ? p.x : null) }
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest('a,button,iframe,input,[role=tab]')) return
      const p = local(e)
      if (p.inside && !reduce) eng.volley(p.x)
    }
    if (!reduce && !coarse) window.addEventListener('pointermove', onMove, { passive: true })
    if (!reduce) window.addEventListener('pointerdown', onDown, { passive: true })

    api.current = { launch: () => { eng.launch(); schedule() }, replay: () => { eng.launch(); schedule() } }
    schedule()
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [density])

  return <canvas ref={canvas} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
})
