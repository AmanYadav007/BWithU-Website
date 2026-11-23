import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createWarmup, likelyEnglish } from './warmup.ts'

function fakeDoc() {
  const h = new Map<string, () => void>()
  return {
    addEventListener: (e: string, f: () => void) => void h.set(e, f),
    removeEventListener: (e: string) => void h.delete(e),
    emit: (e: string) => h.get(e)?.(),
    count: () => h.size,
  }
}

test('does nothing without an interaction (bots)', () => {
  const doc = fakeDoc()
  const calls: unknown[][] = []
  createWarmup({ doc, fetchFn: (...a) => calls.push(a), lang: 'en-IN' })
  assert.equal(calls.length, 0)
})

test('warms once after the first interaction, with keepalive and no credentials', () => {
  const doc = fakeDoc()
  const calls: [string, RequestInit][] = []
  const w = createWarmup({ doc, fetchFn: (u, i) => calls.push([u, i]), lang: 'en-US' })
  doc.emit('scroll')
  doc.emit('pointermove')
  w.fire()
  assert.equal(calls.length, 1)
  assert.equal(calls[0][0], 'https://app.bwithu.live/bwithu/warm')
  assert.equal(calls[0][1].keepalive, true)
  assert.equal(calls[0][1].credentials, 'omit')
  assert.equal(calls[0][1].body, undefined)
  assert.equal(doc.count(), 0)
})

test('skips Hindi and Spanish, still only decides once', () => {
  for (const lang of ['hi-IN', 'es-MX']) {
    const doc = fakeDoc()
    const calls: unknown[] = []
    createWarmup({ doc, fetchFn: (...a) => calls.push(a), lang })
    doc.emit('keydown')
    assert.equal(calls.length, 0)
  }
  assert.equal(likelyEnglish(undefined), true)
  assert.equal(likelyEnglish('en-GB'), true)
})

test('a failing fetch never throws', async () => {
  const doc = fakeDoc()
  createWarmup({ doc, fetchFn: () => Promise.reject(new Error('x')), lang: 'en' })
  doc.emit('touchstart')
  await new Promise((r) => setTimeout(r, 0))
})
