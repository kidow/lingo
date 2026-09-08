import reviewed from '../public/hanja-strokes/textbook-reviewed.json' with { type: 'json' }
import type { HanjaTextbookStrokeData } from './hanja-strokes.ts'

export const HANJA_TEXTBOOK_SOURCE = {
  id: 'vivasam-high-2022',
  title: '비상교육 2022 개정 고등학교 한문(이동재) 필순 영상',
  publisher: '비상교육',
  url: 'https://text.vivasam.com/detail/186',
  viewerUrl: 'https://viewer.vivasam.com/qrviewer/viewer.html?qrcode=106502_171p_25_ST&teacher=false',
  manifestUrl: 'https://viewer.vivasam.com/VS/HS/CHI/106502/QR/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EA%B3%A0%EB%93%B1_%ED%95%9C%EB%AC%B8_%ED%95%9C%EB%AC%B8%20%EA%B5%90%EC%9C%A1%EC%9A%A9%20%EA%B8%B0%EC%B4%88%20%ED%95%9C%EC%9E%90/data/data_high.xlsx',
  manifestSha256: '32853d2396dc4fe38362b9e51a828144d7e48889f60e28d850cae9fa2335620c',
} as const

// Only fully compared entries belong here; the discovery/review queue is separate.
const characters: readonly Omit<HanjaTextbookStrokeData, 'verificationSource'>[] = reviewed.characters
export const HANJA_TEXTBOOK_STROKES: readonly HanjaTextbookStrokeData[] = characters.map((entry) => ({
  ...entry,
  verificationSource: HANJA_TEXTBOOK_SOURCE.id,
}))
