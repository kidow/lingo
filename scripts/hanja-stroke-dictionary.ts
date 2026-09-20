/** Offline proof and geometry reconstruction. Vendor SVG paths are never imported. */
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { isDeepStrictEqual } from 'node:util'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { HANJA_TEXTBOOK_STROKES } from '../lib/hanja-stroke-textbook.ts'
import { jaDictionaryGeometry, validateJaDictionaryProofs, validateJaDictionaryReview, validateJaDictionaryBundle } from './hanja-stroke-dictionary-ja.ts'
import { g2DictionaryGeometry, validateG2DictionaryReview, validateG2DictionaryBundle } from './hanja-stroke-dictionary-g2.ts'
import { g2DictionaryReference } from '../lib/hanja-stroke-dictionary-g2.ts'
import { g2FollowupDictionaryGeometry, validateG2FollowupDictionaryReview, validateG2FollowupDictionaryBundle } from './hanja-stroke-dictionary-g2-followup.ts'
import { g2FollowupDictionaryReference } from '../lib/hanja-stroke-dictionary-g2-followup.ts'
import { g2Batch2DictionaryGeometry, validateG2Batch2DictionaryReview, validateG2Batch2DictionaryBundle } from './hanja-stroke-dictionary-g2-batch2.ts'
import { g2Batch3DictionaryGeometry, validateG2Batch3DictionaryReview, validateG2Batch3DictionaryBundle } from './hanja-stroke-dictionary-g2-batch3.ts'
import { g2Batch4DictionaryGeometry, validateG2Batch4DictionaryReview, validateG2Batch4DictionaryBundle } from './hanja-stroke-dictionary-g2-batch4.ts'
import { g2Batch5DictionaryGeometry, validateG2Batch5DictionaryReview, validateG2Batch5DictionaryBundle } from './hanja-stroke-dictionary-g2-batch5.ts'
import { g2Batch6DictionaryGeometry, validateG2Batch6DictionaryReview, validateG2Batch6DictionaryBundle } from './hanja-stroke-dictionary-g2-batch6.ts'
import { g2Batch7DictionaryGeometry, validateG2Batch7DictionaryReview, validateG2Batch7DictionaryBundle } from './hanja-stroke-dictionary-g2-batch7.ts'
import { g2Batch8DictionaryGeometry, validateG2Batch8DictionaryReview, validateG2Batch8DictionaryBundle } from './hanja-stroke-dictionary-g2-batch8.ts'
import { g2Batch9DictionaryGeometry, validateG2Batch9DictionaryReview, validateG2Batch9DictionaryBundle } from './hanja-stroke-dictionary-g2-batch9.ts'
import { g2Batch10DictionaryGeometry, validateG2Batch10DictionaryReview, validateG2Batch10DictionaryBundle } from './hanja-stroke-dictionary-g2-batch10.ts'
import { g2XiDictionaryGeometry, validateG2XiDictionaryReview, validateG2XiDictionaryBundle } from './hanja-stroke-dictionary-g2-xi.ts'
import { g2ShengDictionaryGeometry, validateG2ShengDictionaryReview, validateG2ShengDictionaryBundle } from './hanja-stroke-dictionary-g2-sheng.ts'
import { g2LanLuDictionaryGeometry, validateG2LanLuDictionaryReview, validateG2LanLuDictionaryBundle } from './hanja-stroke-dictionary-g2-lan-lu.ts'
import { g2QiongDictionaryGeometry, validateG2QiongDictionaryReview, validateG2QiongDictionaryBundle } from './hanja-stroke-dictionary-g2-qiong.ts'
import { g2GeometryBatch1DictionaryGeometry, validateG2GeometryBatch1DictionaryReview, validateG2GeometryBatch1DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch1.ts'
import { g2GeometryBatch2DictionaryGeometry, validateG2GeometryBatch2DictionaryReview, validateG2GeometryBatch2DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch2.ts'
import { g2GeometryBatch3DictionaryGeometry, validateG2GeometryBatch3DictionaryReview, validateG2GeometryBatch3DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch3.ts'
import { g2GeometryBatch4DictionaryGeometry, validateG2GeometryBatch4DictionaryReview, validateG2GeometryBatch4DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch4.ts'
import { g2GeometryBatch5DictionaryGeometry, validateG2GeometryBatch5DictionaryReview, validateG2GeometryBatch5DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch5.ts'
import { g2GeometryBatch6DictionaryGeometry, validateG2GeometryBatch6DictionaryReview, validateG2GeometryBatch6DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch6.ts'
import { g2GeometryBatch7DictionaryGeometry, validateG2GeometryBatch7DictionaryReview, validateG2GeometryBatch7DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch7.ts'
import { g2GeometryBatch8DictionaryGeometry, validateG2GeometryBatch8DictionaryReview, validateG2GeometryBatch8DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch8.ts'
import { g2GeometryBatch9DictionaryGeometry, validateG2GeometryBatch9DictionaryReview, validateG2GeometryBatch9DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch9.ts'
import { g2GeometryBatch10DictionaryGeometry, validateG2GeometryBatch10DictionaryReview, validateG2GeometryBatch10DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch10.ts'
import { g2GeometryBatch11DictionaryGeometry, validateG2GeometryBatch11DictionaryReview, validateG2GeometryBatch11DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch11.ts'
import { g2GeometryBatch12DictionaryGeometry, validateG2GeometryBatch12DictionaryReview, validateG2GeometryBatch12DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch12.ts'
import { g2GeometryBatch13DictionaryGeometry, validateG2GeometryBatch13DictionaryReview, validateG2GeometryBatch13DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch13.ts'
import { buildG2GeometryBatch14DictionaryBundle, g2GeometryBatch14DictionaryGeometry, validateG2GeometryBatch14DictionaryReview, validateG2GeometryBatch14DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch14.ts'
import { buildG2GeometryBatch15DictionaryBundle, g2GeometryBatch15DictionaryGeometry, validateG2GeometryBatch15DictionaryReview, validateG2GeometryBatch15DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch15.ts'
import { buildG2GeometryBatch16DictionaryBundle, g2GeometryBatch16DictionaryGeometry, validateG2GeometryBatch16DictionaryReview, validateG2GeometryBatch16DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch16.ts'
import { buildG2GeometryBatch17DictionaryBundle, g2GeometryBatch17DictionaryGeometry, validateG2GeometryBatch17DictionaryReview, validateG2GeometryBatch17DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch17.ts'
import { buildG2GeometryBatch18DictionaryBundle, g2GeometryBatch18DictionaryGeometry, validateG2GeometryBatch18DictionaryReview, validateG2GeometryBatch18DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch18.ts'
import { buildG2GeometryBatch19DictionaryBundle, g2GeometryBatch19DictionaryGeometry, validateG2GeometryBatch19DictionaryReview, validateG2GeometryBatch19DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch19.ts'
import { buildG2GeometryBatch20DictionaryBundle, g2GeometryBatch20DictionaryGeometry, validateG2GeometryBatch20DictionaryReview, validateG2GeometryBatch20DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch20.ts'
import { buildG2GeometryBatch21DictionaryBundle, g2GeometryBatch21DictionaryGeometry, validateG2GeometryBatch21DictionaryReview, validateG2GeometryBatch21DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch21.ts'
import { buildG2GeometryBatch22DictionaryBundle, g2GeometryBatch22DictionaryGeometry, validateG2GeometryBatch22DictionaryReview, validateG2GeometryBatch22DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch22.ts'
import { buildG2GeometryBatch23DictionaryBundle, g2GeometryBatch23DictionaryGeometry, validateG2GeometryBatch23DictionaryReview, validateG2GeometryBatch23DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch23.ts'
import { buildG2GeometryBatch24DictionaryBundle, g2GeometryBatch24DictionaryGeometry, validateG2GeometryBatch24DictionaryReview, validateG2GeometryBatch24DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch24.ts'
import { buildG2GeometryBatch25DictionaryBundle, g2GeometryBatch25DictionaryGeometry, validateG2GeometryBatch25DictionaryReview, validateG2GeometryBatch25DictionaryBundle } from './hanja-stroke-dictionary-g2-geometry-batch25.ts'
import { special2Batch1DictionaryGeometry, validateSpecial2Batch1DictionaryReview, validateSpecial2Batch1DictionaryBundle } from './hanja-stroke-dictionary-special2-batch1.ts'
import { special2Batch2DictionaryGeometry, validateSpecial2Batch2DictionaryReview, validateSpecial2Batch2DictionaryBundle } from './hanja-stroke-dictionary-special2-batch2.ts'
import { special2Batch3DictionaryGeometry, validateSpecial2Batch3DictionaryReview, validateSpecial2Batch3DictionaryBundle } from './hanja-stroke-dictionary-special2-batch3.ts'
import { special2Batch4DictionaryGeometry, validateSpecial2Batch4DictionaryReview, validateSpecial2Batch4DictionaryBundle } from './hanja-stroke-dictionary-special2-batch4.ts'
import { special2Batch5DictionaryGeometry, validateSpecial2Batch5DictionaryReview, validateSpecial2Batch5DictionaryBundle } from './hanja-stroke-dictionary-special2-batch5.ts'
import { special2Batch6DictionaryGeometry, validateSpecial2Batch6DictionaryReview, validateSpecial2Batch6DictionaryBundle } from './hanja-stroke-dictionary-special2-batch6.ts'
import { special2Batch7DictionaryGeometry, validateSpecial2Batch7DictionaryReview, validateSpecial2Batch7DictionaryBundle } from './hanja-stroke-dictionary-special2-batch7.ts'
import { special2Batch8DictionaryGeometry, validateSpecial2Batch8DictionaryReview, validateSpecial2Batch8DictionaryBundle } from './hanja-stroke-dictionary-special2-batch8.ts'
import { special2Batch9DictionaryGeometry, validateSpecial2Batch9DictionaryReview, validateSpecial2Batch9DictionaryBundle } from './hanja-stroke-dictionary-special2-batch9.ts'
import { special2Batch10DictionaryGeometry, validateSpecial2Batch10DictionaryReview, validateSpecial2Batch10DictionaryBundle } from './hanja-stroke-dictionary-special2-batch10.ts'
import { special2Batch11DictionaryGeometry, validateSpecial2Batch11DictionaryReview, validateSpecial2Batch11DictionaryBundle } from './hanja-stroke-dictionary-special2-batch11.ts'
import { special2Batch12DictionaryGeometry, validateSpecial2Batch12DictionaryReview, validateSpecial2Batch12DictionaryBundle } from './hanja-stroke-dictionary-special2-batch12.ts'
import { special2Batch13DictionaryGeometry, validateSpecial2Batch13DictionaryReview, validateSpecial2Batch13DictionaryBundle } from './hanja-stroke-dictionary-special2-batch13.ts'
import { special2Batch14DictionaryGeometry, validateSpecial2Batch14DictionaryReview, validateSpecial2Batch14DictionaryBundle } from './hanja-stroke-dictionary-special2-batch14.ts'
import { special2Batch15DictionaryGeometry, validateSpecial2Batch15DictionaryReview, validateSpecial2Batch15DictionaryBundle } from './hanja-stroke-dictionary-special2-batch15.ts'
import { special2Batch16DictionaryGeometry, validateSpecial2Batch16DictionaryReview, validateSpecial2Batch16DictionaryBundle } from './hanja-stroke-dictionary-special2-batch16.ts'
import { special2Batch17DictionaryGeometry, validateSpecial2Batch17DictionaryReview, validateSpecial2Batch17DictionaryBundle } from './hanja-stroke-dictionary-special2-batch17.ts'
import { g1Batch1DictionaryGeometry, validateG1Batch1DictionaryReview, validateG1Batch1DictionaryBundle } from './hanja-stroke-dictionary-g1-batch1.ts'
import { g1Batch2DictionaryGeometry, validateG1Batch2DictionaryReview, validateG1Batch2DictionaryBundle } from './hanja-stroke-dictionary-g1-batch2.ts'
import { g1Batch3DictionaryGeometry, validateG1Batch3DictionaryReview, validateG1Batch3DictionaryBundle } from './hanja-stroke-dictionary-g1-batch3.ts'
import { g1Batch4DictionaryGeometry, validateG1Batch4DictionaryReview, validateG1Batch4DictionaryBundle } from './hanja-stroke-dictionary-g1-batch4.ts'
import { g1Batch5DictionaryGeometry, validateG1Batch5DictionaryReview, validateG1Batch5DictionaryBundle } from './hanja-stroke-dictionary-g1-batch5.ts'
import { g1Batch6DictionaryGeometry, validateG1Batch6DictionaryReview, validateG1Batch6DictionaryBundle } from './hanja-stroke-dictionary-g1-batch6.ts'
import { g1Batch7DictionaryGeometry, validateG1Batch7DictionaryReview, validateG1Batch7DictionaryBundle } from './hanja-stroke-dictionary-g1-batch7.ts'
import { g1Batch8DictionaryGeometry, validateG1Batch8DictionaryReview, validateG1Batch8DictionaryBundle } from './hanja-stroke-dictionary-g1-batch8.ts'
import { g1Batch9DictionaryGeometry, validateG1Batch9DictionaryReview, validateG1Batch9DictionaryBundle } from './hanja-stroke-dictionary-g1-batch9.ts'
import { g1Batch10DictionaryGeometry, validateG1Batch10DictionaryReview, validateG1Batch10DictionaryBundle } from './hanja-stroke-dictionary-g1-batch10.ts'
import { g1Batch11DictionaryGeometry, validateG1Batch11DictionaryReview, validateG1Batch11DictionaryBundle } from './hanja-stroke-dictionary-g1-batch11.ts'
import { g1Batch12DictionaryGeometry, validateG1Batch12DictionaryReview, validateG1Batch12DictionaryBundle } from './hanja-stroke-dictionary-g1-batch12.ts'
import { g1Batch13DictionaryGeometry, validateG1Batch13DictionaryReview, validateG1Batch13DictionaryBundle } from './hanja-stroke-dictionary-g1-batch13.ts'
import { g1Batch14DictionaryGeometry, validateG1Batch14DictionaryReview, validateG1Batch14DictionaryBundle } from './hanja-stroke-dictionary-g1-batch14.ts'
import { g1Batch15DictionaryGeometry, validateG1Batch15DictionaryReview, validateG1Batch15DictionaryBundle } from './hanja-stroke-dictionary-g1-batch15.ts'
import { g1Batch16DictionaryGeometry, validateG1Batch16DictionaryReview, validateG1Batch16DictionaryBundle } from './hanja-stroke-dictionary-g1-batch16.ts'
import { g2Batch2DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch2.ts'
import { g2Batch3DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch3.ts'
import { g2Batch4DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch4.ts'
import { g2Batch5DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch5.ts'
import { g2Batch6DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch6.ts'
import { g2Batch7DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch7.ts'
import { g2Batch8DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch8.ts'
import { g2Batch9DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch9.ts'
import { g2Batch10DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-batch10.ts'
import { g2XiDictionaryReference } from '../lib/hanja-stroke-dictionary-g2-xi.ts'
import { g2ShengDictionaryReference } from '../lib/hanja-stroke-dictionary-g2-sheng.ts'
import { g2LanLuDictionaryReference } from '../lib/hanja-stroke-dictionary-g2-lan-lu.ts'
import { g2QiongDictionaryReference } from '../lib/hanja-stroke-dictionary-g2-qiong.ts'
import { g2GeometryBatch1DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch1.ts'
import { g2GeometryBatch2DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch2.ts'
import { g2GeometryBatch3DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch3.ts'
import { g2GeometryBatch4DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch4.ts'
import { g2GeometryBatch5DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch5.ts'
import { g2GeometryBatch6DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch6.ts'
import { g2GeometryBatch7DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch7.ts'
import { g2GeometryBatch8DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch8.ts'
import { g2GeometryBatch9DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch9.ts'
import { g2GeometryBatch10DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch10.ts'
import { g2GeometryBatch11DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch11.ts'
import { g2GeometryBatch12DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch12.ts'
import { g2GeometryBatch13DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch13.ts'
import { g2GeometryBatch14DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch14.ts'
import { g2GeometryBatch15DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch15.ts'
import { g2GeometryBatch16DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch16.ts'
import { g2GeometryBatch17DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch17.ts'
import { g2GeometryBatch18DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch18.ts'
import { g2GeometryBatch19DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch19.ts'
import { g2GeometryBatch20DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch20.ts'
import { g2GeometryBatch21DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch21.ts'
import { g2GeometryBatch22DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch22.ts'
import { g2GeometryBatch23DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch23.ts'
import { g2GeometryBatch24DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch24.ts'
import { g2GeometryBatch25DictionaryReference } from '../lib/hanja-stroke-dictionary-g2-geometry-batch25.ts'
import { special2Batch1DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch1.ts'
import { special2Batch2DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch2.ts'
import { special2Batch3DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch3.ts'
import { special2Batch4DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch4.ts'
import { special2Batch5DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch5.ts'
import { special2Batch6DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch6.ts'
import { special2Batch7DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch7.ts'
import { special2Batch8DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch8.ts'
import { special2Batch9DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch9.ts'
import { special2Batch10DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch10.ts'
import { special2Batch11DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch11.ts'
import { special2Batch12DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch12.ts'
import { special2Batch13DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch13.ts'
import { special2Batch14DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch14.ts'
import { special2Batch15DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch15.ts'
import { special2Batch16DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch16.ts'
import { special2Batch17DictionaryReference } from '../lib/hanja-stroke-dictionary-special2-batch17.ts'
import { g1Batch1DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch1.ts'
import { g1Batch2DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch2.ts'
import { g1Batch3DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch3.ts'
import { g1Batch4DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch4.ts'
import { g1Batch5DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch5.ts'
import { g1Batch6DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch6.ts'
import { g1Batch7DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch7.ts'
import { g1Batch8DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch8.ts'
import { g1Batch9DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch9.ts'
import { g1Batch10DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch10.ts'
import { g1Batch11DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch11.ts'
import { g1Batch12DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch12.ts'
import { g1Batch13DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch13.ts'
import { g1Batch14DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch14.ts'
import { g1Batch15DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch15.ts'
import { g1Batch16DictionaryReference } from '../lib/hanja-stroke-dictionary-g1-batch16.ts'
import {
  HANJA_DICTIONARY_SOURCE, HANJA_DICTIONARY_GEOMETRY_SOURCE, HANJA_DICTIONARY_STROKES,
  DICTIONARY_REFERENCES, dictionarySourceReference, dictionaryStrokeIndices,
  type DictionaryBundle, type HanjaDictionaryStrokeData,
} from '../lib/hanja-stroke-dictionary.ts'

type Medians = Parameters<typeof normalizeMedians>[0]
export type DictionaryCandidate = { character: string; medians: Medians; strokes?: readonly string[] }
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const read = (path: string) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
export const DICTIONARY_PROOF_PINS: Readonly<Record<string, string>> = {
  'docs/hanja-g4-ye-2026-09-14/originals.json': 'c56a6ddc7660e862fec2dbd70ef20936937d8dd9a51a0a963556ff81cd985c8b',
  'docs/hanja-g4-ye-2026-09-14/prior-candidate-paths.json': '29cfdd4d72a18aeb3cdb2e112f470acf42899de3aa54abd3f42cd21e59771dc6',
  'docs/hanja-g4-ye-2026-09-14/candidate-paths.json': '6e29407d402c0440291806c9cbd0ea351cc6c8731d5a33d089a654239156ba65',
  'docs/hanja-g4-ye-2026-09-14/corrections.json': '6a6845180458168d9309a3a858f05f85445a4802f96a441e1199f0497571bfd1',
  'docs/hanja-g4-ye-2026-09-14/observations.json': '048c5dfa0f93cba1a25f929b8bf250e0a2f38f967aca585d975c45153a3112f8',
  'docs/hanja-g4-ye-2026-09-14/review.json': '1adec5d827a60b58dcd93e211e193d1858f040f55ff66176e453612c48c48774',
  'docs/hanja-g4-jang-jong-2026-09-14/originals.json': '00c46a9685a735f029f0f6b0a394b25b351f338bd83afd38b29495521b163d34',
  'docs/hanja-g4-jang-jong-2026-09-14/prior-candidate-paths.json': '08bd1ca270d011c8056d1b2f871a7d373e237ac959336e4537524ac79d7711e4',
  'docs/hanja-g4-jang-jong-2026-09-14/candidate-paths.json': '17ddd9d9baa4595ef2c7db37a69be537960b2678c4ebca64a89a3c28ebf41ca5',
  'docs/hanja-g4-jang-jong-2026-09-14/corrections.json': 'b3f29fd743ac508b98c3f1e17c444c0e8fb3ae803554b77f7292769b22ddfe2d',
  'docs/hanja-g4-jang-jong-2026-09-14/observations.json': 'ef23f5a91613c2afddeeac6afbf29fa533a0f901d4d80f7d18936c1955f69e72',
  'docs/hanja-g4-jang-jong-2026-09-14/review.json': 'a09f1363158dfbb6300aae8c48d732468073d182215c0412fa1613ea3e8830f1',
  'docs/hanja-g4-wi-pung-2026-09-14/originals.json': '1ac56d47a87d667760917ff92d16c9f052827e5b76f768f22b5fd9db2bc87d6d',
  'docs/hanja-g4-wi-pung-2026-09-14/prior-candidate-paths.json': '9b6fe73188b1889bda03437019b5872f0487d84d6358078b1446bf50bfdb3b70',
  'docs/hanja-g4-wi-pung-2026-09-14/candidate-paths.json': '044ad26275cc0a18e333417d2218ef1fec09de77697a239c98d0d64bc722f5df',
  'docs/hanja-g4-wi-pung-2026-09-14/corrections.json': '2d9eed6c801b77efa74b763ed6f90752579f113cdd18363541724148a574df53',
  'docs/hanja-g4-wi-pung-2026-09-14/observations.json': '838ec06d1f08b2d93dd5b626703f0394981d0732962adaa7844e5b89f01ca623',
  'docs/hanja-g4-wi-pung-2026-09-14/review.json': 'd4adb0cffda065780f7ded7bc2c60419cb6746c9fa54cd9371c64af7aca178c7',
  'docs/hanja-g4-ek-po-geun-2026-09-14/originals.json': '63d15ac14564f5640f81659a28ec2dd6eef596d4a3f342587421e541977f6644',
  'docs/hanja-g4-ek-po-geun-2026-09-14/prior-candidate-paths.json': '9b560d8b10a643587f2f260916b78b3a43208075b2fc2080a60d800e455d190f',
  'docs/hanja-g4-ek-po-geun-2026-09-14/candidate-paths.json': 'd2b081ad849d856ed4069e469680d0463d2c06854fd2eede367b85bc99a54d08',
  'docs/hanja-g4-ek-po-geun-2026-09-14/corrections.json': '2ac054235f6dacd8b7da3c1460f81f854eb092242eaa23a7a80d2f3c479c95c7',
  'docs/hanja-g4-ek-po-geun-2026-09-14/observations.json': '34be6eceefc11bc26b767adfd261c0f6fefd50dc08ea5860d4d8c28931a31345',
  'docs/hanja-g4-ek-po-geun-2026-09-14/review.json': 'cdae941e0f6123ea540335789f7cba4c6aa575d02cbff37e494470b86321262b',
  'docs/hanja-g3ii-pye-2026-09-13/originals.json': '35b7f280db9dab023b1d0afa6729e5438b98ee864161b23f94c2ea8d8e88c822',
  'docs/hanja-g3ii-pye-2026-09-13/corrections.json': '972354bc2a548e393010d00f3351272f9522053b009b10d8be16bd9d67624824',
  'docs/hanja-g3ii-pye-2026-09-13/candidate-paths.json': '72cd1b09acaf17870f4e5761cfb504807876f8733a5d1ad2b13a1be889cfcbe1',
  'docs/hanja-g3ii-pye-2026-09-13/observations.json': '9972837f8a54b241096b4c2b3cd109df3a78c18b121a6bc3e8814c3e80ec050e',
  'docs/hanja-g3ii-pye-2026-09-13/sources.json': 'b0020dcc00b9169a693189ba3cf576ceb9e3a3d5e030d8ea3e040c7afd80576b',
  'docs/hanja-g3ii-pye-2026-09-13/review.json': '940f772e8bc3b67d686e7c5784b2a839d870a2486221e10acbee2ebffb7de547',
  'docs/hanja-g3ii-pye-count-2026-09-13/sources.json': 'bba8fd7b4e8671d2e980c6182830f2c8c7f270a97599a0ad5cb5dc2de327ed31',
  'docs/hanja-g3ii-rabbit-2026-09-13/originals.json': '565eeffffd60e07c6f054b5652a60bfc8b810310272cdc98a309986717dd9310',
  'docs/hanja-g3ii-rabbit-2026-09-13/corrections.json': '8afb1f4404a4514522a3e5501fab168969d32e06011de4fdc43d648baeeaebc2',
  'docs/hanja-g3ii-rabbit-2026-09-13/candidate-paths.json': '48e3ca61a982cb1507f0262fcadd963a95747d5cba7d9e5d84a2644b18b94a58',
  'docs/hanja-g3ii-rabbit-2026-09-13/observations.json': '63ab3c17716ef3da6e7be9fe62e3835e6c744ad468ae364030676d63dcc340fc',
  'docs/hanja-g3ii-rabbit-2026-09-13/review.json': 'b294d7b3ff0402827c92ccc52ff9d6aa56055ad1456660b820b43aa30daa4003',
  'docs/hanja-g3ii-rabbit-2026-09-13/sources.json': 'e68b9a19a03aa8d351f4b0f521d5706aa56f02548745d218ee52ef58c7cb4a28',
  'docs/hanja-g3ii-rabbit-2026-09-13/form-resolution.json': '2e178b02c53a5aaa75bc06a92912ae8eeb5737a1bcafd40848332d9f61514be0',
  'docs/hanja-g3ii-batch13-2026-09-13/root-rabbit-review.json': '3937bb9fe3f924fabe44293cea1d1548fb7b6793a92b80bc037c8b30570a74ef',
  'docs/hanja-g3ii-walk-4-2026-09-13/originals.json': '3337ca1ca0844e46e7b699002952e803418ee888f2a60956492ccd209ce98b07',
  'docs/hanja-g3ii-walk-4-2026-09-13/corrections.json': '27f6b9df64985cd49251b6dbb7efa66bb0ca1e0edef136545ef11d164dc82975',
  'docs/hanja-g3ii-walk-4-2026-09-13/observations.json': '487824b99172ff33f512773f5f83c23e86c2a20d3eb927b77b547e1672352a31',
  'docs/hanja-g3ii-walk-4-2026-09-13/candidate-paths.json': '33d6443543b1b4809af7406016641316e90e9d3ffd638e7c823d9459ec6306f8',
  'docs/hanja-g3ii-walk-4-2026-09-13/review.json': '9acf5db467609f2bb6d2fd23dca75b61fddf5f897be7b0b477a1e895f48c4a87',
  'docs/hanja-g3ii-bun-ja-2026-09-13/originals.json': '3029c0edf3131c63cf41b133f2d6d5ed3505bf9fc89a6cca595e82783db74908',
  'docs/hanja-g3ii-bun-ja-2026-09-13/corrections.json': 'e912e95a5fc05ae9db5d579762ea5ded9d50814b0cb24b98fd4554e5fb20f829',
  'docs/hanja-g3ii-bun-ja-2026-09-13/observations.json': '8a614fbbec1a255e1bba7c7e1c6dfe14e0e3528e0f2527a16e84dc246a25d915',
  'docs/hanja-g3ii-bun-ja-2026-09-13/candidate-paths.json': 'd97147c9fccaec3fe45681f8015c622f4253478855ba85a02dc470833961c24b',
  'docs/hanja-g3ii-bun-ja-2026-09-13/review.json': 'e05ddc52b19c21c05c5c59d8f3b0c232d4fc6cb0f18d4a032f5dc781ad2626b2',
  'docs/hanja-g3ii-sam-pung-2026-09-13/originals.json': '4ee5ef9597f2c656ce8f0792f6d3e3db9735385f57786f3f5459b9e5f3cda257',
  'docs/hanja-g3ii-sam-pung-2026-09-13/candidate-paths.json': '15a69cc6e275966fa173125d8a96281085b8ee266f76405e62d13f6bad84ee41',
  'docs/hanja-g3ii-sam-pung-2026-09-13/review.json': 'e5929e944b1a1f9f044f5f4cf6abdba00f1eadc7c993cef27803fa26de37915b',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/sources.json': '9c446f8e8475b71c657b884300b648dd508d27432e410aadaaba13d5010f1f98',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/observations.json': 'a87ee0996533aa8a45f48c17712a609c1023f9e32d732a20e0c369e9f22efb32',
  'docs/hanja-g3ii-dictionary-12-2026-09-13/review.json': 'a03a988581ae438f9db5e08fe6846854f0d343b1b2f2d89552a70a39b7409314',
  'docs/hanja-g3ii-direction-3-2026-09-13/direction-review.json': 'fb78cd80c63793d4edb5f0ce34adc7b9851207c39c69b5a905425fcddef25c78',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/candidate-paths.json': 'f180a3b12dba2e4e260adad2d2fd67804e3e7f97671f934a6c9b4b2ac27c507d',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/originals.json': '1af04d53757249d03adfed126e40659ba96d82046213a179eb8594d607380d84',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/donors.json': 'b83dbee67088e4b0163672f171453355b899e266ec83d27e8036ade902eb35bf',
  'docs/hanja-g3ii-gyeol-mun-2026-09-13/review.json': '7a50a6ecc20a69e8311a57cf85960288735910cb7f0c66f890fad7ebdd413aef',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/review-a.json': 'ab877fcc6bcb0d24f78b0bfaa4890b1da76e7e1edb131f1bfa1f105462b5cd16',
  'docs/hanja-g3ii-crosscheck-63-2026-09-13/source-matrix.json': 'd278ec44ac5c0f3535fa0b91ce69446b9aad375ad1ac1094d0b58952155233ee',
  'docs/hanja-g3ii-missing-17-2026-09-13/research-provenance.json': 'fbd7dcdd659bacd098b80849e57e4743dc7dc0b4302c2be63bebf889d0833a46',
}
export function validateDictionaryProofs(readProof: (path: string) => string = read) {
  validateJaDictionaryProofs(readProof)
  for (const [path, expected] of Object.entries(DICTIONARY_PROOF_PINS)) {
    if (createHash('sha256').update(readProof(path)).digest('hex') !== expected) throw new Error('Dictionary proof mismatch: ' + path)
  }
}
const oldDir = 'docs/hanja-g3ii-gyeol-mun-2026-09-13/'
const fullReviewDir = 'docs/hanja-g3ii-sam-pung-2026-09-13/'
const bunJaDir = 'docs/hanja-g3ii-bun-ja-2026-09-13/'
const walkFourDir = 'docs/hanja-g3ii-walk-4-2026-09-13/'
const rabbitDir = 'docs/hanja-g3ii-rabbit-2026-09-13/'
const pyeDir = 'docs/hanja-g3ii-pye-2026-09-13/'
const g4Dir = 'docs/hanja-g4-corrections-2026-09-14/'
const ekPoGeunDir = 'docs/hanja-g4-ek-po-geun-2026-09-14/'
const wiPungDir = 'docs/hanja-g4-wi-pung-2026-09-14/'
const jangJongDir = 'docs/hanja-g4-jang-jong-2026-09-14/'
const yeDir = 'docs/hanja-g4-ye-2026-09-14/'
type OriginalSource = { name: string; sha256: string; entries: { glyph: string; medians: Medians }[] }
type Donor = { glyph: string; paths: string[]; hash: string; [key: string]: unknown }
function originals() {
  const sources = JSON.parse(read(oldDir + 'originals.json')) as OriginalSource[]
  const source = sources.find(s => s.name === 'MM')
  const fullSource = JSON.parse(read(fullReviewDir + 'originals.json')) as OriginalSource
  const bunJaSource = JSON.parse(read(bunJaDir + 'originals.json')) as OriginalSource
  const walkFourSource = JSON.parse(read(walkFourDir + 'originals.json')) as OriginalSource
  const rabbitSource = JSON.parse(read(rabbitDir + 'originals.json')) as OriginalSource
  const pyeSource = JSON.parse(read(pyeDir + 'originals.json')) as OriginalSource
  const ekPoGeunSource = JSON.parse(read(ekPoGeunDir + 'originals.json')) as OriginalSource
  const wiPungSource = JSON.parse(read(wiPungDir + 'originals.json')) as OriginalSource
  const jangJongSource = JSON.parse(read(jangJongDir + 'originals.json')) as OriginalSource
  const yeSource = JSON.parse(read(yeDir + 'originals.json')) as OriginalSource
  const g4Sources = JSON.parse(read('docs/hanja-g4-chaek-hoe-ja-2026-09-14/originals.json')) as {
    sources: { name: string; sourceSha256: string; entries: OriginalSource['entries'] }[]
  }
  const g4Source = g4Sources.sources.find(s => s.name === 'Make Me a Hanzi')
  if (!source || source.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || fullSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || bunJaSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || walkFourSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || rabbitSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || pyeSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || g4Source?.sourceSha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || ekPoGeunSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || wiPungSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || jangJongSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256
    || yeSource.sha256 !== HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256) throw new Error('Dictionary corpus mismatch')
  return [...source.entries, ...fullSource.entries, ...bunJaSource.entries, ...walkFourSource.entries, ...pyeSource.entries, ...rabbitSource.entries, ...g4Source.entries, ...ekPoGeunSource.entries, ...wiPungSource.entries, ...jangJongSource.entries, ...yeSource.entries]
}
const points = (path: string) => {
  if (!/^M[-.\d]+ [-.\d]+(?: L[-.\d]+ [-.\d]+)+$/.test(path)) throw new Error('Dictionary path syntax')
  return [...path.matchAll(/[ML]([-.\d]+) ([-.\d]+)/g)].map(m => [+m[1], +m[2]])
}
const bounds = (paths: readonly string[]) => {
  const p = paths.flatMap(points)
  return [Math.min(...p.map(p => p[0])), Math.min(...p.map(p => p[1])), Math.max(...p.map(p => p[0])), Math.max(...p.map(p => p[1]))]
}
/** Only this explicit reviewed set may use locally reconstructed source geometry. */
export function dictionaryLocalGeometry(glyph: string) {
  if (g2GeometryBatch15DictionaryReference(glyph)) return buildG2GeometryBatch15DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch16DictionaryReference(glyph)) return buildG2GeometryBatch16DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch17DictionaryReference(glyph)) return buildG2GeometryBatch17DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch18DictionaryReference(glyph)) return buildG2GeometryBatch18DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch19DictionaryReference(glyph)) return buildG2GeometryBatch19DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch20DictionaryReference(glyph)) return buildG2GeometryBatch20DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch21DictionaryReference(glyph)) return buildG2GeometryBatch21DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch22DictionaryReference(glyph)) return buildG2GeometryBatch22DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch23DictionaryReference(glyph)) return buildG2GeometryBatch23DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch24DictionaryReference(glyph)) return buildG2GeometryBatch24DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (g2GeometryBatch25DictionaryReference(glyph)) return buildG2GeometryBatch25DictionaryBundle().characters.find(entry => entry.glyph === glyph)
  if (!g2GeometryBatch14DictionaryReference(glyph)) return undefined
  return buildG2GeometryBatch14DictionaryBundle().characters.find(entry => entry.glyph === glyph)
}

export function dictionaryGeometry(glyph: string, medians: Medians) {
  if (g2DictionaryReference(glyph)) return g2DictionaryGeometry(glyph, medians)
  if (g2FollowupDictionaryReference(glyph)) return g2FollowupDictionaryGeometry(glyph, medians)
  if (g2Batch2DictionaryReference(glyph)) return g2Batch2DictionaryGeometry(glyph, medians)
  if (g2Batch3DictionaryReference(glyph)) return g2Batch3DictionaryGeometry(glyph, medians)
  if (g2Batch4DictionaryReference(glyph)) return g2Batch4DictionaryGeometry(glyph, medians)
  if (g2Batch5DictionaryReference(glyph)) return g2Batch5DictionaryGeometry(glyph, medians)
  if (g2Batch6DictionaryReference(glyph)) return g2Batch6DictionaryGeometry(glyph, medians)
  if (g2Batch7DictionaryReference(glyph)) return g2Batch7DictionaryGeometry(glyph, medians)
  if (g2Batch8DictionaryReference(glyph)) return g2Batch8DictionaryGeometry(glyph, medians)
  if (g2Batch9DictionaryReference(glyph)) return g2Batch9DictionaryGeometry(glyph, medians)
  if (g2Batch10DictionaryReference(glyph)) return g2Batch10DictionaryGeometry(glyph, medians)
  if (g2XiDictionaryReference(glyph)) return g2XiDictionaryGeometry(glyph, medians)
  if (g2ShengDictionaryReference(glyph)) return g2ShengDictionaryGeometry(glyph, medians)
  if (g2LanLuDictionaryReference(glyph)) return g2LanLuDictionaryGeometry(glyph, medians)
  if (g2QiongDictionaryReference(glyph)) return g2QiongDictionaryGeometry(glyph, medians)
  if (g2GeometryBatch1DictionaryReference(glyph)) return g2GeometryBatch1DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch2DictionaryReference(glyph)) return g2GeometryBatch2DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch3DictionaryReference(glyph)) return g2GeometryBatch3DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch4DictionaryReference(glyph)) return g2GeometryBatch4DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch5DictionaryReference(glyph)) return g2GeometryBatch5DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch6DictionaryReference(glyph)) return g2GeometryBatch6DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch7DictionaryReference(glyph)) return g2GeometryBatch7DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch8DictionaryReference(glyph)) return g2GeometryBatch8DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch9DictionaryReference(glyph)) return g2GeometryBatch9DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch10DictionaryReference(glyph)) return g2GeometryBatch10DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch11DictionaryReference(glyph)) return g2GeometryBatch11DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch12DictionaryReference(glyph)) return g2GeometryBatch12DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch13DictionaryReference(glyph)) return g2GeometryBatch13DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch14DictionaryReference(glyph)) return g2GeometryBatch14DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch15DictionaryReference(glyph)) return g2GeometryBatch15DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch16DictionaryReference(glyph)) return g2GeometryBatch16DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch17DictionaryReference(glyph)) return g2GeometryBatch17DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch18DictionaryReference(glyph)) return g2GeometryBatch18DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch19DictionaryReference(glyph)) return g2GeometryBatch19DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch20DictionaryReference(glyph)) return g2GeometryBatch20DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch21DictionaryReference(glyph)) return g2GeometryBatch21DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch22DictionaryReference(glyph)) return g2GeometryBatch22DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch23DictionaryReference(glyph)) return g2GeometryBatch23DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch24DictionaryReference(glyph)) return g2GeometryBatch24DictionaryGeometry(glyph, medians)
  if (g2GeometryBatch25DictionaryReference(glyph)) return g2GeometryBatch25DictionaryGeometry(glyph, medians)
  if (special2Batch1DictionaryReference(glyph)) return special2Batch1DictionaryGeometry(glyph, medians)
  if (special2Batch2DictionaryReference(glyph)) return special2Batch2DictionaryGeometry(glyph, medians)
  if (special2Batch3DictionaryReference(glyph)) return special2Batch3DictionaryGeometry(glyph, medians)
  if (special2Batch4DictionaryReference(glyph)) return special2Batch4DictionaryGeometry(glyph, medians)
  if (special2Batch5DictionaryReference(glyph)) return special2Batch5DictionaryGeometry(glyph, medians)
  if (special2Batch6DictionaryReference(glyph)) return special2Batch6DictionaryGeometry(glyph, medians)
  if (special2Batch7DictionaryReference(glyph)) return special2Batch7DictionaryGeometry(glyph, medians)
  if (special2Batch8DictionaryReference(glyph)) return special2Batch8DictionaryGeometry(glyph, medians)
  if (special2Batch9DictionaryReference(glyph)) return special2Batch9DictionaryGeometry(glyph, medians)
  if (special2Batch10DictionaryReference(glyph)) return special2Batch10DictionaryGeometry(glyph, medians)
  if (special2Batch11DictionaryReference(glyph)) return special2Batch11DictionaryGeometry(glyph, medians)
  if (special2Batch12DictionaryReference(glyph)) return special2Batch12DictionaryGeometry(glyph, medians)
  if (special2Batch13DictionaryReference(glyph)) return special2Batch13DictionaryGeometry(glyph, medians)
  if (special2Batch14DictionaryReference(glyph)) return special2Batch14DictionaryGeometry(glyph, medians)
  if (special2Batch15DictionaryReference(glyph)) return special2Batch15DictionaryGeometry(glyph, medians)
  if (special2Batch16DictionaryReference(glyph)) return special2Batch16DictionaryGeometry(glyph, medians)
  if (special2Batch17DictionaryReference(glyph)) return special2Batch17DictionaryGeometry(glyph, medians)
  if (g1Batch1DictionaryReference(glyph)) return g1Batch1DictionaryGeometry(glyph, medians)
  if (g1Batch2DictionaryReference(glyph)) return g1Batch2DictionaryGeometry(glyph, medians)
  if (g1Batch3DictionaryReference(glyph)) return g1Batch3DictionaryGeometry(glyph, medians)
  if (g1Batch4DictionaryReference(glyph)) return g1Batch4DictionaryGeometry(glyph, medians)
  if (g1Batch5DictionaryReference(glyph)) return g1Batch5DictionaryGeometry(glyph, medians)
  if (g1Batch6DictionaryReference(glyph)) return g1Batch6DictionaryGeometry(glyph, medians)
  if (g1Batch7DictionaryReference(glyph)) return g1Batch7DictionaryGeometry(glyph, medians)
  if (g1Batch8DictionaryReference(glyph)) return g1Batch8DictionaryGeometry(glyph, medians)
  if (g1Batch9DictionaryReference(glyph)) return g1Batch9DictionaryGeometry(glyph, medians)
  if (g1Batch10DictionaryReference(glyph)) return g1Batch10DictionaryGeometry(glyph, medians)
  if (g1Batch11DictionaryReference(glyph)) return g1Batch11DictionaryGeometry(glyph, medians)
  if (g1Batch12DictionaryReference(glyph)) return g1Batch12DictionaryGeometry(glyph, medians)
  if (g1Batch13DictionaryReference(glyph)) return g1Batch13DictionaryGeometry(glyph, medians)
  if (g1Batch14DictionaryReference(glyph)) return g1Batch14DictionaryGeometry(glyph, medians)
  if (g1Batch15DictionaryReference(glyph)) return g1Batch15DictionaryGeometry(glyph, medians)
  if (g1Batch16DictionaryReference(glyph)) return g1Batch16DictionaryGeometry(glyph, medians)
  if (['響', '姉', '隷', '隣'].includes(glyph)) return jaDictionaryGeometry(glyph, medians)
  const ref = Object.hasOwn(DICTIONARY_REFERENCES, glyph) ? DICTIONARY_REFERENCES[glyph] : undefined
  if (!ref || hash(medians) !== ref.originalMediansSha256) throw new Error('Dictionary original medians mismatch: ' + glyph)
  let paths = normalizeMedians(medians)
  if (glyph === '紋') {
    const snapshot = (JSON.parse(read(oldDir + 'donors.json')) as Donor[]).find(d => d.glyph === '紅')
    if (!snapshot) throw new Error('Dictionary donor missing')
    const { hash: expected, ...donor } = snapshot
    if (hash(donor) !== expected || hash(HANJA_TEXTBOOK_STROKES.find(d => d.glyph === '紅')) !== expected) throw new Error('Dictionary reviewed donor mismatch')
    const from = bounds(snapshot.paths.slice(0, 6)), to = bounds(paths.slice(0, 6))
    const sx = (to[2] - to[0]) / (from[2] - from[0]), sy = (to[3] - to[1]) / (from[3] - from[1])
    if (!(sx > 0 && sy > 0)) throw new Error('Dictionary donor reflection')
    const round = (n: number) => Math.round(n * 10) / 10
    paths = paths.map((p, i) => i === 3 || i === 4
      ? points(snapshot.paths[i]).map(([x, y], j) => (j ? 'L' : 'M')
        + round(to[0] + (x - from[0]) * sx) + ' ' + round(to[1] + (y - from[1]) * sy)).join(' ')
      : p)
  }
  if (glyph === '慈') {
    const corrections = JSON.parse(read(bunJaDir + 'corrections.json')) as { glyph: string; entries: { stroke: number; path: string }[] }
    if (corrections.glyph !== glyph || !isDeepStrictEqual(corrections.entries.map(e => e.stroke), [4, 7, 11])) throw new Error('Dictionary correction set mismatch')
    paths = paths.map((path, i) => corrections.entries.find(e => e.stroke === i + 1)?.path ?? path)
  }
  if (ref.wholeGlyphReview === 'walk-four' || ref.wholeGlyphReview === 'rabbit' || ref.wholeGlyphReview === 'pye' || ref.wholeGlyphReview === 'g4-three' || ref.wholeGlyphReview === 'ek-po-geun' || ref.wholeGlyphReview === 'wi-pung' || ref.wholeGlyphReview === 'jang-jong' || ref.wholeGlyphReview === 'ye') {
    const correctionDir = ref.wholeGlyphReview === 'ye' ? yeDir : ref.wholeGlyphReview === 'jang-jong' ? jangJongDir : ref.wholeGlyphReview === 'wi-pung' ? wiPungDir : ref.wholeGlyphReview === 'ek-po-geun' ? ekPoGeunDir : ref.wholeGlyphReview === 'g4-three' ? g4Dir : ref.wholeGlyphReview === 'pye' ? pyeDir : ref.wholeGlyphReview === 'rabbit' ? rabbitDir : walkFourDir
    const corrections = JSON.parse(read(correctionDir + 'corrections.json')) as { entries: {
      glyph: string; sourceStrokeIndices: (number | null)[]; authored: { stroke: number; path: string }[]
    }[] }
    const recipe = corrections.entries.find(e => e.glyph === glyph)
    const indices = dictionaryStrokeIndices(glyph)
    if (!recipe || !isDeepStrictEqual(recipe.sourceStrokeIndices, indices)
      || !isDeepStrictEqual(recipe.authored.map(e => e.stroke), indices.flatMap((n, i) => n === null ? [i + 1] : []))) throw new Error('Dictionary correction set mismatch')
    paths = indices.map((n, i) => n === null ? recipe.authored.find(e => e.stroke === i + 1)!.path : paths[n - 1])
  }
  if (paths.length !== ref.strokes || hash(paths) !== ref.pathsSha256
    || paths.flatMap(points).some(p => p.some(n => !Number.isFinite(n) || n < 0 || n > 100))) throw new Error('Dictionary reconstructed geometry mismatch: ' + glyph)
  return { paths, pathsSha256: hash(paths) }
}
export function buildDictionaryBundle(candidates?: readonly DictionaryCandidate[]): DictionaryBundle {
  validateDictionaryProofs()
  const expectedOriginals = originals()
  const input = candidates ?? expectedOriginals.map(e => ({ character: e.glyph, medians: e.medians }))
  const byGlyph = new Map(input.map(e => [e.character, e]))
  const count = Object.keys(DICTIONARY_REFERENCES).length
  if (byGlyph.size !== count || input.length !== count || input.some(e => !Object.hasOwn(DICTIONARY_REFERENCES, e.character))) throw new Error('Dictionary candidate set mismatch')
  const frozen = [oldDir, fullReviewDir, bunJaDir, walkFourDir, rabbitDir, pyeDir, g4Dir, ekPoGeunDir, wiPungDir, jangJongDir, yeDir].flatMap(dir => (JSON.parse(read(dir + 'candidate-paths.json')) as { entries: { glyph: string; paths: string[] }[] }).entries)
  return {
    verificationSource: HANJA_DICTIONARY_SOURCE, geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE,
    characters: Object.keys(DICTIONARY_REFERENCES).map(glyph => {
      const paths = dictionaryGeometry(glyph, byGlyph.get(glyph)!.medians)
      if (!isDeepStrictEqual(paths.paths, frozen.find(e => e.glyph === glyph)?.paths)) throw new Error('Dictionary frozen candidate mismatch')
      return {
        glyph, verifiedAt: ['g4-three', 'ek-po-geun', 'wi-pung', 'jang-jong', 'ye'].includes(DICTIONARY_REFERENCES[glyph].wholeGlyphReview ?? '') ? '2026-09-14' : '2026-09-13', geometrySource: HANJA_DICTIONARY_GEOMETRY_SOURCE.sha256,
        geometryCorrection: 'dictionary-crosscheck-' + glyph.codePointAt(0)!.toString(16) + '-v1',
        sourceStrokeIndices: dictionaryStrokeIndices(glyph), ...paths, sourceReference: dictionarySourceReference(glyph),
      }
    }),
  }
}
export function validateDictionaryReview(review: HanjaDictionaryStrokeData, expectedStrokes: number) {
  if (g2DictionaryReference(review.glyph)) return validateG2DictionaryReview(review, expectedStrokes)
  if (g2FollowupDictionaryReference(review.glyph)) return validateG2FollowupDictionaryReview(review, expectedStrokes)
  if (g2Batch2DictionaryReference(review.glyph)) return validateG2Batch2DictionaryReview(review, expectedStrokes)
  if (g2Batch3DictionaryReference(review.glyph)) return validateG2Batch3DictionaryReview(review, expectedStrokes)
  if (g2Batch4DictionaryReference(review.glyph)) return validateG2Batch4DictionaryReview(review, expectedStrokes)
  if (g2Batch5DictionaryReference(review.glyph)) return validateG2Batch5DictionaryReview(review, expectedStrokes)
  if (g2Batch6DictionaryReference(review.glyph)) return validateG2Batch6DictionaryReview(review, expectedStrokes)
  if (g2Batch7DictionaryReference(review.glyph)) return validateG2Batch7DictionaryReview(review, expectedStrokes)
  if (g2Batch8DictionaryReference(review.glyph)) return validateG2Batch8DictionaryReview(review, expectedStrokes)
  if (g2Batch9DictionaryReference(review.glyph)) return validateG2Batch9DictionaryReview(review, expectedStrokes)
  if (g2Batch10DictionaryReference(review.glyph)) return validateG2Batch10DictionaryReview(review, expectedStrokes)
  if (g2XiDictionaryReference(review.glyph)) return validateG2XiDictionaryReview(review, expectedStrokes)
  if (g2ShengDictionaryReference(review.glyph)) return validateG2ShengDictionaryReview(review, expectedStrokes)
  if (g2LanLuDictionaryReference(review.glyph)) return validateG2LanLuDictionaryReview(review, expectedStrokes)
  if (g2QiongDictionaryReference(review.glyph)) return validateG2QiongDictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch1DictionaryReference(review.glyph)) return validateG2GeometryBatch1DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch2DictionaryReference(review.glyph)) return validateG2GeometryBatch2DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch3DictionaryReference(review.glyph)) return validateG2GeometryBatch3DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch4DictionaryReference(review.glyph)) return validateG2GeometryBatch4DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch5DictionaryReference(review.glyph)) return validateG2GeometryBatch5DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch6DictionaryReference(review.glyph)) return validateG2GeometryBatch6DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch7DictionaryReference(review.glyph)) return validateG2GeometryBatch7DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch8DictionaryReference(review.glyph)) return validateG2GeometryBatch8DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch9DictionaryReference(review.glyph)) return validateG2GeometryBatch9DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch10DictionaryReference(review.glyph)) return validateG2GeometryBatch10DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch11DictionaryReference(review.glyph)) return validateG2GeometryBatch11DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch12DictionaryReference(review.glyph)) return validateG2GeometryBatch12DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch13DictionaryReference(review.glyph)) return validateG2GeometryBatch13DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch14DictionaryReference(review.glyph)) return validateG2GeometryBatch14DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch15DictionaryReference(review.glyph)) return validateG2GeometryBatch15DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch16DictionaryReference(review.glyph)) return validateG2GeometryBatch16DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch17DictionaryReference(review.glyph)) return validateG2GeometryBatch17DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch18DictionaryReference(review.glyph)) return validateG2GeometryBatch18DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch19DictionaryReference(review.glyph)) return validateG2GeometryBatch19DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch20DictionaryReference(review.glyph)) return validateG2GeometryBatch20DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch21DictionaryReference(review.glyph)) return validateG2GeometryBatch21DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch22DictionaryReference(review.glyph)) return validateG2GeometryBatch22DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch23DictionaryReference(review.glyph)) return validateG2GeometryBatch23DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch24DictionaryReference(review.glyph)) return validateG2GeometryBatch24DictionaryReview(review, expectedStrokes)
  if (g2GeometryBatch25DictionaryReference(review.glyph)) return validateG2GeometryBatch25DictionaryReview(review, expectedStrokes)
  if (special2Batch1DictionaryReference(review.glyph)) return validateSpecial2Batch1DictionaryReview(review, expectedStrokes)
  if (special2Batch2DictionaryReference(review.glyph)) return validateSpecial2Batch2DictionaryReview(review, expectedStrokes)
  if (special2Batch3DictionaryReference(review.glyph)) return validateSpecial2Batch3DictionaryReview(review, expectedStrokes)
  if (special2Batch4DictionaryReference(review.glyph)) return validateSpecial2Batch4DictionaryReview(review, expectedStrokes)
  if (special2Batch5DictionaryReference(review.glyph)) return validateSpecial2Batch5DictionaryReview(review, expectedStrokes)
  if (special2Batch6DictionaryReference(review.glyph)) return validateSpecial2Batch6DictionaryReview(review, expectedStrokes)
  if (special2Batch7DictionaryReference(review.glyph)) return validateSpecial2Batch7DictionaryReview(review, expectedStrokes)
  if (special2Batch8DictionaryReference(review.glyph)) return validateSpecial2Batch8DictionaryReview(review, expectedStrokes)
  if (special2Batch9DictionaryReference(review.glyph)) return validateSpecial2Batch9DictionaryReview(review, expectedStrokes)
  if (special2Batch10DictionaryReference(review.glyph)) return validateSpecial2Batch10DictionaryReview(review, expectedStrokes)
  if (special2Batch11DictionaryReference(review.glyph)) return validateSpecial2Batch11DictionaryReview(review, expectedStrokes)
  if (special2Batch12DictionaryReference(review.glyph)) return validateSpecial2Batch12DictionaryReview(review, expectedStrokes)
  if (special2Batch13DictionaryReference(review.glyph)) return validateSpecial2Batch13DictionaryReview(review, expectedStrokes)
  if (special2Batch14DictionaryReference(review.glyph)) return validateSpecial2Batch14DictionaryReview(review, expectedStrokes)
  if (special2Batch15DictionaryReference(review.glyph)) return validateSpecial2Batch15DictionaryReview(review, expectedStrokes)
  if (special2Batch16DictionaryReference(review.glyph)) return validateSpecial2Batch16DictionaryReview(review, expectedStrokes)
  if (special2Batch17DictionaryReference(review.glyph)) return validateSpecial2Batch17DictionaryReview(review, expectedStrokes)
  if (g1Batch1DictionaryReference(review.glyph)) return validateG1Batch1DictionaryReview(review, expectedStrokes)
  if (g1Batch2DictionaryReference(review.glyph)) return validateG1Batch2DictionaryReview(review, expectedStrokes)
  if (g1Batch3DictionaryReference(review.glyph)) return validateG1Batch3DictionaryReview(review, expectedStrokes)
  if (g1Batch4DictionaryReference(review.glyph)) return validateG1Batch4DictionaryReview(review, expectedStrokes)
  if (g1Batch5DictionaryReference(review.glyph)) return validateG1Batch5DictionaryReview(review, expectedStrokes)
  if (g1Batch6DictionaryReference(review.glyph)) return validateG1Batch6DictionaryReview(review, expectedStrokes)
  if (g1Batch7DictionaryReference(review.glyph)) return validateG1Batch7DictionaryReview(review, expectedStrokes)
  if (g1Batch8DictionaryReference(review.glyph)) return validateG1Batch8DictionaryReview(review, expectedStrokes)
  if (g1Batch9DictionaryReference(review.glyph)) return validateG1Batch9DictionaryReview(review, expectedStrokes)
  if (g1Batch10DictionaryReference(review.glyph)) return validateG1Batch10DictionaryReview(review, expectedStrokes)
  if (g1Batch11DictionaryReference(review.glyph)) return validateG1Batch11DictionaryReview(review, expectedStrokes)
  if (g1Batch12DictionaryReference(review.glyph)) return validateG1Batch12DictionaryReview(review, expectedStrokes)
  if (g1Batch13DictionaryReference(review.glyph)) return validateG1Batch13DictionaryReview(review, expectedStrokes)
  if (g1Batch14DictionaryReference(review.glyph)) return validateG1Batch14DictionaryReview(review, expectedStrokes)
  if (g1Batch15DictionaryReference(review.glyph)) return validateG1Batch15DictionaryReview(review, expectedStrokes)
  if (g1Batch16DictionaryReference(review.glyph)) return validateG1Batch16DictionaryReview(review, expectedStrokes)
  if (['響', '姉', '隷', '隣'].includes(review.glyph)) return validateJaDictionaryReview(review, expectedStrokes)
  const expected = buildDictionaryBundle().characters.find(e => e.glyph === review.glyph)
  if (!expected || expected.paths.length !== expectedStrokes
    || !isDeepStrictEqual(review, { ...expected, verificationSource: HANJA_DICTIONARY_SOURCE.id })) throw new Error('Dictionary published entry mismatch')
}
export function validateDictionaryBundle(entries: readonly HanjaDictionaryStrokeData[] = HANJA_DICTIONARY_STROKES) {
  validateJaDictionaryBundle()
  validateG2DictionaryBundle()
  validateG2FollowupDictionaryBundle()
  validateG2Batch2DictionaryBundle()
  validateG2Batch3DictionaryBundle()
  validateG2Batch4DictionaryBundle()
  validateG2Batch5DictionaryBundle()
  validateG2Batch6DictionaryBundle()
  validateG2Batch7DictionaryBundle()
  validateG2Batch8DictionaryBundle()
  validateG2Batch9DictionaryBundle()
  validateG2Batch10DictionaryBundle()
  validateG2XiDictionaryBundle()
  validateG2ShengDictionaryBundle()
  validateG2LanLuDictionaryBundle()
  validateG2QiongDictionaryBundle()
  validateG2GeometryBatch1DictionaryBundle()
  validateG2GeometryBatch2DictionaryBundle()
  validateG2GeometryBatch3DictionaryBundle()
  validateG2GeometryBatch4DictionaryBundle()
  validateG2GeometryBatch5DictionaryBundle()
  validateG2GeometryBatch6DictionaryBundle()
  validateG2GeometryBatch7DictionaryBundle()
  validateG2GeometryBatch8DictionaryBundle()
  validateG2GeometryBatch9DictionaryBundle()
  validateG2GeometryBatch10DictionaryBundle()
  validateG2GeometryBatch11DictionaryBundle()
  validateG2GeometryBatch12DictionaryBundle()
  validateG2GeometryBatch13DictionaryBundle()
  validateG2GeometryBatch14DictionaryBundle()
  validateG2GeometryBatch15DictionaryBundle()
  validateG2GeometryBatch16DictionaryBundle()
  validateG2GeometryBatch17DictionaryBundle()
  validateG2GeometryBatch18DictionaryBundle()
  validateG2GeometryBatch19DictionaryBundle()
  validateG2GeometryBatch20DictionaryBundle()
  validateG2GeometryBatch21DictionaryBundle()
  validateG2GeometryBatch22DictionaryBundle()
  validateG2GeometryBatch23DictionaryBundle()
  validateG2GeometryBatch24DictionaryBundle()
  validateG2GeometryBatch25DictionaryBundle()
  validateSpecial2Batch1DictionaryBundle()
  validateSpecial2Batch2DictionaryBundle()
  validateSpecial2Batch3DictionaryBundle()
  validateSpecial2Batch4DictionaryBundle()
  validateSpecial2Batch5DictionaryBundle()
  validateSpecial2Batch6DictionaryBundle()
  validateSpecial2Batch7DictionaryBundle()
  validateSpecial2Batch8DictionaryBundle()
  validateSpecial2Batch9DictionaryBundle()
  validateSpecial2Batch10DictionaryBundle()
  validateSpecial2Batch11DictionaryBundle()
  validateSpecial2Batch12DictionaryBundle()
  validateSpecial2Batch13DictionaryBundle()
  validateSpecial2Batch14DictionaryBundle()
  validateSpecial2Batch15DictionaryBundle()
  validateSpecial2Batch16DictionaryBundle()
  validateSpecial2Batch17DictionaryBundle()
  validateG1Batch1DictionaryBundle()
  validateG1Batch2DictionaryBundle()
  validateG1Batch3DictionaryBundle()
  validateG1Batch4DictionaryBundle()
  validateG1Batch5DictionaryBundle()
  validateG1Batch6DictionaryBundle()
  validateG1Batch7DictionaryBundle()
  validateG1Batch8DictionaryBundle()
  validateG1Batch9DictionaryBundle()
  validateG1Batch10DictionaryBundle()
  validateG1Batch11DictionaryBundle()
  validateG1Batch12DictionaryBundle()
  validateG1Batch13DictionaryBundle()
  validateG1Batch14DictionaryBundle()
  validateG1Batch15DictionaryBundle()
  validateG1Batch16DictionaryBundle()
  const expected = buildDictionaryBundle().characters.map(e => ({ ...e, verificationSource: HANJA_DICTIONARY_SOURCE.id }))
  if (!isDeepStrictEqual(entries, expected)) throw new Error('Dictionary published bundle mismatch')
}
