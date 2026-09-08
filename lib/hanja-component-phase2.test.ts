import assert from 'node:assert/strict'
import test from 'node:test'
import { comparePaths } from '../scripts/hanja-component-geometry.ts'
import { DICTIONARY_SOURCE, PILOT_GLYPHS, type InputSnapshot } from '../scripts/hanja-component-pilot.ts'
import { buildLibrary, digest, selectHoldout, type ApprovedDonor, type Candidate,
  type CatalogCharacter, type ReviewedParts } from '../scripts/hanja-component-synthesis.ts'
import { generatePhase2, knownHeldOutExclusions, parsePhase2Args, passesScreen, scorePhase2,
  validatePhase2Inputs, type Phase2Split } from '../scripts/hanja-component-phase2.ts'

// Entirely synthetic paths, glyph identities and split hashes. No real validation
// character's reference geometry is read or scored by these tests.
const mouth = ['M10 10 L10 90', 'M10 10 L90 10 L90 90', 'M10 90 L90 90']
function fixture() {
  const approved: ApprovedDonor[] = ['口', ...Array.from({ length: 742 }, (_, i) => String.fromCodePoint(0xe000 + i))]
    .map(glyph => ({ glyph, paths: [...mouth], pathsSha256: digest(mouth), verificationSource: 'synthetic-fixture' }))
  const definitions: Record<string, string> = Object.fromEntries(approved.map(d => [d.glyph, '？']))
  const developmentHeldOut = selectHoldout(approved.map(d => d.glyph), new Map(Object.entries(definitions)))
  const validationHeldOut = approved.filter(d => !developmentHeldOut.includes(d.glyph) && d.glyph !== '口').slice(0, 100).map(d => d.glyph)
  const extra = approved.filter(d => !developmentHeldOut.includes(d.glyph) && !validationHeldOut.includes(d.glyph) && d.glyph !== '口').slice(0, 254)
  for (const d of extra) definitions[d.glyph] = '⿻' + validationHeldOut[0] + '一'
  const donor = approved.find(d => developmentHeldOut.includes(d.glyph) && d.glyph !== '口')!
  donor.paths = ['M10 10 L35 25', 'M10 40 L35 55', 'M10 90 L35 60', 'M95 10 L95 90']
  donor.pathsSha256 = digest(donor.paths)
  definitions[donor.glyph] = '⿰氵？'
  for (const glyph of PILOT_GLYPHS) definitions[glyph] = '⿰口口'
  definitions[PILOT_GLYPHS[0]] = '⿰氵口'
  const characters: CatalogCharacter[] = [...approved.map(d => ({ glyph: d.glyph, strokes: d.paths.length, readingGrade: 'fixture' })),
    { glyph: '氵', strokes: 3, readingGrade: 'fixture' }, ...PILOT_GLYPHS.map(glyph => ({ glyph, strokes: 6, readingGrade: 'fixture' }))]
  const input: InputSnapshot = { version: 1, dictionarySource: DICTIONARY_SOURCE, sourceRows: 743,
    definitions, definitionsSha256: digest(definitions), approvedSnapshotSha256: digest(approved), candidateGlyphs: [...PILOT_GLYPHS] }
  const baseline = buildLibrary(approved, new Map(Object.entries(definitions)), new Map(characters.map(c => [c.glyph, c])), validationHeldOut)
  assert.equal(baseline.donorGlyphs.length, 389)
  const body = { version: 1 as const, purpose: 'Synthetic phase2 gate fixture',
    approvedSnapshotSha256: input.approvedSnapshotSha256, definitionsSha256: input.definitionsSha256,
    developmentHeldOut, validationHeldOut, allowedValidationDonors: baseline.donorGlyphs,
    excludedValidationDonors: baseline.excludedDonors, groups: { other: 100 } }
  const split: Phase2Split = { ...body, hash: digest(body) }
  const recipes: ReviewedParts = { version: 1, splitHash: split.hash, recipes: [{ id: 'fixture-water-left', glyph: '氵', position: 'left',
    donorGlyph: donor.glyph, donorPathsSha256: donor.pathsSha256, approvedPathIndices: [1, 2, 3],
    review: { status: 'reviewed-component-assignment', method: 'static-path-and-glyph-review',
      notes: 'Synthetic component assignment only.', limitations: 'Not real Hanzi geometry or an approval.' } }] }
  return { approved, characters, input, split, recipes, donor }
}
const validate = (f: ReturnType<typeof fixture>) => validatePhase2Inputs(f.input, f.approved, f.characters, f.split, f.recipes, f.split.hash)
function resign(f: ReturnType<typeof fixture>) {
  const { hash: _hash, ...body } = f.split
  f.split.hash = digest(body)
  f.recipes.splitHash = f.split.hash
}

test('frozen split, snapshot, disjoint sets and eligible donor list cannot be substituted', () => {
  const original = fixture()
  assert.doesNotThrow(() => validate(original))
  assert.throws(() => validatePhase2Inputs(original.input, original.approved, original.characters, original.split, original.recipes), /Frozen phase2 split hash/)
  const modified = structuredClone(original)
  modified.split.purpose += ' changed'
  assert.throws(() => validate(modified), /split hash/)
  const overlap = structuredClone(original)
  overlap.split.validationHeldOut[0] = overlap.split.developmentHeldOut[0]
  resign(overlap)
  assert.throws(() => validate(overlap), /overlap/)
  const duplicate = structuredClone(original)
  duplicate.split.validationHeldOut[0] = duplicate.split.validationHeldOut[1]
  resign(duplicate)
  assert.throws(() => validate(duplicate), /100 distinct/)
  const stale = structuredClone(original)
  stale.split.definitionsSha256 = '0'.repeat(64)
  resign(stale)
  assert.throws(() => validate(stale), /snapshot mismatch/)
  const changedPaths = structuredClone(original)
  changedPaths.approved[0].paths = ['M1 1 L2 2']
  assert.throws(() => validate(changedPaths), /input snapshot changed/)
  const changedDefinitions = structuredClone(original)
  changedDefinitions.input.definitions['口'] = '一'
  assert.throws(() => validate(changedDefinitions), /input snapshot changed/)
  const allowed = structuredClone(original)
  allowed.split.allowedValidationDonors[0] = allowed.split.validationHeldOut[0]
  resign(allowed)
  assert.throws(() => validate(allowed), /donor candidates changed/)
  const excluded = structuredClone(original)
  excluded.split.excludedValidationDonors[0].reason = 'invented'
  resign(excluded)
  assert.throws(() => validate(excluded), /exclusions changed/)
})

test('recipe registry is pinned to the split and the original donor upper bound', () => {
  const f = fixture()
  const stale = structuredClone(f)
  stale.recipes.splitHash = 'f'.repeat(64)
  assert.throws(() => validate(stale), /Reviewed parts split hash/)
  const excluded = structuredClone(f)
  excluded.recipes.recipes[0].donorGlyph = f.split.validationHeldOut[0]
  assert.throws(() => validate(excluded), /outside frozen 389/)
  const changedPaths = structuredClone(f)
  changedPaths.recipes.recipes[0].donorPathsSha256 = '0'.repeat(64)
  assert.throws(() => generatePhase2(changedPaths.input, changedPaths.approved, changedPaths.characters, changedPaths.split, changedPaths.recipes,
    { expectedSplitHash: changedPaths.split.hash }), /Invalid reviewed component recipe/)
  const changedIndices = structuredClone(f)
  changedIndices.recipes.recipes[0].approvedPathIndices = [1, 1, 3]
  assert.throws(() => generatePhase2(changedIndices.input, changedIndices.approved, changedIndices.characters, changedIndices.split, changedIndices.recipes,
    { expectedSplitHash: changedIndices.split.hash }), /Invalid reviewed component recipe/)
})

test('partial unknown IDS cannot hide known targets, recursive aliases or complete target subtrees', () => {
  const defs = new Map([
    ['甲', '⿰林？'], ['乙', '⿱？甲'], ['丙', '⿱⿰木木？'], ['丁', '⿰？火'],
    ['林', '⿰木木'], ['戊', '⿰兩？'], ['己', '⿱⿰朩木？'], ['朩', '木'],
    ['庚', '⿱辛？'], ['辛', '⿰庚？'], ['未知', '？？'],
  ])
  const result = knownHeldOutExclusions(['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '林'], defs, ['林', '兩'])
  assert.deepEqual(result.map(r => r.glyph), ['甲', '乙', '丙', '戊', '己'])
  assert.equal(result.find(r => r.glyph === '丙')?.reason, 'contains-known-held-out-subtree')
  assert.equal(result.find(r => r.glyph === '己')?.reason, 'contains-known-held-out-subtree')
  assert.equal(result.find(r => r.glyph === '戊')?.reason, 'contains-known-held-out-name')
  // Unknown is not a wildcard: no complete subtree can match this partial target.
  assert.deepEqual(knownHeldOutExclusions(['丁'], defs, ['甲']), [])
})

test('development generation stays separate from reference loading and preserves all evidence', () => {
  const f = fixture()
  const before = digest(f)
  const generated = generatePhase2(f.input, f.approved, f.characters, f.split, f.recipes, { expectedSplitHash: f.split.hash })
  assert.equal(generated.mode, 'development')
  assert.equal(generated.validation, undefined)
  assert.equal(generated.development.v1.length, 100)
  assert.equal(generated.development.v2.length, 100)
  assert.equal(generated.candidates.v1.length, 20)
  assert.equal(generated.candidates.v2.length, 20)
  assert.deepEqual(generated.libraries.development.v1.donorGlyphs, generated.libraries.development.v2.donorGlyphs)
  assert.deepEqual(generated.libraries.development.v2.skippedRecipes?.map(r => r.id), ['fixture-water-left'])
  assert.equal(generated.libraries.drafts.v2.donorGlyphs.length, 743)
  assert.deepEqual(generated.libraries.drafts.v2.skippedRecipes, [])
  assert.equal(generated.candidates.v1[0].status, 'abstained')
  assert.equal(generated.candidates.v2[0].status, 'candidate-unreviewed')
  const componentIds = new Set(generated.components.map(c => c.id))
  for (const c of [...generated.development.v1, ...generated.development.v2, ...generated.candidates.v1, ...generated.candidates.v2]) {
    for (const p of c.placements) assert.ok(componentIds.has(p.componentId))
    for (const p of c.layoutProfiles ?? []) for (const id of p.componentIds) assert.ok(componentIds.has(id))
    assert.equal(c.provenance, 'component-derived-unreviewed')
  }
  const loaded: string[] = []
  const result = scorePhase2(generated, glyph => {
    assert.ok(f.split.developmentHeldOut.includes(glyph))
    assert.ok(!f.split.validationHeldOut.includes(glyph))
    loaded.push(glyph)
    return f.approved.find(d => d.glyph === glyph)!.paths
  })
  assert.equal(new Set(loaded).size, 100)
  assert.equal(loaded.length, 100)
  assert.equal(result.summary.unchangedRuntime, 743)
  assert.equal(result.summary.published, 0)
  assert.equal(result.summary.drafts.approved, 0)
  assert.equal(result.summary.drafts.screenEvaluated, false)
  assert.equal(result.summary.drafts.v2.screenPassed, 0)
  assert.equal(result.summary.validation, undefined)
  assert.equal(digest(f), before)
})

test('screen keeps v1 distance thresholds and rejects reversal, reordering and missing strokes', () => {
  const paths = ['M10 10 L90 10', 'M10 90 L90 90']
  const candidate: Candidate = { glyph: '甲', expectedStrokes: 2, status: 'candidate-unreviewed', paths,
    placements: [], schedule: [], libraryHash: 'fixture', rules: [], provenance: 'component-derived-unreviewed' }
  assert.equal(passesScreen(candidate, comparePaths(paths, paths)), true)
  assert.equal(passesScreen(candidate, comparePaths([...paths].reverse(), paths)), false)
  assert.equal(passesScreen(candidate, comparePaths(['M90 10 L10 10', paths[1]], paths)), false)
  assert.equal(passesScreen(candidate, comparePaths(paths.slice(0, 1), paths)), false)
  const metrics = comparePaths(paths, paths)
  assert.equal(passesScreen(candidate, { ...metrics, orderedMeanDistance: 8, maxMeanDistance: 16 }), true)
  assert.equal(passesScreen(candidate, { ...metrics, orderedMeanDistance: 8.001 }), false)
  assert.equal(passesScreen(candidate, { ...metrics, maxMeanDistance: 16.001 }), false)
  assert.equal(passesScreen({ ...candidate, status: 'abstained' }, metrics), false)
})

test('partial-IDS leakage reduces the frozen donor upper bound identically and skips its recipe', () => {
  const f = fixture()
  const glyph = f.split.allowedValidationDonors.find(g => !f.split.developmentHeldOut.includes(g) && g !== '口')!
  const donor = f.approved.find(d => d.glyph === glyph)!
  f.input.definitions[glyph] = '⿱' + f.split.validationHeldOut[0] + '？'
  f.input.definitionsSha256 = digest(f.input.definitions)
  f.split.definitionsSha256 = f.input.definitionsSha256
  resign(f)
  f.recipes.recipes.push({ id: 'fixture-partial-leak', glyph: f.split.validationHeldOut[0], position: 'top',
    donorGlyph: glyph, donorPathsSha256: digest(donor.paths), approvedPathIndices: [1],
    review: { status: 'reviewed-component-assignment', method: 'static-path-and-glyph-review',
      notes: 'Synthetic skipped recipe.', limitations: 'Never used for validation synthesis.' } })
  // These are 100 synthetic private-use glyphs, never the real frozen validation set.
  const generated = generatePhase2(f.input, f.approved, f.characters, f.split, f.recipes,
    { mode: 'validation', expectedSplitHash: f.split.hash })
  assert.equal(generated.validation?.v1.length, 100)
  assert.equal(generated.validation?.v2.length, 100)
  assert.equal(generated.eligibility.frozenValidationCandidateCount, 389)
  assert.ok(generated.eligibility.validation.some(e => e.glyph === glyph && e.reason === 'contains-known-held-out-name'))
  assert.equal(generated.libraries.validation?.v1.donorGlyphs.length, 388)
  assert.deepEqual(generated.libraries.validation?.v1.donorGlyphs, generated.libraries.validation?.v2.donorGlyphs)
  assert.ok(!generated.libraries.validation?.v2.donorGlyphs.includes(glyph))
  assert.ok(generated.libraries.validation?.v2.skippedRecipes?.some(r => r.id === 'fixture-partial-leak'))
  const references: string[] = []
  const result = scorePhase2(generated, g => { references.push(g); return f.approved.find(d => d.glyph === g)!.paths })
  assert.equal(references.length, 200)
  assert.equal(new Set(references).size, 200)
  assert.equal(result.summary.validation?.v1.targets, 100)
  assert.equal(result.summary.validation?.v2.targets, 100)
})

test('fresh validation is explicitly opted into; ordinary CLI invocation is development only', () => {
  assert.deepEqual(parsePhase2Args([]), { mode: 'development', json: false, check: false })
  assert.deepEqual(parsePhase2Args(['--development']), { mode: 'development', json: true, check: false })
  assert.deepEqual(parsePhase2Args(['--development', '--json']), { mode: 'development', json: true, check: false })
  assert.deepEqual(parsePhase2Args(['--json']), { mode: 'validation', json: true, check: false })
  assert.deepEqual(parsePhase2Args(['--check']), { mode: 'validation', json: false, check: true })
  assert.throws(() => parsePhase2Args(['--check', '--development']), /Use --development/)
  assert.throws(() => parsePhase2Args(['--json', '--json']), /Use --development/)
})
