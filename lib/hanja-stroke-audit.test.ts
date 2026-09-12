import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { auditStrokes, parseCandidates, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { HANJA_STROKES, type HanjaTextbookStrokeData } from './hanja-strokes.ts'
import { validateTextbookReview } from '../scripts/hanja-stroke-textbook.ts'
import { textbookAuthored } from '../scripts/hanja-stroke-textbook-authored.ts'

const character = { glyph: '山', strokes: 3, readingGrade: '8' }
const candidate = { character: '山', strokes: ['M0 0 L1 1', 'M1 1 L2 2', 'M2 2 L3 3'],
  medians: [[[0, 0], [1, 1]], [[1, 1], [2, 2]], [[2, 2], [3, 3]]] }

test('후보의 획수와 좌표가 맞아도 공식 검토 없이 재생을 허용하지 않는다', () => {
  const report = auditStrokes([character], [candidate], [])
  assert.equal(report.entries[0].candidateStatus, 'needs-official-review')
  assert.equal(report.entries[0].playback, 'unavailable')
  assert.equal(report.entries[0].evidence, null)
})

test('후보 누락, 획수 불일치, 잘못된 좌표, 유사 문자를 구분한다', () => {
  assert.equal(auditStrokes([character], [], []).entries[0].candidateStatus, 'missing')
  assert.equal(auditStrokes([{ ...character, strokes: 4 }], [candidate], []).entries[0].candidateStatus, 'count-mismatch')
  assert.equal(auditStrokes([character], [{ ...candidate, medians: [[[NaN, 0]]] }], []).entries[0].candidateStatus, 'invalid')
  assert.equal(auditStrokes([{ ...character, glyph: '⼭' }], [candidate], []).entries[0].candidateStatus, 'missing')
  assert.throws(() => auditStrokes([character], [candidate, candidate], []), /duplicate/)
  assert.throws(() => parseCandidates(new TextEncoder().encode('{}')), /hash changed/)
})

test('검증된 자체 경로와 후보의 검토 상태를 별도로 유지한다', () => {
  const verified = { glyph: '山', paths: ['a', 'b', 'c'], sourceImage: 'BIN0016.gif', sourceRow: 18 }
  const entry = auditStrokes([character], [candidate], [verified]).entries[0]
  assert.equal(entry.playback, 'verified')
  assert.equal(entry.candidateStatus, 'needs-official-review')
  assert.deepEqual(entry.evidence, { image: 'BIN0016.gif', row: 18 })
  assert.throws(() => auditStrokes([{ ...character, strokes: 4 }], [candidate], [verified]), /mismatch/)
})

test('공식 대조한 후보도 출처 해시와 획 좌표가 달라지면 거부한다', () => {
  const review = { glyph: '山', paths: normalizeMedians(candidate.medians), sourceImage: 'BIN0016.gif', sourceRow: 18,
    geometrySource: CANDIDATE_SOURCE.sha256 }
  const entry = auditStrokes([character], [candidate], [review]).entries[0]
  assert.equal(entry.candidateStatus, 'verified')
  assert.equal(entry.playback, 'verified')
  assert.throws(() => auditStrokes([character], [candidate], [{ ...review, geometrySource: 'changed' }]), /geometry mismatch/)
  assert.throws(() => auditStrokes([character], [candidate], [{ ...review, paths: ['M0 0', ...review.paths.slice(1)] }]), /geometry mismatch/)
  assert.throws(() => auditStrokes([character], [], [review]), /geometry mismatch/)
})

test('性 보정은 고정된 원본과 공식 위치에서 2·3획만 교환한다', () => {
  const source = { character: '性', strokes: Array(8).fill('M0 0 L1 1'),
    medians: Array.from({ length: 8 }, (_, i) => [[i, 0], [i + 1, 10]]) }
  const strokeOrder = [1, 3, 2, 4, 5, 6, 7, 8]
  const review = { glyph: '性', sourceImage: 'BIN002A.gif', sourceRow: 21,
    geometrySource: CANDIDATE_SOURCE.sha256, strokeOrder,
    paths: normalizeMedians(strokeOrder.map((i) => source.medians[i - 1])) }
  const entry = { glyph: '性', strokes: 8, readingGrade: '5-II' }
  assert.equal(auditStrokes([entry], [source], [review]).entries[0].playback, 'verified')
  for (const order of [undefined, [1, 2, 3, 4, 5, 6, 7, 8], [1, 3, 3, 4, 5, 6, 7, 8], [1, 9]]) {
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, strokeOrder: order }]), /order mismatch/)
  }
  assert.throws(() => auditStrokes([entry], [source], [{ ...review, sourceRow: 20 }]), /order mismatch/)
  assert.throws(() => auditStrokes([entry], [source], [{ ...review, paths: normalizeMedians(source.medians) }]), /geometry mismatch/)
  assert.throws(() => auditStrokes([entry], [source], [{ ...review, geometrySource: undefined }]), /Missing correction source/)
})

test('별도 공식 도해는 일본어 원본과 정확한 전체 이미지 근거를 요구한다', () => {
  const source = { ...candidate, character: '回' }
  const entry = { ...character, glyph: '回' }
  const review = { glyph: '回', sourceImage: 'BIN0036.bmp', sourceWholeImage: true,
    geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256, paths: normalizeMedians(source.medians) }
  const report = auditStrokes([entry], [], [review], [source])
  assert.equal(report.entries[0].playback, 'verified')
  assert.equal(report.entries[0].candidateStatus, 'missing', 'Korean inventory remains separate')
  assert.deepEqual(report.entries[0].evidence, { image: 'BIN0036.bmp', wholeImage: true })
  assert.equal(auditStrokes([entry], [], [], [source]).entries[0].playback, 'unavailable')
  assert.throws(() => auditStrokes([entry], [source], [review]), /geometry mismatch/)
  assert.throws(() => auditStrokes([entry], [], [{ ...review, sourceRow: 1 }], [source]), /source\/count mismatch/)
  assert.throws(() => auditStrokes([entry], [], [{ ...review, sourceImage: 'BIN0038.bmp' }], [source]), /source\/count mismatch/)
  assert.throws(() => auditStrokes([entry], [], [{ ...review, strokeOrder: [2, 1, 3] }], [source]), /order mismatch/)
  assert.throws(() => auditStrokes([entry], [], [{ ...review, paths: ['M0 0', ...review.paths.slice(1)] }], [source]), /geometry mismatch/)
  assert.throws(() => parseCandidates(new TextEncoder().encode('{}'), JAPANESE_CANDIDATE_SOURCE), /hash changed/)
})

test('者·都의 점은 고정한 5획에만 삽입하고 원본의 나머지 획을 보존한다', () => {
  for (const [glyph, sourceImage, sourceRow, count, dot] of [
    ['者', 'BIN0001.gif', 10, 8, 'M60 46 L63 49'],
    ['都', 'BIN0004.gif', 11, 11, 'M49 41 L52 44'],
  ] as const) {
    const source = { character: glyph, strokes: Array(count).fill('M0 0 L1 1'),
      medians: Array.from({ length: count }, (_, i) => [[i, 0], [i + 1, 10]]) }
    const original = normalizeMedians(source.medians)
    const paths = [...original.slice(0, 4), dot, ...original.slice(4)]
    const review = { glyph, sourceImage, sourceRow, geometrySource: CANDIDATE_SOURCE.sha256,
      geometryCorrection: 'official-dot-v1', sourceStrokeIndices: [1, 2, 3, 4, null, ...original.slice(4).map((_, i) => i + 5)],
      pathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex'), paths }
    const entry = { glyph, strokes: count + 1, readingGrade: '5' }
    const result = auditStrokes([entry], [source], [review]).entries[0]
    assert.equal(result.playback, 'verified')
    assert.equal(result.candidateStatus, 'count-mismatch', 'original candidate still lacks the dot')
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, geometryCorrection: undefined }]), /correction mismatch/)
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, sourceRow: sourceRow + 1 }]), /correction mismatch/)
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, sourceStrokeIndices: [] }]), /provenance mismatch/)
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, pathsSha256: 'changed' }]), /provenance mismatch/)
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, geometrySource: undefined }]), /Missing correction source/)
    const altered = [...paths.slice(0, 4), 'M1 1 L2 2', ...paths.slice(5)]
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, paths: altered,
      pathsSha256: createHash('sha256').update(JSON.stringify(altered)).digest('hex') }]), /provenance mismatch/)
    assert.throws(() => auditStrokes([entry], [source], [{ ...review, paths: [...paths].reverse() }]), /geometry mismatch/)
    assert.throws(() => auditStrokes([{ ...entry, glyph: '未' }], [{ ...source, character: '未' }], [{ ...review, glyph: '未' }]), /correction mismatch/)
  }
})

test('중심선 변환은 획 순서와 연결을 유지하고 좌표만 맞춘다', () => {
  assert.deepEqual(normalizeMedians([[[0, 100], [100, 0]], [[50, 100], [50, 0]]]),
    ['M10 10 L90 90', 'M50 10 L50 90'])
  assert.throws(() => normalizeMedians([[[0, 0]]]), /Invalid/)
  assert.throws(() => normalizeMedians([[[0, 0], [0, 0]]]), /Empty/)
})

test('槪 등 승인된 직접 작성 기하는 외부 후보 없이 실제 작성 등록부에서 재현한다', () => {
  const authored = HANJA_STROKES.filter((entry): entry is HanjaTextbookStrokeData =>
    entry.verificationSource === 'vivasam-high-2022' && entry.geometryAuthored !== undefined)
  assert.ok(authored.some(entry => entry.glyph === '槪'))
  for (const entry of authored) {
    const record = validateTextbookReview(entry, entry.paths.length)
    assert.deepEqual(textbookAuthored(record)!.paths, entry.paths)
  }
  const catalog = authored.map(entry => ({ glyph: entry.glyph, strokes: entry.paths.length, readingGrade: '3급II' }))
  const report = auditStrokes(catalog, [], authored)
  assert.equal(report.entries.length, authored.length)
  assert.ok(report.entries.every(entry => entry.playback === 'textbook-reviewed'))
  assert.ok(report.entries.every(entry => entry.candidateStatus === 'missing'))
  assert.equal(report.verificationSources.textbook, authored.length)
})

test('직접 작성 ID·기하 해시·출력·원본 대응을 변조해도 외부 후보로 우회하지 않는다', () => {
  const entry = HANJA_STROKES.find((review): review is HanjaTextbookStrokeData =>
    review.glyph === '槪' && review.verificationSource === 'vivasam-high-2022')!
  assert.ok(entry?.geometryAuthored)
  const catalog = [{ glyph: entry.glyph, strokes: entry.paths.length, readingGrade: '3급II' }]
  const fake = { character: entry.glyph, strokes: Array(entry.paths.length).fill('M0 0 L1 1'),
    medians: Array.from({ length: entry.paths.length }, (_, index) => [[index, 0], [index + 1, 10]]) }
  const altered = ['M0 0 L1 1', ...entry.paths.slice(1)]
  const tampered: HanjaTextbookStrokeData[] = [
    { ...entry, geometryAuthored: 'unreviewed-authored-entry' },
    { ...entry, geometryAuthored: undefined },
    { ...entry, geometrySource: CANDIDATE_SOURCE.sha256 },
    { ...entry, geometrySource: '0'.repeat(64) },
    { ...entry, sourceStrokeIndices: entry.paths.map((_, index) => index + 1) },
    { ...entry, paths: altered, pathsSha256: createHash('sha256').update(JSON.stringify(altered)).digest('hex') },
  ]
  for (const review of tampered) {
    assert.throws(() => auditStrokes(catalog, [fake], [review], [fake], [fake]), /provenance mismatch/)
  }
  assert.throws(() => auditStrokes([{ ...catalog[0], glyph: '概' }], [], [{ ...entry, glyph: '概' }]))
})
