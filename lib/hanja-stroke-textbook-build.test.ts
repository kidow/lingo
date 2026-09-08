import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, parseCandidates } from '../scripts/hanja-stroke-audit.ts'
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
      reviewer: 'Synthetic test fixture', reviewMethod: 'video-frame-sequence',
      sourceVideo: { url: new URL('../media/video/0002.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href,
        sha256: 'a'.repeat(64), bytes: 631254 },
      strokeEndsSeconds: Array.from({ length: 11 }, (_, i) => i + 1),
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      pathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex'),
      notes: 'Synthetic build test fixture, not a source observation.' }],
  }
  return { manifest, characters, candidate, paths, ledger }
}

test('출처 위치와 획수가 맞아도 pending 검토를 생성 결과에 포함하지 않는다', () => {
  const { manifest, characters, candidate, ledger } = fixture()
  const { glyph, manifestRow, videoFilename, expectedStrokes, candidateStrokes, status } = ledger.records[0]
  ledger.records = [{ glyph, manifestRow, videoFilename, expectedStrokes, candidateStrokes, status }]
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

test('고정 Ja 후보는 명시된 기록에만 사용하고 실제 출처를 함께 기록한다', () => {
  const { manifest, characters, candidate, ledger, paths } = fixture('matched')
  const japanese = { ...candidate, medians: [...candidate.medians].reverse() }
  const japanesePaths = normalizeMedians(japanese.medians)
  const japaneseLedger = { ...ledger, records: [{ ...ledger.records[0],
    geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256,
    pathsSha256: createHash('sha256').update(JSON.stringify(japanesePaths)).digest('hex') }] }
  const legacy = buildTextbookBundle(manifest, characters, [candidate], ledger)
  assert.deepEqual(buildTextbookBundle(manifest, characters, [candidate], ledger, [japanese]), legacy)
  assert.deepEqual(legacy.characters[0].paths, paths)
  assert.equal(legacy.geometrySources, undefined)

  const queue = inspectTextbookQueue(manifest, characters, [candidate], japaneseLedger, [japanese])
  assert.equal(queue[0].geometrySource, JAPANESE_CANDIDATE_SOURCE.sha256)
  const bundle = buildTextbookBundle(manifest, characters, [candidate], japaneseLedger, [japanese])
  assert.equal(bundle.geometrySource.sha256, CANDIDATE_SOURCE.sha256)
  assert.deepEqual(bundle.geometrySources?.map(({ url, sha256 }) => ({ url, sha256 })),
    [{ url: JAPANESE_CANDIDATE_SOURCE.url, sha256: JAPANESE_CANDIDATE_SOURCE.sha256 }])
  assert.equal(bundle.characters[0].geometrySource, JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.deepEqual(bundle.characters[0].paths, japanesePaths)

  assert.throws(() => buildTextbookBundle(manifest, characters, [candidate],
    { ...japaneseLedger, records: [{ ...japaneseLedger.records[0], geometrySource: CANDIDATE_SOURCE.sha256 }] },
    [japanese]), /geometry provenance mismatch/)
  assert.throws(() => buildTextbookBundle(manifest, characters, [japanese], japaneseLedger,
    [candidate]), /geometry provenance mismatch/)
  assert.throws(() => buildTextbookBundle(manifest, characters, [candidate], japaneseLedger,
    [{ ...japanese, medians: japanese.medians.map((points, index) => index === 0 ? [...points].reverse() : points) }]),
  /geometry provenance mismatch/)
})

test('추가 중국어 기하는 고정 원본과 개별 영상 대조 없이 승인하지 않는다', () => {
  const { manifest, characters, candidate, ledger } = fixture('matched')
  const hanzi = { ...candidate, medians: [...candidate.medians].reverse() }
  const hanziPaths = normalizeMedians(hanzi.medians)
  const hanziLedger = { ...ledger, records: [{ ...ledger.records[0],
    geometrySource: MAKE_ME_A_HANZI_SOURCE.sha256,
    pathsSha256: createHash('sha256').update(JSON.stringify(hanziPaths)).digest('hex') }] }
  assert.throws(() => parseCandidates(Buffer.from(JSON.stringify(hanzi)), MAKE_ME_A_HANZI_SOURCE), /hash changed/)
  assert.throws(() => buildTextbookBundle(manifest, characters, [hanzi], hanziLedger, [hanzi]), /candidate\/catalog mismatch/)
  assert.throws(() => buildTextbookBundle(manifest, characters, [], hanziLedger, [], [candidate]), /geometry provenance mismatch/)
  const bundle = buildTextbookBundle(manifest, characters, [], hanziLedger, [], [hanzi])
  assert.deepEqual(bundle.characters[0].paths, hanziPaths)
  assert.equal(bundle.characters[0].geometrySource, MAKE_ME_A_HANZI_SOURCE.sha256)
  assert.equal(bundle.geometrySources?.[0].url, MAKE_ME_A_HANZI_SOURCE.url)
  assert.match(bundle.geometrySources![0].license, /MAKEMEAHANZI-COPYING/)
  for (const status of ['pending', 'conflict']) {
    assert.deepEqual(buildTextbookBundle(manifest, characters, [],
      { ...hanziLedger, records: [{ ...hanziLedger.records[0], status }] }, [], [hanzi]).characters, [])
  }
  assert.throws(() => buildTextbookBundle(manifest, characters, [],
    { ...hanziLedger, records: [{ ...hanziLedger.records[0], sourceVideo: undefined }] }, [], [hanzi]), /comparison incomplete/)
})

test('다른 corpus로 대체하거나 미등록 출처의 pending·matched 기록을 생성하지 않는다', () => {
  const { manifest, characters, candidate, ledger } = fixture('matched')
  const japaneseLedger = { ...ledger, records: [{ ...ledger.records[0], geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256 }] }
  assert.throws(() => inspectTextbookQueue(manifest, characters, [candidate], japaneseLedger), /candidate\/catalog mismatch/)
  assert.throws(() => inspectTextbookQueue(manifest, characters, [], ledger, [candidate]), /candidate\/catalog mismatch/)
  for (const status of ['pending', 'matched']) {
    assert.throws(() => inspectTextbookQueue(manifest, characters, [candidate],
      { ...ledger, records: [{ ...ledger.records[0], status, geometrySource: 'b'.repeat(64) }] }, [candidate]),
    /Unsupported textbook geometry source/)
  }
  const pending = { ...japaneseLedger, records: [{ ...japaneseLedger.records[0], status: 'pending',
    reviewer: undefined, reviewMethod: undefined, sourceVideo: undefined }] }
  assert.deepEqual(buildTextbookBundle(manifest, characters, [], pending, [candidate]).characters, [])
  assert.throws(() => buildTextbookBundle(manifest, characters, [],
    { ...japaneseLedger, records: [{ ...japaneseLedger.records[0], sourceVideo: undefined }] }, [candidate]),
  /whole-glyph comparison incomplete/)
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
    { reviewedAt: '2026-13-01' }, { notes: '' }, { pathsSha256: undefined },
    { reviewer: undefined }, { reviewMethod: undefined }, { sourceVideo: undefined },
    { sourceVideo: { ...ledger.records[0].sourceVideo!, sha256: 'invalid' } },
    { sourceVideo: { ...ledger.records[0].sourceVideo!,
      url: new URL('../media/video/0003.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href } }]) {
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
    japanese: 1, japaneseCountMatches: 0, makeMeAHanzi: 0, makeMeAHanziCountMatches: 0, either: 1, neither: 0 })
  const additional = analyzeTextbookCoverage(manifest, characters, new Set(), [], [], [candidate])
  assert.equal(additional.geometryCandidates.makeMeAHanzi, 1)
  assert.equal(additional.geometryCandidates.makeMeAHanziCountMatches, 1)
  assert.equal(additional.geometryCandidates.neither, 0)
  assert.equal(additional.entries[0].makeMeAHanziStrokes, 11)
})
