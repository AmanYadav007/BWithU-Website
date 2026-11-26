import { useEffect, useState } from 'react'

/** WebGL2 is needed by the curved gallery (it draws on a canvas). Probed once, and the probe context is released. */
function hasWebGL2() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/** True when the hero can use the curved gallery: WebGL2 present and no reduced-motion preference. Otherwise the slider. */
export function useGallerySupport() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const gl = hasWebGL2()
    const update = () => setOn(gl && !calm.matches)
    update()
    calm.addEventListener('change', update)
    return () => calm.removeEventListener('change', update)
  }, [])
  return on
}
