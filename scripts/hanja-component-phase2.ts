/** Read-only experiment runner. Nothing generated here is a runtime approval. */
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual } from 'node:util'
import { comparePaths, type PathComparison } from './hanja-component-geometry.ts'
import { validateInput, type InputSnapshot } from './hanja-component-pilot.ts'
import { buildLibrary, compose, digest, parseIds, selectHoldout, structureGroup,
  type ApprovedDonor, type Candidate, type CatalogCharacter, type Component, type Ids,
  type Library, type ReviewedParts } from './hanja-component-synthesis.ts'

export const PHASE2_SPLIT_HASH = 'a398a419b5a720350c03032e2d438208824f51d236170c2a1f9e92587123ae85'
export const SCREEN_THRESHOLDS = { meanDistanceUnits: 8, maxStrokeDistanceUnits: 16, orderAgreement: 1, directionAgreement: 1 } as const
export const ELIGIBILITY_POLICY = 'partial-known-ids-nfc-complete-subtree-v1'
export type Phase2Split = {
  version: 1; purpose: string; approvedSnapshotSha256: string; definitionsSha256: string
  developmentHeldOut: string[]; validationHeldOut: string[]
  allowedValidationDonors: string[]; excludedValidationDonors: { glyph: string; reason: string }[]
  groups: Record<string, number>; hash: string
}
type Mode = 'development' | 'validation'
type Pair<T> = { v1: T; v2: T }
type ExtraExclusion = { glyph: string; reason: 'contains-known-held-out-name' | 'contains-known-held-out-subtree' }
const normalized = (glyph: string) => glyph.normalize('NFC')
const same = (a: unknown, b: unknown, message: string) => { if (!isDeepStrictEqual(a, b)) throw new Error(message) }
const groupCounts = (glyphs: readonly string[], definitions: ReadonlyMap<string, string>) =>
  Object.fromEntries([...new Set(glyphs.map(g => structureGroup(g, definitions)))].sort()
    .map(group => [group, glyphs.filter(g => structureGroup(g, definitions) === group).length]))

/** Unknown siblings are retained for traversal, never treated as matching wildcards.
 * Both literal and recursively expanded complete subtrees are compared. Missing metadata
 * remains unknown; this is protection against known overlap, not proof of zero overlap.
 */
export function knownHeldOutExclusions(glyphs: readonly string[], definitions: ReadonlyMap<string, string>, heldOut: readonly string[]): ExtraExclusion[] {
  const forbidden = new Set(heldOut.map(normalized))
  const lookup = (glyph: string) => definitions.get(glyph) ?? definitions.get(normalized(glyph)) ?? ''
  const key = (tree: Ids): string | null => {
    if ('glyph' in tree) return ['?', '？'].includes(tree.glyph) ? null : normalized(tree.glyph)
    const children = tree.children.map(key)
    return children.some(k => k === null) ? null : tree.operator + children.join('')
  }
  const expand = (tree: Ids, seen = new Set<string>(), depth = 0): Ids => {
    if (depth > 32) return tree
    if (!('glyph' in tree)) return { operator: tree.operator, children: tree.children.map(child => expand(child, seen, depth + 1)) }
    const name = normalized(tree.glyph)
    if (seen.has(name)) return tree
    const next = parseIds(lookup(tree.glyph), true)
    if (!next || 'glyph' in next && normalized(next.glyph) === name) return tree
    return expand(next, new Set([...seen, name]), depth + 1)
  }
  const patterns = new Set<string>()
  for (const glyph of heldOut) {
    const tree = parseIds(lookup(glyph), true)
    if (!tree) continue
    for (const candidate of [tree, expand(tree, new Set([normalized(glyph)]))]) {
      // A component's single-stroke alias is not a complete composite structure.
      if (!('glyph' in candidate)) { const value = key(candidate); if (value) patterns.add(value) }
    }
  }
  return glyphs.filter(g => !forbidden.has(normalized(g))).flatMap(glyph => {
    const seen = new Set<string>()
    function visitName(name: string, depth: number): ExtraExclusion['reason'] | undefined {
      if (forbidden.has(normalized(name))) return 'contains-known-held-out-name'
      if (depth > 32 || seen.has(normalized(name))) return
      seen.add(normalized(name))
      const tree = parseIds(lookup(name), true)
      return tree ? visitTree(tree, depth + 1) : undefined
    }
    function visitTree(tree: Ids, depth: number): ExtraExclusion['reason'] | undefined {
      if ('glyph' in tree) return visitName(tree.glyph, depth)
      if ([key(tree), key(expand(tree))].some(k => k !== null && patterns.has(k))) return 'contains-known-held-out-subtree'
      for (const child of tree.children) { const reason = visitTree(child, depth); if (reason) return reason }
    }
    const reason = visitName(glyph, 0)
    return reason ? [{ glyph, reason }] : []
  })
}

/** The optional hash is only a trust anchor for wholly synthetic tests. The CLI always
 * uses PHASE2_SPLIT_HASH and cannot replace or rewrite the frozen split.
 */
export function validatePhase2Inputs(input: InputSnapshot, approved: readonly ApprovedDonor[], characters: readonly CatalogCharacter[], split: Phase2Split, recipes: ReviewedParts, expectedSplitHash = PHASE2_SPLIT_HASH) {
  validateInput(input, approved)
  const { hash, ...body } = split
  if (split.version !== 1 || hash !== expectedSplitHash || hash !== digest(body)) throw new Error('Frozen phase2 split hash changed')
  if (approved.length !== 743 || new Set(approved.map(d => normalized(d.glyph))).size !== 743) throw new Error('Expected unchanged 743 unique approved donors')
  if (split.approvedSnapshotSha256 !== input.approvedSnapshotSha256 || split.definitionsSha256 !== input.definitionsSha256) throw new Error('Phase2 split/input snapshot mismatch')
  const definitions = new Map(Object.entries(input.definitions)), catalog = new Map(characters.map(c => [c.glyph, c]))
  if (catalog.size !== characters.length) throw new Error('Duplicate catalog glyph')
  const approvedGlyphs = new Set(approved.map(d => normalized(d.glyph)))
  for (const heldOut of [split.developmentHeldOut, split.validationHeldOut]) {
    if (!Array.isArray(heldOut) || heldOut.length !== 100 || new Set(heldOut.map(normalized)).size !== 100
      || heldOut.some(g => [...g].length !== 1 || !approvedGlyphs.has(normalized(g)))) throw new Error('Expected 100 distinct approved held-out glyphs')
  }
  if (split.developmentHeldOut.some(g => split.validationHeldOut.some(v => normalized(v) === normalized(g)))) throw new Error('Development and validation held-out sets overlap')
  same(split.developmentHeldOut, selectHoldout(approved.map(d => d.glyph), definitions), 'Original development 100 changed')
  same(split.groups, groupCounts(split.validationHeldOut, definitions), 'Validation structure groups changed')
  const baseline = buildLibrary(approved, definitions, catalog, split.validationHeldOut)
  if (split.allowedValidationDonors.length !== 389) throw new Error('Expected 389 frozen donor candidates')
  same(split.allowedValidationDonors, baseline.donorGlyphs, 'Frozen validation donor candidates changed')
  same(split.excludedValidationDonors, baseline.excludedDonors, 'Frozen validation exclusions changed')
  if (recipes.version !== 1 || recipes.splitHash !== hash || !Array.isArray(recipes.recipes)) throw new Error('Reviewed parts split hash mismatch')
  const allowed = new Set(split.allowedValidationDonors)
  if (recipes.recipes.some(r => !allowed.has(r.donorGlyph))) throw new Error('Reviewed recipe donor is outside frozen 389 candidates')
  const development = knownHeldOutExclusions(approved.map(d => d.glyph), definitions, split.developmentHeldOut)
  const validation = knownHeldOutExclusions(approved.map(d => d.glyph), definitions, split.validationHeldOut)
  const policy = { rule: ELIGIBILITY_POLICY, development, validation,
    additionalValidation: validation.filter(e => allowed.has(e.glyph)) }
  return { definitions, catalog, eligibility: { ...policy, hash: digest(policy), frozenValidationCandidateCount: 389 } }
}

const libraryRecord = (library: Library) => ({ version: library.version, hash: library.hash,
  donorGlyphs: library.donorGlyphs, excludedDonors: library.excludedDonors, forbiddenGlyphs: library.forbiddenGlyphs,
  eligibleDonorCount: library.donorGlyphs.length, componentCount: library.components.length, ...(library.layoutMode ? { layoutMode: library.layoutMode,
    reviewedPartsSha256: library.reviewedPartsSha256, skippedRecipes: library.skippedRecipes } : {}) })

/** Every requested v1/v2 prediction and draft is generated before scorePhase2 can load
 * evaluation references. This function does not read any held-out expected paths.
 */
export function generatePhase2(input: InputSnapshot, approved: readonly ApprovedDonor[], characters: readonly CatalogCharacter[], split: Phase2Split, recipes: ReviewedParts, options: { mode?: Mode; expectedSplitHash?: string } = {}) {
  const mode = options.mode ?? 'development'
  const { definitions, catalog, eligibility } = validatePhase2Inputs(input, approved, characters, split, recipes, options.expectedSplitHash)
  const allLibraries: Library[] = []
  const makeLibraries = (heldOut: string[], extra: ExtraExclusion[]): Pair<Library> => {
    const forbidden = [...new Set([...heldOut, ...extra.map(e => e.glyph)])]
    const v1 = buildLibrary(approved, definitions, catalog, forbidden)
    const v2 = buildLibrary(approved, definitions, catalog, forbidden, { reviewedParts: recipes, layoutMode: 'position-profiles-v2' })
    same(v1.donorGlyphs, v2.donorGlyphs, 'v1/v2 donor eligibility differs')
    allLibraries.push(v1, v2)
    return { v1, v2 }
  }
  const target = (glyph: string) => { const entry = catalog.get(glyph); if (!entry) throw new Error('Missing target catalog: ' + glyph); return entry }
  const predict = (glyphs: string[], libraries: Pair<Library>) => ({
    v1: glyphs.map(glyph => compose(target(glyph), definitions, libraries.v1)),
    v2: glyphs.map(glyph => compose(target(glyph), definitions, libraries.v2)),
  })
  const developmentLibraries = makeLibraries(split.developmentHeldOut, eligibility.development)
  const development = predict(split.developmentHeldOut, developmentLibraries)
  const validationLibraries = mode === 'validation' ? makeLibraries(split.validationHeldOut, eligibility.validation) : undefined
  if (validationLibraries && validationLibraries.v1.donorGlyphs.some(g => !split.allowedValidationDonors.includes(g))) throw new Error('Validation donor is outside frozen candidates')
  const validation = validationLibraries ? predict(split.validationHeldOut, validationLibraries) : undefined
  const approvedSet = new Set(approved.map(d => normalized(d.glyph)))
  if (input.candidateGlyphs.some(g => approvedSet.has(normalized(g)))) throw new Error('Draft target is already approved')
  const draftLibraries = makeLibraries([], [])
  const rawCandidates = predict(input.candidateGlyphs, draftLibraries)
  const decorate = (candidate: Candidate) => ({ ...candidate, grade: target(candidate.glyph).readingGrade,
    hun: target(candidate.glyph).hun ?? null, eum: target(candidate.glyph).eum ?? null,
    review: { status: 'pending-whole-glyph-review' as const, officialTargetEvidence: false as const } })
  const candidates = { v1: rawCandidates.v1.map(decorate), v2: rawCandidates.v2.map(decorate) }
  const predictions = [...development.v1, ...development.v2, ...(validation?.v1 ?? []), ...(validation?.v2 ?? []), ...candidates.v1, ...candidates.v2]
  const componentIds = new Set(predictions.flatMap(c => [...c.placements.map(p => p.componentId), ...(c.layoutProfiles ?? []).flatMap(p => p.componentIds)]))
  const componentMap = new Map<string, Component>()
  for (const library of allLibraries) for (const component of library.components) if (componentIds.has(component.id)) componentMap.set(component.id, component)
  if (componentMap.size !== componentIds.size) throw new Error('Missing placement or layout-profile component evidence')
  return { schemaVersion: 2 as const, mode, splitHash: split.hash, recipeHash: digest(recipes), eligibility,
    input: { approvedSnapshotSha256: input.approvedSnapshotSha256, definitionsSha256: input.definitionsSha256,
      dictionarySource: input.dictionarySource, developmentHeldOut: split.developmentHeldOut, validationHeldOut: split.validationHeldOut },
    libraries: { development: { v1: libraryRecord(developmentLibraries.v1), v2: libraryRecord(developmentLibraries.v2) },
      ...(validationLibraries ? { validation: { v1: libraryRecord(validationLibraries.v1), v2: libraryRecord(validationLibraries.v2) } } : {}),
      drafts: { v1: libraryRecord(draftLibraries.v1), v2: libraryRecord(draftLibraries.v2) } },
    development, ...(validation ? { validation } : {}), candidates,
    components: [...componentMap.values()].sort((a, b) => a.id.localeCompare(b.id)),
    targetMetadata: Object.fromEntries([...split.developmentHeldOut, ...(mode === 'validation' ? split.validationHeldOut : [])]
      .map(g => [g, { grade: target(g).readingGrade, group: structureGroup(g, definitions) }])) }
}

export function passesScreen(candidate: Candidate, metrics: PathComparison): boolean {
  return candidate.status === 'candidate-unreviewed' && metrics.countMatch
    && metrics.orderAgreement === SCREEN_THRESHOLDS.orderAgreement && metrics.directionAgreement === SCREEN_THRESHOLDS.directionAgreement
    && metrics.orderedMeanDistance !== null && metrics.orderedMeanDistance <= SCREEN_THRESHOLDS.meanDistanceUnits
    && metrics.maxMeanDistance !== null && metrics.maxMeanDistance <= SCREEN_THRESHOLDS.maxStrokeDistanceUnits
}

export function scorePhase2(generated: ReturnType<typeof generatePhase2>, loadExpected: (glyph: string) => readonly string[]) {
  const references = new Map<string, readonly string[]>()
  const score = (prediction: Candidate) => {
    if (!references.has(prediction.glyph)) references.set(prediction.glyph, loadExpected(prediction.glyph))
    const expectedPaths = references.get(prediction.glyph)!
    if (expectedPaths.length !== prediction.expectedStrokes) throw new Error('Evaluation catalog/reference count mismatch: ' + prediction.glyph)
    const metrics = comparePaths(prediction.paths, expectedPaths)
    return { ...prediction, ...generated.targetMetadata[prediction.glyph], metrics, screenPass: passesScreen(prediction, metrics), expectedPaths }
  }
  const development = { v1: generated.development.v1.map(score), v2: generated.development.v2.map(score) }
  const validation = generated.validation ? { v1: generated.validation.v1.map(score), v2: generated.validation.v2.map(score) } : undefined
  const summarize = (rows: readonly (Candidate & { screenPass?: boolean })[]) => ({ targets: rows.length,
    generated: rows.filter(r => r.status === 'candidate-unreviewed').length,
    screenPassed: rows.filter(r => r.screenPass === true).length,
    abstained: rows.filter(r => r.status === 'abstained').length,
    abstentionReasons: Object.fromEntries([...new Set(rows.filter(r => r.status === 'abstained').map(r => r.reason ?? 'unknown'))].sort()
      .map(reason => [reason, rows.filter(r => r.status === 'abstained' && (r.reason ?? 'unknown') === reason).length])) })
  const summarizePair = (pair: Pair<readonly (Candidate & { screenPass?: boolean })[]>) => ({ v1: summarize(pair.v1), v2: summarize(pair.v2) })
  const { targetMetadata: _metadata, ...rest } = generated
  return { ...rest, development, ...(validation ? { validation } : {}), summary: {
    date: '2026-09-09', mode: generated.mode, unchangedRuntime: 743, published: 0,
    development: summarizePair(development), ...(validation ? { validation: summarizePair(validation) } : {}),
    drafts: { ...summarizePair(generated.candidates), approved: 0, screenEvaluated: false },
    screenThresholds: SCREEN_THRESHOLDS,
    limitations: [
      'All generated paths are unreviewed; no runtime data or approval registry is modified.',
      'Distance, order and direction metrics are geometric screening proxies, not Korean stroke-order certification.',
      'Known partial-IDS children and complete subtrees are excluded from both methods; absent decomposition metadata remains unknown.',
      'The original development 100 can guide changes. Only the fresh frozen validation 100 measures the finalized phase2 method.',
      'The 20 drafts have no official target comparison and are not included in screen-pass counts.',
    ],
  } }
}

export function runPhase2(input: InputSnapshot, approved: readonly ApprovedDonor[], characters: readonly CatalogCharacter[], split: Phase2Split, recipes: ReviewedParts, options: { mode?: Mode; expectedSplitHash?: string } = {}) {
  const generated = generatePhase2(input, approved, characters, split, recipes, options)
  // Do not construct the evaluation reference map until generation is complete.
  const expected = new Map(approved.map(d => [d.glyph, d.paths]))
  return scorePhase2(generated, glyph => { const paths = expected.get(glyph); if (!paths) throw new Error('Missing evaluation reference: ' + glyph); return paths })
}

export function parsePhase2Args(args: string[]) {
  if (args.some(a => !['--development', '--json', '--check'].includes(a)) || new Set(args).size !== args.length
    || args.includes('--check') && args.length > 1) throw new Error('Use --development, --json, --development --json, or --check')
  return { mode: args.includes('--development') || args.length === 0 ? 'development' as const : 'validation' as const,
    json: args.includes('--json') || args.includes('--development'), check: args.includes('--check') }
}

async function main() {
  const flags = parsePhase2Args(process.argv.slice(2))
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const json = async <T,>(path: string) => JSON.parse(await readFile(join(root, path), 'utf8')) as T
  const [input, split, recipes, runtime] = await Promise.all([
    json<InputSnapshot>('scripts/hanja-component-input.json'), json<Phase2Split>('scripts/hanja-component-phase2-split.json'),
    json<ReviewedParts>('scripts/hanja-component-reviewed-parts.json'), import('../lib/hanja-strokes.ts'),
  ])
  const directory = 'content/hanja/characters'
  const characters: CatalogCharacter[] = []
  for (const filename of (await readdir(join(root, directory))).filter(n => n.endsWith('.json')).sort()) {
    characters.push(...(await json<{ characters: CatalogCharacter[] }>(join(directory, filename))).characters)
  }
  const result = runPhase2(input, runtime.HANJA_STROKES, characters, split, recipes, { mode: flags.mode })
  if (flags.check) {
    same(result, await json('docs/hanja-component-phase2-2026-09-09/result.json'), 'Phase2 artifact changed; review before replacing result.json')
    process.stdout.write(JSON.stringify({ ok: true, splitHash: result.splitHash, recipeHash: result.recipeHash, summary: result.summary }, null, 2) + '\n')
  } else process.stdout.write(JSON.stringify(flags.json ? result : result.summary, null, 2) + '\n')
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(error => { console.error(error); process.exitCode = 1 })
