/** Offline stage4 experiment: only reviewed position recipes change; the v2 engine is frozen. */
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual } from 'node:util'
import { comparePaths } from './hanja-component-geometry.ts'
import { validateInput, type InputSnapshot } from './hanja-component-pilot.ts'
import { knownHeldOutExclusions, passesScreen, SCREEN_THRESHOLDS, ELIGIBILITY_POLICY, type Phase2Split } from './hanja-component-phase2.ts'
import { buildLibrary, compose, digest, structureGroup, type ApprovedDonor,
  type CatalogCharacter, type ReviewedParts, type Library } from './hanja-component-synthesis.ts'

export const PHASE3_SPLIT_HASH = '82c340ef241cc0a7fd7df8de048e59e989ec92e83b11676d77516f15dc3704d7'
export const PHASE3_ARCHIVE = 'docs/hanja-component-phase2-2026-09-09/replay-input.json'
export const PHASE3_ARCHIVE_SHA256 = '3b0ad533655bc596704bf529d2accf9a001f203db8381e89d0a4a792f422b70a'
export const PHASE3_ARCHIVE_PAYLOAD_SHA256 = 'd392709da4f172975cb34f8bc61c0cf0dede85ea24e65fb161ca52b192b120de'
const RESULT = 'docs/hanja-sequential-2026-09-09/stage4-result.json'
const normal = (glyph: string) => glyph.normalize('NFC')
const codepointOrder = (a: string, b: string) => a.codePointAt(0)! - b.codePointAt(0)!
const same = (a: unknown, b: unknown, message: string) => { if (!isDeepStrictEqual(a, b)) throw new Error(message) }
const fileHash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
type Exclusion = { glyph: string; reason: string }
type Pair<T> = { v2: T; v3: T }

export type Phase3Split = {
  version: 1; purpose: string; archiveFileSha256: string; approvedSnapshotSha256: string; definitionsSha256: string
  previousSplitHash: string; previousDevelopmentHeldOut: string[]; previousValidationHeldOut: string[]
  excludedDraftGlyphs: string[]; selection: { seed: string; quotas: [string, number][] }
  validationHeldOut: string[]; groups: Record<string, number>; allowedValidationDonors: string[]
  excludedValidationDonors: Exclusion[]; partialIdsExclusions: Exclusion[]; hash: string
}
export type Phase3Parts = ReviewedParts & { inactiveRecipes?: readonly unknown[] }
export type Phase3Archive = {
  schemaVersion: 1; payloadSha256: string
  payload: { input: InputSnapshot; approved: readonly ApprovedDonor[]; characters: readonly CatalogCharacter[]
    split: Phase2Split; reviewedParts: ReviewedParts }
  baseline: { approvedCount: number; catalogCount: number; expectedApprovedSnapshotSha256: string
    inputCanonicalSha256: string; recipeHash: string }
  implementationFreeze: { files: Record<string, string> }
}
export type Phase3DonorMetadata = { glyph: string; strokes: number; pathsSha256: string }
type PreparedBody = {
  input: InputSnapshot; metadata: Phase3DonorMetadata[]; eligible: readonly ApprovedDonor[]
  characters: readonly CatalogCharacter[]; split: Phase3Split; parts: Pair<Phase3Parts>
  archivePayloadSha256: string; metadataSha256: string
}
export type PreparedPhase3 = PreparedBody & { preparedSha256: string }

function validateMetadata(input: InputSnapshot, metadata: readonly Phase3DonorMetadata[], characters: readonly CatalogCharacter[], split: Phase3Split) {
  if (metadata.length !== 743 || new Set(metadata.map(d => normal(d.glyph))).size !== 743
    || metadata.some(d => [...d.glyph].length !== 1 || !Number.isInteger(d.strokes) || d.strokes < 1 || !/^[a-f0-9]{64}$/.test(d.pathsSha256))) {
    throw new Error('Expected 743 distinct archived donor metadata records')
  }
  if (input.definitionsSha256 !== digest(input.definitions) || input.definitionsSha256 !== split.definitionsSha256
    || input.approvedSnapshotSha256 !== split.approvedSnapshotSha256) throw new Error('Split/input snapshot mismatch')
  const approved = new Set(metadata.map(d => normal(d.glyph)))
  const validateHundred = (glyphs: readonly string[]) => {
    if (glyphs.length !== 100 || new Set(glyphs.map(normal)).size !== 100
      || glyphs.some(g => [...g].length !== 1 || !approved.has(normal(g)))) throw new Error('Expected exactly 100 distinct archived targets')
  }
  ;[split.previousDevelopmentHeldOut, split.previousValidationHeldOut, split.validationHeldOut].forEach(validateHundred)
  const previous = [...split.previousDevelopmentHeldOut, ...split.previousValidationHeldOut, ...split.excludedDraftGlyphs]
  if (split.excludedDraftGlyphs.length !== 20 || new Set(previous.map(normal)).size !== 220
    || split.validationHeldOut.some(g => previous.some(old => normal(old) === normal(g)))) throw new Error('Fresh targets overlap prior development, validation, or drafts')
  same(split.excludedDraftGlyphs, input.candidateGlyphs, 'Frozen 20 draft exclusions changed')
  const definitions = new Map(Object.entries(input.definitions)), catalog = new Map(characters.map(c => [c.glyph, c]))
  if (catalog.size !== characters.length) throw new Error('Duplicate catalog glyph')
  if (metadata.some(d => catalog.get(d.glyph)?.strokes !== d.strokes)) throw new Error('Archived catalog/donor count mismatch')
  const groups = Object.fromEntries([...new Set(split.validationHeldOut.map(g => structureGroup(g, definitions)))].sort()
    .map(group => [group, split.validationHeldOut.filter(g => structureGroup(g, definitions) === group).length]))
  same(split.groups, groups, 'Fresh target structure groups changed')
  const partial = knownHeldOutExclusions(metadata.map(d => d.glyph), definitions, split.validationHeldOut)
  same(split.partialIdsExclusions, partial, 'Partial-IDS exclusions changed')
  const forbidden = [...new Set([...split.validationHeldOut, ...partial.map(d => d.glyph)])]
  const excluded = new Set(forbidden.map(normal))
  const allowed = metadata.map(d => d.glyph).filter(g => !excluded.has(normal(g))).sort(codepointOrder)
  same(split.allowedValidationDonors, allowed, 'Frozen common eligible donor list changed')
  same(split.excludedValidationDonors, metadata.map(d => d.glyph).filter(g => excluded.has(normal(g))).sort(codepointOrder)
    .map(glyph => ({ glyph, reason: 'held-out-target' })), 'Frozen common exclusions changed')
  return { definitions, catalog, forbidden, allowed }
}

/** Full archive hashing is integrity verification. Returned generation inputs contain no held-out paths. */
export function preparePhase3(archive: Phase3Archive, split: Phase3Split, expanded: Phase3Parts,
  trust: { splitHash?: string; archivePayloadSha256?: string } = {}): PreparedPhase3 {
  const { hash, ...splitBody } = split
  if (split.version !== 1 || hash !== (trust.splitHash ?? PHASE3_SPLIT_HASH) || hash !== digest(splitBody)
    || split.archiveFileSha256 !== PHASE3_ARCHIVE_SHA256) throw new Error('Frozen phase3 split pin mismatch')
  if (archive.schemaVersion !== 1 || archive.payloadSha256 !== (trust.archivePayloadSha256 ?? PHASE3_ARCHIVE_PAYLOAD_SHA256)
    || archive.payloadSha256 !== digest(archive.payload)) throw new Error('Frozen archive payload pin mismatch')
  const p = archive.payload, b = archive.baseline
  validateInput(p.input, p.approved)
  if (p.approved.length !== b.approvedCount || b.approvedCount !== 743 || p.characters.length !== b.catalogCount
    || digest(p.input) !== b.inputCanonicalSha256 || p.input.approvedSnapshotSha256 !== b.expectedApprovedSnapshotSha256
    || digest(p.reviewedParts) !== b.recipeHash) throw new Error('Archive baseline pins mismatch')
  same(split.previousDevelopmentHeldOut, p.split.developmentHeldOut, 'Previous development targets changed')
  same(split.previousValidationHeldOut, p.split.validationHeldOut, 'Previous validation targets changed')
  if (split.previousSplitHash !== p.split.hash || p.reviewedParts.splitHash !== p.split.hash) throw new Error('Previous split pin mismatch')
  if (p.reviewedParts.version !== 1 || p.reviewedParts.recipes.length !== 7
    || expanded.version !== 1 || expanded.splitHash !== split.hash) throw new Error('Phase3 recipe registry mismatch')
  const ids = new Set<string>()
  for (const recipe of expanded.recipes) {
    if (!recipe.id || ids.has(recipe.id)) throw new Error('Duplicate expanded recipe id')
    ids.add(recipe.id)
  }
  for (const recipe of p.reviewedParts.recipes) {
    same(expanded.recipes.find(r => r.id === recipe.id), recipe, 'Original position recipe changed: ' + recipe.id)
  }
  const metadata = p.approved.map(d => ({ glyph: d.glyph, strokes: d.paths.length, pathsSha256: digest(d.paths) }))
  const { allowed } = validateMetadata(p.input, metadata, p.characters, split)
  const metadataByGlyph = new Map(metadata.map(d => [d.glyph, d]))
  for (const recipe of expanded.recipes) {
    const donor = metadataByGlyph.get(recipe.donorGlyph)
    if (!donor || recipe.donorPathsSha256 !== donor.pathsSha256) throw new Error('Recipe donor metadata pin mismatch: ' + recipe.id)
  }
  const allowedSet = new Set(allowed)
  const body: PreparedBody = {
    input: p.input, metadata, eligible: p.approved.filter(d => allowedSet.has(d.glyph)), characters: p.characters, split,
    parts: { v2: p.reviewedParts, v3: expanded }, archivePayloadSha256: archive.payloadSha256, metadataSha256: digest(metadata),
  }
  return { ...body, preparedSha256: digest(body) }
}

const libraryRecord = (library: Library) => ({ version: library.version, layoutMode: library.layoutMode, hash: library.hash,
  donorGlyphs: library.donorGlyphs, componentCount: library.components.length, reviewedPartsSha256: library.reviewedPartsSha256 })

/** Accepts only eligible geometry plus all-glyph metadata. Never accepts evaluation-path loaders. */
export function generatePhase3(prepared: PreparedPhase3) {
  const { preparedSha256, ...body } = prepared
  if (preparedSha256 !== digest(body) || digest(prepared.metadata) !== prepared.metadataSha256) throw new Error('Prepared generation input pin mismatch')
  const { definitions, catalog, forbidden, allowed } = validateMetadata(prepared.input, prepared.metadata, prepared.characters, prepared.split)
  same(prepared.eligible.map(d => d.glyph).sort(codepointOrder), allowed, 'Generator received non-common or held-out geometry')
  const expectedHashes = new Map(prepared.metadata.map(d => [d.glyph, d.pathsSha256]))
  for (const donor of prepared.eligible) if (digest(donor.paths) !== expectedHashes.get(donor.glyph)) throw new Error('Eligible donor geometry changed')
  const allowedSet = new Set(allowed)
  const make = (parts: Phase3Parts) => {
    // Filtering precedes buildLibrary: the unchanged v2 engine otherwise validates excluded recipe paths before skipping.
    const recipes = parts.recipes.filter(recipe => allowedSet.has(recipe.donorGlyph))
    const skippedRecipes = parts.recipes.filter(recipe => !allowedSet.has(recipe.donorGlyph))
      .map(recipe => ({ id: recipe.id, donorGlyph: recipe.donorGlyph, reason: 'excluded-by-common-held-out-policy' }))
    const active: ReviewedParts = { version: 1, splitHash: prepared.split.hash, recipes }
    const library = buildLibrary(prepared.eligible, definitions, catalog, forbidden, { reviewedParts: active, layoutMode: 'position-profiles-v2' })
    same(library.donorGlyphs, allowed, 'Engine donor eligibility differs from frozen common set')
    return { library, record: { ...libraryRecord(library), originalRegistrySha256: digest(parts), activeRegistrySha256: digest(active),
      originalRecipeCount: parts.recipes.length, activeRecipeCount: recipes.length, skippedRecipes,
      inactiveRecipes: parts.inactiveRecipes ?? [] } }
  }
  const baseline = make(prepared.parts.v2), expanded = make(prepared.parts.v3)
  same(baseline.library.donorGlyphs, expanded.library.donorGlyphs, 'Comparison donor eligibility differs')
  const predict = (library: Library) => prepared.split.validationHeldOut.map(glyph => {
    const target = catalog.get(glyph)
    if (!target) throw new Error('Missing frozen target catalog: ' + glyph)
    return { ...compose(target, definitions, library), grade: target.readingGrade, group: structureGroup(glyph, definitions) }
  })
  const predictions = { v2: predict(baseline.library), v3: predict(expanded.library) }
  const ids = new Set([...predictions.v2, ...predictions.v3].flatMap(c => [
    ...c.placements.map(p => p.componentId), ...(c.layoutProfiles ?? []).flatMap(p => p.componentIds),
  ]))
  const components = new Map([...baseline.library.components, ...expanded.library.components]
    .filter(c => ids.has(c.id)).map(c => [c.id, c]))
  if (components.size !== ids.size) throw new Error('Missing used component evidence')
  return {
    schemaVersion: 3 as const, experiment: 'position-recipe-expansion-with-unchanged-v2-engine' as const,
    splitHash: prepared.split.hash, archivePayloadSha256: prepared.archivePayloadSha256, preparedSha256,
    input: { archiveFileSha256: prepared.split.archiveFileSha256, approvedSnapshotSha256: prepared.input.approvedSnapshotSha256,
      definitionsSha256: prepared.input.definitionsSha256, metadataSha256: prepared.metadataSha256, archivedApproved: 743,
      currentRuntimeUsed: false, validationHeldOut: prepared.split.validationHeldOut,
      evaluationTargets: prepared.split.validationHeldOut.map(glyph => ({ ...prepared.metadata.find(d => d.glyph === glyph)! })) },
    eligibility: { rule: ELIGIBILITY_POLICY, eligibleDonors: allowed.length, donorGlyphs: allowed,
      excludedDonors: prepared.split.excludedValidationDonors, partialIdsExclusions: prepared.split.partialIdsExclusions },
    libraries: { v2: baseline.record, v3: expanded.record }, predictions,
    components: [...components.values()].sort((a, b) => a.id.localeCompare(b.id)),
  }
}

export function scorePhase3(generated: ReturnType<typeof generatePhase3>, loadExpected: (glyph: string) => readonly string[]) {
  same(generated.input.evaluationTargets.map(d => d.glyph), generated.input.validationHeldOut, 'Evaluation target metadata identity mismatch')
  const referencePins = new Map(generated.input.evaluationTargets.map(d => [d.glyph, d]))
  const refs = new Map<string, readonly string[]>()
  const score = (candidate: typeof generated.predictions.v2[number]) => {
    if (!refs.has(candidate.glyph)) refs.set(candidate.glyph, loadExpected(candidate.glyph))
    const expected = refs.get(candidate.glyph)!
    const pin = referencePins.get(candidate.glyph)
    if (expected.length !== candidate.expectedStrokes || pin?.strokes !== candidate.expectedStrokes
      || digest(expected) !== pin.pathsSha256) throw new Error('Missing or mismatched frozen evaluation reference: ' + candidate.glyph)
    const metrics = comparePaths(candidate.paths, expected)
    return { ...candidate, expectedPathsSha256: digest(expected), metrics, screenPass: passesScreen(candidate, metrics) }
  }
  for (const rows of [generated.predictions.v2, generated.predictions.v3]) {
    same(rows.map(r => r.glyph), generated.input.validationHeldOut, 'Frozen target list changed after generation')
    if (rows.length !== 100) throw new Error('Evaluation must retain all 100 frozen targets')
  }
  const predictions = { v2: generated.predictions.v2.map(score), v3: generated.predictions.v3.map(score) }
  const summarize = (rows: typeof predictions.v2) => ({ targets: rows.length,
    generated: rows.filter(r => r.status === 'candidate-unreviewed').length,
    screenPassed: rows.filter(r => r.screenPass).length, abstained: rows.filter(r => r.status === 'abstained').length,
    abstentionReasons: Object.fromEntries([...new Set(rows.filter(r => r.status === 'abstained').map(r => r.reason ?? 'unknown'))].sort()
      .map(reason => [reason, rows.filter(r => r.status === 'abstained' && (r.reason ?? 'unknown') === reason).length])) })
  return { ...generated, predictions, summary: {
    frozenTargets: 100, archivedApproved: 743, currentRuntimeUsed: false, additionalRuntimeApprovals: 0, published: 0,
    v2: summarize(predictions.v2), v3: summarize(predictions.v3), screenThresholds: SCREEN_THRESHOLDS,
    limitations: [
      'Both arms use the same frozen v2 composition engine and identical eligible donors; only reviewed position recipes differ.',
      'The 743 archived approval snapshot is used; later runtime approvals and reference-guided draft corrections are excluded.',
      'All 100 frozen targets remain in both denominators, including abstentions. Metrics are geometric screens, not Korean stroke-order certification.',
      'Known partial-IDS children and complete subtrees are excluded; missing decomposition information remains unknown.',
      'Unsupported operators, including ⿵ 冂 enclosure, remain unsupported; inactive recipes do not alter the engine.',
    ],
  } }
}

export function runPhase3(archive: Phase3Archive, split: Phase3Split, expanded: Phase3Parts,
  trust: Parameters<typeof preparePhase3>[3] = {}) {
  const generated = generatePhase3(preparePhase3(archive, split, expanded, trust))
  // Construct the reference map only after both complete 100-target predictions exist.
  const refs = new Map(archive.payload.approved.map(d => [d.glyph, d.paths]))
  return scorePhase3(generated, glyph => { const paths = refs.get(glyph); if (!paths) throw new Error('Missing evaluation reference: ' + glyph); return paths })
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length > 1 || args.some(arg => !['--json', '--check'].includes(arg))) throw new Error('Use --json or --check')
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const [bytes, splitText, partsText] = await Promise.all([readFile(join(root, PHASE3_ARCHIVE)),
    readFile(join(root, 'scripts/hanja-component-phase3-split.json'), 'utf8'), readFile(join(root, 'scripts/hanja-component-phase3-parts.json'), 'utf8')])
  if (fileHash(bytes) !== PHASE3_ARCHIVE_SHA256) throw new Error('Frozen archive file changed')
  const archive = JSON.parse(bytes.toString()) as Phase3Archive
  await Promise.all(Object.entries(archive.implementationFreeze.files).map(async ([file, expected]) => {
    if (fileHash(await readFile(join(root, file))) !== expected) throw new Error('Frozen implementation changed: ' + file)
  }))
  const freeze = JSON.parse(await readFile(join(root, 'docs/hanja-sequential-2026-09-09/stage4-implementation-freeze.json'), 'utf8')) as {
    schemaVersion: number; frozenAt: string; stage: string; files: Record<string, string>; manifestSha256: string
  }
  const { manifestSha256, ...freezeBody } = freeze
  if (freeze.schemaVersion !== 1 || freeze.stage !== 'before-first-fresh-validation' || !Number.isFinite(Date.parse(freeze.frozenAt))
    || manifestSha256 !== digest(freezeBody)) throw new Error('Phase3 implementation freeze manifest mismatch')
  for (const file of [...Object.keys(archive.implementationFreeze.files), 'scripts/hanja-component-phase3.ts',
    'scripts/hanja-component-phase3-split.json', 'scripts/hanja-component-phase3-parts.json', 'lib/hanja-component-phase3.test.ts']) {
    if (!/^[a-f0-9]{64}$/.test(freeze.files[file] ?? '')) throw new Error('Required phase3 frozen file missing: ' + file)
  }
  await Promise.all(Object.entries(freeze.files).map(async ([file, expected]) => {
    if (!resolve(root, file).startsWith(root + '/') || !/^[a-f0-9]{64}$/.test(expected)
      || fileHash(await readFile(join(root, file))) !== expected) throw new Error('Phase3 implementation changed: ' + file)
  }))
  if (fileHash(Buffer.from(splitText)) !== freeze.files['scripts/hanja-component-phase3-split.json']
    || fileHash(Buffer.from(partsText)) !== freeze.files['scripts/hanja-component-phase3-parts.json']) {
    throw new Error('Phase3 split or recipes changed while loading frozen inputs')
  }
  const result = { ...runPhase3(archive, JSON.parse(splitText) as Phase3Split, JSON.parse(partsText) as Phase3Parts),
    implementationFreeze: { manifestSha256, frozenAt: freeze.frozenAt } }
  if (args[0] === '--check') {
    same(result, JSON.parse(await readFile(join(root, RESULT), 'utf8')), 'Phase3 artifact differs from frozen replay')
    process.stdout.write(JSON.stringify({ ok: true, splitHash: result.splitHash, summary: result.summary }, null, 2) + '\n')
  } else process.stdout.write(JSON.stringify(args[0] === '--json' ? result : result.summary, null, 2) + '\n')
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error); process.exitCode = 1 })
