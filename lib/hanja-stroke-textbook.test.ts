import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { HANJA_STROKES, hanjaStrokeData, type HanjaTextbookStrokeData } from './hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE, HANJA_TEXTBOOK_STROKES } from './hanja-stroke-textbook.ts'
import { HANJA_TEXTBOOK_KANJIVG_STROKES } from './hanja-stroke-textbook-kanjivg.ts'
import { HANJA_DOCUMENT_STROKES } from './hanja-stroke-documents.ts'
import { HANJA_NUMBERED_STROKES } from './hanja-stroke-numbered.ts'
import { HANJA_DICTIONARY_STROKES } from './hanja-stroke-dictionary.ts'
import { HANJA_DICTIONARY_G1_KANJIVG_STROKES } from './hanja-stroke-dictionary-g1-kanjivg.ts'
import { HANJA_DICTIONARY_G1_KANJIVG_BATCH2_STROKES } from './hanja-stroke-dictionary-g1-kanjivg-batch2.ts'
import { HANJA_DICTIONARY_G1_KANJIVG_BATCH3_STROKES } from './hanja-stroke-dictionary-g1-kanjivg-batch3.ts'
import { HANJA_DICTIONARY_G1_KANJIVG_BATCH4_STROKES } from './hanja-stroke-dictionary-g1-kanjivg-batch4.ts'
import { HANJA_DICTIONARY_G1_KANJIVG_BATCH5_STROKES } from './hanja-stroke-dictionary-g1-kanjivg-batch5.ts'
import { HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH1_STROKES } from './hanja-stroke-dictionary-special2-kanjivg-batch1.ts'
import { HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH2_STROKES } from './hanja-stroke-dictionary-special2-kanjivg-batch2.ts'
import { HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH3_STROKES } from './hanja-stroke-dictionary-special2-kanjivg-batch3.ts'
import { HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH4_STROKES } from './hanja-stroke-dictionary-special2-kanjivg-batch4.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH1_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch1.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH2_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch2.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH3_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch3.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH4_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch4.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH5_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch5.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH6_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch6.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH7_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch7.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH8_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch8.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH9_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch9.ts'
import { HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH11_STROKES } from './hanja-stroke-dictionary-special-kanjivg-batch11.ts'
import { HANJA_DICTIONARY_JA_STROKES } from './hanja-stroke-dictionary-ja.ts'
import { HANJA_DICTIONARY_G2_STROKES } from './hanja-stroke-dictionary-g2.ts'
import { HANJA_DICTIONARY_G2_FOLLOWUP_STROKES } from './hanja-stroke-dictionary-g2-followup.ts'
import { HANJA_DICTIONARY_G2_BATCH2_STROKES } from './hanja-stroke-dictionary-g2-batch2.ts'
import { HANJA_DICTIONARY_G2_BATCH3_STROKES } from './hanja-stroke-dictionary-g2-batch3.ts'
import { HANJA_DICTIONARY_G2_BATCH4_STROKES } from './hanja-stroke-dictionary-g2-batch4.ts'
import { HANJA_DICTIONARY_G2_BATCH5_STROKES } from './hanja-stroke-dictionary-g2-batch5.ts'
import { HANJA_DICTIONARY_G2_BATCH6_STROKES } from './hanja-stroke-dictionary-g2-batch6.ts'
import { HANJA_DICTIONARY_G2_BATCH7_STROKES } from './hanja-stroke-dictionary-g2-batch7.ts'
import { HANJA_DICTIONARY_G2_BATCH8_STROKES } from './hanja-stroke-dictionary-g2-batch8.ts'
import { HANJA_DICTIONARY_G2_BATCH9_STROKES } from './hanja-stroke-dictionary-g2-batch9.ts'
import { HANJA_DICTIONARY_G2_BATCH10_STROKES } from './hanja-stroke-dictionary-g2-batch10.ts'
import { HANJA_DICTIONARY_G2_XI_STROKES } from './hanja-stroke-dictionary-g2-xi.ts'
import { HANJA_DICTIONARY_G2_SHENG_STROKES } from './hanja-stroke-dictionary-g2-sheng.ts'
import { HANJA_DICTIONARY_G2_LAN_LU_STROKES } from './hanja-stroke-dictionary-g2-lan-lu.ts'
import { HANJA_DICTIONARY_G2_QIONG_STROKES } from './hanja-stroke-dictionary-g2-qiong.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch1.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch2.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch3.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch4.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch5.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch6.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch7.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch8.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch9.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch10.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch11.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch12.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch13.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch14.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch15.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch16.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch17.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch18.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch19.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch20.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch21.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch22.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch23.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch24.ts'
import { HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES } from './hanja-stroke-dictionary-g2-geometry-batch25.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES } from './hanja-stroke-dictionary-special2-batch1.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES } from './hanja-stroke-dictionary-special2-batch2.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES } from './hanja-stroke-dictionary-special2-batch3.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES } from './hanja-stroke-dictionary-special2-batch4.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES } from './hanja-stroke-dictionary-special2-batch5.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES } from './hanja-stroke-dictionary-special2-batch6.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES } from './hanja-stroke-dictionary-special2-batch7.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES } from './hanja-stroke-dictionary-special2-batch8.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES } from './hanja-stroke-dictionary-special2-batch9.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES } from './hanja-stroke-dictionary-special2-batch10.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES } from './hanja-stroke-dictionary-special2-batch11.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES } from './hanja-stroke-dictionary-special2-batch12.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH13_STROKES } from './hanja-stroke-dictionary-special2-batch13.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES } from './hanja-stroke-dictionary-special2-batch14.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES } from './hanja-stroke-dictionary-special2-batch15.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES } from './hanja-stroke-dictionary-special2-batch16.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH17_STROKES } from './hanja-stroke-dictionary-special2-batch17.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES } from './hanja-stroke-dictionary-special2-batch18.ts'
import { HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES } from './hanja-stroke-dictionary-special2-batch19.ts'
import { HANJA_DICTIONARY_G1_BATCH1_STROKES } from './hanja-stroke-dictionary-g1-batch1.ts'
import { HANJA_DICTIONARY_G1_BATCH2_STROKES } from './hanja-stroke-dictionary-g1-batch2.ts'
import { HANJA_DICTIONARY_G1_BATCH3_STROKES } from './hanja-stroke-dictionary-g1-batch3.ts'
import { HANJA_DICTIONARY_G1_BATCH4_STROKES } from './hanja-stroke-dictionary-g1-batch4.ts'
import { HANJA_DICTIONARY_G1_BATCH5_STROKES } from './hanja-stroke-dictionary-g1-batch5.ts'
import { HANJA_DICTIONARY_G1_BATCH6_STROKES } from './hanja-stroke-dictionary-g1-batch6.ts'
import { HANJA_DICTIONARY_G1_BATCH7_STROKES } from './hanja-stroke-dictionary-g1-batch7.ts'
import { HANJA_DICTIONARY_G1_BATCH8_STROKES } from './hanja-stroke-dictionary-g1-batch8.ts'
import { HANJA_DICTIONARY_G1_BATCH9_STROKES } from './hanja-stroke-dictionary-g1-batch9.ts'
import { HANJA_DICTIONARY_G1_BATCH10_STROKES } from './hanja-stroke-dictionary-g1-batch10.ts'
import { HANJA_DICTIONARY_G1_BATCH11_STROKES } from './hanja-stroke-dictionary-g1-batch11.ts'
import { HANJA_DICTIONARY_G1_BATCH12_STROKES } from './hanja-stroke-dictionary-g1-batch12.ts'
import { HANJA_DICTIONARY_G1_BATCH13_STROKES } from './hanja-stroke-dictionary-g1-batch13.ts'
import { HANJA_DICTIONARY_G1_BATCH14_STROKES } from './hanja-stroke-dictionary-g1-batch14.ts'
import { HANJA_DICTIONARY_G1_BATCH15_STROKES } from './hanja-stroke-dictionary-g1-batch15.ts'
import { HANJA_DICTIONARY_G1_BATCH16_STROKES } from './hanja-stroke-dictionary-g1-batch16.ts'
import { HANJA_DICTIONARY_G1_BATCH17_STROKES } from './hanja-stroke-dictionary-g1-batch17.ts'
import { HANJA_DICTIONARY_G1_BATCH18_STROKES } from './hanja-stroke-dictionary-g1-batch18.ts'
import { HANJA_DICTIONARY_G1_BATCH19_STROKES } from './hanja-stroke-dictionary-g1-batch19.ts'
import { HANJA_DICTIONARY_G1_BATCH20_STROKES } from './hanja-stroke-dictionary-g1-batch20.ts'
import { HANJA_DICTIONARY_G1_BATCH21_STROKES } from './hanja-stroke-dictionary-g1-batch21.ts'
import { HANJA_DICTIONARY_G1_BATCH22_STROKES } from './hanja-stroke-dictionary-g1-batch22.ts'
import { HANJA_DICTIONARY_G1_BATCH23_STROKES } from './hanja-stroke-dictionary-g1-batch23.ts'
import { HANJA_DICTIONARY_G1_BATCH24_STROKES } from './hanja-stroke-dictionary-g1-batch24.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES } from './hanja-stroke-dictionary-special-batch1.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES } from './hanja-stroke-dictionary-special-batch2.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES } from './hanja-stroke-dictionary-special-batch3.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES } from './hanja-stroke-dictionary-special-batch4.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH5_STROKES } from './hanja-stroke-dictionary-special-batch5.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES } from './hanja-stroke-dictionary-special-batch6.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES } from './hanja-stroke-dictionary-special-batch7.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES } from './hanja-stroke-dictionary-special-batch8.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES } from './hanja-stroke-dictionary-special-batch9.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES } from './hanja-stroke-dictionary-special-batch10.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES } from './hanja-stroke-dictionary-special-batch11.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES } from './hanja-stroke-dictionary-special-batch12.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES } from './hanja-stroke-dictionary-special-batch13.ts'
import { HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES } from './hanja-stroke-dictionary-special-batch14.ts'
import { HANJA_DICTIONARY_TOMOE_BATCH23_STROKES } from './hanja-stroke-dictionary-tomoe-batch23.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH26_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch26.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH27_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch27.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH29_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch29.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH31_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch31.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH33_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch33.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH34_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch34.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH35_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch35.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH36_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch36.ts'
import { HANJA_DICTIONARY_GLYPHWIKI_BATCH28_STROKES } from './hanja-stroke-dictionary-glyphwiki-batch28.ts'
import { HANJA_VARIANT_STROKES } from './hanja-stroke-variants.ts'
import { normalizeMedians } from './hanja-stroke-geometry.ts'
import { auditStrokes, CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE } from '../scripts/hanja-stroke-audit.ts'
import { TEXTBOOK_REVIEW_REGISTRY, textbookGeometrySource, validateTextbookReview, type TextbookReviewRegistry } from '../scripts/hanja-stroke-textbook.ts'

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
      reviewer: 'Synthetic test fixture', reviewMethod: 'video-frame-sequence',
      sourceVideo: { url: new URL('../media/video/0002.mp4', HANJA_TEXTBOOK_SOURCE.manifestUrl).href,
        sha256: 'a'.repeat(64), bytes: 631254 },
      strokeEndsSeconds: Array.from({ length: 11 }, (_, i) => i + 1), durationSeconds: 12,
      pathsSha256, checks: { order: 'match', direction: 'match', boundaries: 'match', glyphForm: 'match' },
      notes: 'Synthetic validator fixture, not a source observation.' }],
  }
  return { candidate, review, ledger }
}

test('교과서 발견 목록과 완료된 검토 등록부를 분리한다', () => {
  assert.ok(TEXTBOOK_REVIEW_REGISTRY.records.length > 0)
  assert.equal(new Set(TEXTBOOK_REVIEW_REGISTRY.records.map((record) => record.glyph)).size, TEXTBOOK_REVIEW_REGISTRY.records.length)
  const completed = TEXTBOOK_REVIEW_REGISTRY.records.filter((record) => record.status === 'matched')
  assert.deepEqual(HANJA_TEXTBOOK_STROKES.map((entry) => entry.glyph).sort(), completed.map((entry) => entry.glyph).sort())
  for (const record of TEXTBOOK_REVIEW_REGISTRY.records.filter((entry) => entry.status !== 'matched')) {
    assert.ok(!HANJA_TEXTBOOK_STROKES.some(entry => entry.glyph === record.glyph))
    // A held textbook variant does not invalidate a separately reviewed exact-character source.
    const independent = [...HANJA_DOCUMENT_STROKES, ...HANJA_NUMBERED_STROKES,
      ...HANJA_TEXTBOOK_KANJIVG_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH1_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH2_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH3_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH4_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH5_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH6_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH7_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH8_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH9_STROKES,
      ...HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH11_STROKES,
      ...HANJA_DICTIONARY_STROKES, ...HANJA_DICTIONARY_JA_STROKES, ...HANJA_DICTIONARY_G2_STROKES, ...HANJA_DICTIONARY_G2_FOLLOWUP_STROKES, ...HANJA_DICTIONARY_G2_BATCH2_STROKES, ...HANJA_DICTIONARY_G2_BATCH3_STROKES, ...HANJA_DICTIONARY_G2_BATCH4_STROKES, ...HANJA_DICTIONARY_G2_BATCH5_STROKES, ...HANJA_DICTIONARY_G2_BATCH6_STROKES, ...HANJA_DICTIONARY_G2_BATCH7_STROKES, ...HANJA_DICTIONARY_G2_BATCH8_STROKES, ...HANJA_DICTIONARY_G2_BATCH9_STROKES, ...HANJA_DICTIONARY_G2_BATCH10_STROKES, ...HANJA_DICTIONARY_G2_XI_STROKES, ...HANJA_DICTIONARY_G2_SHENG_STROKES, ...HANJA_DICTIONARY_G2_LAN_LU_STROKES, ...HANJA_DICTIONARY_G2_QIONG_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES, ...HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH13_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH17_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES, ...HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES, ...HANJA_DICTIONARY_G1_BATCH1_STROKES, ...HANJA_DICTIONARY_G1_BATCH2_STROKES, ...HANJA_DICTIONARY_G1_BATCH3_STROKES, ...HANJA_DICTIONARY_G1_BATCH4_STROKES, ...HANJA_DICTIONARY_G1_BATCH5_STROKES, ...HANJA_DICTIONARY_G1_BATCH6_STROKES, ...HANJA_DICTIONARY_G1_BATCH7_STROKES, ...HANJA_DICTIONARY_G1_BATCH8_STROKES, ...HANJA_DICTIONARY_G1_BATCH9_STROKES, ...HANJA_DICTIONARY_G1_BATCH10_STROKES, ...HANJA_DICTIONARY_G1_BATCH11_STROKES, ...HANJA_DICTIONARY_G1_BATCH12_STROKES, ...HANJA_DICTIONARY_G1_BATCH13_STROKES, ...HANJA_DICTIONARY_G1_BATCH14_STROKES, ...HANJA_DICTIONARY_G1_BATCH15_STROKES, ...HANJA_DICTIONARY_G1_BATCH16_STROKES, ...HANJA_DICTIONARY_G1_BATCH17_STROKES, ...HANJA_DICTIONARY_G1_BATCH18_STROKES, ...HANJA_DICTIONARY_G1_BATCH19_STROKES, ...HANJA_DICTIONARY_G1_BATCH20_STROKES, ...HANJA_DICTIONARY_G1_BATCH21_STROKES, ...HANJA_DICTIONARY_G1_BATCH22_STROKES, ...HANJA_DICTIONARY_G1_BATCH23_STROKES, ...HANJA_DICTIONARY_G1_BATCH24_STROKES, ...HANJA_DICTIONARY_G1_KANJIVG_STROKES, ...HANJA_DICTIONARY_G1_KANJIVG_BATCH2_STROKES, ...HANJA_DICTIONARY_G1_KANJIVG_BATCH3_STROKES, ...HANJA_DICTIONARY_G1_KANJIVG_BATCH4_STROKES, ...HANJA_DICTIONARY_G1_KANJIVG_BATCH5_STROKES, ...HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH1_STROKES, ...HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH2_STROKES, ...HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH3_STROKES, ...HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH4_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH5_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES, ...HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES]
      .find(entry => entry.glyph === record.glyph && entry.paths.length === record.expectedStrokes)
    assert.deepEqual(hanjaStrokeData({ glyph: record.glyph, strokes: record.expectedStrokes }), independent ?? null)
  }
  const { candidate, review } = fixture()
  const result = auditStrokes([{ glyph: '假', strokes: 11, readingGrade: '4급II' }], [candidate], [])
  assert.equal(result.entries[0].playback, 'unavailable')
  if (!completed.some((record) => record.glyph === '假')) {
    assert.throws(() => auditStrokes([{ glyph: '假', strokes: 11, readingGrade: '4급II' }], [candidate], [review]), /not completed/)
  }
  assert.equal(HANJA_STROKES.length, 503 + HANJA_DICTIONARY_GLYPHWIKI_BATCH36_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH35_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH34_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH33_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH31_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH29_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH28_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH27_STROKES.length + HANJA_DICTIONARY_GLYPHWIKI_BATCH26_STROKES.length + HANJA_DICTIONARY_TOMOE_BATCH23_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH11_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH9_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH8_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH7_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH6_STROKES.length + HANJA_TEXTBOOK_KANJIVG_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH5_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH4_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH3_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH2_STROKES.length + HANJA_DICTIONARY_SPECIAL_KANJIVG_BATCH1_STROKES.length + HANJA_VARIANT_STROKES.length + completed.length + HANJA_DOCUMENT_STROKES.length + HANJA_NUMBERED_STROKES.length + HANJA_DICTIONARY_STROKES.length + HANJA_DICTIONARY_JA_STROKES.length + HANJA_DICTIONARY_G2_STROKES.length + HANJA_DICTIONARY_G2_FOLLOWUP_STROKES.length + HANJA_DICTIONARY_G2_BATCH2_STROKES.length + HANJA_DICTIONARY_G2_BATCH3_STROKES.length + HANJA_DICTIONARY_G2_BATCH4_STROKES.length + HANJA_DICTIONARY_G2_BATCH5_STROKES.length + HANJA_DICTIONARY_G2_BATCH6_STROKES.length + HANJA_DICTIONARY_G2_BATCH7_STROKES.length + HANJA_DICTIONARY_G2_BATCH8_STROKES.length + HANJA_DICTIONARY_G2_BATCH9_STROKES.length + HANJA_DICTIONARY_G2_BATCH10_STROKES.length + HANJA_DICTIONARY_G2_XI_STROKES.length + HANJA_DICTIONARY_G2_SHENG_STROKES.length + HANJA_DICTIONARY_G2_LAN_LU_STROKES.length + HANJA_DICTIONARY_G2_QIONG_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH1_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH2_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH3_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH4_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH5_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH6_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH7_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH8_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH9_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH10_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH11_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH12_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH13_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH14_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH15_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH16_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH17_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH18_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH19_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH20_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH21_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH22_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH23_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH24_STROKES.length + HANJA_DICTIONARY_G2_GEOMETRY_BATCH25_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH1_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH2_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH3_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH4_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH5_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH6_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH7_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH8_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH9_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH10_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH11_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH12_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH13_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH14_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH15_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH16_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH17_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH18_STROKES.length + HANJA_DICTIONARY_SPECIAL2_BATCH19_STROKES.length + HANJA_DICTIONARY_G1_BATCH1_STROKES.length + HANJA_DICTIONARY_G1_BATCH2_STROKES.length + HANJA_DICTIONARY_G1_BATCH3_STROKES.length + HANJA_DICTIONARY_G1_BATCH4_STROKES.length + HANJA_DICTIONARY_G1_BATCH5_STROKES.length + HANJA_DICTIONARY_G1_BATCH6_STROKES.length + HANJA_DICTIONARY_G1_BATCH7_STROKES.length + HANJA_DICTIONARY_G1_BATCH8_STROKES.length + HANJA_DICTIONARY_G1_BATCH9_STROKES.length + HANJA_DICTIONARY_G1_BATCH10_STROKES.length + HANJA_DICTIONARY_G1_BATCH11_STROKES.length + HANJA_DICTIONARY_G1_BATCH12_STROKES.length + HANJA_DICTIONARY_G1_BATCH13_STROKES.length + HANJA_DICTIONARY_G1_BATCH14_STROKES.length + HANJA_DICTIONARY_G1_BATCH15_STROKES.length + HANJA_DICTIONARY_G1_BATCH16_STROKES.length + HANJA_DICTIONARY_G1_BATCH17_STROKES.length + HANJA_DICTIONARY_G1_BATCH18_STROKES.length + HANJA_DICTIONARY_G1_BATCH19_STROKES.length + HANJA_DICTIONARY_G1_BATCH20_STROKES.length + HANJA_DICTIONARY_G1_BATCH21_STROKES.length + HANJA_DICTIONARY_G1_BATCH22_STROKES.length + HANJA_DICTIONARY_G1_BATCH23_STROKES.length + HANJA_DICTIONARY_G1_BATCH24_STROKES.length + HANJA_DICTIONARY_G1_KANJIVG_STROKES.length + HANJA_DICTIONARY_G1_KANJIVG_BATCH2_STROKES.length + HANJA_DICTIONARY_G1_KANJIVG_BATCH3_STROKES.length + HANJA_DICTIONARY_G1_KANJIVG_BATCH4_STROKES.length + HANJA_DICTIONARY_G1_KANJIVG_BATCH5_STROKES.length + HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH1_STROKES.length + HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH2_STROKES.length + HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH3_STROKES.length + HANJA_DICTIONARY_SPECIAL2_KANJIVG_BATCH4_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH1_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH2_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH3_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH4_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH5_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH6_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH7_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH8_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH9_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH10_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH11_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH12_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH13_STROKES.length + HANJA_DICTIONARY_SPECIAL_BATCH14_STROKES.length)
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

test('교과서 승인은 검토자·시각 대조 방식·실제 행번호 영상의 해시를 요구한다', () => {
  const { review, ledger } = fixture()
  const record = ledger.records[0]
  for (const change of [
    { reviewer: undefined }, { reviewer: '   ' }, { reviewMethod: undefined },
    { reviewMethod: 'stroke-count-only' }, { sourceVideo: undefined },
  ]) {
    assert.throws(() => validateTextbookReview(review, 11,
      { ...ledger, records: [{ ...record, ...change }] }), /comparison incomplete/)
  }
  const video = record.sourceVideo!
  const invalidVideos = [
    { ...video, url: 'not-a-url' },
    { ...video, url: video.url.replace('https:', 'http:') },
    { ...video, url: video.url.replace('viewer.vivasam.com', 'example.invalid') },
    { ...video, url: video.url.replace('/media/video/', '/data/') },
    { ...video, url: video.url.replace('/0002.mp4', '/0003.mp4') },
    { ...video, url: new URL(`../media/video/${record.videoFilename}`, HANJA_TEXTBOOK_SOURCE.manifestUrl).href },
    { ...video, url: `${video.url}?version=other` },
    { ...video, url: `${video.url}#other` },
    { ...video, sha256: '' }, { ...video, sha256: 'a'.repeat(63) },
    { ...video, sha256: 'g'.repeat(64) },
    { ...video, bytes: 0 }, { ...video, bytes: -1 }, { ...video, bytes: 1.5 },
    { ...video, bytes: Number.MAX_SAFE_INTEGER + 1 }, { ...video, bytes: Number.NaN },
    { ...video, bytes: Number.POSITIVE_INFINITY },
  ]
  for (const sourceVideo of invalidVideos) {
    assert.throws(() => validateTextbookReview(review, 11,
      { ...ledger, records: [{ ...record, sourceVideo }] }), /comparison incomplete/)
  }
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

test('교과서 기록별 기하 출처는 고정 원본만 허용하며 출처 교체를 거부한다', () => {
  const { review, ledger } = fixture()
  assert.equal(textbookGeometrySource({}), CANDIDATE_SOURCE.sha256)
  assert.equal(textbookGeometrySource({ geometrySource: CANDIDATE_SOURCE.sha256 }), CANDIDATE_SOURCE.sha256)
  assert.equal(textbookGeometrySource({ geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256 }), JAPANESE_CANDIDATE_SOURCE.sha256)
  assert.equal(textbookGeometrySource({ geometrySource: MAKE_ME_A_HANZI_SOURCE.sha256 }), MAKE_ME_A_HANZI_SOURCE.sha256)
  const hanziReview = { ...review, geometrySource: MAKE_ME_A_HANZI_SOURCE.sha256 }
  const hanziLedger = { ...ledger, records: [{ ...ledger.records[0], geometrySource: MAKE_ME_A_HANZI_SOURCE.sha256 }] }
  assert.doesNotThrow(() => validateTextbookReview(hanziReview, 11, hanziLedger))
  assert.throws(() => validateTextbookReview(hanziReview, 11, ledger), /geometry provenance mismatch/)

  const japaneseReview = { ...review, geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256 }
  const japaneseLedger = { ...ledger,
    records: [{ ...ledger.records[0], geometrySource: JAPANESE_CANDIDATE_SOURCE.sha256 }] }
  assert.doesNotThrow(() => validateTextbookReview(japaneseReview, 11, japaneseLedger))
  assert.throws(() => validateTextbookReview(japaneseReview, 11, ledger), /geometry provenance mismatch/)
  assert.throws(() => validateTextbookReview(review, 11, japaneseLedger), /geometry provenance mismatch/)
  for (const source of ['', 'unregistered', 'b'.repeat(64)]) {
    assert.throws(() => validateTextbookReview({ ...review, geometrySource: source }, 11,
      { ...ledger, records: [{ ...ledger.records[0], geometrySource: source }] }), /Unsupported textbook geometry source/)
  }
  const changedPaths = [...japaneseReview.paths].reverse()
  assert.throws(() => validateTextbookReview({ ...japaneseReview, paths: changedPaths,
    pathsSha256: createHash('sha256').update(JSON.stringify(changedPaths)).digest('hex') }, 11, japaneseLedger), /geometry provenance mismatch/)
  assert.throws(() => validateTextbookReview({ ...japaneseReview, geometryCorrection: 'unreviewed-split' },
    11, japaneseLedger), /geometry provenance mismatch/)
})

test('실제 교과서 등록부의 출처·관찰 기록과 공개 데이터 메타데이터를 검증한다', () => {
  const bundle = JSON.parse(readFileSync(new URL('../public/hanja-strokes/textbook-reviewed.json', import.meta.url), 'utf8'))
  assert.equal(bundle.verificationSource.id, HANJA_TEXTBOOK_SOURCE.id)
  assert.equal(bundle.verificationSource.manifestSha256, HANJA_TEXTBOOK_SOURCE.manifestSha256)
  assert.equal(bundle.geometrySource.sha256, CANDIDATE_SOURCE.sha256)
  for (const review of HANJA_TEXTBOOK_STROKES) validateTextbookReview(review, review.paths.length)
  const split = TEXTBOOK_REVIEW_REGISTRY.records.find((record) => record.glyph === '警')!
  assert.equal(split.expectedStrokes, 20)
  assert.equal(split.candidateStrokes, 19)
  if (split.status === 'matched') {
    const corrected = hanjaStrokeData({ glyph: '警', strokes: 20 })!
    assert.equal(corrected.paths.length, 20)
    assert.equal(corrected.geometryCorrection, split.geometryCorrection)
    assert.deepEqual(corrected.sourceStrokeIndices?.slice(0, 4), [2, 1, 1, 3])
  } else {
    assert.equal(hanjaStrokeData({ glyph: '警', strokes: 20 }), null)
  }
})
