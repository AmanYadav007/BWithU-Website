import { useEffect, useRef } from 'react'
import { NEUTRAL_POSE, RIG_SIZE, renderRig } from './pixelRig'
import type { MouthShape, RigPose } from './pixelRig'
import { COMPANIONS } from './types'
import type { CompanionAvatar, CompanionState } from './types'

/*
 * The same face-and-body brain the extension uses (packages/ui/src/PixelCompanion.tsx),
 * trimmed to the states the website shows. Draws onto a 64x64 canvas and scales by whole
 * pixels so the art stays crisp, and stops ticking while off screen.
 */

const TICK_MS = 100

type Emotion = 'happy' | 'sad' | 'surprised' | 'neutral'

function emotionOf(text: string): Emotion {
  if (!text) return 'neutral'
  if (/\b(sorry|sad|unfortunately|tough|oops|hard day)\b/i.test(text)) return 'sad'
  if (/\b(wow|whoa|no way|amazing)\b|\boh!/i.test(text)) return 'surprised'
  if (/\b(haha|yay|love|great|awesome|glad|happy|fun|proud|sweet)\b|!/i.test(text)) return 'happy'
  return 'neutral'
}

const VISEMES: Record<Emotion, MouthShape[]> = {
  neutral: ['open', 'wide', 'o', 'open', 'neutral', 'open', 'wide', 'smile'],
  happy: ['grin', 'open', 'wide', 'grin', 'smile', 'open'],
  sad: ['open', 'wavy', 'open', 'neutral', 'o'],
  surprised: ['o', 'wide', 'open', 'o', 'open'],
}

const GAZES = [
  { x: 0, y: 0, turn: 0 },
  { x: 0, y: 0, turn: 0 },
  { x: 0, y: 0, turn: 0 },
  { x: -1, y: 0, turn: 0 },
  { x: 1, y: 0, turn: 0 },
  { x: -1, y: 0, turn: -1 },
  { x: 1, y: 0, turn: 1 },
  { x: 0, y: -1, turn: 0 },
  { x: 1, y: -1, turn: 0 },
]

interface Inputs {
  state: CompanionState
  emotion: Emotion
  pointerGaze: { x: number; y: number; turn: number; at: number } | null
  still: boolean
}

interface Brain {
  frame: number
  lastState: CompanionState | null
  stateSince: number
  nextBlink: number
  blinkUntil: number
  gaze: { x: number; y: number; turn: number }
  nextGaze: number
  mouth: MouthShape
  nextMouth: number
  nodUntil: number
  nextNod: number
  browUntil: number
}

function newBrain(now: number): Brain {
  return {
    frame: 0,
    lastState: null,
    stateSince: now,
    nextBlink: now + 1200 + Math.random() * 2000,
    blinkUntil: 0,
    gaze: GAZES[0],
    nextGaze: now + 1500,
    mouth: 'open',
    nextMouth: now,
    nodUntil: 0,
    nextNod: now + 1800,
    browUntil: 0,
  }
}

function think(brain: Brain, now: number, input: Inputs): RigPose {
  brain.frame += 1
  if (input.state !== brain.lastState) {
    brain.lastState = input.state
    brain.stateSince = now
  }
  const inState = now - brain.stateSince
  const pose: RigPose = { ...NEUTRAL_POSE, frame: brain.frame }

  if (now >= brain.nextBlink) {
    brain.blinkUntil = now + 130
    brain.nextBlink = Math.random() < 0.15 ? now + 330 : now + 2200 + Math.random() * 3200
  }
  const blinking = now < brain.blinkUntil
  if (input.still) {
    if (blinking) pose.eyes = 'closed'
    return pose
  }

  const sleepy = input.state === 'sleepy'
  const breathPeriod = input.state === 'talk' ? 900 : sleepy ? 4000 : 2800
  pose.bodyY = now % breathPeriod < breathPeriod / 2 ? 0 : 1

  if (now >= brain.nextGaze) {
    brain.gaze = GAZES[Math.floor(Math.random() * GAZES.length)]
    brain.nextGaze = now + 1600 + Math.random() * 2600
  }
  const pointer = input.pointerGaze && now - input.pointerGaze.at < 2500 ? input.pointerGaze : null
  const gaze = pointer ?? brain.gaze
  pose.lookX = gaze.x
  pose.lookY = gaze.y
  pose.turn = gaze.turn
  const faceUser = () => {
    if (pointer) return
    pose.lookX = 0
    pose.lookY = 0
    pose.turn = 0
  }

  switch (input.state) {
    case 'talk': {
      if (now >= brain.nextMouth) {
        const shapes = VISEMES[input.emotion]
        brain.mouth = shapes[Math.floor(Math.random() * shapes.length)]
        brain.nextMouth = now + 100 + Math.random() * 90
      }
      pose.mouth = brain.mouth
      pose.headY = brain.mouth === 'wide' ? -1 : 0
      faceUser()
      if (now >= brain.browUntil + 1500 && Math.random() < 0.04) brain.browUntil = now + 400
      if (now < brain.browUntil) pose.brows = 'up'
      if (input.emotion === 'happy') {
        pose.blush = true
        if (inState % 2600 < 700) pose.eyes = 'happy'
      } else if (input.emotion === 'sad') {
        pose.brows = 'worried'
      }
      break
    }
    case 'listen': {
      pose.mouth = 'neutral'
      pose.brows = inState < 700 ? 'up' : 'neutral'
      faceUser()
      if (now >= brain.nextNod) {
        brain.nodUntil = now + 260
        brain.nextNod = now + 2200 + Math.random() * 2000
      }
      pose.headY = now < brain.nodUntil ? 1 : 0
      pose.tilt = Math.floor(now / 3200) % 3 === 1 ? 1 : 0
      break
    }
    case 'think':
      pose.lookX = 1
      pose.lookY = -1
      pose.turn = 1
      pose.brows = 'quizzical'
      pose.mouth = 'hmm'
      pose.emote = 'think'
      break
    case 'searching':
      pose.lookX = Math.floor(now / 450) % 2 ? 1 : -1
      pose.lookY = 0
      pose.turn = pose.lookX
      pose.brows = 'focused'
      pose.mouth = 'neutral'
      pose.emote = 'think'
      break
    case 'happy':
    case 'wave':
      pose.eyes = 'happy'
      pose.mouth = 'grin'
      pose.blush = true
      pose.brows = 'up'
      pose.emote = input.state === 'wave' ? 'sparkle' : 'heart'
      if (inState < 800) pose.bodyY = Math.floor(inState / 200) % 2 ? -1 : 0
      break
    case 'spawning':
      if (inState < 600) {
        pose.eyes = 'wide'
        pose.mouth = 'o'
        pose.brows = 'up'
        pose.emote = 'exclaim'
        faceUser()
      } else if (inState < 2200) {
        pose.eyes = 'happy'
        pose.mouth = 'grin'
        pose.blush = true
        pose.emote = 'sparkle'
      }
      break
    case 'curious':
      pose.brows = 'quizzical'
      pose.tilt = 1
      pose.lookX = 1
      pose.turn = 1
      pose.mouth = 'neutral'
      pose.emote = 'question'
      break
    case 'sleepy':
      pose.eyes = 'half'
      pose.mouth = 'neutral'
      pose.emote = 'zzz'
      pose.headY = Math.floor(now / 2600) % 2
      break
  }

  if (blinking && (pose.eyes === 'open' || pose.eyes === 'half' || pose.eyes === 'wide')) pose.eyes = 'closed'
  return pose
}

type Props = {
  avatar: CompanionAvatar
  state?: CompanionState
  /** What the companion is saying; its tone drives the expression while talking. */
  speech?: string
  /** Whole-pixel scale. 4 = 256px. */
  scale?: number
  /** Only blink. */
  still?: boolean
  className?: string
}

export function PixelCompanion({ avatar, state = 'idle', speech = '', scale = 4, still = false, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const inputsRef = useRef<Inputs>({ state, emotion: 'neutral', pointerGaze: null, still })

  useEffect(() => {
    const inputs = inputsRef.current
    inputs.state = state
    inputs.emotion = emotionOf(speech)
    inputs.still = still
  }, [state, speech, still])

  // Eyes, and at larger distances the head, follow the pointer.
  useEffect(() => {
    if (still) return undefined
    const onMove = (event: PointerEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width * 0.5)
      const dy = event.clientY - (rect.top + rect.height * 0.44)
      inputsRef.current.pointerGaze = {
        x: dx > rect.width * 0.12 ? 1 : dx < -rect.width * 0.12 ? -1 : 0,
        y: dy < -rect.height * 0.18 ? -1 : dy > rect.height * 0.3 ? 1 : 0,
        turn: Math.abs(dx) > rect.width * 0.9 ? Math.sign(dx) : 0,
        at: performance.now(),
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [still])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined
    const brain = newBrain(performance.now())
    let lastKey = ''
    let timer: ReturnType<typeof setInterval> | null = null

    const draw = () => {
      const pose = think(brain, performance.now(), inputsRef.current)
      const key = JSON.stringify(pose.emote === 'none' ? { ...pose, frame: 0 } : pose)
      if (key === lastKey) return
      lastKey = key
      context.putImageData(new ImageData(renderRig(avatar, pose), RIG_SIZE, RIG_SIZE), 0, 0)
    }
    const start = () => {
      if (!timer) timer = setInterval(draw, TICK_MS)
    }
    const stop = () => {
      if (timer) clearInterval(timer)
      timer = null
    }

    draw()
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    observer.observe(canvas)
    return () => {
      stop()
      observer.disconnect()
    }
  }, [avatar])

  const size = RIG_SIZE * scale
  return (
    <canvas
      ref={canvasRef}
      width={RIG_SIZE}
      height={RIG_SIZE}
      role="img"
      aria-label={`${COMPANIONS[avatar].label} pixel companion`}
      className={className}
      style={{ width: size, height: size, imageRendering: 'pixelated' }}
    />
  )
}
