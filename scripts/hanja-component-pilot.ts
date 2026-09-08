/** Reproducible, offline component experiment. Outputs JSON to stdout; never publishes animations. */
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDeepStrictEqual } from 'node:util'
import { HANJA_STROKES } from '../lib/hanja-strokes.ts'
import { comparePaths } from './hanja-component-geometry.ts'
import { buildLibrary, compose, digest, parseIds, selectHoldout, structureGroup,
  type ApprovedDonor, type CatalogCharacter, type Component, type Definition, type Ids } from './hanja-component-synthesis.ts'

export const DICTIONARY_SOURCE = {
  url: 'https://raw.githubusercontent.com/skishore/makemeahanzi/bddc96d41bef78427ed0e034e9f7e31d71fd1b92/dictionary.txt',
  sha256: '744bb05d5b0742e9ee35c37791f94d56a173349b3367569e7ca11e510364d203',
  license: 'LGPL-3.0-or-later; definitions only, not target stroke data',
} as const
export const PILOT_GLYPHS = [...'砲略鳴粉松誌討評妹妙妨標燃奇否崇異姿智泉']
export type InputSnapshot = {
  version: 1; dictionarySource: typeof DICTIONARY_SOURCE; sourceRows: number
  definitions: Record<string, string>; definitionsSha256: string
  approvedSnapshotSha256: string; candidateGlyphs: string[]
}
const donorHash = (approved: readonly ApprovedDonor[]) => digest([...approved].sort((a, b) => a.glyph.codePointAt(0)! - b.glyph.codePointAt(0)!))

/** Copy only character/decomposition. Foreign matches, graphics and target schedules are forbidden inputs. */
export function prepareInput(bytes: Uint8Array, approved: readonly ApprovedDonor[]): InputSnapshot {
  if (createHash('sha256').update(bytes).digest('hex') !== DICTIONARY_SOURCE.sha256) throw new Error('Dictionary source hash changed')
  const rows = new TextDecoder().decode(bytes).trim().split('\n').map(line => JSON.parse(line) as Definition)
  const source = new Map(rows.map(r => [r.character, r.decomposition]))
  if (source.size !== rows.length || rows.some(r => typeof r.character !== 'string' || typeof r.decomposition !== 'string')) throw new Error('Invalid dictionary')
  const needed = new Set<string>()
  function collect(glyph: string) {
    if (needed.has(glyph)) return
    needed.add(glyph)
    const tree = parseIds(source.get(glyph) ?? '')
    function walk(node: Ids) { if ('glyph' in node) collect(node.glyph); else node.children.forEach(walk) }
    if (tree) walk(tree)
  }
  ;[...approved.map(d => d.glyph), ...PILOT_GLYPHS].forEach(collect)
  const definitions = Object.fromEntries([...needed].sort((a, b) => a.codePointAt(0)! - b.codePointAt(0)!)
    .filter(g => source.has(g)).map(g => [g, source.get(g)!]))
  return { version: 1, dictionarySource: DICTIONARY_SOURCE, sourceRows: rows.length,
    definitions, definitionsSha256: digest(definitions), approvedSnapshotSha256: donorHash(approved), candidateGlyphs: PILOT_GLYPHS }
}

export function validateInput(input: InputSnapshot, approved: readonly ApprovedDonor[]) {
  if (input.version !== 1 || input.dictionarySource.url !== DICTIONARY_SOURCE.url || input.dictionarySource.sha256 !== DICTIONARY_SOURCE.sha256
    || input.definitionsSha256 !== digest(input.definitions) || input.approvedSnapshotSha256 !== donorHash(approved)
    || JSON.stringify(input.candidateGlyphs) !== JSON.stringify(PILOT_GLYPHS)
    || Object.entries(input.definitions).some(([glyph, ids]) => [...glyph].length !== 1 || typeof ids !== 'string')) {
    throw new Error('Component input snapshot changed; prepare and review a new experiment snapshot')
  }
}

export function runPilot(input: InputSnapshot, approved: readonly ApprovedDonor[], characters: readonly CatalogCharacter[]) {
  validateInput(input, approved)
  const definitions = new Map(Object.entries(input.definitions)), catalog = new Map(characters.map(c => [c.glyph, c]))
  const heldOut = selectHoldout(approved.map(a => a.glyph), definitions)
  // Build all candidates before the scorer receives any held-out paths.
  const training = buildLibrary(approved, definitions, catalog, heldOut)
  const predictions = heldOut.map(glyph => {
    const character = catalog.get(glyph)
    if (!character) throw new Error('Missing held-out catalog entry')
    return compose({ glyph, strokes: character.strokes }, definitions, training)
  })
  const expectedByGlyph = new Map(approved.map(a => [a.glyph, a]))
  const thresholds = { meanDistanceUnits: 8, maxStrokeDistanceUnits: 16, orderAgreement: 1, directionAgreement: 1 }
  const evaluation = predictions.map(prediction => {
    const expected = expectedByGlyph.get(prediction.glyph)!
    const metrics = comparePaths(prediction.paths, expected.paths)
    const screenPass = prediction.status === 'candidate-unreviewed' && metrics.countMatch
      && metrics.orderAgreement === thresholds.orderAgreement && metrics.directionAgreement === thresholds.directionAgreement
      && metrics.orderedMeanDistance !== null && metrics.orderedMeanDistance <= thresholds.meanDistanceUnits
      && metrics.maxMeanDistance !== null && metrics.maxMeanDistance <= thresholds.maxStrokeDistanceUnits
    return { ...prediction, group: structureGroup(prediction.glyph, definitions), grade: catalog.get(prediction.glyph)!.readingGrade,
      metrics, screenPass, expectedPaths: [...expected.paths] }
  })
  const pilotLibrary = buildLibrary(approved, definitions, catalog)
  const candidates = input.candidateGlyphs.map(glyph => {
    if (expectedByGlyph.has(glyph)) throw new Error('Pilot target already has an approved animation')
    const character = catalog.get(glyph)
    if (!character) throw new Error('Missing pilot catalog entry')
    return { ...compose({ glyph, strokes: character.strokes }, definitions, pilotLibrary),
      grade: character.readingGrade, hun: character.hun, eum: character.eum,
      review: { status: 'pending-whole-glyph-review', officialTargetEvidence: false } }
  })
  const usedIds = new Set([...evaluation, ...candidates].flatMap(c => c.placements.map(p => p.componentId)))
  const usedComponents = new Map<string, Component>()
  for (const c of [...training.components, ...pilotLibrary.components]) if (usedIds.has(c.id)) usedComponents.set(c.id, c)
  const groups = [...new Set(evaluation.map(e => e.group))].sort().map(group => {
    const items = evaluation.filter(e => e.group === group)
    return { group, total: items.length, generated: items.filter(e => e.status === 'candidate-unreviewed').length,
      screenPassed: items.filter(e => e.screenPass).length }
  })
  const reasons: Record<string, number> = {}
  for (const e of evaluation) if (e.reason) reasons[e.reason] = (reasons[e.reason] ?? 0) + 1
  const summary = {
    date: '2026-09-09', version: 'component-pilot-v1', approved: approved.length, heldOut: heldOut.length,
    trainingDonors: training.donorGlyphs.length, excludedContainedDonors: training.excludedDonors.filter(d => d.reason === 'contains-held-out-component').length,
    trainingComponents: training.components.length, trainingPositionalComponents: training.components.filter(c => c.position !== 'standalone').length,
    generated: evaluation.filter(e => e.status === 'candidate-unreviewed').length,
    abstained: evaluation.filter(e => e.status === 'abstained').length, screenPassed: evaluation.filter(e => e.screenPass).length,
    pilotRequested: candidates.length, pilotGenerated: candidates.filter(e => e.status === 'candidate-unreviewed').length,
    pilotApproved: 0, runtimePublished: 0, groups, abstentionReasons: reasons,
    metricsMeaning: 'Geometric order/direction proxies in a 100-unit viewBox; not Korean whole-glyph approval', thresholds,
    generationInputs: ['catalog glyph and expected count', 'IDS structure only', 'approved training donor paths', 'training-derived layouts', 'documented composition rules'],
    excludedInputs: ['held-out target paths and recipes', 'target foreign graphics', 'foreign matches/stroke schedules', 'held-out components in training donor IDS'],
    layout: 'Learned donor ratios with fixed fallback; target Noto shape not used by generator',
    limitations: ['Positional component assignments are inferred and unreviewed', 'Only binary left-right/top-bottom and full 囗 enclosure rules implemented',
      'NFC and known IDS subtrees checked for leakage; unknown alias relationships are not comprehensively mapped',
      'Image similarity cannot certify pen-lifts, legal variants, joins or Korean stroke order'],
  }
  return { summary, input: { dictionarySource: input.dictionarySource, definitionsSha256: input.definitionsSha256,
    approvedSnapshotSha256: input.approvedSnapshotSha256, heldOut },
    libraries: { evaluation: { hash: training.hash, donorGlyphs: training.donorGlyphs, excludedDonors: training.excludedDonors },
      pilot: { hash: pilotLibrary.hash, donorGlyphs: pilotLibrary.donorGlyphs } },
    components: [...usedComponents.values()], evaluation, candidates }
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const flags = process.argv.slice(2)
  if (flags.length > 1 || flags.some(flag => !['--prepare-input', '--json', '--check'].includes(flag))) {
    throw new Error('Usage: node scripts/hanja-component-pilot.ts [--prepare-input | --json | --check]')
  }
  if (process.argv.includes('--prepare-input')) {
    const response = await fetch(DICTIONARY_SOURCE.url, { signal: AbortSignal.timeout(60_000) })
    if (!response.ok) throw new Error('Dictionary fetch HTTP ' + response.status)
    console.log(JSON.stringify(prepareInput(new Uint8Array(await response.arrayBuffer()), HANJA_STROKES), null, 2))
    return
  }
  const input = JSON.parse(await readFile(join(root, 'scripts/hanja-component-input.json'), 'utf8')) as InputSnapshot
  const folder = join(root, 'content/hanja/characters')
  const characters: CatalogCharacter[] = (await Promise.all((await readdir(folder)).filter(f => f.endsWith('.json')).sort()
    .map(async f => JSON.parse(await readFile(join(folder, f), 'utf8')).characters))).flat()
  const result = runPilot(input, HANJA_STROKES, characters)
  if (process.argv.includes('--check')) {
    const folder = join(root, 'docs/hanja-component-pilot-2026-09-09')
    const expected = [
      ['evaluation.json', { summary: result.summary, input: result.input, library: result.libraries.evaluation, entries: result.evaluation }],
      ['candidates.json', { schemaVersion: 1, provenance: 'component-derived-unreviewed', runtimePublished: false,
        library: result.libraries.pilot, characters: result.candidates }],
      ['components.json', { schemaVersion: 1, scope: 'Only components used by the 100-target evaluation and 20-target pilot; positional assignments remain inferred',
        components: result.components }],
    ] as const
    for (const [file, data] of expected) {
      if (!isDeepStrictEqual(data, JSON.parse(await readFile(join(folder, file), 'utf8')))) throw new Error('Pilot artifact mismatch: ' + file)
    }
    console.log('Component pilot artifacts match the frozen 100-target evaluation and 20 unreviewed candidates.')
    return
  }
  console.log(JSON.stringify(process.argv.includes('--json') ? result : result.summary, null, 2))
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main()
