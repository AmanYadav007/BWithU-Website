import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseDemoMessage } from './demoMessage.ts'

const APP = 'https://app.bwithu.live'

test('accepts ready and ended from the app', () => {
  assert.deepEqual(parseDemoMessage(APP, { bwithu: 'demo', type: 'ready' }, APP), { type: 'ready' })
  assert.deepEqual(parseDemoMessage(APP, { bwithu: 'demo', type: 'ended', reason: 'time' }, APP), { type: 'ended', reason: 'time' })
})

test('an unknown reason becomes error, never passed through', () => {
  assert.deepEqual(parseDemoMessage(APP, { bwithu: 'demo', type: 'ended', reason: '<script>' }, APP), { type: 'ended', reason: 'error' })
})

test('ignores other origins and other shapes', () => {
  assert.equal(parseDemoMessage('https://evil.example', { bwithu: 'demo', type: 'ready' }, APP), null)
  assert.equal(parseDemoMessage(APP, { type: 'ready' }, APP), null)
  assert.equal(parseDemoMessage(APP, 'ready', APP), null)
  assert.equal(parseDemoMessage(APP, null, APP), null)
  assert.equal(parseDemoMessage(APP, { bwithu: 'demo', type: 'other' }, APP), null)
})
