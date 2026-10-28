import assert from 'node:assert/strict'
import { test } from 'node:test'
import { outlineStartClip, outlineClip, outlineSegmentProgress, type HanjaOutlineSegment } from './hanja-stroke-outline.ts'

const segment: HanjaOutlineSegment = {
  outline: 'M0 0 L20 0 L20 4 L0 4 Z',
  bounds: [0, 0, 20, 4], direction: 'curve', weight: 40,
  revealPath: 'M-5 2 L35 2', revealWidth: 20,
  revealStartGate: {unit: [1, 0], minProjection: 0, firstProjection: 5, padding: 10, until: .25, bounds: [0, 0, 20, 4]},
}
const points = (value: string) => value.split(' ').filter(Boolean).map(p => p.split(',').map(Number))
const area = (polygon: number[][]) => Math.abs(polygon.reduce((sum, p, i) => {
  const q = polygon[(i + 1) % polygon.length]
  return sum + p[0] * q[1] - q[0] * p[1]
}, 0)) / 2

test('source start aperture has zero initial area and grows continuously', () => {
  assert.equal(area(points(outlineStartClip(segment, 0)!)), 0)
  let previous = 0
  for (const p of [1e-12, 1e-8, 1e-6, .001, .03, .1, .2, .249999]) {
    const polygon = points(outlineStartClip(segment, p)!)
    const actual = area(polygon)
    assert(actual >= previous)
    assert(Math.abs(actual - 4 * 15 * p / .25) < 1e-10)
    previous = actual
  }
})

test('source gate releases only at the padded-guide first-point boundary', () => {
  const gate = segment.revealStartGate!
  const p = gate.until - 1e-10
  const polygon = points(outlineStartClip(segment, p)!)
  const cut = gate.minProjection + (gate.firstProjection + gate.padding - gate.minProjection) * p / gate.until
  assert(polygon.every(([x, y]) => x * gate.unit[0] + y * gate.unit[1] <= cut + 1e-12))
  assert.equal(gate.until * segment.weight, gate.padding)
  assert.equal(outlineStartClip(segment, gate.until), undefined)
  assert.equal(outlineStartClip(segment, .9), undefined)
})

test('diagonal aperture obeys its source half-plane without changing the source', () => {
  const diagonal = structuredClone(segment)
  diagonal.revealStartGate!.unit = [Math.SQRT1_2, Math.SQRT1_2]
  const before = JSON.stringify(diagonal)
  const p = .1, gate = diagonal.revealStartGate!
  const cut = (gate.firstProjection + gate.padding) * p / gate.until
  const polygon = points(outlineStartClip(diagonal, p)!)
  assert(polygon.length >= 3)
  assert(polygon.every(([x, y]) => x * gate.unit[0] + y * gate.unit[1] <= cut + 1e-12))
  assert.equal(JSON.stringify(diagonal), before)
})

test('invalid gate numbers and degenerate geometry fail closed', () => {
  for (const change of [
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.unit = [0, 0]},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.until = 0},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.until = 1},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.padding = -1},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.bounds = [0, 0, 0, 4]},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.minProjection = NaN},
    (g: NonNullable<HanjaOutlineSegment['revealStartGate']>) => {g.minProjection = 20},
  ]) {
    const changed = structuredClone(segment)
    change(changed.revealStartGate!)
    assert.equal(outlineStartClip(changed, .01), '')
  }
  assert.equal(outlineStartClip(segment, NaN), '')
})

test('legacy segments retain their existing clipping and progress behavior', () => {
  const legacy = {...segment, direction: 'right' as const, revealStartGate: undefined}
  for (const p of [0, 1e-6, .5, 1]) assert.equal(outlineStartClip(legacy, p), undefined)
  assert.deepEqual(outlineClip(legacy, .5), {x: 0, y: 0, width: 10, height: 4})
  assert.deepEqual(outlineSegmentProgress([legacy], .5), [.5])
})
