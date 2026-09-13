/** Domestic publisher reference, distinct from exam-body certification. */
import reviewed from '../public/hanja-strokes/numbered-reviewed.json' with { type: 'json' }

export const HANJA_NUMBERED_SOURCE = {
  id: 'moyaland-numbered',
  publisher: '모야랜드',
  title: '모야랜드 한자 번호도해',
  url: 'https://www.moyaland.com/_new/hanja/',
  scope: 'Domestic publisher numbered order with separately reviewed Taiwan MOE direction; not exam-body certification.',
  publisherProvenanceSha256: 'fbd7dcdd659bacd098b80849e57e4743dc7dc0b4302c2be63bebf889d0833a46',
  sourceReviewSha256: '3ac416d82e1c3423d1330a38398ef6f4e07dc2e4f083db363e68cea4822e252e',
} as const

export const HANJA_NUMBERED_GEOMETRY_SOURCE = {
  url: 'https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt',
  sha256: 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee',
  license: 'Arphic Public License; see ARPHICPL.txt and MAKEMEAHANZI-COPYING.txt.',
} as const

type NumberedReference = {
  strokes: number
  diagramId: string
  diagramSha256: string
  directionId: string
  directionSha256: string
  pathsSha256: string
}

export const NUMBERED_REFERENCES: Readonly<Record<string, NumberedReference>> = {
  笛: {
    strokes: 11, diagramId: '1426582068',
    diagramSha256: '195b8499ae0ab432577394efe83538f62fb344c87851219f6b7093b1bfab1922',
    directionId: '31515', directionSha256: '89b3378bee7d925b5c4c4cfbd0a6df1862e50e590780c93ef1a1a133a92d947c',
    pathsSha256: 'ee63d6d13e47d1243a617e7bd287b6314aaabfd0e1c1465e62b80440d6c61bdf',
  },
  蹟: {
    strokes: 18, diagramId: '1427357210',
    diagramSha256: '4585b49068361cc31ed1a865369ea9c2ab7dfdd0a7bf5ec1cd267c19e1ee6df3',
    directionId: '36447', directionSha256: 'b3e217526856311e2c88b718642bd33a09432a575552f555edf7a677e6c0370b',
    pathsSha256: 'f38c85967b38104bac9e5fb22e3de005cb273e2c290b324ac7acc1ce0e77408f',
  },
  稚: {
    strokes: 13, diagramId: '1407917080',
    diagramSha256: 'd6efe729bdcca536060dd7d24a982323f2a8d603579d65f9f36490beb3d69091',
    directionId: '31258', directionSha256: '5b2836a30f9ecf57037a022b9ebf089ab53751631e7989e9d5efa4ff82fdc480',
    pathsSha256: '42d7617cd5e612b9e593ece7a634dc07f075368b2b0bb6b630d9a5e82ca2bbd0',
  },
}

export function numberedSourceReference(glyph: string) {
  if (!Object.hasOwn(NUMBERED_REFERENCES, glyph)) throw new Error('Unsupported numbered glyph')
  const ref = NUMBERED_REFERENCES[glyph]
  return {
    glyph,
    numberedDiagramUrl: 'https://www.moyaland.com/_new/data/item/' + ref.diagramId + '_l2',
    numberedDiagramSha256: ref.diagramSha256,
    directionUrl: 'https://stroke-order.learningweb.moe.edu.tw/dictFrame.jsp?ID=' + ref.directionId,
    directionEvidenceSha256: ref.directionSha256,
    publisherProvenanceSha256: HANJA_NUMBERED_SOURCE.publisherProvenanceSha256,
    sourceReviewSha256: HANJA_NUMBERED_SOURCE.sourceReviewSha256,
  }
}

export type HanjaNumberedStrokeData = {
  glyph: string
  verificationSource: 'moyaland-numbered'
  verifiedAt: string
  geometrySource: string
  geometryCorrection: string
  sourceStrokeIndices: readonly number[]
  pathsSha256: string
  paths: readonly string[]
  sourceReference: ReturnType<typeof numberedSourceReference>
  sourceImage?: never
  sourceRow?: never
  sourceWholeImage?: never
  geometryAuthored?: never
  strokeOrder?: never
}

export type NumberedBundle = {
  verificationSource: typeof HANJA_NUMBERED_SOURCE
  geometrySource: typeof HANJA_NUMBERED_GEOMETRY_SOURCE
  characters: readonly Omit<HanjaNumberedStrokeData, 'verificationSource'>[]
}

function sameSourceFields(value: unknown, expected: Readonly<Record<string, string>>) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const fields = value as Record<string, unknown>
  return Object.keys(fields).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, entry]) => Object.hasOwn(fields, key) && fields[key] === entry)
}

/** Browser-safe structural check. The prebuild validator verifies proofs and actual geometry. */
export function loadNumberedBundle(bundle: NumberedBundle): readonly HanjaNumberedStrokeData[] {
  if (!bundle || !sameSourceFields(bundle.verificationSource, HANJA_NUMBERED_SOURCE)
    || !sameSourceFields(bundle.geometrySource, HANJA_NUMBERED_GEOMETRY_SOURCE)
    || !Array.isArray(bundle.characters) || bundle.characters.length !== Object.keys(NUMBERED_REFERENCES).length) {
    throw new Error('Numbered bundle source mismatch')
  }
  const seen = new Set<string>()
  return bundle.characters.map(entry => {
    const ref = entry && Object.hasOwn(NUMBERED_REFERENCES, entry.glyph) ? NUMBERED_REFERENCES[entry.glyph] : undefined
    if (!ref || seen.has(entry.glyph) || entry.verifiedAt !== '2026-09-13'
      || entry.geometrySource !== HANJA_NUMBERED_GEOMETRY_SOURCE.sha256
      || entry.geometryCorrection !== 'reviewed-mm-' + entry.glyph.codePointAt(0)!.toString(16) + '-v1'
      || entry.pathsSha256 !== ref.pathsSha256 || !Array.isArray(entry.paths) || entry.paths.length !== ref.strokes
      || !entry.paths.every((path: unknown) => typeof path === 'string' && path.trim())
      || !Array.isArray(entry.sourceStrokeIndices) || entry.sourceStrokeIndices.length !== ref.strokes
      || entry.sourceStrokeIndices.some((stroke: unknown, index: number) => stroke !== index + 1)
      || !sameSourceFields(entry.sourceReference, numberedSourceReference(entry.glyph))
      || entry.sourceImage !== undefined || entry.sourceRow !== undefined || entry.sourceWholeImage !== undefined
      || entry.geometryAuthored !== undefined || entry.strokeOrder !== undefined) {
      throw new Error('Numbered bundle entry mismatch')
    }
    seen.add(entry.glyph)
    return { ...entry, verificationSource: HANJA_NUMBERED_SOURCE.id }
  })
}

export const HANJA_NUMBERED_STROKES = loadNumberedBundle(reviewed as NumberedBundle)
