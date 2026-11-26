/** Messages the call app's demo frame sends to this page. Pure (no imports), so a unit test can cover it. */
export type DemoEvent = { type: 'ready' } | { type: 'ended'; reason: 'time' | 'user' | 'dropped' | 'error' | 'unavailable' }

const REASONS = new Set(['time', 'user', 'dropped', 'error', 'unavailable'])

/** Reads a window message from the demo frame. Anything from another origin or in another shape is ignored. */
export function parseDemoMessage(origin: string, data: unknown, expectedOrigin: string): DemoEvent | null {
  if (origin !== expectedOrigin || typeof data !== 'object' || data === null) return null
  const d = data as { bwithu?: unknown; type?: unknown; reason?: unknown }
  if (d.bwithu !== 'demo') return null
  if (d.type === 'ready') return { type: 'ready' }
  if (d.type === 'ended') return { type: 'ended', reason: REASONS.has(d.reason as string) ? (d.reason as 'time') : 'error' }
  return null
}
