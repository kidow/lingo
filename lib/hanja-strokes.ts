/** Order checked against the cumulative diagrams in 한국어문회 f37.hwp.
 * Paths are original, simplified centerlines; the source images are not bundled.
 * Never infer unlisted characters from radicals or a foreign stroke-order corpus.
 */
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
  /** One SVG path per pen-down stroke, in the observed source order. */
  paths: readonly string[]
}

export const HANJA_STROKES: readonly HanjaStrokeData[] = [
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
