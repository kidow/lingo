import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { buildTextbookBundle, inspectTextbookQueue, type TextbookManifest } from '../scripts/hanja-stroke-textbook-build.ts'
import { textbookSourceGlyph, validateTextbookReview, type TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'

// Synthetic data tests spelling provenance only; it is never evidence of real stroke order.
function fixture() {
  const candidate = { character: '兩', strokes: Array<string>(8).fill('M0 0 L1 1'),
    medians: Array.from({ length: 8 }, (_, i) => [[i, 0], [i + 1, 20]]) }
  const paths = normalizeMedians(candidate.medians)
  const manifest: TextbookManifest = { source: { id: HANJA_TEXTBOOK_SOURCE.id,
    sha256: HANJA_TEXTBOOK_SOURCE.manifestSha256, url: HANJA_TEXTBOOK_SOURCE.manifestUrl },
    entries: [{ glyph: '兩', manifestRow: '0401', videoFilename: '0401 둘 량.mp4' }] }
  const ledger: TextbookReviewRegistry = { sourceId: HANJA_TEXTBOOK_SOURCE.id,
    manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256, geometrySha256: CANDIDATE_SOURCE.sha256,
    records: [{ glyph: '兩', sourceGlyph: '兩', manifestRow: '0401', videoFilename: '0401 둘 량.mp4',
      expectedStrokes: 8, candidateStrokes: 8, status: 'matched', reviewedAt: '2026-09-09',
      reviewer: 'Synthetic fixture', reviewMethod: 'video-frame-sequence',
      sourceVideo: { url: new URL('../media/video/0401.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href,
        sha256: 'a'.repeat(64), bytes: 100 }, strokeEndsSeconds: [1, 2, 3, 4, 5, 6, 7, 8], durationSeconds: 9,
      pathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex'),
      checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: 'Synthetic spelling provenance fixture, not an observation.' }] }
  return { candidate, manifest, ledger, catalog: [{ glyph: '兩', strokes: 8, readingGrade: '4급II' }] }
}

test('explicit compatibility mapping retains the exact manifest glyph in published evidence', () => {
  const { candidate, manifest, ledger, catalog } = fixture()
  assert.equal(textbookSourceGlyph(ledger.records[0]), '兩')
  assert.equal(inspectTextbookQueue(manifest, catalog, [candidate], ledger)[0].glyph, '兩')
  const bundle = buildTextbookBundle(manifest, catalog, [candidate], ledger)
  assert.equal(bundle.characters[0].glyph, '兩')
  assert.equal(bundle.characters[0].sourceReference.glyph, '兩')
  assert.throws(() => validateTextbookReview({ ...bundle.characters[0], verificationSource: HANJA_TEXTBOOK_SOURCE.id,
    sourceReference: { ...bundle.characters[0].sourceReference, glyph: '兩' } }, 8, ledger), /evidence mismatch/)
})

test('source spelling is not inferred and compatibility cannot substitute a variant or missing review', () => {
  const { candidate, manifest, ledger, catalog } = fixture()
  const record = ledger.records[0]
  assert.throws(() => inspectTextbookQueue(manifest, catalog, [candidate],
    { ...ledger, records: [{ ...record, sourceGlyph: undefined }] }), /original row mismatch/)
  for (const pair of [{ glyph: '衛', sourceGlyph: '衞' }, { glyph: '豊', sourceGlyph: '豐' },
    { glyph: '兩', sourceGlyph: '兩連' }, { glyph: '兩', sourceGlyph: '' }]) {
    assert.throws(() => textbookSourceGlyph(pair), /not NFC-compatible/)
  }
  for (const status of ['pending', 'conflict']) {
    assert.deepEqual(buildTextbookBundle(manifest, catalog, [candidate],
      { ...ledger, records: [{ ...record, status }] }).characters, [])
  }
})
