import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { textbookCorrectionSha256, textbookGeometry, type TextbookCorrection } from '../scripts/hanja-stroke-textbook-corrections.ts'

const original = [[[0, 0], [100, 0]], [[0, 0], [0, 100]]]
const source = 'a'.repeat(64)
const video = 'b'.repeat(64)
const sha = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const base: TextbookCorrection = {
  glyph: '十', id: 'display-review-fixture', geometrySource: source, coordinateSystem: 'viewBox100',
  sourceVideoSha256: video, originalMediansSha256: sha(original),
  strokes: [{ sourceStroke: 1, points: [[19.95, 30.64], [80, 30.64]] }, { sourceStroke: 2 }],
  notes: 'A display-space correction must preserve the geometry that was actually reviewed.',
}
function render(recipe: TextbookCorrection, medians = original) {
  return textbookGeometry({ glyph: recipe.glyph, geometrySource: source, geometryCorrection: recipe.id,
    correctionSha256: textbookCorrectionSha256(recipe), expectedStrokes: recipe.strokes.length,
    sourceVideo: { sha256: video } }, medians, [recipe])
}

test('display corrections preserve reviewed precision and untouched stroke placement', () => {
  assert.deepEqual(render(base), {
    paths: ['M19.95 30.64 L80 30.64', 'M10 90 L10 10'], sourceStrokeIndices: [1, 2],
  })
  assert.deepEqual(original, [[[0, 0], [100, 0]], [[0, 0], [0, 100]]])
})

test('changing a display boundary does not rescale other strokes', () => {
  const recipe = { ...base, strokes: [{ sourceStroke: 1, points: [[0, 50], [100, 50]] }, { sourceStroke: 2 }] }
  assert.deepEqual(render(recipe).paths, ['M0 50 L100 50', 'M10 90 L10 10'])
})

test('display coordinate mode is pinned by the correction hash', () => {
  const { coordinateSystem: _mode, ...raw } = base
  assert.notEqual(textbookCorrectionSha256(base), textbookCorrectionSha256(raw))
  assert.throws(() => textbookGeometry({ glyph: base.glyph, geometrySource: source, geometryCorrection: base.id,
    correctionSha256: textbookCorrectionSha256(raw), expectedStrokes: 2,
    sourceVideo: { sha256: video } }, original, [base]), /evidence mismatch/)
})

test('display corrections still pin their original source geometry', () => {
  assert.throws(() => render(base, [[[1, 0], [100, 0]], original[1]]), /original geometry changed/)
})

test('unknown coordinate systems are rejected even with a matching hash', () => {
  assert.throws(() => render({ ...base, coordinateSystem: 'pixels' } as unknown as TextbookCorrection), /evidence mismatch/)
})

test('display paths reject invalid coordinates rather than clamping them', () => {
  for (const points of [[[0, 0], [101, 50]], [[-1, 0], [50, 50]], [[0, 0], [Number.NaN, 50]],
    [[0, 0], [Infinity, 50]], [[0, 0]], [[0, 0], [50, 50, 1]]]) {
    assert.throws(() => render({ ...base, strokes: [{ sourceStroke: 1, points }, { sourceStroke: 2 }] }), /points invalid|out of bounds/)
  }
})

test('null lineage requires authored points and split lineage stays explicit', () => {
  assert.throws(() => render({ ...base, strokes: [{ sourceStroke: null }, { sourceStroke: 2 }] }), /points invalid/)
  assert.deepEqual(render({ ...base, strokes: [{ sourceStroke: null, points: [[20, 20], [30, 30]] },
    { sourceStroke: 2 }, { sourceStroke: 2, points: [[10, 50], [10, 10]] }] }).sourceStrokeIndices, [null, 2, 2])
  assert.throws(() => render({ ...base, strokes: [{ sourceStroke: 3, points: [[20, 20], [30, 30]] }] }), /source index invalid/)
})

test('legacy corpus-coordinate corrections still normalize source coordinates', () => {
  const { coordinateSystem: _mode, ...raw } = base
  assert.deepEqual(render({ ...raw, strokes: [{ sourceStroke: 1 }, { sourceStroke: 2 }] }).paths,
    ['M10 90 L90 90', 'M10 90 L10 10'])
})
