import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { applyReviewedSplit, SPLIT_CORRECTIONS } from '../scripts/hanja-stroke-splits.ts'
import { auditStrokes, CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import splitData from '../public/hanja-strokes/splits-reviewed.json' with { type: 'json' }

test('초두머리의 좌우 가로·세로를 분리하고 이후 획은 그대로 둔다', () => {
  const body = Array(6).fill('M20 40 L80 60')
  const result = applyReviewedSplit('草', ['M10 20 L90 20', 'M30 10 L30 30', 'M70 10 L70 30', ...body])
  assert.deepEqual(result.paths.slice(0, 4), ['M10 20 L45 20', 'M30 10 L30 30', 'M51 20 L90 20', 'M70 10 L70 30'])
  assert.deepEqual(result.paths.slice(4), body)
  assert.deepEqual(result.mapping, [1, 2, 1, 3, 4, 5, 6, 7, 8, 9])
  assert.throws(() => applyReviewedSplit('警', Array(19).fill('M10 20 L90 20')), /Unreviewed/)
  assert.throws(() => applyReviewedSplit('草', Array(9).fill('M90 20 L10 20')), /horizontal split/)
})

test('成은 시작 두 획을 교환하고 내부 가로와 꺾인 획을 별도로 재생한다', () => {
  const result = applyReviewedSplit('成', ['M20 20 L80 20', 'M20 20 L10 90',
    'M20 50 L30 50 L40 50 L40 70 L35 75 L30 70', 'M50 10 L80 90', 'M70 40 L40 80', 'M70 10 L80 20'])
  assert.deepEqual(result.mapping, [2, 1, 3, 3, 4, 5, 6])
  assert.deepEqual(result.paths.slice(0, 4), ['M20 20 L10 90', 'M20 20 L80 20',
    'M20 50 L30 50 L40 50', 'M40 50 L40 70 L35 75 L30 70'])
})

test('분할 보정은 12자의 고정 근거·변환·획 대응·결과 해시가 모두 맞아야 통과한다', () => {
  assert.equal(Object.keys(SPLIT_CORRECTIONS).length, 12)
  assert.deepEqual(splitData.recipes, SPLIT_CORRECTIONS)
  for (const [glyph, recipe] of Object.entries(SPLIT_CORRECTIONS)) {
    const medians = Array.from({ length: recipe.originalCount }, (_, i) => [[10, i * 2], [90, i * 2]])
    if (glyph === '成') medians[2] = [[20, 50], [30, 50], [40, 50], [40, 30], [35, 25], [30, 30]]
    const candidate = { character: glyph, medians, strokes: Array(recipe.originalCount).fill('M0 0 L1 1') }
    const result = applyReviewedSplit(glyph, normalizeMedians(medians))
    const entry = { glyph, strokes: recipe.originalCount + 1, readingGrade: '5' }
    const review = { glyph, sourceImage: recipe.image, sourceRow: recipe.row, geometrySource: CANDIDATE_SOURCE.sha256,
      geometryCorrection: recipe.id, sourceStrokeIndices: result.mapping, paths: result.paths,
      pathsSha256: createHash('sha256').update(JSON.stringify(result.paths)).digest('hex') }
    const audited = auditStrokes([entry], [candidate], [review]).entries[0]
    assert.equal(audited.playback, 'verified')
    assert.equal(audited.candidateStatus, 'count-mismatch')
    assert.equal(auditStrokes([entry], [candidate], []).entries[0].playback, 'unavailable')
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, sourceRow: 0 }]), /mismatch/)
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, geometryCorrection: 'unknown' }]), /correction mismatch/)
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, sourceStrokeIndices: [] }]), /provenance mismatch/)
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, pathsSha256: 'changed' }]), /provenance mismatch/)
    const reversed = [...result.paths].reverse()
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, paths: reversed,
      pathsSha256: createHash('sha256').update(JSON.stringify(reversed)).digest('hex') }]), /provenance mismatch/)
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, paths: ['M0 0 L1 1', ...result.paths.slice(1)] }]), /geometry mismatch/)
    assert.throws(() => auditStrokes([entry], [candidate], [{ ...review, geometrySource: undefined }]), /Missing correction source/)
  }
})
