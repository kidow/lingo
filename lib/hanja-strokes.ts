/** Order checked against the cumulative diagrams in 한국어문회 f37.hwp.
 * Paths are simplified centerlines; imported geometry is separately attributed.
 * Official source images are not bundled.
 * Never infer unlisted characters from radicals or a foreign stroke-order corpus.
 */
import reviewedGrade8 from '../public/hanja-strokes/g8-reviewed.json' with { type: 'json' }
import reviewedGrade7II from '../public/hanja-strokes/g7-2-reviewed.json' with { type: 'json' }

export const HANJA_STROKE_SOURCE = {
  title: '필순 정정 및 500자 필순',
  url: 'https://www.hanja.re.kr/kccpt/exam/otherData.do?search_option=subject&search_text=%ED%95%84%EC%88%9C',
  document: 'f37.hwp',
  revision: '2010-03-22',
  sha256: '4e191bbee54edd6db595f16fc83a15b9929eba0e3e01095da1e828c70e10760c',
  verifiedAt: '2026-09-06',
} as const

export type HanjaStrokeData = {
  glyph: string
  sourceImage: string
  sourceRow: number
  /** Date this entry was visually compared with the official cumulative diagrams. */
  verifiedAt?: string
  /** SHA-256 of the independently reviewed upstream geometry, if imported. */
  geometrySource?: string
  /** One SVG path per pen-down stroke, in the observed source order. */
  paths: readonly string[]
}

export const HANJA_STROKES: readonly HanjaStrokeData[] = [
  ...reviewedGrade8.characters,
  ...reviewedGrade7II.characters,
  { glyph: '校', sourceImage: 'BIN0009.gif', sourceRow: 3, verifiedAt: '2026-09-07', paths: [
    'M12 38 L39 38', 'M27 15 L27 87', 'M26 40 Q22 57 10 70', 'M30 49 L40 61',
    'M58 16 L65 24', 'M46 33 L85 33', 'M55 42 Q50 50 44 55', 'M70 42 Q79 47 84 54',
    'M72 55 Q67 76 43 86', 'M51 58 Q65 78 87 85',
  ] },
  { glyph: '敎', sourceImage: 'BIN0009.gif', sourceRow: 2, verifiedAt: '2026-09-07', paths: [
    'M39 15 Q32 28 20 35', 'M22 24 L47 34', 'M12 43 L48 39',
    'M35 34 Q29 48 12 60', 'M22 55 L40 51 L34 63',
    'M29 64 Q40 70 36 85 Q34 90 26 84', 'M14 78 L48 67',
    'M63 15 Q63 33 51 48', 'M58 40 L85 35', 'M70 43 Q72 70 46 84',
    'M55 54 Q67 75 87 86',
  ] },
  { glyph: '九', sourceImage: 'BIN0009.gif', sourceRow: 6, verifiedAt: '2026-09-07', paths: [
    'M43 16 Q46 63 16 84', 'M19 42 L65 35 Q56 60 60 78 Q64 86 81 82 L84 66',
  ] },
  { glyph: '兄', sourceImage: 'BIN000F.gif', sourceRow: 5, verifiedAt: '2026-09-07', paths: [
    'M29 20 L32 47', 'M30 20 L70 20 L66 47', 'M32 47 L66 47',
    'M38 55 Q37 75 16 85', 'M56 49 L56 77 Q57 87 79 82 L83 68',
  ] },
  { glyph: '人', sourceImage: 'BIN0001.gif', sourceRow: 1, paths: [
    'M53 17 Q51 60 18 83', 'M50 43 Q60 70 83 83',
  ] },
  { glyph: '一', sourceImage: 'BIN0001.gif', sourceRow: 3, paths: [
    'M18 50 L82 50',
  ] },
  { glyph: '日', sourceImage: 'BIN0001.gif', sourceRow: 4, paths: [
    'M29 18 L29 83', 'M29 18 L72 18 L72 83', 'M29 50 L72 50', 'M29 81 L72 81',
  ] },
  { glyph: '十', sourceImage: 'BIN0002.gif', sourceRow: 9, paths: [
    'M18 43 L82 43', 'M50 16 L50 85',
  ] },
  { glyph: '大', sourceImage: 'BIN0004.gif', sourceRow: 1, paths: [
    'M18 40 L82 40', 'M52 15 Q53 63 18 84', 'M50 47 Q65 75 83 84',
  ] },
  { glyph: '木', sourceImage: 'BIN000A.gif', sourceRow: 16, paths: [
    'M20 37 L80 37', 'M50 15 L50 86', 'M49 41 Q38 65 17 78', 'M51 41 Q64 66 83 78',
  ] },
  { glyph: '月', sourceImage: 'BIN000C.gif', sourceRow: 9, paths: [
    'M32 18 L32 53 Q32 74 21 85', 'M32 18 L73 18 L73 82 Q73 88 63 81',
    'M32 40 L73 40', 'M32 61 L73 61',
  ] },
  { glyph: '二', sourceImage: 'BIN000C.gif', sourceRow: 23, paths: [
    'M26 31 L74 31', 'M18 72 L82 72',
  ] },
  { glyph: '土', sourceImage: 'BIN000E.gif', sourceRow: 2, paths: [
    'M25 42 L75 42', 'M50 18 L50 79', 'M17 79 L83 79',
  ] },
  { glyph: '火', sourceImage: 'BIN000F.gif', sourceRow: 9, paths: [
    'M25 37 Q31 44 33 55', 'M77 32 Q71 42 64 48',
    'M52 16 Q55 65 19 86', 'M51 51 Q64 76 83 84',
  ] },
  { glyph: '山', sourceImage: 'BIN0016.gif', sourceRow: 18, paths: [
    'M50 16 L50 79', 'M23 36 L23 79 L77 79', 'M77 36 L77 81',
  ] },
  { glyph: '三', sourceImage: 'BIN0016.gif', sourceRow: 21, paths: [
    'M25 25 L75 25', 'M32 49 L68 49', 'M17 77 L83 77',
  ] },
  { glyph: '小', sourceImage: 'BIN002A.gif', sourceRow: 25, paths: [
    'M50 17 L50 81 Q50 87 40 80', 'M30 41 Q26 57 18 67', 'M69 41 Q78 51 83 65',
  ] },
  { glyph: '水', sourceImage: 'BIN002B.gif', sourceRow: 7, paths: [
    'M50 16 L50 82 Q50 88 40 81', 'M18 40 L38 40 Q32 60 15 73',
    'M78 29 Q69 40 57 47', 'M52 42 Q65 66 85 76',
  ] },
]

const byGlyph = new Map(HANJA_STROKES.map((data) => [data.glyph, data]))

/** A glyph/count mismatch fails closed rather than animating an unverified form. */
export function hanjaStrokeData(character: { glyph: string; strokes: number }): HanjaStrokeData | null {
  const data = byGlyph.get(character.glyph)
  return data?.paths.length === character.strokes ? data : null
}

// A deliberately slow, constant pen speed for watching and following each stroke.
export const STROKE_DURATION = 650
export const STROKE_GAP = 180
export const strokeDuration = (count: number) => count * STROKE_DURATION + Math.max(0, count - 1) * STROKE_GAP
export const strokeNumberAt = (elapsed: number, count: number) => Math.min(count, Math.floor(Math.max(0, elapsed) / (STROKE_DURATION + STROKE_GAP)) + 1)
