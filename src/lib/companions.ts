/** Mirrors the call app's choices (BwithU-new-speed/web/src/config/companion.ts). Ids and order must match. */

/** `lead` and `more` together are the app's tagline_<id> (BwithU-new-speed/web/src/i18n/messages.ts). */
export type Face = { id: string; name: string; image: string; lead: string; more: string }

// Aiko first, as in the app's character picker.
export const FACES: Face[] = [
  { id: 'aiko', name: 'Aiko', image: '/faces/aiko.jpg', lead: 'The clear-headed coach.', more: 'Calm, practical, one step at a time.' },
  { id: 'maya', name: 'Maya', image: '/faces/maya.jpg', lead: 'The warm listener.', more: 'Kind, calm, and she remembers the little things.' },
  { id: 'elena', name: 'Elena', image: '/faces/elena.jpg', lead: 'The curious one.', more: 'Big questions, honest takes, a dry sense of humour.' },
  { id: 'zara', name: 'Zara', image: '/faces/zara.jpg', lead: 'The fun one.', more: 'Quick-witted, upbeat, great at turning a bad day around.' },
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

/** Rounded length of each sample in seconds (afinfo on public/voices/characters, Nov 2026). Shown before playing. */
export const SAMPLE_SECONDS: Record<string, Record<LanguageId, number>> = {
  aiko: { en: 3, hi: 6, es: 6 },
  maya: { en: 3, hi: 5, es: 5 },
  elena: { en: 3, hi: 6, es: 6 },
  zara: { en: 3, hi: 6, es: 7 },
}

/** The one-line hint under the language picker, as the app words it (hint_<id>). */
export const LANGUAGE_HINT: Record<LanguageId, string> = {
  en: 'Talk in English',
  hi: 'Hindi, with English words mixed in',
  es: 'Talk in Spanish',
}
