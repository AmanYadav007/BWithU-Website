/** Mirrors the extension's @bwithu/shared types the pixel rig needs. */
export type CompanionAvatar = 'male' | 'female'

export type CompanionState =
  | 'idle'
  | 'listen'
  | 'think'
  | 'talk'
  | 'happy'
  | 'wave'
  | 'curious'
  | 'searching'
  | 'sleepy'
  | 'spawning'

export const COMPANIONS: Record<CompanionAvatar, { label: string; cardColor: string; voice: string }> = {
  male: { label: 'Male', cardColor: '#725977', voice: 'Rex' },
  female: { label: 'Female', cardColor: '#efcba5', voice: 'Ara' },
}
