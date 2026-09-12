import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import {
  HANJA_DOCUMENT_SOURCE, HANJA_DOCUMENT_GEOMETRY_SOURCE, HANJA_DOCUMENT_STROKES,
  type HanjaDocumentStrokeData,
} from './hanja-stroke-documents.ts'
import {
  buildDocumentBundle, documentGeometry, documentRecipeSha256, validateDocumentReview,
  DOCUMENT_DIRECTION_SOURCES, type DocumentReviewRecord, type DocumentReviewRegistry,
} from '../scripts/hanja-stroke-documents.ts'
import { hanjaStrokeData } from './hanja-strokes.ts'

// Exact Ja geometry under the existing Arphic notices; no MOE XML coordinates.
// Review statements below are isolated test fixtures, not playback approvals.
const original = [[[218,690],[339,732],[375,707],[303,550]],[[323,565],[379,442],[372,398],[346,390],[247,429]],[[143,735],[192,680],[196,623],[194,225],[170,8]],[[421,631],[473,622],[854,680],[944,666]],[[427,502],[460,474],[488,293]],[[479,491],[598,514],[642,490],[605,362]],[[501,338],[645,347]],[[722,645],[768,604],[770,90],[734,21],[627,91]]]
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))
const matched = { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' }
const candidate = { character: '阿', medians: original }

function fixture(): DocumentReviewRecord {
  const record: DocumentReviewRecord = {
    glyph: '阿', expectedStrokes: 8, candidateStrokes: 8,
    geometrySource: HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256,
    status: 'matched', reviewedAt: '2026-09-13', reviewer: 'test-fixture',
    reviewMethod: 'document-cumulative-and-official-direction',
    sourceDocument: {
      url: HANJA_DOCUMENT_SOURCE.downloadUrl, sha256: HANJA_DOCUMENT_SOURCE.documentSha256,
      bytes: HANJA_DOCUMENT_SOURCE.documentBytes,
      pdfPage: 35, printedPage: 35, glyph: '阿', cumulativePanels: 8,
    },
    directionEvidence: { ...DOCUMENT_DIRECTION_SOURCES.阿 },
    steps: Array.from({ length: 8 }, (_, index) => ({
      stroke: index + 1, panel: index + 1, sourceStroke: index + 1, directionTrack: index + 1,
      ...matched, notes: 'Fixture correspondence for stroke ' + (index + 1),
    })),
    checks: { ...matched },
    geometryRecipe: {
      id: 'test-a-identity', originalMediansSha256: hash(original),
      strokes: original.map((_, index) => ({ sourceStroke: index + 1 })),
      notes: 'Fixture identity recipe over the exact pinned Ja character.',
    },
    recipeSha256: '', pathsSha256: hash(normalizeMedians(original)), notes: 'Fixture only.',
  }
  record.recipeSha256 = documentRecipeSha256(record)
  return record
}
function ledger(record: DocumentReviewRecord): DocumentReviewRegistry {
  return {
    version: 1, sourceId: HANJA_DOCUMENT_SOURCE.id,
    documentSha256: HANJA_DOCUMENT_SOURCE.documentSha256,
    geometrySha256: HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256, records: [record],
  }
}
function review(record: DocumentReviewRecord): HanjaDocumentStrokeData {
  const published = buildDocumentBundle([candidate], ledger(record)).characters[0]
  return { ...published, verificationSource: HANJA_DOCUMENT_SOURCE.id }
}

test('document generation keeps the publisher and geometric source separate', () => {
  const record = fixture()
  const bundle = buildDocumentBundle([candidate], ledger(record))
  assert.equal(bundle.verificationSource.id, 'dongyang-hanja3-note')
  assert.equal(bundle.geometrySource.sha256, HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256)
  assert.deepEqual(bundle.characters[0].paths, normalizeMedians(original))
  assert.equal(validateDocumentReview(review(record), 8, ledger(record)), record)
  assert.equal('sourceVideo' in bundle.characters[0], false)
  assert.equal('sourceImage' in bundle.characters[0], false)
})

test('pending and conflict records never publish despite valid source and path counts', () => {
  for (const status of ['pending', 'conflict']) {
    const record = fixture(), approved = review(record)
    record.status = status
    assert.deepEqual(buildDocumentBundle([candidate], ledger(record)).characters, [])
    assert.throws(() => validateDocumentReview(approved, 8, ledger(record)), /not completed/)
  }
})

test('unknown registry sources, duplicate reviews and malformed statuses fail closed', () => {
  const record = fixture()
  for (const patch of [
    { sourceId: 'eomunhoe-f37' }, { documentSha256: '0'.repeat(64) },
    { geometrySha256: '0'.repeat(64) }, { version: 2 },
    { records: [record, clone(record)] },
    { records: [{ ...record, status: 'approved' }] },
  ]) assert.throws(() => buildDocumentBundle([candidate], { ...ledger(record), ...patch }))
})

test('the exact source URL, PDF hash, bytes, glyph and page are mandatory', () => {
  const base = fixture(), approved = review(base)
  for (const patch of [
    { url: 'https://example.com/book.pdf' }, { sha256: '0'.repeat(64) }, { bytes: 1 },
    { glyph: '何' }, { pdfPage: 36 }, { printedPage: 36 }, { cumulativePanels: 7 },
  ]) {
    const record = clone(base)
    Object.assign(record.sourceDocument, patch)
    assert.throws(() => validateDocumentReview(approved, 8, ledger(record)), /source|direction/)
  }
})

test('direction evidence cannot be omitted, substituted or relabeled as Korean evidence', () => {
  const base = fixture(), approved = review(base)
  for (const patch of [
    { sourceId: HANJA_DOCUMENT_SOURCE.id }, { url: 'https://example.com/direction' },
    { sha256: '0'.repeat(64) }, { bytes: 1 }, { glyph: '兔' }, { strokeCount: 7 },
  ]) {
    const record = clone(base)
    Object.assign(record.directionEvidence, patch)
    assert.throws(() => validateDocumentReview(approved, 8, ledger(record)), /direction/)
  }
  const missing = clone(base)
  delete (missing as Partial<DocumentReviewRecord>).directionEvidence
  assert.throws(() => validateDocumentReview(approved, 8, ledger(missing)), /direction/)
})

test('all eight initial-to-final panels and direction tracks need per-stroke matches', () => {
  const base = fixture(), approved = review(base)
  for (const change of [
    (r: DocumentReviewRecord) => { r.steps = r.steps.slice(1) },
    (r: DocumentReviewRecord) => { r.steps[0].panel = 2 },
    (r: DocumentReviewRecord) => { r.steps[1].directionTrack = 1 },
    (r: DocumentReviewRecord) => { r.steps[3].direction = 'pending' },
    (r: DocumentReviewRecord) => { r.steps[4].boundaries = 'conflict' },
    (r: DocumentReviewRecord) => { r.steps[5].sourceStroke = 1 },
    (r: DocumentReviewRecord) => { r.steps[6].notes = '' },
    (r: DocumentReviewRecord) => { r.checks.glyphForm = 'pending' },
  ]) {
    const record = clone(base)
    change(record)
    assert.throws(() => validateDocumentReview(approved, 8, ledger(record)), /incomplete/)
  }
})

test('a matched label still requires a valid date, reviewer and documented method', () => {
  const base = fixture(), approved = review(base)
  for (const patch of [
    { reviewedAt: '2026-02-30' }, { reviewer: ' ' }, { notes: '' },
    { reviewMethod: 'video-frame-sequence' },
  ]) assert.throws(() => validateDocumentReview(approved, 8, ledger({ ...base, ...patch })), /incomplete/)
})

test('recipe changes need a new hash and preserve a complete one-to-one upstream mapping', () => {
  const base = fixture()
  const changed = clone(base)
  changed.geometryRecipe.strokes[0].points = [[12, 20], [25, 30]]
  assert.throws(() => documentGeometry(changed, original), /recipe hash/)
  for (const sourceStroke of [0, 9, 1.5, 2]) {
    const record = clone(base)
    record.geometryRecipe.strokes[0].sourceStroke = sourceStroke
    record.recipeSha256 = documentRecipeSha256(record)
    assert.throws(() => documentGeometry(record, original), /mapping/)
  }
})

test('explicit display points are bounded and unchanged strokes retain whole-glyph normalization', () => {
  const record = fixture()
  const points = [[12, 20], [25, 30]]
  record.geometryRecipe.strokes[0].points = points
  record.recipeSha256 = documentRecipeSha256(record)
  const geometry = documentGeometry(record, original)
  assert.equal(geometry.paths[0], 'M12 20 L25 30')
  assert.deepEqual(geometry.paths.slice(1), normalizeMedians(original).slice(1))
  record.pathsSha256 = hash(geometry.paths)
  assert.deepEqual(buildDocumentBundle([candidate], ledger(record)).characters[0].paths, geometry.paths)
  for (const invalid of [[[101, 20], [25, 30]], [[12, 20]], [[12, Number.NaN], [25, 30]]]) {
    record.geometryRecipe.strokes[0].points = invalid
    record.recipeSha256 = documentRecipeSha256(record)
    assert.throws(() => documentGeometry(record, original), /points/)
  }
})

test('both changed raw medians and a coordinated fake original hash are rejected', () => {
  const record = fixture(), changed = clone(original)
  changed[0][0][0] += 1
  assert.throws(() => documentGeometry(record, changed), /original medians/)
  record.geometryRecipe.originalMediansSha256 = hash(changed)
  record.recipeSha256 = documentRecipeSha256(record)
  assert.throws(() => documentGeometry(record, changed), /original medians/)
})

test('runtime output, source references and forbidden evidence fields are checked', () => {
  const record = fixture(), base = review(record)
  const changed = clone(base)
  changed.paths = ['M0 0 L1 1', ...changed.paths.slice(1)]
  assert.throws(() => validateDocumentReview(changed, 8, ledger(record)), /path hash/)
  changed.pathsSha256 = hash(changed.paths)
  assert.throws(() => validateDocumentReview(changed, 8, ledger(record)), /path hash/)
  for (const patch of [
    { sourceImage: 'BIN0001.gif' }, { sourceRow: 1 }, { sourceWholeImage: true },
    { geometryAuthored: 'borrowed' }, { strokeOrder: [1, 2, 3, 4, 5, 6, 7, 8] },
  ]) assert.throws(() => validateDocumentReview({ ...base, ...patch } as unknown as HanjaDocumentStrokeData, 8, ledger(record)))
  const wrongReference = clone(base)
  wrongReference.sourceReference.directionEvidenceSha256 = '0'.repeat(64)
  assert.throws(() => validateDocumentReview(wrongReference, 8, ledger(record)), /provenance/)
})

test('changing runtime and ledger path hashes together cannot bypass actual generation', () => {
  const record = fixture()
  record.pathsSha256 = hash(['M0 0 L1 1', ...normalizeMedians(original).slice(1)])
  assert.throws(() => buildDocumentBundle([candidate], ledger(record)), /path hash/)
})

test('missing, duplicate and wrong-count candidate input cannot generate a matched record', () => {
  const record = fixture()
  assert.throws(() => buildDocumentBundle([], ledger(record)), /candidate missing/)
  assert.throws(() => buildDocumentBundle([candidate, candidate], ledger(record)), /Duplicate/)
  assert.throws(() => buildDocumentBundle([{ ...candidate, strokes: ['only-one'] }], ledger(record)), /count mismatch/)
  assert.throws(() => buildDocumentBundle([{ ...candidate, medians: original.slice(1) }], ledger(record)), /original medians/)
})

test('a malformed path is rejected even if its runtime and ledger hashes agree', () => {
  const record = fixture(), entry = review(record)
  entry.paths = ['M0 0 Z', ...entry.paths.slice(1)]
  record.pathsSha256 = entry.pathsSha256 = hash(entry.paths)
  assert.throws(() => validateDocumentReview(entry, 8, ledger(record)), /Malformed|stroke/)
})

test('published document data reproduces exactly from the reviewed recipe and pinned original', () => {
  const published = buildDocumentBundle([candidate]).characters
  assert.deepEqual(HANJA_DOCUMENT_STROKES, published.map((entry) => ({
    ...entry, verificationSource: HANJA_DOCUMENT_SOURCE.id,
  })))
  for (const entry of HANJA_DOCUMENT_STROKES) validateDocumentReview(entry, 8)
})

test('only reviewed 阿 plays; held 兔 and a changed 阿 stroke count remain unavailable', () => {
  const entry = hanjaStrokeData({ glyph: '阿', strokes: 8 })
  assert.ok(entry)
  assert.equal(entry.verificationSource, 'dongyang-hanja3-note')
  assert.equal(entry.paths.length, 8)
  assert.equal(hanjaStrokeData({ glyph: '阿', strokes: 7 }), null)
  assert.equal(hanjaStrokeData({ glyph: '兔', strokes: 8 }), null)
})
