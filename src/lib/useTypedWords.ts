import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Types a caption in word by word, holds it, then moves to the next line. Whole line at once with reduced motion. */
export function useTypedWords(lines: string[], run = true, wordMs = 230, holdMs = 2200) {
  const reduce = useReducedMotion()
  const [line, setLine] = useState(0)
  const [count, setCount] = useState(0)
  const words = lines[line % lines.length].split(' ')

  useEffect(() => {
    if (!run || reduce) return
    if (count < words.length) {
      const t = window.setTimeout(() => setCount((c) => c + 1), wordMs)
      return () => window.clearTimeout(t)
    }
    const t = window.setTimeout(() => {
      setLine((l) => (l + 1) % lines.length)
      setCount(0)
    }, holdMs)
    return () => window.clearTimeout(t)
  }, [count, words.length, run, reduce, wordMs, holdMs, lines.length])

  return { text: reduce ? words.join(' ') : words.slice(0, count).join(' '), line }
}
