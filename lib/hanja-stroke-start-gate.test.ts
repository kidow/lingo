import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
import { hasReviewedHanjaStartGate, isReviewedHanjaStartGateSegment, measureHanjaStartGateLength, hanjaStartGateClip } from './hanja-stroke-start-gate.ts'
import { gateState } from '../docs/hanja-renderer-start-gate-u68d6-experiment-2026-10-19/render.mjs'

const fixture = JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-vq-u68d6-source-experiment-2026-10-19/fixtures.json', import.meta.url), 'utf8')).u68d6
const strokes = fixture.strokes as HanjaOutlineStrokes
const nativeLength = 38.68603515625
type MutableStrokes = (Omit<HanjaOutlineSegment, 'bounds'> & { bounds: number[]; extra?: boolean })[][]

test('exact 棖 geometry only: committed guide measurement, continuous gate and isolated renderer parity', () => {
  const before = JSON.stringify(strokes), segment = strokes[9][1]
  assert.equal(createHash('sha256').update(before).digest('hex'), 'fa3be0dbcd906119295020bea0caea8a4064925a8b85078a8cc71c0fee9f1e36')
  assert(hasReviewedHanjaStartGate(strokes)); assert(isReviewedHanjaStartGateSegment(segment))
  assert(!isReviewedHanjaStartGateSegment(strokes[9][0]))
  let negatives = 0
  for (const mutate of [
    (s: MutableStrokes) => s.pop(), (s: MutableStrokes) => s[0][0].weight++, (s: MutableStrokes) => s[9].reverse(),
    (s: MutableStrokes) => s[9][1].outline += ' ', (s: MutableStrokes) => s[9][1].bounds[0]++,
    (s: MutableStrokes) => s[9][1].revealPath += ' ', (s: MutableStrokes) => s[9][1].revealWidth++,
    (s: MutableStrokes) => s[9][1].weight++, (s: MutableStrokes) => s[9][1].direction = 'down',
    (s: MutableStrokes) => s[9][1].extra = true,
  ]) { const changed = structuredClone(strokes) as MutableStrokes; mutate(changed); assert(!hasReviewedHanjaStartGate(changed)); negatives++ }
  let measured = 0
  const guide = { isConnected: true, getAttribute: (key: string) => key === 'd' ? segment.revealPath! : null, getTotalLength: () => { measured++; return nativeLength } }
  assert.equal(measureHanjaStartGateLength(segment, null), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, isConnected: false }), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, getAttribute: () => 'wrong' }), null)
  assert.equal(measureHanjaStartGateLength(strokes[9][0], guide), null)
  assert.equal(measured, 0) // no DOM measurement before exact committed-ref checks
  assert.equal(measureHanjaStartGateLength(segment, guide), nativeLength)
  assert.equal(measured, 1)
  for (const result of [0, -1, NaN, Infinity]) assert.equal(measureHanjaStartGateLength(segment, { ...guide, getTotalLength: () => result }), null)
  assert.equal(measureHanjaStartGateLength(segment, { ...guide, getTotalLength: () => { throw Error('not measurable') } }), null)
  const tau = 14 / nativeLength
  assert.equal(tau, 0.36188769263779674)
  const values = [0, 1e-12, 1e-8, 1e-6, tau / 4, tau / 2, tau, .95, .9999, .99999999, 1]
  let threshold = -Infinity
  for (const p of values) {
    const actual = hanjaStartGateClip(segment, p, nativeLength), isolated = gateState(segment, p, nativeLength)
    assert.deepEqual(actual.center, isolated.q); assert.deepEqual(actual.tangent, isolated.v)
    assert.equal(actual.radius, isolated.r); assert.equal(actual.threshold, isolated.h); assert.equal(actual.tau, isolated.tau)
    assert(actual.threshold >= threshold); threshold = actual.threshold
    assert.equal(actual.active, p > 0 && p < tau)
  }
  const initial = hanjaStartGateClip(segment, 0, nativeLength), completed = hanjaStartGateClip(segment, 1, nativeLength)
  assert.equal(initial.threshold, -7); assert.equal(completed.threshold, 7); assert(!completed.active)
  const upperArea = (p: number) => { const g = hanjaStartGateClip(segment, p, nativeLength), ell = p * nativeLength; return 2 * g.radius * (g.threshold + g.radius) + 2 * Math.PI * g.radius * ell + Math.PI * ell * ell }
  const tinyAreas = [1e-6, 1e-8, 1e-10, 1e-12].map(upperArea)
  for (let i = 1; i < tinyAreas.length; i++) assert(tinyAreas[i] < tinyAreas[i - 1])
  assert(tinyAreas.at(-1)! < 1e-6)
  for (const length of [0, -1, NaN, Infinity]) { assert.throws(() => hanjaStartGateClip(segment, .5, length)); negatives++ }
  for (const p of [-.1, 1.1, NaN, Infinity]) { assert.throws(() => hanjaStartGateClip(segment, p, nativeLength)); negatives++ }
  const altered = { ...segment, revealWidth: 15 }; assert.throws(() => hanjaStartGateClip(altered, .1, nativeLength)); negatives++
  const boundary = strokes[9][0].weight / strokes[9].reduce((sum, s) => sum + s.weight, 0)
  assert.equal(outlineSegmentProgress(strokes[9], boundary - 1e-10)[1], 0)
  assert(outlineSegmentProgress(strokes[9], boundary + 1e-10)[1] > 0)
  assert.deepEqual(outlineSegmentProgress(strokes[9], 1), [1, 1])
  assert.equal(JSON.stringify(strokes), before)
  assert.equal(negatives, 19)
})
