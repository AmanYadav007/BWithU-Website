import { useEffect, useState } from 'react'

/** True on a big screen with motion allowed: the only place the WebGL background runs. Phones keep the light CSS glow. */
export function useDesktopMotion() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const saveData = (navigator as { connection?: { saveData?: boolean } }).connection?.saveData === true
    const update = () => setOn(wide.matches && !calm.matches && !saveData)
    update()
    wide.addEventListener('change', update)
    calm.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      calm.removeEventListener('change', update)
    }
  }, [])
  return on
}
