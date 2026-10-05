import { useCallback, useEffect, useRef, useState } from 'react'
import type { Beat, Scenario } from './scripts'

const IDLE: Beat = { state: 'idle', ms: 0 }

/**
 * Plays scripted beats one after another. With `autoplay`, cycles through the given
 * scenarios forever (pausing while off screen is handled by the caller via `paused`).
 */
export function useConversation(opts: { autoplay?: Scenario[]; paused?: boolean; restGap?: number } = {}) {
  const { autoplay, paused = false, restGap = 1800 } = opts
  const [beat, setBeat] = useState<Beat>(IDLE)
  const [activeId, setActiveId] = useState<string | null>(null)
  const timers = useRef<number[]>([])
  const cycle = useRef(0)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const play = useCallback((scenario: Scenario, onDone?: () => void) => {
    clear()
    setActiveId(scenario.id)
    let at = 0
    scenario.beats.forEach((b) => {
      timers.current.push(window.setTimeout(() => setBeat(b), at))
      at += b.ms
    })
    timers.current.push(
      window.setTimeout(() => {
        setBeat((prev) => ({ ...prev, state: 'idle', display: undefined }))
        setActiveId(null)
        onDone?.()
      }, at),
    )
  }, [])

  useEffect(() => {
    if (!autoplay?.length || paused) return undefined
    let alive = true
    const next = () => {
      if (!alive) return
      const scenario = autoplay[cycle.current % autoplay.length]
      cycle.current += 1
      play(scenario, () => {
        timers.current.push(window.setTimeout(next, restGap))
      })
    }
    timers.current.push(window.setTimeout(next, 900))
    return () => {
      alive = false
      clear()
    }
  }, [autoplay, paused, play, restGap])

  useEffect(() => clear, [])

  return { beat, activeId, play }
}
