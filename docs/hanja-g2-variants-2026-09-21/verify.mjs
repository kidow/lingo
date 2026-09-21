/** Read-only revalidation. Proprietary dictionary artwork remains in memory. */
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { svgMetadata } from '../hanja-g2-inventory-2026-09-15/dictionary-audit.mjs'

const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const hash = value => createHash('sha256').update(value).digest('hex')
const inputs = [
  read('docs/hanja-g2-si-2026-09-16/originals.json'),
  read('docs/hanja-g2-yu-zhen-2026-09-16/originals.json'),
]
const entries = inputs.flatMap(input => input.entries)
assert.deepEqual(entries.map(entry => entry.glyph), ['飼', '祐', '禎'])
const selectedSources = { MM: inputs[0].sources.MM, Ja: inputs[1].sources.Ja }
const receive = async (url, options = {}) => {
  const response = await fetch(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(180000) })
  assert.equal(response.status, 200, url)
  return Buffer.from(await response.arrayBuffer())
}
const corpora = Object.fromEntries(await Promise.all(Object.entries(selectedSources).map(async ([name, pin]) => {
  const raw = await receive(pin.url)
  assert.equal(raw.length, pin.bytes)
  assert.equal(hash(raw), pin.sha256)
  const selected = raw.toString('utf8').split('\n').filter(Boolean).map(line => JSON.parse(line))
    .filter(entry => entries.some(target => target.glyph === entry.character))
  return [name, new Map(selected.map(entry => [entry.character, entry]))]
})))
const catalog = read('content/hanja/characters/g2.json').characters
const checks = []
for (const entry of entries) {
  const { glyph } = entry
  const character = catalog.find(character => character.glyph === glyph)
  assert.equal(character.strokes, entry.catalogStrokes)
  const candidate = corpora[entry.corpus].get(glyph)
  assert.ok(candidate)
  assert.deepEqual(candidate.medians, entry.medians)
  assert.equal(hash(JSON.stringify(candidate.medians)), entry.originalMediansSha256)
  assert.deepEqual(normalizeMedians(candidate.medians), entry.paths)
  assert.equal(candidate.strokes.length, entry.dictionaryStrokes)
  const detail = await receive(entry.detail.url, { method: 'POST', body: new URLSearchParams({
    qry: '', snd: '', hanja: glyph, pageNo: '', keyfield: '', keyword: glyph, hanjaGrade: '', backUrl: '',
  }) })
  const html = detail.toString('utf8')
  const iframe = [...html.matchAll(/<iframe\b[^>]*>/gi)].map(match => match[0])
    .find(tag => /aniSVG/.test(tag))
  assert.ok(iframe, glyph + ' animation iframe')
  const url = new URL(iframe.match(/src\s*=\s*["']([^"']+)["']/i)[1], entry.detail.url).href
  assert.equal(url, entry.dictionary.url)
  const displayedStrokes = Number(html.match(/title=["']\s*(\d+)획 열람\s*["']/)[1])
  assert.equal(displayedStrokes, entry.dictionaryStrokes)
  const svg = await receive(url)
  assert.equal(svg.length, entry.dictionary.bytes)
  assert.equal(hash(svg), entry.dictionary.sha256)
  const metadata = svgMetadata(svg.toString('utf8'))
  assert.equal(metadata.title, glyph)
  assert.equal(metadata.outlines, entry.dictionaryStrokes)
  assert.equal(metadata.animated, entry.dictionaryStrokes)
  assert.equal(metadata.timingSequenceValid, true)
  assert.equal(metadata.clipCoverageValid, true)
  const sourceStrokeIndices = entry.paths.map((_, index) => index + 1)
  if (glyph === '祐') [sourceStrokeIndices[4], sourceStrokeIndices[5]] = [6, 5]
  assert.deepEqual(hanjaStrokeData(character)?.paths, sourceStrokeIndices.map(index => entry.paths[index - 1]),
    'Runtime must contain exactly the reviewed playback variant')
  checks.push({ glyph, catalogStrokes: character.strokes, playbackStrokes: displayedStrokes,
    corpus: entry.corpus, sourceStrokeIndices,
    candidateMediansSha256: entry.originalMediansSha256,
    reviewedPathsSha256: hash(JSON.stringify(sourceStrokeIndices.map(index => entry.paths[index - 1]))),
    detail: { url: entry.detail.url, bytes: detail.length, sha256: hash(detail), displayedStrokes },
    dictionary: entry.dictionary, metadata })
}
// This existing diagnostic compares source endpoints only; it is not a visual approval.
const comparison = JSON.parse(execFileSync(process.execPath,
  [fileURLToPath(new URL('../hanja-g2-remaining-2026-09-20/compare.mjs', import.meta.url))],
  { encoding: 'utf8', maxBuffer: 1024 * 1024, timeout: 240000 }))
for (const check of checks) {
  const diagnostic = comparison.findings.find(entry => entry.glyph === check.glyph).candidates[check.corpus]
  assert.equal(diagnostic.strokes, check.playbackStrokes)
  assert.deepEqual(diagnostic.unmatchedDictionaryStrokes, [])
  const angles = diagnostic.pairs.map(pair => pair.angle)
  if (check.glyph === '祐') {
    const swap = diagnostic.resolvedByNeighbourSwap.find(swap => String(swap.candidateStrokes) === '5,6')
    assert.ok(swap)
    angles.splice(4, 2, ...swap.anglesAfterSwap)
  }
  assert.ok(angles.every(angle => angle <= 60))
  check.endpointAnglesAfterOrderCorrection = angles
  check.maximumEndpointAngle = Math.max(...angles)
}
const catalogPaths = execFileSync('git', ['ls-files', 'content/hanja/characters/*.json'],
  { cwd: fileURLToPath(root), encoding: 'utf8' }).trim().split('\n')
const characters = catalogPaths.flatMap(path => read(path).characters)
const applied = characters.filter(character => hanjaStrokeData(character)).length
const review = read('docs/hanja-g2-variants-2026-09-21/review.json')
assert.equal(review.reviewedStrokes, 35)
assert.equal(review.runtimeApprovalsAdded, 0)
assert.deepEqual(review.entries.map(entry => entry.glyph), checks.map(check => check.glyph))
for (const entry of review.entries) {
  const check = checks.find(check => check.glyph === entry.glyph)
  for (const field of ['catalogStrokes', 'playbackStrokes', 'corpus', 'sourceStrokeIndices', 'reviewedPathsSha256']) {
    assert.deepEqual(entry[field], check[field], entry.glyph + ' ' + field)
  }
  assert.equal(entry.strokeObservations.length, check.playbackStrokes)
  assert.equal(new Set(entry.sourceStrokeIndices).size, check.playbackStrokes)
  assert.equal(hash(readFileSync(new URL(entry.staticSvg.path, root))), entry.staticSvg.sha256)
}
console.log(JSON.stringify({ schemaVersion: 1, checkedAt: new Date().toISOString(),
  purpose: 'Three complete dictionary variants revalidated against the integrated runtime; catalog counts preserved.',
  characters: checks.length, reviewedStrokes: checks.reduce((sum, check) => sum + check.playbackStrokes, 0),
  proprietaryAssetsSaved: 0, runtimeVariantCharacters: checks.length,
  sourcePins: selectedSources, checks,
  progress: { total: characters.length, applied, remaining: characters.length - applied,
    grade2: { total: catalog.length, applied: catalog.filter(character => hanjaStrokeData(character)).length } },
}, null, 2))
