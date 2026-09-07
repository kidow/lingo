import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData, type HanjaTextbookStrokeData } from './hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE, HANJA_TEXTBOOK_STROKES } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { auditStrokes, CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview, type TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'

// Synthetic geometry and a synthetic completed ledger exercise the validator only.
// They are never included in the production registry or used as visual evidence.
function fixture() {
  const candidate = { character: '假', strokes: Array(11).fill('M0 0 L1 1'),
    medians: Array.from({ length: 11 }, (_, i) => [[i, 0], [i + 1, 20]]) }
  const paths = normalizeMedians(candidate.medians)
  const pathsSha256 = createHash('sha256').update(JSON.stringify(paths)).digest('hex')
  const review: HanjaTextbookStrokeData = {
    glyph: '假', verificationSource: 'vivasam-high-2022', verifiedAt: '2026-09-07',
    geometrySource: CANDIDATE_SOURCE.sha256, paths, pathsSha256,
    sourceReference: { manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256,
      manifestRow: '0002', glyph: '假', videoFilename: '0002 거짓 가.mp4' },
  }
  const ledger: TextbookReviewRegistry = {
    sourceId: HANJA_TEXTBOOK_SOURCE.id, manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256,
    geometrySha256: CANDIDATE_SOURCE.sha256,
    records: [{ glyph: '假', manifestRow: '0002', videoFilename: '0002 거짓 가.mp4',
      expectedStrokes: 11, candidateStrokes: 11, status: 'matched', reviewedAt: review.verifiedAt,
      strokeEndsSeconds: Array.from({ length: 11 }, (_, i) => i + 1), durationSeconds: 12,
      pathsSha256, checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: 'Synthetic validator fixture, not a source observation.' }],
  }
  return { candidate, review, ledger }
}

test('교과서 발견 목록과 완료된 검토 등록부를 분리한다', () => {
  assert.equal(TEXTBOOK_REVIEW_REGISTRY.records.length, 20)
  assert.equal(new Set(TEXTBOOK_REVIEW_REGISTRY.records.map((record) => record.glyph)).size, 20)
  const completed = TEXTBOOK_REVIEW_REGISTRY.records.filter((record) => record.status === 'matched')
  assert.deepEqual(HANJA_TEXTBOOK_STROKES.map((entry) => entry.glyph).sort(), completed.map((entry) => entry.glyph).sort())
  for (const record of TEXTBOOK_REVIEW_REGISTRY.records.filter((entry) => entry.status !== 'matched')) {
    assert.equal(hanjaStrokeData({ glyph: record.glyph, strokes: record.expectedStrokes }), null)
  }
  const { candidate, review } = fixture()
  const result = auditStrokes([{ glyph: '假', strokes: 11, readingGrade: '4급II' }], [candidate], [])
  assert.equal(result.entries[0].playback, 'unavailable')
  if (!completed.some((record) => record.glyph === '假')) {
    assert.throws(() => auditStrokes([{ glyph: '假', strokes: 11, readingGrade: '4급II' }], [candidate], [review]), /not completed/)
  }
  assert.equal(HANJA_STROKES.length, 503 + completed.length)
})

test('교과서 검토는 모든 획의 관찰 시점과 순서·방향·분할·자형 대조를 요구한다', () => {
  const { review, ledger } = fixture()
  assert.equal(validateTextbookReview(review, 11, ledger), ledger.records[0])
  for (const change of [
    { status: 'pending' }, { reviewedAt: undefined }, { strokeEndsSeconds: [1, 2] },
    { strokeEndsSeconds: Array(11).fill(1) }, { durationSeconds: 5 },
    { checks: { order: 'match', direction: 'unreviewed', boundaries: 'match', glyphForm: 'match' } },
    { notes: '' }, { candidateStrokes: 10 },
  ]) {
    assert.throws(() => validateTextbookReview(review, 11, { ...ledger, records: [{ ...ledger.records[0], ...change }] }))
  }
  assert.throws(() => validateTextbookReview(review, 12, ledger), /incomplete/)
  assert.throws(() => validateTextbookReview(review, 11, { ...ledger, records: [...ledger.records, ...ledger.records] }), /not completed/)
})

test('교과서 원문 문자·행·영상·해시와 한국어문회 출처 혼합을 거부한다', () => {
  const { review, ledger } = fixture()
  for (const change of [{ glyph: '暇' }, { manifestRow: '0003' }, { videoFilename: '0003 값 가.mp4' }, { manifestSha256: 'changed' }]) {
    assert.throws(() => validateTextbookReview({ ...review, sourceReference: { ...review.sourceReference, ...change } }, 11, ledger), /evidence mismatch/)
  }
  const mixed = { ...review, sourceImage: 'BIN0001.gif', sourceRow: 1 } as unknown as HanjaTextbookStrokeData
  assert.throws(() => validateTextbookReview(mixed, 11, ledger), /evidence mismatch/)
  assert.throws(() => validateTextbookReview(review, 11, { ...ledger, manifestSha256: 'changed' }), /evidence mismatch/)
  assert.throws(() => auditStrokes([{ glyph: '假', strokes: 11, readingGrade: '4급II' }], [], [
    { glyph: '假', paths: review.paths, sourceImage: 'BIN0001.gif', sourceRow: 1 },
  ]), /source\/glyph mismatch/)
})

test('교과서 경로와 해시를 바꾸거나 검토하지 않은 보정을 추가하면 거부한다', () => {
  const { review, ledger } = fixture()
  const changedPaths = [...review.paths].reverse()
  for (const change of [
    { geometrySource: 'changed' }, { paths: changedPaths },
    { paths: changedPaths, pathsSha256: createHash('sha256').update(JSON.stringify(changedPaths)).digest('hex') },
    { strokeOrder: Array.from({ length: 11 }, (_, i) => i + 1) },
    { geometryCorrection: 'unreviewed-split' }, { sourceStrokeIndices: [1, 2] },
  ]) {
    assert.throws(() => validateTextbookReview({ ...review, ...change }, 11, ledger), /geometry provenance mismatch/)
  }
})

test('실제 교과서 등록부의 출처·관찰 기록과 공개 데이터 메타데이터를 검증한다', () => {
  const bundle = JSON.parse(readFileSync(new URL('../public/hanja-strokes/textbook-reviewed.json', import.meta.url), 'utf8'))
  assert.equal(bundle.verificationSource.id, HANJA_TEXTBOOK_SOURCE.id)
  assert.equal(bundle.verificationSource.manifestSha256, HANJA_TEXTBOOK_SOURCE.manifestSha256)
  assert.equal(bundle.geometrySource.sha256, CANDIDATE_SOURCE.sha256)
  for (const review of HANJA_TEXTBOOK_STROKES) validateTextbookReview(review, review.paths.length)
  const warning = TEXTBOOK_REVIEW_REGISTRY.records.find((record) => record.glyph === '警')!
  assert.equal(warning.expectedStrokes, 20)
  assert.equal(warning.candidateStrokes, 19)
  assert.equal(hanjaStrokeData({ glyph: '警', strokes: 20 }), null)
})
