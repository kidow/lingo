/** Read-only source audit and bundle preview. Never changes a review status or writes app data. */
import { createHash } from 'node:crypto'
import { execFile } from 'node:child_process'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual, parseArgs, promisify } from 'node:util'
import { HANJA_STROKES, type HanjaTextbookStrokeData } from '../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_SOURCE } from '../lib/hanja-stroke-textbook.ts'
import { normalizeMedians } from '../lib/hanja-stroke-geometry.ts'
import { CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE, parseCandidates } from './hanja-stroke-audit.ts'
import { TEXTBOOK_REVIEW_REGISTRY, textbookGeometrySource, validateTextbookReview, type TextbookReviewRegistry } from './hanja-stroke-textbook.ts'
import { textbookGeometry } from './hanja-stroke-textbook-corrections.ts'

export type TextbookManifest = {
  source: { id: string; sha256: string; url: string }
  entries: { glyph: string; manifestRow: string; videoFilename: string }[]
}
type Candidate = ReturnType<typeof parseCandidates>[number]
type Character = { glyph: string; strokes: number; readingGrade: string }

function indexBy<T>(items: readonly T[], key: (item: T) => string, label: string) {
  const result = new Map<string, T>()
  for (const item of items) {
    const value = key(item)
    if (!value || result.has(value)) throw new Error(`Duplicate or missing ${label}: ${value}`)
    result.set(value, item)
  }
  return result
}

function manifestIndex(manifest: TextbookManifest) {
  if (manifest.source.id !== HANJA_TEXTBOOK_SOURCE.id
    || manifest.source.sha256 !== HANJA_TEXTBOOK_SOURCE.manifestSha256) {
    throw new Error('Textbook manifest source changed')
  }
  indexBy(manifest.entries, (entry) => entry.manifestRow, 'manifest row')
  return indexBy(manifest.entries, (entry) => entry.glyph, 'manifest glyph')
}

function candidateIndexes(korean: readonly Candidate[], japanese: readonly Candidate[], hanzi: readonly Candidate[]) {
  return new Map([
    [CANDIDATE_SOURCE.sha256, indexBy(korean, (entry) => entry.character, 'Korean candidate glyph')],
    [JAPANESE_CANDIDATE_SOURCE.sha256, indexBy(japanese, (entry) => entry.character, 'Japanese candidate glyph')],
    [MAKE_ME_A_HANZI_SOURCE.sha256, indexBy(hanzi, (entry) => entry.character, 'Make Me a Hanzi candidate glyph')],
  ])
}

/** Checks the original glyph/row/video mapping even while every review is pending. */
export function inspectTextbookQueue(
  manifest: TextbookManifest,
  characters: readonly Character[],
  candidates: readonly Candidate[],
  ledger: TextbookReviewRegistry = TEXTBOOK_REVIEW_REGISTRY,
  japanese: readonly Candidate[] = [],
  hanzi: readonly Candidate[] = [],
) {
  const sources = manifestIndex(manifest)
  const catalog = indexBy(characters, (entry) => entry.glyph, 'catalog glyph')
  const geometry = candidateIndexes(candidates, japanese, hanzi)
  indexBy(ledger.records, (entry) => entry.glyph, 'review glyph')
  if (ledger.sourceId !== manifest.source.id || ledger.manifestSha256 !== manifest.source.sha256
    || ledger.geometrySha256 !== CANDIDATE_SOURCE.sha256) throw new Error('Textbook review source changed')
  return ledger.records.map((record) => {
    const source = sources.get(record.glyph)
    const character = catalog.get(record.glyph)
    const geometrySource = textbookGeometrySource(record)
    const candidate = geometry.get(geometrySource)!.get(record.glyph)
    if (!['pending', 'matched', 'conflict'].includes(record.status)) throw new Error(`Unknown review status: ${record.glyph}`)
    if (!source || source.manifestRow !== record.manifestRow || source.videoFilename !== record.videoFilename) {
      throw new Error(`Textbook original row mismatch: ${record.glyph}`)
    }
    if (!character || character.strokes !== record.expectedStrokes
      || !candidate || candidate.strokes.length !== record.candidateStrokes
      || candidate.medians.length !== candidate.strokes.length) {
      throw new Error(`Textbook candidate/catalog mismatch: ${record.glyph}`)
    }
    const paths = normalizeMedians(candidate.medians)
    return { glyph: record.glyph, grade: character.readingGrade, status: record.status, geometrySource,
      manifestRow: source.manifestRow, videoFilename: source.videoFilename,
      expectedStrokes: character.strokes, candidateStrokes: paths.length,
      countsMatch: character.strokes === paths.length,
      candidatePathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex') }
  })
}

/** Generates centerlines from each record's pinned corpus after all comparisons pass. */
export function buildTextbookBundle(
  manifest: TextbookManifest,
  characters: readonly Character[],
  candidates: readonly Candidate[],
  ledger: TextbookReviewRegistry = TEXTBOOK_REVIEW_REGISTRY,
  japanese: readonly Candidate[] = [],
  hanzi: readonly Candidate[] = [],
) {
  inspectTextbookQueue(manifest, characters, candidates, ledger, japanese, hanzi)
  const geometry = candidateIndexes(candidates, japanese, hanzi)
  const entries = ledger.records.filter((record) => record.status === 'matched').map((record) => {
    const geometrySource = textbookGeometrySource(record)
    const { paths, sourceStrokeIndices } = textbookGeometry(record, geometry.get(geometrySource)!.get(record.glyph)!.medians)
    const entry: HanjaTextbookStrokeData = {
      glyph: record.glyph, verificationSource: HANJA_TEXTBOOK_SOURCE.id,
      verifiedAt: record.reviewedAt ?? '', geometrySource,
      ...(record.geometryCorrection ? { geometryCorrection: record.geometryCorrection, sourceStrokeIndices } : {}),
      pathsSha256: createHash('sha256').update(JSON.stringify(paths)).digest('hex'),
      sourceReference: { manifestSha256: manifest.source.sha256, manifestRow: record.manifestRow,
        glyph: record.glyph, videoFilename: record.videoFilename },
      paths,
    }
    validateTextbookReview(entry, record.expectedStrokes, ledger)
    const { verificationSource: _source, ...published } = entry
    return published
  })
  const sourceMetadata = (source: typeof CANDIDATE_SOURCE | typeof JAPANESE_CANDIDATE_SOURCE | typeof MAKE_ME_A_HANZI_SOURCE) => ({
    url: source.url, sha256: source.sha256,
    license: source.sha256 === MAKE_ME_A_HANZI_SOURCE.sha256
      ? 'Arphic Public License; see ARPHICPL.txt and MAKEMEAHANZI-COPYING.txt in this directory.'
      : 'Arphic Public License; see ARPHICPL.txt and COPYING.txt in this directory.',
  })
  return {
    verificationSource: {
      id: HANJA_TEXTBOOK_SOURCE.id, publisher: HANJA_TEXTBOOK_SOURCE.publisher,
      title: HANJA_TEXTBOOK_SOURCE.title, url: HANJA_TEXTBOOK_SOURCE.url,
      viewerUrl: HANJA_TEXTBOOK_SOURCE.viewerUrl, manifestSha256: HANJA_TEXTBOOK_SOURCE.manifestSha256,
      scope: 'Publisher-reference comparison, not Korea Eomunhoe certification.',
    },
    geometrySource: sourceMetadata(CANDIDATE_SOURCE),
    ...(entries.some((entry) => entry.geometrySource !== CANDIDATE_SOURCE.sha256)
      ? { geometrySources: [CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE]
        .filter((source) => entries.some((entry) => entry.geometrySource === source.sha256)).map(sourceMetadata) }
      : {}),
    characters: entries,
  }
}

/** Candidate availability is inventory only, never a statement of Korean stroke-order correctness. */
export function analyzeTextbookCoverage(
  manifest: TextbookManifest,
  characters: readonly Character[],
  approvedGlyphs: ReadonlySet<string>,
  korean: readonly Candidate[],
  japanese: readonly Candidate[],
  hanzi: readonly Candidate[] = [],
) {
  const sources = manifestIndex(manifest)
  const catalog = indexBy(characters, (entry) => entry.glyph, 'catalog glyph')
  const ko = indexBy(korean, (entry) => entry.character, 'Korean candidate glyph')
  const ja = indexBy(japanese, (entry) => entry.character, 'Japanese candidate glyph')
  const mm = indexBy(hanzi, (entry) => entry.character, 'Make Me a Hanzi candidate glyph')
  const entries = [...sources.values()].filter((source) => catalog.has(source.glyph) && !approvedGlyphs.has(source.glyph))
    .map((source) => {
      const character = catalog.get(source.glyph)!
      const koreanCandidate = ko.get(source.glyph), japaneseCandidate = ja.get(source.glyph)
      return { ...source, grade: character.readingGrade, expectedStrokes: character.strokes,
        koreanStrokes: koreanCandidate?.strokes.length ?? null,
        japaneseStrokes: japaneseCandidate?.strokes.length ?? null,
        makeMeAHanziStrokes: mm.get(source.glyph)?.strokes.length ?? null,
        koreanCountMatches: koreanCandidate?.strokes.length === character.strokes,
        japaneseCountMatches: japaneseCandidate?.strokes.length === character.strokes,
        makeMeAHanziCountMatches: mm.get(source.glyph)?.strokes.length === character.strokes }
    })
  const exactCatalog = manifest.entries.filter((entry) => catalog.has(entry.glyph))
  const normalized = new Set(manifest.entries.map((entry) => entry.glyph.trim().normalize('NFC')))
  const normalizationOnly = [...normalized].filter((glyph) => catalog.has(glyph) && !sources.has(glyph))
  return {
    manifestCharacters: manifest.entries.length, exactCatalogMatches: exactCatalog.length,
    exactAlreadyApproved: exactCatalog.filter((entry) => approvedGlyphs.has(entry.glyph)).length,
    exactNewReviewTargets: entries.length,
    exactNewByGrade: Object.fromEntries([...new Set(entries.map((entry) => entry.grade))].map(
      (grade) => [grade, entries.filter((entry) => entry.grade === grade).length],
    )),
    normalizationOnlyNewGlyphs: normalizationOnly.filter((glyph) => !approvedGlyphs.has(glyph)),
    unmatchedAfterNormalization: [...normalized].filter((glyph) => !catalog.has(glyph)).sort(),
    geometryCandidates: {
      korean: entries.filter((entry) => entry.koreanStrokes !== null).length,
      koreanCountMatches: entries.filter((entry) => entry.koreanCountMatches).length,
      japanese: entries.filter((entry) => entry.japaneseStrokes !== null).length,
      japaneseCountMatches: entries.filter((entry) => entry.japaneseCountMatches).length,
      makeMeAHanzi: entries.filter((entry) => entry.makeMeAHanziStrokes !== null).length,
      makeMeAHanziCountMatches: entries.filter((entry) => entry.makeMeAHanziCountMatches).length,
      either: entries.filter((entry) => entry.koreanStrokes !== null || entry.japaneseStrokes !== null || entry.makeMeAHanziStrokes !== null).length,
      neither: entries.filter((entry) => entry.koreanStrokes === null && entry.japaneseStrokes === null && entry.makeMeAHanziStrokes === null).length,
    },
    entries,
  }
}

async function main() {
  const { values } = parseArgs({ options: {
    json: { type: 'boolean' }, bundle: { type: 'boolean' }, check: { type: 'boolean' },
    'manifest-file': { type: 'string' },
  } })
  if ([values.json, values.bundle, values.check].filter(Boolean).length > 1) {
    throw new Error('Choose only one of --json, --bundle or --check')
  }
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const manifestArgs = [join(root, 'scripts/hanja-stroke-textbook-source.py'), '--json']
  if (values['manifest-file']) manifestArgs.push('--manifest-file', resolve(values['manifest-file']))
  const sourceManifest = promisify(execFile)('python3', manifestArgs, {
    maxBuffer: 1_000_000, timeout: 60_000,
  }).then(({ stdout }) => JSON.parse(stdout) as TextbookManifest)
  const candidateData = Promise.all([CANDIDATE_SOURCE, JAPANESE_CANDIDATE_SOURCE, MAKE_ME_A_HANZI_SOURCE].map(async (source) => {
    const response = await fetch(source.url, { signal: AbortSignal.timeout(30_000) })
    if (!response.ok) throw new Error(`Candidate download: HTTP ${response.status}`)
    return parseCandidates(new Uint8Array(await response.arrayBuffer()), source)
  }))
  const folder = join(root, 'content/hanja/characters')
  const catalogData = readdir(folder).then((files) => Promise.all(files.filter((file) => file.endsWith('.json')).sort()
    .map(async (file) => JSON.parse(await readFile(join(folder, file), 'utf8')).characters as Character[])))
  const [manifest, [korean, japanese, hanzi], groups] = await Promise.all([sourceManifest, candidateData, catalogData])
  const characters = groups.flat()
  const queue = inspectTextbookQueue(manifest, characters, korean, TEXTBOOK_REVIEW_REGISTRY, japanese, hanzi)
  const bundle = buildTextbookBundle(manifest, characters, korean, TEXTBOOK_REVIEW_REGISTRY, japanese, hanzi)
  if (values.bundle) {
    console.log(JSON.stringify(bundle, null, 2))
    return
  }
  const coverage = analyzeTextbookCoverage(manifest, characters, new Set(HANJA_STROKES.map((entry) => entry.glyph)), korean, japanese, hanzi)
  let publishedBundleMatches: boolean | undefined
  if (values.check) {
    const published = JSON.parse(await readFile(join(root, 'public/hanja-strokes/textbook-reviewed.json'), 'utf8'))
    publishedBundleMatches = isDeepStrictEqual(bundle, published)
    if (!publishedBundleMatches) throw new Error('Published textbook bundle differs from the completed review registry')
  }
  const { entries, ...summary } = coverage
  console.log(JSON.stringify({ source: manifest.source, catalogCharacters: characters.length,
    runtimeApprovedCharacters: HANJA_STROKES.length, ...summary,
    queue: { total: queue.length, pending: queue.filter((entry) => entry.status === 'pending').length,
      matched: queue.filter((entry) => entry.status === 'matched').length,
      conflict: queue.filter((entry) => entry.status === 'conflict').length,
      countMismatchGlyphs: queue.filter((entry) => !entry.countsMatch).map((entry) => entry.glyph) },
    emittedCharacters: bundle.characters.length, publishedBundleMatches,
    ...(values.json ? { entries, queueEntries: queue } : {}),
  }, null, 2))
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => { console.error(error instanceof Error ? error.message : String(error)); process.exitCode = 1 })
}
