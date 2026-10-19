import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import type { HanjaOutlineSegment, HanjaOutlineStrokes } from './hanja-stroke-outline'
import { outlineSegmentProgress } from './hanja-stroke-outline.ts'
import { hasReviewedHanjaStartGate, isReviewedHanjaStartGateSegment, measureHanjaStartGateLength, hanjaStartGateClip, reviewedHanjaRevealContext, reviewedHanjaRevealPolicy, reviewedHanjaRevealClip, measureReviewedHanjaRevealLength } from './hanja-stroke-start-gate.ts'
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



const shui = JSON.parse(readFileSync(new URL('../docs/hanja-source-independent-hq-up-u5e28-source-experiment-2026-10-19/fixtures.json', import.meta.url), 'utf8')).u5e28.strokes as HanjaOutlineStrokes

test('exact 帨 context and two policies: isolated parity, committed measurement and other-mask refusal', async () => {
  const before = JSON.stringify(shui)
  assert.equal(createHash('sha256').update(before).digest('hex'), 'c1488f46315395ce3258b8bccafd0350bd2d49f281e7a187bf4f0bf5cf7fa8b3')
  const context = reviewedHanjaRevealContext(shui)!
  assert.equal(context.id, 'u5e28'); assert.equal(hasReviewedHanjaStartGate(shui), false) // legacy 棖-only contract
  const qPolicy = reviewedHanjaRevealPolicy(context, 4, 1)!, planePolicy = reviewedHanjaRevealPolicy(context, 9, 0)!
  assert.equal(qPolicy.kind, 'circle-start'); assert.equal(planePolicy.kind, 'global-projection')
  assert.equal(reviewedHanjaRevealPolicy({ ...context }, 4, 1), null)
  for (let p = 0; p < shui.length; p++) for (let m = 0; m < shui[p].length; m++)
    if (!(p === 4 && m === 1) && !(p === 9 && m === 0)) assert.equal(reviewedHanjaRevealPolicy(context, p, m), null)
  for (const mutate of [
    (s: MutableStrokes) => s[0][0].weight++, (s: MutableStrokes) => s[9].reverse(),
    (s: MutableStrokes) => s[4][1].bounds[0]++, (s: MutableStrokes) => s[4][1].revealPath += ' ',
    (s: MutableStrokes) => s[9][0].outline += ' ', (s: MutableStrokes) => s[9][0].extra = true,
  ]) { const changed = structuredClone(shui) as MutableStrokes; mutate(changed); assert.equal(reviewedHanjaRevealContext(changed), null) }
  const q = shui[4][1], plane = shui[9][0], length = 26.571182250976562
  let measurements = 0
  const guide = { isConnected: true, getAttribute: () => q.revealPath!, getTotalLength: () => { measurements++; return length } }
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, null), null)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, isConnected: false }), null)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, getAttribute: () => 'wrong' }), null)
  assert.equal(measurements, 0)
  assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, guide), length); assert.equal(measurements, 1)
  assert.equal(measureReviewedHanjaRevealLength(planePolicy, plane, { ...guide, getAttribute: () => plane.revealPath!, getTotalLength: () => { throw Error('plane must not measure') } }), null)
  for (const value of [0, -1, NaN, Infinity]) assert.equal(measureReviewedHanjaRevealLength(qPolicy, q, { ...guide, getTotalLength: () => value }), null)
  assert.throws(() => measureReviewedHanjaRevealLength(qPolicy, plane, guide))
  assert.throws(() => reviewedHanjaRevealClip({ ...qPolicy }, q, .2, length))
  assert.throws(() => reviewedHanjaRevealClip(qPolicy, { ...q, revealWidth: 15 }, .2, length))
  assert.throws(() => reviewedHanjaRevealClip(qPolicy, q, .2, null))
  const isolated = await import(new URL('../docs/hanja-renderer-global-projection-u5e28-experiment-2026-10-20/render.mjs', import.meta.url).href)
  const progress = [0, 1e-12, 1e-8, 1e-6, .0269, .1, .5, .95, .9999, .99999999, 1]
  let previous = -Infinity
  for (const p of progress) {
    const circle = reviewedHanjaRevealClip(qPolicy, q, p, length), oldCircle = isolated.gateState(q, p, length)
    assert.equal(circle.kind, 'circle-start'); assert.deepEqual(circle.center, oldCircle.q); assert.deepEqual(circle.tangent, oldCircle.v)
    assert.equal(circle.threshold, oldCircle.h); if (circle.kind === 'circle-start') assert.equal(circle.tau, oldCircle.tau)
    const global = reviewedHanjaRevealClip(planePolicy, plane, p, null), oldGlobal = isolated.projectionState(plane, p)
    assert.equal(global.kind, 'global-projection'); assert.deepEqual(global.center, oldGlobal.q); assert.deepEqual(global.tangent, oldGlobal.v)
    assert.equal(global.projectionMin, oldGlobal.a); assert.equal(global.projectionMax, oldGlobal.b); assert.equal(global.threshold, oldGlobal.h)
    assert(global.threshold >= previous); previous = global.threshold
    const width = global.projectionMax - global.projectionMin
    assert.equal(width, 37)
    if (global.kind === 'global-projection') { assert.equal(global.normalMax-global.normalMin, 24); assert(Math.abs(24*(global.threshold-global.projectionMin)-888*p) < 1e-10) }
  }
  for (const p of [NaN, Infinity, -.1, 1.1]) assert.throws(() => reviewedHanjaRevealClip(planePolicy, plane, p, null))
  assert.equal(JSON.stringify(shui), before)
})

test('actual whole component SSR mounts exact guides without measurement; completed targets remain masked', async () => {
  const componentURL = new URL('../components/hanja/stroke-outlines.tsx', import.meta.url)
  const source = readFileSync(componentURL, 'utf8')
  const timingSource = readFileSync(new URL('./hanja-strokes.ts', import.meta.url), 'utf8')
  const speed = timingSource.match(/^const STROKE_PLAYBACK_SPEED = .+$/m)![0]
  const duration = timingSource.match(/^export const STROKE_DURATION = .+$/m)![0]
  const gap = timingSource.match(/^export const STROKE_GAP = .+$/m)![0]
  const timingURL = 'data:text/javascript;base64,' + Buffer.from([speed,duration,gap].join('\n')).toString('base64')
  let js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText
  for (const [from, to] of [
    ['@/lib/hanja-strokes', timingURL], ['@/lib/hanja-stroke-outline', new URL('./hanja-stroke-outline.ts', import.meta.url).href],
    ['@/lib/hanja-stroke-start-gate', new URL('./hanja-stroke-start-gate.ts', import.meta.url).href],
    ['react/jsx-runtime', import.meta.resolve('react/jsx-runtime')], ['react', import.meta.resolve('react')],
  ]) js = js.replaceAll('"'+from+'"', '"'+to+'"').replaceAll("'"+from+"'", "'"+to+"'")
  const { StrokeOutlines } = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'))
  const render = (outlines: HanjaOutlineStrokes, phase: 'idle' | 'playing', manual: boolean | null, count: number) => renderToStaticMarkup(createElement('svg', null, createElement(StrokeOutlines, { strokes: outlines, clock: { current: [] }, phase, count, manual })))
  const complete = render(shui, 'idle', null, 10)
  for (const [id, segment] of [['u5e28-5-2', shui[4][1]], ['u5e28-10-1', shui[9][0]]] as const) {
    assert(complete.includes('data-stroke-start-gate="'+id+'"'))
    assert(complete.includes('d="'+segment.outline+'" mask="url(#'))
  }
  assert(complete.includes('data-stroke-reveal-policy="global-projection"'))
  const initial = render(shui, 'playing', false, 0)
  assert(initial.includes('data-stroke-start-gate="u5e28-5-2"'))
  assert(initial.includes('d="'+shui[4][1].revealPath+'"')) // guide refs exist even at p=0
  assert(!initial.includes('d="'+shui[4][1].outline+'"'))
  assert(!initial.includes('d="'+shui[9][0].outline+'"'))
  const prefix = render(shui, 'playing', true, 5)
  assert(prefix.includes('d="'+shui[4][1].outline+'" mask="url(#'))
  assert(!prefix.includes('d="'+shui[9][0].outline+'"'))
  const cheng = render(strokes, 'idle', null, 12)
  assert(cheng.includes('data-stroke-start-gate="u68d6-10-2"'))
  assert(cheng.includes('d="'+strokes[9][1].outline+'" mask="url(#'))
  const unrelated = structuredClone(shui) as MutableStrokes; unrelated[0][0].weight++
  assert(!render(unrelated, 'idle', null, 10).includes('data-stroke-start-gate'))
})

test('immutable reviewed allowlist rejects exposed segment and bounds mutation', () => {
  for (const data of [strokes, shui]) {
    const before = JSON.stringify(data), context = reviewedHanjaRevealContext(data)!
    const indices = context.id === 'u68d6' ? [[9,1]] : [[4,1],[9,0]]
    for (const [pen, mask] of indices) {
      const policy = reviewedHanjaRevealPolicy(context, pen, mask)!
      assert(Object.isFrozen(policy)); assert(Object.isFrozen(policy.segment)); assert(Object.isFrozen(policy.segment.bounds))
      const exposed = policy.segment as HanjaOutlineSegment
      assert.throws(() => { exposed.revealWidth = 15 }, TypeError)
      assert.throws(() => { (exposed.bounds as number[])[0]++ }, TypeError)
      assert.throws(() => { exposed.outline += ' ' }, TypeError)
      assert.strictEqual(reviewedHanjaRevealContext(data), context)
      assert.strictEqual(reviewedHanjaRevealPolicy(context, pen, mask), policy)
      assert.throws(() => reviewedHanjaRevealClip({ ...policy }, data[pen][mask], .5, 30))
    }
    assert.equal(JSON.stringify(data), before)
  }
})
