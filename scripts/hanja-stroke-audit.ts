/** Read-only audit. Candidate availability and matching counts NEVER approve playback. */
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { HANJA_STROKES, HANJA_STROKE_SOURCE, type HanjaEomunhoeStrokeData, type HanjaStrokeData } from '../lib/hanja-strokes.ts'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { applyReviewedSplit, SPLIT_CORRECTIONS } from './hanja-stroke-splits.ts'
import { validateTextbookReview } from './hanja-stroke-textbook.ts'
import { textbookGeometry } from './hanja-stroke-textbook-corrections.ts'
import { textbookAuthored } from './hanja-stroke-textbook-authored.ts'
import { validateDocumentReview, documentGeometry } from './hanja-stroke-documents.ts'
import { validateNumberedReview, numberedGeometry } from './hanja-stroke-numbered.ts'
import locations from './hanja-stroke-locations.json' with { type: 'json' }

export const CANDIDATE_SOURCE = {
  url: 'https://raw.githubusercontent.com/parsimonhi/animCJK/ec5e17cca76c87587790bcbce5ea0b4d4fb753d6/graphicsKo.txt',
  sha256: '7e703f34df54080281252a5c87a7106b85034b81fdbf93d37c07009a1448202e',
  license: 'Arphic Public License; reviewed subset and license in public/hanja-strokes/',
} as const

export const JAPANESE_CANDIDATE_SOURCE = {
  ...CANDIDATE_SOURCE,
  url: CANDIDATE_SOURCE.url.replace('graphicsKo.txt', 'graphicsJa.txt'),
  sha256: '2bcd1c6d186e5376c5f9202b4eae2eaeff13c2566675a55f1c9dd548a2ef31c8',
} as const

// Geometry only. Playback separately requires the complete review for its source category.
export const MAKE_ME_A_HANZI_SOURCE = {
  ...CANDIDATE_SOURCE,
  url: 'https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/graphics.txt',
  sha256: 'a28c478b5178e98f67f510b2d52fde08a69dc664654ef43498253b9b764d46ee',
} as const

type Character = { glyph: string; strokes: number; readingGrade: string }
type Candidate = { character: string; strokes: string[]; medians: number[][][] }
type Verified = HanjaStrokeData
type CandidateSource = typeof CANDIDATE_SOURCE | typeof JAPANESE_CANDIDATE_SOURCE | typeof MAKE_ME_A_HANZI_SOURCE
const wholeImages: Record<string, string> = { 回: 'BIN0036.bmp', 瓦: 'BIN0038.bmp', 臼: 'BIN0017.gif' }
const officialPages: Record<string, string> = locations.pages
const dotCorrections: Record<string, { image: string; row: number; originalCount: number; path: string }> = {
  者: { image: 'BIN0001.gif', row: 10, originalCount: 8, path: 'M60 46 L63 49' },
  都: { image: 'BIN0004.gif', row: 11, originalCount: 11, path: 'M49 41 L52 44' },
}

export function parseCandidates(bytes: Uint8Array, source: CandidateSource = CANDIDATE_SOURCE): Candidate[] {
  if (createHash('sha256').update(bytes).digest('hex') !== source.sha256) {
    throw new Error('Candidate source hash changed; review the upstream revision before continuing')
  }
  return Buffer.from(bytes).toString('utf8').trim().split('\n').map((line) => JSON.parse(line))
}

function indexCandidates(candidates: Candidate[]) {
  const byGlyph = new Map<string, Candidate>()
  for (const candidate of candidates) {
    if (typeof candidate.character !== 'string' || [...candidate.character].length !== 1 || byGlyph.has(candidate.character)) {
      throw new Error('Invalid or duplicate candidate character')
    }
    byGlyph.set(candidate.character, candidate)
  }
  return byGlyph
}

function validCandidate(candidate: Candidate | undefined): candidate is Candidate {
  return !!candidate && Array.isArray(candidate.strokes) && candidate.strokes.length > 0
    && candidate.strokes.every((path) => typeof path === 'string' && path.trim().startsWith('M'))
    && Array.isArray(candidate.medians) && candidate.medians.length === candidate.strokes.length
    && candidate.medians.every((points) => Array.isArray(points) && points.length >= 2
      && points.every((point) => Array.isArray(point) && point.length === 2 && point.every(Number.isFinite)))
}

/** Only this exact glyph/source/evidence combination has an approved order correction. */
function reviewedPaths(review: HanjaEomunhoeStrokeData, candidate: Candidate) {
  const split = SPLIT_CORRECTIONS[review.glyph]
  if (split || review.geometryCorrection === 'official-grass-v1' || review.geometryCorrection === 'official-seong-v1') {
    if (!split || review.geometryCorrection !== split.id || review.geometrySource !== CANDIDATE_SOURCE.sha256
      || review.sourceImage !== split.image || review.sourceRow !== split.row || review.sourceWholeImage
      || review.strokeOrder !== undefined || candidate.medians.length !== split.originalCount) {
      throw new Error(`Reviewed split correction mismatch: ${review.glyph}`)
    }
    const corrected = applyReviewedSplit(review.glyph, normalizeMedians(candidate.medians))
    if (JSON.stringify(review.sourceStrokeIndices) !== JSON.stringify(corrected.mapping)
      || review.pathsSha256 !== createHash('sha256').update(JSON.stringify(corrected.paths)).digest('hex')) {
      throw new Error(`Reviewed split provenance mismatch: ${review.glyph}`)
    }
    return corrected.paths
  }
  const dot = dotCorrections[review.glyph]
  if (dot || review.geometryCorrection || review.sourceStrokeIndices) {
    if (!dot || review.geometryCorrection !== 'official-dot-v1' || review.geometrySource !== CANDIDATE_SOURCE.sha256
      || review.sourceImage !== dot.image || review.sourceRow !== dot.row || review.sourceWholeImage
      || review.strokeOrder !== undefined || candidate.medians.length !== dot.originalCount) {
      throw new Error(`Reviewed dot correction mismatch: ${review.glyph}`)
    }
    const original = normalizeMedians(candidate.medians)
    const mapping = [1, 2, 3, 4, null, ...original.slice(4).map((_, index) => index + 5)]
    const paths = [...original.slice(0, 4), dot.path, ...original.slice(4)]
    if (JSON.stringify(review.sourceStrokeIndices) !== JSON.stringify(mapping)
      || review.pathsSha256 !== createHash('sha256').update(JSON.stringify(paths)).digest('hex')) {
      throw new Error(`Reviewed dot provenance mismatch: ${review.glyph}`)
    }
    return paths
  }
  const expectedOrder = review.glyph === '性' && review.geometrySource === CANDIDATE_SOURCE.sha256
    ? [1, 3, 2, 4, 5, 6, 7, 8] : undefined
  if (JSON.stringify(review.strokeOrder) !== JSON.stringify(expectedOrder)
    || (expectedOrder && (review.sourceImage !== 'BIN002A.gif' || review.sourceRow !== 21 || candidate.medians.length !== 8))) {
    throw new Error(`Reviewed stroke order mismatch: ${review.glyph}`)
  }
  return normalizeMedians(expectedOrder ? expectedOrder.map((index) => candidate.medians[index - 1]) : candidate.medians)
}

export function auditStrokes(characters: Character[], candidates: Candidate[], verified: readonly Verified[], japaneseCandidates: Candidate[] = [], hanziCandidates: Candidate[] = []) {
  const byGlyph = indexCandidates(candidates)
  const japaneseByGlyph = indexCandidates(japaneseCandidates)
  const hanziByGlyph = indexCandidates(hanziCandidates)
  const approved = new Map(verified.map((entry) => [entry.glyph, entry]))
  if (approved.size !== verified.length) throw new Error('Duplicate verified character')
  const entries = characters.map((character) => {
    const candidate = byGlyph.get(character.glyph)
    const review = approved.get(character.glyph)
    const textbookReview = review?.verificationSource === 'vivasam-high-2022'
    const textbookRecord = textbookReview ? validateTextbookReview(review, character.strokes) : undefined
    const authored = textbookRecord ? textbookAuthored(textbookRecord) : undefined
    const documentReview = review?.verificationSource === 'dongyang-hanja3-note'
    const documentRecord = documentReview ? validateDocumentReview(review, character.strokes) : undefined
    const numberedReview = review?.verificationSource === 'moyaland-numbered'
    if (numberedReview) validateNumberedReview(review, character.strokes)
    const publisherReview = textbookReview || documentReview || numberedReview
    const validEvidence = review && (publisherReview || (
      (review.verificationSource === undefined || review.verificationSource === 'eomunhoe-f37')
      && review.sourceReference === undefined && (review.sourceWholeImage === true
      ? review.sourceRow === undefined && wholeImages[review.glyph] === review.sourceImage
      : /^BIN[0-9A-F]{4}\.gif$/.test(review.sourceImage!) && Number.isInteger(review.sourceRow)
        && review.sourceRow! >= 1 && review.sourceRow! <= 25)))
    if (review && (!validEvidence || review.paths.length !== character.strokes)) {
      throw new Error(`Verified source/count mismatch: ${character.glyph}`)
    }
    const valid = validCandidate(candidate)
    const reviewedCandidate = review?.geometrySource === CANDIDATE_SOURCE.sha256
    const geometryCandidate = reviewedCandidate ? candidate
      : review?.geometrySource === JAPANESE_CANDIDATE_SOURCE.sha256 ? japaneseByGlyph.get(character.glyph)
        : (textbookReview || numberedReview) && review.geometrySource === MAKE_ME_A_HANZI_SOURCE.sha256 ? hanziByGlyph.get(character.glyph) : undefined
    // The textbook builder validates local authored provenance before looking for a corpus candidate.
    if (authored && JSON.stringify(review?.paths) !== JSON.stringify(authored.paths)) {
      throw new Error(`Reviewed authored geometry mismatch: ${character.glyph}`)
    }
    if (!authored && review?.geometrySource && (!validCandidate(geometryCandidate)
      || JSON.stringify(review.paths) !== JSON.stringify(textbookReview
        ? textbookGeometry(textbookRecord!, geometryCandidate.medians).paths
        : documentReview ? documentGeometry(documentRecord!, geometryCandidate.medians).paths
          : numberedReview ? numberedGeometry(review.glyph, geometryCandidate.medians).paths
          : reviewedPaths(review, geometryCandidate)))) {
      throw new Error(`Reviewed geometry mismatch: ${character.glyph}`)
    }
    if ((review?.strokeOrder || review?.geometryCorrection || review?.sourceStrokeIndices || review?.pathsSha256)
      && !review.geometrySource) throw new Error(`Missing correction source: ${character.glyph}`)
    if (review && !publisherReview && !review.sourceWholeImage
      && (locations.sha256 !== HANJA_STROKE_SOURCE.sha256
        || Array.from(officialPages[review.sourceImage!.slice(3, 7)] ?? '')[review.sourceRow! - 1] !== review.glyph)) {
      throw new Error(`Verified source/glyph mismatch: ${character.glyph}`)
    }
    const candidateStatus = !candidate ? 'missing' : !valid ? 'invalid'
      : candidate.strokes.length !== character.strokes ? 'count-mismatch'
      : reviewedCandidate ? textbookReview ? 'textbook-reviewed' : 'verified' : 'needs-official-review'
    return {
      glyph: character.glyph,
      grade: character.readingGrade,
      expectedStrokes: character.strokes,
      candidateStrokes: candidate?.strokes?.length ?? null,
      candidateStatus,
      // Keep publisher-reference comparisons distinct from the exam-body diagrams.
      playback: review ? numberedReview ? 'numbered-reviewed' : documentReview ? 'document-reviewed' : textbookReview ? 'textbook-reviewed' : 'verified' : 'unavailable',
      geometrySource: review?.geometrySource ?? null,
      evidence: review ? (publisherReview
        ? { source: review.verificationSource, ...review.sourceReference, reviewedAt: review.verifiedAt }
        : review.sourceWholeImage ? { image: review.sourceImage, wholeImage: true }
          : { image: review.sourceImage, row: review.sourceRow }) : null,
    }
  })
  const counts = (key: 'candidateStatus' | 'playback') => Object.fromEntries(
    [...new Set(entries.map((entry) => entry[key]))].map((status) => [status, entries.filter((entry) => entry[key] === status).length]),
  )
  return { source: CANDIDATE_SOURCE, supplementalSource: JAPANESE_CANDIDATE_SOURCE,
    // Candidate status remains the Korean corpus inventory; supplemental geometry is audited separately.
    supplementalCandidateTotal: japaneseCandidates.length,
    makeMeAHanziSource: MAKE_ME_A_HANZI_SOURCE, makeMeAHanziCandidateTotal: hanziCandidates.length,
    verificationSources: {
      eomunhoe: verified.filter((entry) => entry.verificationSource === undefined || entry.verificationSource === 'eomunhoe-f37').length,
      textbook: verified.filter((entry) => entry.verificationSource === 'vivasam-high-2022').length,
      documents: verified.filter((entry) => entry.verificationSource === 'dongyang-hanja3-note').length,
      numbered: verified.filter((entry) => entry.verificationSource === 'moyaland-numbered').length,
    },
    reviewedGeometry: { korean: verified.filter((entry) => entry.geometrySource === CANDIDATE_SOURCE.sha256).length,
      japanese: verified.filter((entry) => entry.geometrySource === JAPANESE_CANDIDATE_SOURCE.sha256).length,
      makeMeAHanzi: verified.filter((entry) => entry.geometrySource === MAKE_ME_A_HANZI_SOURCE.sha256).length },
    total: entries.length, candidateTotal: candidates.length,
    candidateStatus: counts('candidateStatus'), playback: counts('playback'), entries }
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const folder = join(root, 'content/hanja/characters')
  const characters: Character[] = (await Promise.all((await readdir(folder)).filter((file) => file.endsWith('.json')).sort()
    .map(async (file) => JSON.parse(await readFile(join(folder, file), 'utf8')).characters))).flat()
  const [korean, japanese, hanzi] = await Promise.all([CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE].map(async (source) => {
    const response = await fetch(source.url, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) throw new Error(`Candidate download: HTTP ${response.status}`)
    return parseCandidates(new Uint8Array(await response.arrayBuffer()), source)
  }))
  const report = auditStrokes(characters, korean, HANJA_STROKES, japanese, hanzi)
  if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2))
  else {
    const { entries, ...summary } = report
    console.log(JSON.stringify({ ...summary, mismatches: entries.filter((entry) => entry.candidateStatus === 'count-mismatch') }, null, 2))
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}
