import reviewed from '../public/hanja-strokes/textbook-reviewed.json' with { type: 'json' }
import type { HanjaTextbookStrokeData } from './hanja-strokes.ts'

export const HANJA_TEXTBOOK_SOURCE = {
  id: 'vivasam-high-2022',
  title: '비상교육 2022 개정 고등학교 한문(이동재) 필순 영상',
  publisher: '비상교육',
  url: 'https://text.vivasam.com/detail/186',
  viewerUrl: 'https://viewer.vivasam.com/qrviewer/viewer.html?qrcode=106502_171p_25_ST&teacher=false',
  manifestSha256: '32853d2396dc4fe38362b9e51a828144d7e48889f60e28d850cae9fa2335620c',
} as const

// Only fully compared entries belong here; the discovery/review queue is separate.
const characters: readonly Omit<HanjaTextbookStrokeData, 'verificationSource'>[] = reviewed.characters
export const HANJA_TEXTBOOK_STROKES: readonly HanjaTextbookStrokeData[] = characters.map((entry) => ({
  ...entry,
  verificationSource: HANJA_TEXTBOOK_SOURCE.id,
}))
