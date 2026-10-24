/** Mirrors the call app's choices (BwithU-new-speed/web/src/config/companion.ts). Ids must match. */

export type Face = { id: string; name: string; image: string }

export const FACES: Face[] = [
  { id: 'maya', name: 'Maya', image: '/faces/maya.jpg' },
  { id: 'elena', name: 'Elena', image: '/faces/elena.jpg' },
  { id: 'zara', name: 'Zara', image: '/faces/zara.jpg' },
  { id: 'aiko', name: 'Aiko', image: '/faces/aiko.jpg' },
  { id: 'leo', name: 'Leo', image: '/faces/leo.jpg' },
  { id: 'ravi', name: 'Ravi', image: '/faces/ravi.jpg' },
  { id: 'james', name: 'James', image: '/faces/james.jpg' },
  { id: 'vfhq_case1', name: 'Arthur', image: '/faces/arthur.jpg' },
]

export type Voice = { id: string; name: string; gender: 'Female' | 'Male'; accent: 'US' | 'Indian' }

/** Samples in public/voices/<id>.mp3, all saying the same line. */
export const VOICES: Voice[] = [
  { id: 'ava', name: 'Ava', gender: 'Female', accent: 'US' },
  { id: 'emma', name: 'Emma', gender: 'Female', accent: 'US' },
  { id: 'neerja', name: 'Neerja', gender: 'Female', accent: 'Indian' },
  { id: 'andrew', name: 'Andrew', gender: 'Male', accent: 'US' },
  { id: 'brian', name: 'Brian', gender: 'Male', accent: 'US' },
  { id: 'prabhat', name: 'Prabhat', gender: 'Male', accent: 'Indian' },
]

export const VOICE_SAMPLE_LINE = '“Hey, it’s really good to see you. How’s your day going?”'
