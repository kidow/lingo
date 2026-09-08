import assert from 'node:assert/strict'
import test from 'node:test'
import { bounds, fitPaths, type Box } from '../scripts/hanja-component-geometry.ts'
import { resolveComponentLayout, type LayoutChild, type Profile } from '../scripts/hanja-component-layout.ts'

const whole: Box = { x: 10, y: 10, width: 80, height: 80 }
const intrinsic: Box = { x: 0, y: 0, width: 80, height: 80 }
const child = (glyph = '口', profiles: Profile[] = [], intrinsicBox: Box | undefined = intrinsic): LayoutChild => ({ glyph, profiles, intrinsicBox })
function profile(glyph: string, position: Profile['position'], sourceBox: Box,
  donorGlyph = '合', reviewed = true, donorBox: Box = whole): Profile {
  return { glyph, position, sourceBox, donorGlyph, reviewed, donorBox }
}
function near(actual: number, expected: number): void {
  assert.ok(Math.abs(actual - expected) < 1e-7, `${actual} differs from ${expected}`)
}

test('LR profiles transfer vertical extent and offset plus donor-based relative split sizes', () => {
  const left = profile('口', 'left', { x: 10, y: 30, width: 20, height: 40 }, '和')
  const right = profile('日', 'right', { x: 40, y: 10, width: 50, height: 80 }, '明')
  const result = resolveComponentLayout('⿰', whole, [child('口', [left]), child('日', [right])], .7)
  near(result.boxes[0].width, 74 * 2 / 7)
  near(result.boxes[1].width, 74 * 5 / 7)
  assert.equal(result.boxes[0].y, 30)
  assert.equal(result.boxes[0].height, 40)
  assert.equal(result.boxes[1].y, 10)
  assert.equal(result.boxes[1].height, 80)
  near(result.boxes[1].x - result.boxes[0].x - result.boxes[0].width, 6)
  assert.deepEqual(result.sourceDonors, ['和', '明'])
  assert.equal(result.mode, 'reviewed-profile')
})

test('TB profiles transfer horizontal extent/offset instead of full-width stretching', () => {
  const top = profile('口', 'top', { x: 30, y: 10, width: 40, height: 20 }, '合')
  const bottom = profile('日', 'bottom', { x: 20, y: 40, width: 60, height: 50 }, '昔')
  const result = resolveComponentLayout('⿱', whole, [child('口', [top]), child('日', [bottom])], .5)
  assert.equal(result.boxes[0].x, 30)
  assert.equal(result.boxes[0].width, 40)
  assert.equal(result.boxes[1].x, 20)
  assert.equal(result.boxes[1].width, 60)
  near(result.boxes[0].height, 74 * 2 / 7)
  near(result.boxes[1].y - result.boxes[0].y - result.boxes[0].height, 6)
})

test('reviewed profiles override inferred copies and duplicates cannot amplify a donor vote', () => {
  const reviewed = profile('口', 'left', { x: 10, y: 30, width: 24, height: 32 }, '和')
  const inferred = profile('口', 'left', { x: 10, y: 10, width: 48, height: 80 }, '和', false)
  const otherInferred = { ...inferred, donorGlyph: '如' }
  const result = resolveComponentLayout('⿰', whole,
    [child('口', [inferred, otherInferred, reviewed, structuredClone(reviewed)]), child('日')], .5)
  near(result.boxes[0].width, 74 * .3)
  assert.equal(result.boxes[0].y, 30)
  assert.equal(result.boxes[0].height, 32)
  assert.deepEqual(result.sourceDonors, ['和'])
  assert.equal(result.mode, 'reviewed-profile+intrinsic-contain')
  const conflict = { ...reviewed, sourceBox: { ...reviewed.sourceBox, y: 20 } }
  assert.throws(() => resolveComponentLayout('⿰', whole,
    [child('口', [reviewed, conflict]), child('日')], .5), /Conflicting profiles/)
})

test('profile aggregation is deterministic, scale-independent, and explicit about inferred input', () => {
  const a = profile('口', 'left', { x: 10, y: 20, width: 24, height: 40 }, '如', false)
  const b = profile('口', 'left', { x: 100, y: 140, width: 48, height: 64 }, '和', false,
    { x: 100, y: 100, width: 160, height: 160 })
  const input: [LayoutChild, LayoutChild] = [child('口', [a, b]), child('日')]
  const before = structuredClone(input)
  const result = resolveComponentLayout('⿰', whole, input, .5)
  near(result.boxes[0].width, 74 * .3)
  near(result.boxes[0].y, 25)
  near(result.boxes[0].height, 36)
  assert.deepEqual(result, resolveComponentLayout('⿰', whole, [child('口', [b, a]), child('日')], .5))
  assert.deepEqual(input, before)
  assert.equal(result.mode, 'inferred-profile+intrinsic-contain')
})

test('intrinsic fallback contains square and tall glyphs without letter-specific rules', () => {
  const tall = { x: 0, y: 0, width: 40, height: 80 }
  const result = resolveComponentLayout('⿰', whole, [child('口'), child('日', [], tall)], .5)
  assert.deepEqual(result.boxes, [
    { x: 10, y: 31.5, width: 37, height: 37 },
    { x: 53, y: 13, width: 37, height: 74 },
  ])
  assert.deepEqual(result.sourceDonors, [])
  assert.equal(result.mode, 'intrinsic-contain')
  const renamed = resolveComponentLayout('⿰', whole, [child('甲'), child('乙', [], tall)], .5)
  assert.deepEqual(renamed, result)
  const vertical = resolveComponentLayout('⿱', whole, [child('口'), child('日', [], tall)], .5)
  assert.deepEqual(vertical.boxes, [
    { x: 31.5, y: 10, width: 37, height: 37 },
    { x: 40.75, y: 53, width: 18.5, height: 37 },
  ])
})

test('unknown compound children keep full cells and line-shaped intrinsic geometry stays finite', () => {
  const result = resolveComponentLayout('⿰', whole, [{ profiles: [] }, child('丨', [], { x: 30, y: 0, width: 0, height: 80 })], .5)
  assert.deepEqual(result.boxes, [
    { x: 10, y: 10, width: 37, height: 80 },
    { x: 71.5, y: 10, width: 0, height: 80 },
  ])
  assert.equal(result.mode, 'intrinsic-contain+cell-fallback')
  assert.deepEqual(fitPaths(['M30 0 L30 80'], result.boxes[1]).paths, ['M71.5 10 L71.5 90'])
})

test('painted stroke gap remains at least one unit after nested intrinsic containment', () => {
  const mouth = ['M0 0 L0 80', 'M0 0 L80 0 L80 80', 'M0 80 L80 80']
  const outer = resolveComponentLayout('⿰', whole, [child(), { profiles: [] }], .5)
  const nested = resolveComponentLayout('⿰', outer.boxes[1], [child(), child()], .5)
  const boxes = [outer.boxes[0], ...nested.boxes].map(box => bounds(fitPaths(mouth, box).paths))
  for (let index = 1; index < boxes.length; index++) {
    const gap = boxes[index].x - boxes[index - 1].x - boxes[index - 1].width
    assert.ok(gap - 5 >= 1 - 1e-8)
  }
})

test('profile shape and position errors are rejected instead of used as layout evidence', () => {
  const valid = profile('口', 'left', { x: 10, y: 20, width: 30, height: 40 })
  const badProfiles: Profile[] = [
    { ...valid, glyph: '日' }, { ...valid, position: 'top' }, { ...valid, donorGlyph: '' },
    { ...valid, sourceBox: { ...valid.sourceBox, x: 0 } },
    { ...valid, sourceBox: { ...valid.sourceBox, width: 100 } },
    { ...valid, sourceBox: { ...valid.sourceBox, height: NaN } },
    { ...valid, donorBox: { ...whole, height: 0 } },
  ]
  for (const invalid of badProfiles) {
    assert.throws(() => resolveComponentLayout('⿰', whole, [child('口', [invalid]), child('日')], .5))
  }
  assert.throws(() => resolveComponentLayout('⿰', whole, [{ profiles: [valid] }, child()], .5), /Profile glyph/)
})

test('insufficient cells, extreme learned splits, invalid fallback, and point geometry fail explicitly', () => {
  assert.throws(() => resolveComponentLayout('⿰', { ...whole, width: 17 }, [child(), child()], .5), /Insufficient layout/)
  assert.throws(() => resolveComponentLayout('⿱', { ...whole, width: 5 }, [child(), child()], .5), /Insufficient layout/)
  const tiny = profile('口', 'left', { x: 10, y: 20, width: .8, height: 40 })
  assert.throws(() => resolveComponentLayout('⿰', whole, [child('口', [tiny]), child('日')], .5), /Insufficient layout/)
  assert.throws(() => resolveComponentLayout('⿰', whole, [child(), child()], 0), /Invalid fallback/)
  assert.throws(() => resolveComponentLayout('⿰', whole, [child(), child()], NaN), /Invalid fallback/)
  assert.throws(() => resolveComponentLayout('⿰', { x: 1e308, y: 10, width: 1e308, height: 80 }, [child(), child()], .5), /Invalid layout/)
  assert.throws(() => resolveComponentLayout('⿲' as '⿰', whole, [child(), child()], .5), /Unsupported layout/)
  assert.throws(() => resolveComponentLayout('⿰', whole, [child('口', [], { x: 0, y: 0, width: 0, height: 0 }), child()], .5), /Invalid intrinsic/)
})

test('line profiles cannot force a zero-width split, and the untouched axis still follows their profile', () => {
  const vertical = profile('丨', 'left', { x: 20, y: 30, width: 0, height: 40 })
  const result = resolveComponentLayout('⿰', whole, [child('丨', [vertical]), child('口')], .4)
  near(result.boxes[0].width, 74 * .4)
  assert.equal(result.boxes[0].y, 30)
  assert.equal(result.boxes[0].height, 40)
  assert.ok(result.boxes.every(box => Object.values(box).every(Number.isFinite)))
})
