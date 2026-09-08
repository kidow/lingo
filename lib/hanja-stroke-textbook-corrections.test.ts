import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { textbookCorrection, textbookCorrectionSha256, textbookGeometry, type TextbookCorrection } from '../scripts/hanja-stroke-textbook-corrections.ts'

// Synthetic data verifies provenance enforcement, never serves as a glyph's visual evidence.
function fixture() {
  const original = [[[0, 10], [10, 10]], [[5, 20], [5, 0]]]
  const recipe: TextbookCorrection = {
    glyph: '試', id: 'synthetic-split', geometrySource: 'a'.repeat(64),
    sourceVideoSha256: 'b'.repeat(64),
    originalMediansSha256: createHash('sha256').update(JSON.stringify(original)).digest('hex'),
    strokes: [{ sourceStroke: 2 }, { sourceStroke: 1, points: [[0, 10], [4, 10]] },
      { sourceStroke: 1, points: [[6, 10], [10, 10]] }],
    notes: 'Synthetic split and reorder test only.',
  }
  const record = { glyph: '試', geometryCorrection: recipe.id, geometrySource: recipe.geometrySource,
    correctionSha256: textbookCorrectionSha256(recipe),
    expectedStrokes: 3, sourceVideo: { sha256: recipe.sourceVideoSha256 } }
  return { original, recipe, record }
}

test('교과서 보정은 출처 영상과 고정 원본에 묶인 명시적 획 분할·재배열만 적용한다', () => {
  const { original, recipe, record } = fixture()
  const result = textbookGeometry(record, original, [recipe])
  assert.deepEqual(result.sourceStrokeIndices, [2, 1, 1])
  assert.deepEqual(result.paths, normalizeMedians([original[1], [[0, 10], [4, 10]], [[6, 10], [10, 10]]]))
  assert.deepEqual(textbookGeometry({ ...record, geometryCorrection: undefined }, original),
    { paths: normalizeMedians(original), sourceStrokeIndices: undefined })
})

test('검토하지 않은 보정 및 다른 글자·영상·원본 좌표·출처는 거부한다', () => {
  const { original, recipe, record } = fixture()
  for (const change of [{ glyph: '未' }, { geometryCorrection: 'unknown' }, { geometrySource: 'c'.repeat(64) },
    { sourceVideo: { sha256: 'c'.repeat(64) } }, { sourceVideo: undefined }, { expectedStrokes: 2 },
    { correctionSha256: undefined }, { correctionSha256: 'c'.repeat(64) }]) {
    assert.throws(() => textbookGeometry({ ...record, ...change }, original, [recipe]), /evidence mismatch/)
  }
  assert.throws(() => textbookGeometry(record, [[[1, 10], [10, 10]], original[1]], [recipe]), /original geometry changed/)
  assert.throws(() => textbookCorrection(record, [recipe, recipe]), /evidence mismatch/)
  assert.throws(() => textbookCorrection(record, [{ ...recipe, notes: ' ' }]), /evidence mismatch/)
})

test('잘못된 보정 좌표와 원본 획 번호를 거부한다', () => {
  const { original, recipe, record } = fixture()
  for (const bad of [{ sourceStroke: 0 }, { sourceStroke: 3 }, { sourceStroke: 1.5 },
    { sourceStroke: 1, points: [[0, 0]] }, { sourceStroke: 1, points: [[0, 0], [1, NaN]] },
    { sourceStroke: 1, points: [[0, 0, 0], [1, 1]] }]) {
    const invalid = { ...recipe, strokes: [bad, ...recipe.strokes.slice(1)] }
    assert.throws(() => textbookGeometry({ ...record, correctionSha256: textbookCorrectionSha256(invalid) },
      original, [invalid]), /source index invalid|points invalid/)
  }
})

test('출력 좌표가 같아도 원본 획 대응을 바꾸면 재검토 없이 승인되지 않는다', () => {
  const { original, recipe, record } = fixture()
  const changed = { ...recipe, strokes: recipe.strokes.map((stroke, index) =>
    index === 1 ? { ...stroke, sourceStroke: 2 } : stroke) }
  assert.throws(() => textbookGeometry(record, original, [changed]), /evidence mismatch/)
})

test('영상에 대조해 별도로 만든 획은 원본 대응 null과 명시적 좌표를 보존한다', () => {
  const { original, recipe, record } = fixture()
  const added: TextbookCorrection = { ...recipe,
    strokes: [...recipe.strokes, { sourceStroke: null, points: [[8, 18], [10, 16]] }],
    notes: 'Synthetic separately authored stroke with no corresponding upstream stroke.' }
  const review = { ...record, expectedStrokes: 4, correctionSha256: textbookCorrectionSha256(added) }
  const result = textbookGeometry(review, original, [added])
  assert.deepEqual(result.sourceStrokeIndices, [2, 1, 1, null])
  assert.deepEqual(result.paths, normalizeMedians([original[1], [[0, 10], [4, 10]],
    [[6, 10], [10, 10]], [[8, 18], [10, 16]]]))
  assert.throws(() => textbookGeometry({ ...review, sourceVideo: undefined }, original, [added]), /evidence mismatch/)
  assert.throws(() => textbookGeometry({ ...review, correctionSha256: record.correctionSha256 }, original, [added]), /evidence mismatch/)
  const changed = { ...added, strokes: [...recipe.strokes, { sourceStroke: 1, points: [[8, 18], [10, 16]] }] }
  assert.throws(() => textbookGeometry(review, original, [changed]), /evidence mismatch/)
  for (const points of [undefined, [], [[8, 18]], [[8, 18], [10, NaN]]]) {
    const invalid = { ...added, strokes: [...recipe.strokes, { sourceStroke: null, points }] }
    assert.throws(() => textbookGeometry({ ...review, correctionSha256: textbookCorrectionSha256(invalid) },
      original, [invalid]), /points invalid/)
  }
})
