/** Publisher document evidence; source pages and foreign XML are never bundled. */
import reviewed from '../public/hanja-strokes/document-reviewed.json' with { type: 'json' }

export const HANJA_DOCUMENT_SOURCE = {
  id: 'dongyang-hanja3-note',
  title: '암기박사식 한자 능시 3급 쓰기노트',
  publisher: '동양문고 / 동양북스',
  url: 'https://dongyangbooks.com/book/book_view.asp?goods_code=979&menu_1=hanja&menu_2=han_hanja',
  downloadUrl: 'https://dongyangbooks.com/book/download.asp?no=352&bsno=6414',
  isbn: '9788983005991',
  archiveSha256: '3195ecb60797178be89e3013148c6c4dbfe609c4a65c60dd1701d7354bb2ac2e',
  archiveBytes: 77040295,
  documentSha256: 'c25485d2b26f9ea9c34c897ba41d953823ecdd07f65c81e05fef39b666782a48',
  documentBytes: 77369148,
  documentPages: 165,
  documentEntry: '한자능시 3급 쓰기노트.pdf',
} as const

/** Imported geometry is separate from the Korean order and supplemental direction evidence. */
export const HANJA_DOCUMENT_GEOMETRY_SOURCE = {
  url: 'https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsJa.txt',
  sha256: '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8',
  license: 'Arphic Public License; see ARPHICPL.txt and COPYING.txt in this directory.',
} as const

export const DOCUMENT_GLYPH_PAGES: Readonly<Record<string, number>> = { 阿: 35, 兔: 111 }

export type HanjaDocumentStrokeData = {
  glyph: string
  verificationSource: 'dongyang-hanja3-note'
  verifiedAt: string
  geometrySource: string
  geometryCorrection: string
  sourceStrokeIndices: readonly number[]
  pathsSha256: string
  paths: readonly string[]
  sourceReference: {
    documentSha256: string
    pdfPage: number
    printedPage: number
    glyph: string
    cumulativePanels: number
    directionEvidenceSha256: string
  }
  sourceImage?: never
  sourceRow?: never
  sourceWholeImage?: never
  geometryAuthored?: never
  strokeOrder?: never
}

export const DOCUMENT_VERIFICATION_METADATA = {
  id: HANJA_DOCUMENT_SOURCE.id,
  publisher: HANJA_DOCUMENT_SOURCE.publisher,
  title: HANJA_DOCUMENT_SOURCE.title,
  url: HANJA_DOCUMENT_SOURCE.url,
  downloadUrl: HANJA_DOCUMENT_SOURCE.downloadUrl,
  documentSha256: HANJA_DOCUMENT_SOURCE.documentSha256,
  scope: 'Korean publisher cumulative order with separately reviewed official direction evidence; not exam-body certification.',
} as const

if (reviewed.verificationSource.id !== HANJA_DOCUMENT_SOURCE.id
  || reviewed.verificationSource.documentSha256 !== HANJA_DOCUMENT_SOURCE.documentSha256
  || !Array.isArray(reviewed.characters)) throw new Error('Document bundle source mismatch')

const seen = new Set<string>()
const characters: readonly Omit<HanjaDocumentStrokeData, 'verificationSource'>[] = reviewed.characters

// Full cryptographic review is enforced by the build-time validator and audit.
export const HANJA_DOCUMENT_STROKES: readonly HanjaDocumentStrokeData[] = characters.map(entry => {
  const reference = entry.sourceReference
  if (!entry || !Object.hasOwn(DOCUMENT_GLYPH_PAGES, entry.glyph) || seen.has(entry.glyph)
    || entry.geometrySource !== HANJA_DOCUMENT_GEOMETRY_SOURCE.sha256
    || !Array.isArray(entry.paths) || entry.paths.length !== 8
    || !entry.paths.every(path => typeof path === 'string' && path.trim())
    || !reference || reference.glyph !== entry.glyph
    || reference.documentSha256 !== HANJA_DOCUMENT_SOURCE.documentSha256
    || reference.pdfPage !== DOCUMENT_GLYPH_PAGES[entry.glyph] || reference.printedPage !== reference.pdfPage
    || reference.cumulativePanels !== 8 || !/^[a-f0-9]{64}$/.test(reference.directionEvidenceSha256)
    || entry.sourceImage !== undefined || entry.sourceRow !== undefined || entry.sourceWholeImage !== undefined
    || entry.geometryAuthored !== undefined || entry.strokeOrder !== undefined) {
    throw new Error('Document bundle entry mismatch')
  }
  seen.add(entry.glyph)
  return { ...entry, verificationSource: HANJA_DOCUMENT_SOURCE.id }
})
