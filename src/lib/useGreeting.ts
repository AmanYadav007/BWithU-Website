import { useCallback, useEffect, useRef, useState } from 'react'
import { voiceSample, type LanguageId } from './companions'

/**
 * One shared audio player for the page: a companion says hello only after a tap (never autoplay).
 * `progress` runs 0..1 while she speaks, so captions can follow her voice.
 */
export function useGreeting() {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState<{ id: string; lang: 'en' | 'hi' } | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => () => audio.current?.pause(), [])

  const stop = useCallback(() => {
    audio.current?.pause()
    setPlaying(null)
    setProgress(0)
  }, [])

  const play = useCallback((id: string, lang: Extract<LanguageId, 'en' | 'hi'> = 'en') => {
    if (!audio.current) audio.current = new Audio()
    const a = audio.current
    a.pause()
    a.onended = a.onerror = () => {
      setPlaying(null)
      setProgress(0)
    }
    a.ontimeupdate = () => setProgress(a.duration ? a.currentTime / a.duration : 0)
    a.src = voiceSample(id, lang)
    setPlaying({ id, lang })
    setProgress(0)
    a.play().catch(() => {
      setPlaying(null)
    })
  }, [])

  return { playing, progress, play, stop }
}
