/** Mirrors the call app's choices (BwithU-new-speed/web/src/config/companion.ts). Ids and order must match. */

export type Face = { id: string; name: string; image: string }

// Aiko first, as in the app's character picker.
export const FACES: Face[] = [
  { id: 'aiko', name: 'Aiko', image: '/faces/aiko.jpg' },
  { id: 'maya', name: 'Maya', image: '/faces/maya.jpg' },
  { id: 'elena', name: 'Elena', image: '/faces/elena.jpg' },
  { id: 'zara', name: 'Zara', image: '/faces/zara.jpg' },
  { id: 'leo', name: 'Leo', image: '/faces/leo.jpg' },
  { id: 'ravi', name: 'Ravi', image: '/faces/ravi.jpg' },
  { id: 'james', name: 'James', image: '/faces/james.jpg' },
]

export type LanguageId = 'en' | 'hi' | 'es'

/** The languages a call can be in, as the app labels them. */
export const LANGUAGES: { id: LanguageId; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी · Hinglish' },
  { id: 'es', label: 'Español' },
]

/**
 * Each companion's own voice introducing themselves, made with the same voices a real call uses
 * (BwithU-new-speed/server/scripts/make_voice_samples.py). Files: public/voices/characters/<id>-<lang>.mp3.
 */
export const voiceSample = (id: string, lang: LanguageId) => `/voices/characters/${id}-${lang}.mp3`
