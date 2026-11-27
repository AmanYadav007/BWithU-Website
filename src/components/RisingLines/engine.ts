/** Rising Lines engine: pure TS, fixed pools, no allocation per frame. Own implementation, Brand 2.0 colours. */

export type EngineOptions = { density: number; mobile: boolean; calm?: boolean }
export type Rect = { x: number; y: number; w: number; h: number }

type Line = { on: boolean; x: number; y: number; len: number; speed: number; w: number; a: number; depth: number; boost: number }
type Spark = { x: number; y: number; vx: number; vy: number; r: number; a: number; ph: number }

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export class RisingLinesEngine {
  w = 0
  h = 0
  private lines: Line[] = []
  private sparks: Spark[] = []
  private horizon = 0
  private intro = 0
  private introOn = true
  private px = -9999
  private tpx = -9999
  private hover = false
  private spawnAcc = 0
  private time = 0
  private avoid: Rect | null = null

  constructor(private opts: EngineOptions) {}

  /** Calm mode: keep lines out of this rect (the call card), with a soft edge. */
  setAvoid(r: Rect | null) {
    this.avoid = r
  }

  private get calm() {
    return !!this.opts.calm
  }

  resize(w: number, h: number) {
    this.w = w
    this.h = h
    this.horizon = h * 0.955
    const n = Math.round((this.opts.density * w) / 6 / (this.opts.mobile ? 2 : 1) * (this.calm ? 0.38 : 1))
    while (this.lines.length < n) this.lines.push({ on: false, x: 0, y: 0, len: 0, speed: 0, w: 1, a: 0, depth: 1, boost: 0 })
    this.lines.length = Math.max(n, 1)
    const s = Math.round((this.opts.mobile ? 16 : 36) / (this.calm ? 3 : 1))
    while (this.sparks.length < s) this.sparks.push({ x: rand(0, w), y: rand(0, h), vx: 0, vy: 0, r: 1, a: 0, ph: rand(0, 6) })
    this.sparks.length = s
    this.sparks.forEach((p) => this.resetSpark(p, true))
  }

  /** Replay the opening: horizon opens from the centre, then the lines rise. */
  launch() {
    this.intro = 0
    this.introOn = true
    this.lines.forEach((l) => (l.on = false))
  }

  setPointer(x: number | null) {
    if (x === null) return void (this.hover = false)
    this.hover = true
    this.tpx = x
    if (this.px < -9000) this.px = x
  }

  /** A volley of 20 to 40 lines at x. */
  volley(x: number) {
    const n = Math.round(this.calm ? rand(8, 14) : rand(20, 40))
    for (let i = 0; i < n; i++) {
      const l = this.lines.find((q) => !q.on) ?? this.lines[Math.floor(Math.random() * this.lines.length)]
      this.spawn(l, x + rand(-50, 50), rand(0.6, 1))
      l.boost = 1
      l.y = this.horizon - rand(0, 40)
    }
  }

  private pickX(): number {
    // biased to the centre: average of two uniforms
    return this.w * (0.5 + (Math.random() + Math.random() - 1) * 0.5 * 1.0)
  }

  private spawn(l: Line, x = this.pickX(), depth = Math.random()) {
    l.on = true
    l.depth = depth // 0 far, 1 near
    l.x = x
    l.y = this.horizon - (1 - depth) * this.h * 0.04
    l.len = rand(0.12, 0.34) * this.h * (0.5 + depth * 0.7) * (this.calm ? 0.55 : 1)
    l.speed = (60 + depth * 160) * rand(0.8, 1.25) * (this.calm ? 0.6 : 1)
    l.w = 0.6 + depth * 1.4
    l.a = 0.25 + depth * 0.55
    l.boost = 0
  }

  private resetSpark(p: Spark, anywhere = false) {
    p.x = rand(0, this.w)
    p.y = anywhere ? rand(0, this.h) : this.horizon
    p.vx = rand(-6, 6)
    p.vy = -rand(4, 16)
    p.r = rand(0.5, 1.4)
    p.a = rand(0.15, 0.4)
  }

  update(dt: number) {
    dt = Math.min(dt, 0.05)
    this.time += dt
    if (this.introOn) {
      this.intro = Math.min(1, this.intro + dt / 1.2)
      if (this.intro >= 1) this.introOn = false
    }
    this.px += (this.tpx - this.px) * Math.min(1, dt * 8)
    if (this.intro < 0.8) return

    this.spawnAcc += dt * this.lines.length * 0.35
    while (this.spawnAcc >= 1) {
      this.spawnAcc -= 1
      const l = this.lines.find((q) => !q.on)
      if (l) this.spawn(l)
    }
    const R = this.w * 0.14
    for (const l of this.lines) {
      if (!l.on) continue
      let k = 1
      if (this.hover) {
        const d = Math.abs(l.x - this.px)
        if (d < R) k += (this.calm ? 1 : 2.2) * (1 - d / R) ** 2
      }
      l.boost += ((k > 1 ? k - 1 : 0) - l.boost) * Math.min(1, dt * 6)
      l.y -= l.speed * (1 + l.boost * 2.2) * dt
      if (l.y + l.len < -10 || (this.calm && l.y < this.horizon - this.h * 0.36)) l.on = false
    }
    for (const p of this.sparks) {
      p.x += p.vx * dt
      p.y += p.vy * dt
      if (p.y < -10) this.resetSpark(p)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { w, h } = this
    ctx.clearRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'lighter'
    const open = easeOut(this.intro)
    const hy = this.horizon

    // soft violet haze above the horizon
    ctx.save()
    ctx.translate(w / 2, hy)
    ctx.scale(1, 0.38)
    const haze = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.55)
    haze.addColorStop(0, `rgba(124,58,237,${(this.calm ? 0.45 : 0.32) * open})`)
    haze.addColorStop(1, 'rgba(124,58,237,0)')
    ctx.fillStyle = haze
    ctx.fillRect(-w, -w, w * 2, w * 2)
    ctx.restore()

    // lines: white-hot head, then violet, a cyan hint, then gone
    for (const l of this.lines) {
      if (!l.on) continue
      const fade = clamp(l.y / (h * 0.7)) * clamp((hy - l.y) / 30) // dim near the top, ease in from the horizon
      let a = clamp(l.a * fade * (1 + l.boost * 0.9), 0, 1)
      if (this.calm) {
        a *= clamp(1 - (hy - l.y) / (h * 0.3)) // gone well before the headline
        const v = this.avoid
        if (v && l.y > v.y - 40 && l.y < v.y + v.h + 40) {
          const dx = Math.max(v.x - l.x, l.x - (v.x + v.w), 0)
          a *= clamp(dx / 60) // zero inside the card, soft edge outside
        }
      }
      if (a < 0.01) continue
      const g = ctx.createLinearGradient(0, l.y, 0, l.y + l.len)
      g.addColorStop(0, `rgba(255,255,255,${a})`)
      g.addColorStop(0.08, `rgba(185,138,255,${a * 0.9})`)
      g.addColorStop(0.55, `rgba(155,77,255,${a * 0.38})`)
      g.addColorStop(1, 'rgba(56,189,248,0)')
      ctx.fillStyle = g
      // tapering tail: a narrow triangle-ish strip, widest at the head
      const wd = l.w * (1 + l.boost * 0.5)
      ctx.beginPath()
      ctx.moveTo(l.x - wd / 2, l.y)
      ctx.lineTo(l.x + wd / 2, l.y)
      ctx.lineTo(l.x + wd * 0.1, Math.min(l.y + l.len, hy))
      ctx.lineTo(l.x - wd * 0.1, Math.min(l.y + l.len, hy))
      ctx.fill()
    }

    // sparks
    ctx.fillStyle = '#c3c7d9'
    for (const p of this.sparks) {
      ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(this.time * 1.5 + p.ph)) * open
      ctx.fillRect(p.x, p.y, p.r, p.r)
    }
    ctx.globalAlpha = 1

    // horizon: opens from the centre, fades at both ends
    const half = (w / 2) * open
    if (half > 1) {
      const hg = ctx.createLinearGradient(w / 2 - half, 0, w / 2 + half, 0)
      hg.addColorStop(0, 'rgba(185,138,255,0)')
      hg.addColorStop(0.5, 'rgba(185,138,255,0.9)')
      hg.addColorStop(1, 'rgba(185,138,255,0)')
      ctx.fillStyle = hg
      ctx.fillRect(w / 2 - half, hy, half * 2, this.calm ? 2 : 1.5)
      const bh = this.calm ? 28 : 10
      const band = ctx.createLinearGradient(0, hy - bh, 0, hy + bh)
      band.addColorStop(0, 'rgba(155,77,255,0)')
      band.addColorStop(0.5, `rgba(155,77,255,${this.calm ? 0.32 : 0.18})`)
      band.addColorStop(1, 'rgba(155,77,255,0)')
      ctx.fillStyle = band
      ctx.fillRect(w / 2 - half, hy - bh, half * 2, bh * 2)
    }
    ctx.globalCompositeOperation = 'source-over'
  }

  /** Reduced motion: jump ahead and draw one calm frame. */
  settle() {
    this.intro = 1
    this.introOn = false
    for (let i = 0; i < 240; i++) this.update(1 / 30)
  }
}
