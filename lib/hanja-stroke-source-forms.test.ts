import assert from 'node:assert/strict'
import test from 'node:test'
import { HANJA_TEXTBOOK_SOURCE } from './hanja-stroke-textbook.ts'
import { TEXTBOOK_SOURCE_FORMS, textbookSourceFormSha256 } from '../scripts/hanja-stroke-source-forms.ts'
import { textbookSourceGlyph, type TextbookReviewRecord, type TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'
import { buildTextbookBundle, type TextbookManifest } from '../scripts/hanja-stroke-textbook-build.ts'
import { CANDIDATE_SOURCE } from '../scripts/hanja-stroke-audit.ts'

function fixture(glyph = '祕'): TextbookReviewRecord {
  const form = TEXTBOOK_SOURCE_FORMS.find((entry) => entry.glyph === glyph)!
  return { glyph: form.glyph, sourceGlyph: form.sourceGlyph, sourceFormCorrection: form.id,
    sourceFormCorrectionSha256: textbookSourceFormSha256(form), manifestRow: form.manifestRow,
    videoFilename: form.videoFilename, expectedStrokes: form.expectedStrokes,
    candidateStrokes: form.expectedStrokes, status: 'pending',
    sourceVideo: { url: new URL(`../media/video/${form.manifestRow}.mp4`, HANJA_TEXTBOOK_SOURCE.manifestUrl).href,
      sha256: form.sourceVideoSha256, bytes: form.sourceVideoBytes } }
}

test('a rendered-glyph observation preserves the original label and binds the exact video', () => {
  const record = fixture()
  assert.equal(textbookSourceGlyph(record), '秘')
  for (const change of [
    { glyph: '衛' }, { sourceGlyph: '祕' }, { manifestRow: '0706' },
    { videoFilename: '0705 다른 글자.mp4' }, { expectedStrokes: 9 },
    { sourceFormCorrection: 'unreviewed' }, { sourceFormCorrectionSha256: 'a'.repeat(64) },
    { sourceFormCorrection: undefined },
    { sourceVideo: { ...record.sourceVideo!, sha256: 'b'.repeat(64) } },
    { sourceVideo: { ...record.sourceVideo!, bytes: 1 } },
    { sourceVideo: { ...record.sourceVideo!, url: 'https://example.invalid/0705.mp4' } },
  ]) assert.throws(() => textbookSourceGlyph({ ...record, ...change }), /rendered source form mismatch/)
})

test('涼 and 戲 observations cannot be transferred to another source video', () => {
  const records = [fixture('涼'), fixture('戲')]
  for (const [index, record] of records.entries()) {
    assert.equal(textbookSourceGlyph(record), index === 0 ? '凉' : '戱')
    const other = records[1 - index]
    for (const change of [
      { sourceFormCorrection: undefined, sourceFormCorrectionSha256: undefined },
      { sourceGlyph: record.glyph },
      { sourceVideo: other.sourceVideo },
      { manifestRow: other.manifestRow, videoFilename: other.videoFilename },
      { sourceFormCorrection: other.sourceFormCorrection, sourceFormCorrectionSha256: other.sourceFormCorrectionSha256 },
    ]) assert.throws(() => textbookSourceGlyph({ ...record, ...change }), /rendered source form mismatch|NFC-compatible/)
  }
})

test('similar meaning, known variants, and NFC alone cannot manufacture a video-form correction', () => {
  for (const [glyph, sourceGlyph] of [['祕', '秘'], ['涼', '凉'], ['戲', '戱'], ['衛', '衞'], ['豊', '豐'], ['姉', '姊'], ['獎', '奬'], ['鍾', '鐘'], ['冊', '册']]) {
    assert.throws(() => textbookSourceGlyph({ glyph, sourceGlyph }), /NFC-compatible/)
  }
  assert.equal(textbookSourceGlyph({ glyph: '更', sourceGlyph: '更' }), '更')
  assert.equal(textbookSourceGlyph({ glyph: '亂', sourceGlyph: '亂' }), '亂')
})

test('a verified list-label correction does not approve synthetic or unfinished stroke geometry', () => {
  const record = fixture()
  const ledger: TextbookReviewRegistry = { sourceId: HANJA_TEXTBOOK_SOURCE.id,
    manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256, geometrySha256: CANDIDATE_SOURCE.sha256,
    records: [record] }
  const manifest: TextbookManifest = { source: { id: ledger.sourceId, sha256: ledger.manifestSha256,
    url: HANJA_TEXTBOOK_SOURCE.manifestUrl }, entries: [{ glyph: '秘', manifestRow: '0705', videoFilename: record.videoFilename }] }
  const characters = [{ glyph: '祕', strokes: 10, readingGrade: '4급' }]
  const candidate = { character: '祕', strokes: Array<string>(10).fill('M0 0 L1 1'),
    medians: Array.from({ length: 10 }, (_, i) => [[i, 0], [i + 1, 20]]) }
  assert.deepEqual(buildTextbookBundle(manifest, characters, [candidate], ledger).characters, [])
  assert.throws(() => buildTextbookBundle(manifest, characters, [candidate], {
    ...ledger, records: [{ ...record, status: 'matched' }],
  }), /whole-glyph comparison incomplete/)
})
