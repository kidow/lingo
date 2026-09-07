import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { inspectTextbookQueue, buildTextbookBundle, analyzeTextbookCoverage, type TextbookManifest } from '../scripts/hanja-stroke-textbook-build.ts'
import type { TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'

// A small synthetic parsed-manifest/geometry fixture, never a runtime approval.
function fixture(status: 'pending' | 'matched' = 'pending') {
  const source = { glyph: '假', manifestRow: '0002', videoFilename: '0002 거짓 가.mp4' }
  const manifest: TextbookManifest = {
    source: { id: HANJA_TEXTBOOK_SOURCE.id, sha256: HANJA_TEXTBOOK_SOURCE.manifestSha256,
      url: 'https://example.invalid/synthetic-manifest.xlsx' },
    entries: [source],
  }
  const characters = [{ glyph: '假', strokes: 11, readingGrade: '4급II' }]
  const candidate = { character: '假', strokes: Array(11).fill('M0 0 L1 1'),
    medians: Array.from({ length: 11 }, (_, i) => [[i, 0], [i + 1, 20]]) }
  const paths = normalizeMedians(candidate.medians)
  const ledger: TextbookReviewRegistry = {
    sourceId: HANJA_TEXTBOOK_SOURCE.id, manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256,
    geometrySha256: CANDIDATE_SOURCE.sha256,
    records: [{ ...source, expectedStrokes: 11, candidateStrokes: 11, status,
      reviewedAt: '2026-09-07', durationSeconds: 12,
      strokeEndsSeconds: Array.from({ length: 11 }, (_, i) => i + 1),
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      pathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex'),
      notes: 'Synthetic build test fixture, not a source observation.' }],
  }
  return { manifest, characters, candidate, paths, ledger }
}

test('출처 위치와 획수가 맞아도 pending 검토를 생성 결과에 포함하지 않는다', () => {
  const { manifest, characters, candidate, ledger } = fixture()
  const before = JSON.stringify(ledger)
  const queue = inspectTextbookQueue(manifest, characters, [candidate], ledger)
  assert.equal(queue[0].countsMatch, true)
  assert.equal(queue[0].status, 'pending')
  assert.deepEqual(buildTextbookBundle(manifest, characters, [candidate], ledger).characters, [])
  assert.equal(JSON.stringify(ledger), before, 'the builder must never approve or mutate a record')
})

test('완료된 검토만 고정 원본의 변환 경로와 출처를 재현한다', () => {
  const { manifest, characters, candidate, ledger, paths } = fixture('matched')
  const bundle = buildTextbookBundle(manifest, characters, [candidate], ledger)
  assert.equal(bundle.characters.length, 1)
  assert.equal(bundle.verificationSource.id, HANJA_TEXTBOOK_SOURCE.id)
  assert.equal(bundle.geometrySource.sha256, CANDIDATE_SOURCE.sha256)
  assert.deepEqual(bundle.characters[0].paths, paths)
  assert.equal(bundle.characters[0].sourceReference.manifestRow, '0002')
  assert.equal('sourceImage' in bundle.characters[0], false)
  assert.throws(() => buildTextbookBundle(manifest, characters,
    [{ ...candidate, medians: [...candidate.medians].reverse() }], ledger), /geometry provenance mismatch/)
})

test('검토 대장의 잘못된 원문 행·영상·중복·상태·획수를 생성 전에 거부한다', () => {
  const { manifest, characters, candidate, ledger } = fixture('matched')
  for (const change of [{ manifestRow: '0003' }, { videoFilename: '0003 값 가.mp4' },
    { expectedStrokes: 12 }, { candidateStrokes: 12 }, { status: 'approved-by-count' }]) {
    assert.throws(() => buildTextbookBundle(manifest, characters, [candidate],
      { ...ledger, records: [{ ...ledger.records[0], ...change }] }))
  }
  assert.throws(() => inspectTextbookQueue(manifest, characters, [candidate],
    { ...ledger, records: [...ledger.records, ...ledger.records] }), /Duplicate/)
  assert.throws(() => inspectTextbookQueue({ ...manifest, entries: [...manifest.entries, ...manifest.entries] },
    characters, [candidate], ledger), /Duplicate/)
  assert.throws(() => inspectTextbookQueue({ ...manifest, source: { ...manifest.source, sha256: 'changed' } },
    characters, [candidate], ledger), /source changed/)
  assert.throws(() => inspectTextbookQueue(manifest, characters, [candidate],
    { ...ledger, geometrySha256: 'changed' }), /source changed/)
})

test('미완료 획 관찰과 존재하지 않는 검토 날짜를 생성 단계에서도 거부한다', () => {
  const { manifest, characters, candidate, ledger } = fixture('matched')
  for (const change of [{ strokeEndsSeconds: [] }, { reviewedAt: '2026-02-30' },
    { reviewedAt: '2026-13-01' }, { notes: '' }, { pathsSha256: undefined }]) {
    assert.throws(() => buildTextbookBundle(manifest, characters, [candidate],
      { ...ledger, records: [{ ...ledger.records[0], ...change }] }))
  }
})

test('확장 후보 집계는 기존 승인·문자 정규화·외국어 후보 획수 차이를 구분한다', () => {
  const { manifest, characters, candidate } = fixture()
  const fullManifest: TextbookManifest = { ...manifest, entries: [...manifest.entries,
    { glyph: '山', manifestRow: '0003', videoFilename: '0003 산 산.mp4' },
    { glyph: '更', manifestRow: '0004', videoFilename: '0004 고칠 경.mp4' },
    { glyph: '册', manifestRow: '0005', videoFilename: '0005 책 책.mp4' },
  ] }
  const catalog = [...characters, { glyph: '山', strokes: 3, readingGrade: '8급' },
    { glyph: '更', strokes: 7, readingGrade: '4급' }]
  const result = analyzeTextbookCoverage(fullManifest, catalog, new Set(['山']), [candidate],
    [{ ...candidate, strokes: Array(10).fill('M0 0 L1 1') }])
  assert.equal(result.manifestCharacters, 4)
  assert.equal(result.exactCatalogMatches, 2)
  assert.equal(result.exactAlreadyApproved, 1)
  assert.equal(result.exactNewReviewTargets, 1)
  assert.deepEqual(result.normalizationOnlyNewGlyphs, ['更'])
  assert.deepEqual(result.unmatchedAfterNormalization, ['册'])
  assert.deepEqual(result.geometryCandidates, { korean: 1, koreanCountMatches: 1,
    japanese: 1, japaneseCountMatches: 0, either: 1, neither: 0 })
})
