import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_STROKES, type HanjaTextbookStrokeData } from './hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import {
  TEXTBOOK_AUTHORED, textbookAuthored, textbookAuthoredSha256, validateTextbookAuthored,
  type TextbookAuthored,
} from '../scripts/hanja-stroke-textbook-authored.ts'
import { buildTextbookBundle, inspectTextbookQueue, type TextbookManifest } from '../scripts/hanja-stroke-textbook-build.ts'
import { textbookGeometrySource, validateTextbookReview, type TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'

const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const koSha = '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e'

function authoredEntry(glyph: string) {
  const entries = TEXTBOOK_AUTHORED.filter(entry => entry.glyph === glyph)
  assert.equal(entries.length, 1, `Expected one authored fixture for ${glyph}`)
  return entries[0]!
}

// Synthetic ledger evidence is used only in this test process, never the app's approval ledger.
function fixture(status = 'matched', glyph = '硏') {
  const entry = structuredClone(authoredEntry(glyph))
  const source = { glyph: entry.glyph, manifestRow: '0001', videoFilename: '0001 합성 테스트.mp4' }
  const manifest: TextbookManifest = { source: { id: HANJA_TEXTBOOK_SOURCE.id,
    sha256: HANJA_TEXTBOOK_SOURCE.manifestSha256, url: 'https://example.invalid/test.xlsx' }, entries: [source] }
  const characters = [{ glyph: entry.glyph, strokes: entry.paths.length, readingGrade: '4급II' }]
  const ledger: TextbookReviewRegistry = { sourceId: HANJA_TEXTBOOK_SOURCE.id,
    manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256, geometrySha256: koSha,
    records: [{ ...source, status, expectedStrokes: entry.paths.length, candidateStrokes: entry.paths.length,
      geometryAuthored: entry.id, geometrySource: textbookAuthoredSha256(entry),
      reviewedAt: '2026-09-09', reviewer: 'Synthetic unit fixture only', reviewMethod: 'video-frame-sequence',
      sourceVideo: { url: new URL('../media/video/0001.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href,
        sha256: entry.sourceVideoSha256, bytes: 100 },
      durationSeconds: entry.paths.length + 1, strokeEndsSeconds: entry.paths.map((_, i) => i + 1),
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: 'Synthetic ledger, not an observation or approval.', pathsSha256: entry.pathsSha256 }],
  }
  const context = { entries: [entry], donors: HANJA_STROKES }
  const build = () => buildTextbookBundle(manifest, characters, [], ledger, [], [], context)
  return { entry, manifest, characters, ledger, context, build }
}

test('local authored entries reproduce approved final donor paths and complete assignments', () => {
  assert.deepEqual(['硏', '鄕'].map(glyph => [glyph, authoredEntry(glyph).paths.length]), [['硏', 11], ['鄕', 13]])
  for (const entry of TEXTBOOK_AUTHORED) assert.equal(validateTextbookAuthored(entry), entry)
  const town = authoredEntry('鄕').borrowedParts.find(part => part.glyph === '都')!
  assert.deepEqual(town.approvedPathIndices, [10, 11, 12])
  assert.deepEqual(town.upstreamIndices, [9, 10, 11])
})

test('canonical entry hash ignores object key order but binds geometry and provenance', () => {
  const entry = authoredEntry('硏')
  const reversed = Object.fromEntries(Object.entries(entry).reverse()) as TextbookAuthored
  assert.equal(textbookAuthoredSha256(reversed), textbookAuthoredSha256(entry))
  assert.notEqual(textbookAuthoredSha256({ ...entry, notes: [...entry.notes, 'Changed observation'] }), textbookAuthoredSha256(entry))
  assert.notEqual(textbookAuthoredSha256({ ...entry, sourceVideoSha256: 'a'.repeat(64) }), textbookAuthoredSha256(entry))
  assert.notEqual(textbookAuthoredSha256(entry), entry.pathsSha256)
  assert.notEqual(textbookAuthoredSha256(entry), entry.sourceVideoSha256)
})

test('missing, duplicate, changed, or self donors cannot enter authored geometry', () => {
  const entry = authoredEntry('硏')
  const donor = HANJA_STROKES.find(item => item.glyph === entry.borrowedParts[0].glyph)!
  assert.throws(() => validateTextbookAuthored(entry, []), /donor provenance/)
  assert.throws(() => validateTextbookAuthored(entry, [donor, donor]), /donor provenance/)
  assert.throws(() => validateTextbookAuthored(entry, [{ ...donor, paths: ['M1 1 L2 2'] }]), /donor provenance/)
  assert.throws(() => validateTextbookAuthored({ ...entry, glyph: donor.glyph }, [donor]), /donor provenance/)
})

test('donor reference, verification date, source SHA, and upstream indices must match exactly', () => {
  const entry = authoredEntry('硏'), part = entry.borrowedParts[0]
  for (const changed of [
    { ...part, geometrySource: koSha }, { ...part, verifiedAt: '2020-01-01' },
    { ...part, sourceReference: { ...part.sourceReference!, manifestRow: '0000' } },
    { ...part, donorVerificationSource: 'eomunhoe-f37' as const },
    { ...part, upstreamIndices: [5, 4, 3, 2, 1] },
  ]) assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts: [changed] }), /donor (provenance|upstream)/)
})

test('final donor indices cannot be replaced by original corpus indices', () => {
  const entry = authoredEntry('鄕')
  const borrowedParts = entry.borrowedParts.map(part => part.glyph === '都'
    ? { ...part, approvedPathIndices: [9, 10, 11] } : part)
  assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts }), /upstream mapping/)
})

test('target and donor indices reject duplicates, out-of-range values, overlaps, and gaps', () => {
  const entry = authoredEntry('硏'), part = entry.borrowedParts[0]
  for (const approvedPathIndices of [[0, 2, 3, 4, 5], [1, 1, 3, 4, 5], [1, 2, 3, 4, 100]]) {
    assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts: [{ ...part, approvedPathIndices }] }), /indices invalid/)
  }
  assert.throws(() => validateTextbookAuthored({ ...entry, authoredPathIndices: [5, ...entry.authoredPathIndices] }), /target assignment/)
  assert.throws(() => validateTextbookAuthored({ ...entry, authoredPathIndices: entry.authoredPathIndices.slice(1) }), /unassigned/)
  assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts: [{ ...part, targetPathIndices: [1, 2] }] }), /mapping incomplete/)
  assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts: [{ ...part, targetPathIndices: [1, 2, 3, 4, 12] }] }), /indices invalid/)
})

test('borrowed paths must reproduce the pinned affine transform without extra edits', () => {
  const entry = authoredEntry('硏'), part = entry.borrowedParts[0]
  for (const changed of [
    { ...part, sourceBox: { ...part.sourceBox, x: part.sourceBox.x + 1 } },
    { ...part, targetBox: { ...part.targetBox, width: part.targetBox.width + 1 } },
    { ...part, transform: { ...part.transform, tx: part.transform.tx + 1 } },
    { ...part, paths: ['M1 1 L2 2', ...part.paths.slice(1)] },
  ]) assert.throws(() => validateTextbookAuthored({ ...entry, borrowedParts: [changed] }), /affine mismatch/)
})

test('output hash and individual open stroke geometry are validated', () => {
  const entry = authoredEntry('硏')
  assert.throws(() => validateTextbookAuthored({ ...entry, pathsSha256: 'a'.repeat(64) }), /geometry invalid/)
  for (const invalid of ['M1 1 M2 2 L3 3', 'M1 1 L1 1', 'M1 1 LNaN 2']) {
    const paths = [...entry.paths.slice(0, -1), invalid]
    assert.throws(() => validateTextbookAuthored({ ...entry, paths, pathsSha256: hash(paths) }))
  }
})

test('entry id, whole-glyph count, video SHA, and canonical source SHA are mandatory pins', () => {
  const { ledger, context } = fixture(), record = ledger.records[0]
  for (const changed of [
    { ...record, geometryAuthored: 'unknown' }, { ...record, geometrySource: koSha },
    { ...record, expectedStrokes: 10 }, { ...record, sourceVideo: { ...record.sourceVideo!, sha256: 'a'.repeat(64) } },
  ]) assert.throws(() => textbookAuthored(changed, context), /authored evidence/)
  assert.throws(() => textbookGeometrySource({ geometrySource: record.geometrySource }), /Unsupported/)
  assert.throws(() => textbookAuthored(record, { ...context, entries: [...context.entries, ...context.entries] }), /authored evidence/)
})

test('correction and local authored provenance cannot be mixed', () => {
  const { ledger, context } = fixture(), record = ledger.records[0]
  assert.throws(() => textbookAuthored({ ...record, geometryCorrection: 'fake' }, context), /cannot be mixed/)
  assert.throws(() => textbookAuthored({ ...record, correctionSha256: 'a'.repeat(64) }, context), /cannot be mixed/)
})

test('a structurally valid pending or conflicted combination never becomes approved', () => {
  for (const status of ['pending', 'conflict']) {
    const { ledger, manifest, characters, context, build } = fixture(status)
    const before = JSON.stringify(ledger)
    assert.equal(inspectTextbookQueue(manifest, characters, [], ledger, [], [], context)[0].countsMatch, true)
    assert.deepEqual(build().characters, [])
    assert.equal(JSON.stringify(ledger), before)
  }
})

test('a matched label alone cannot bypass whole-video observations', () => {
  const { ledger, build } = fixture()
  ledger.records = [{ ...ledger.records[0], checks: undefined }]
  assert.throws(build, /whole-glyph comparison incomplete/)
})

test('approved authored bundle identifies local origin and preserves donor licenses', () => {
  const { entry, build, ledger, context } = fixture()
  const bundle = build(), published = bundle.characters[0]
  assert.equal(published.geometrySource, textbookAuthoredSha256(entry))
  assert.equal(published.geometryAuthored, entry.id)
  assert.equal(published.geometryCorrection, undefined)
  assert.deepEqual(published.sourceStrokeIndices, Array(11).fill(null))
  assert.deepEqual(published.paths, entry.paths)
  assert.match(JSON.stringify(bundle.geometrySources), /local-authored/)
  assert.match(JSON.stringify(bundle.geometrySources), /Arphic Public License/)
  const review: HanjaTextbookStrokeData = { ...published, verificationSource: HANJA_TEXTBOOK_SOURCE.id }
  assert.equal(validateTextbookReview(review, 11, ledger, context), ledger.records[0])
  assert.throws(() => validateTextbookReview({ ...review, sourceStrokeIndices: Array(11).fill(1) }, 11, ledger, context), /provenance mismatch/)
  assert.throws(() => validateTextbookReview({ ...review, geometryAuthored: undefined }, 11, ledger, context), /provenance mismatch/)
})

test('all-authored entries validate and publish complete local paths without donors', () => {
  for (const glyph of ['鑛', '鬪']) {
    const { entry, build, ledger, context } = fixture('matched', glyph)
    context.donors = []
    assert.deepEqual(entry.borrowedParts, [])
    assert.deepEqual(entry.authoredPathIndices, entry.paths.map((_, i) => i + 1))
    assert.equal(validateTextbookAuthored(entry, []), entry)
    const bundle = build(), published = bundle.characters[0]
    assert.equal(bundle.characters.length, 1)
    assert.equal(published.geometryAuthored, entry.id)
    assert.equal(published.geometrySource, textbookAuthoredSha256(entry))
    assert.deepEqual(published.paths, entry.paths)
    assert.deepEqual(published.sourceStrokeIndices, Array(entry.paths.length).fill(null))
    assert.match(JSON.stringify(bundle.geometrySources), /local-authored/)
    const review: HanjaTextbookStrokeData = { ...published, verificationSource: HANJA_TEXTBOOK_SOURCE.id }
    assert.equal(validateTextbookReview(review, entry.paths.length, ledger, context), ledger.records[0])
  }
})

test('a substituted output cannot pass by changing both runtime and ledger paths hashes', () => {
  const { build, ledger, context } = fixture()
  const published = build().characters[0]
  const paths = published.paths.map(() => 'M1 1 L2 2'), pathsSha256 = hash(paths)
  ledger.records = [{ ...ledger.records[0], pathsSha256 }]
  assert.throws(() => validateTextbookReview({ ...published, verificationSource: HANJA_TEXTBOOK_SOURCE.id,
    paths, pathsSha256 }, 11, ledger, context), /provenance mismatch/)
})
