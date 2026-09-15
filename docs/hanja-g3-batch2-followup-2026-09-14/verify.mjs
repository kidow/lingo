import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { HANJA_TEXTBOOK_STROKES } from '../../lib/hanja-stroke-textbook.ts'
import { TEXTBOOK_REVIEW_REGISTRY, validateTextbookReview } from '../../scripts/hanja-stroke-textbook.ts'
import { TEXTBOOK_CORRECTIONS } from '../../scripts/hanja-stroke-textbook-corrections.ts'
import { normalizeMedians } from '../../lib/hanja-stroke-geometry.ts'
import { prepare } from './prepare.mjs'

const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const queue = json('../hanja-g3-batch2-2026-09-14/queue.json')
const oldObservations = json('../hanja-g3-batch2-2026-09-14/observations.json')
const observations = json('./observations.json'), generated = prepare()
const records = json('./review.json').records, recipes = json('./corrections.json').recipes
const characters = json('./candidate-paths.json').characters
assert.deepEqual(observations.map(r => r.glyph), oldObservations.filter(r => r.decision === 'held').map(r => r.glyph))
assert.deepEqual(records, generated.records)
assert.deepEqual(recipes, generated.recipes)
assert.deepEqual(characters, generated.characters)
assert.equal(records.length, 10)
assert.equal(recipes.length, 7)
assert.equal(records.reduce((sum, r) => sum + r.expectedStrokes, 0), 116)
const held = observations.filter(r => r.decision === 'held')
assert.equal(held.map(r => r.glyph).join(''), '屯鈍')
for (const row of held) {
  assert.ok(row.notes.trim() && row.conflicts.length)
  const resolved = json('../hanja-g3-direction-2026-09-15/review.json').records.find(r => r.glyph === row.glyph)
  assert.ok(resolved, 'Historical hold requires the exact direction re-review')
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(r => r.glyph === row.glyph), resolved)
  validateTextbookReview(HANJA_STROKES.find(r => r.glyph === row.glyph), resolved.expectedStrokes)
}
for (const record of records) {
  const item = queue.entries.find(e => e.glyph === record.glyph)
  const entry = HANJA_TEXTBOOK_STROKES.find(e => e.glyph === record.glyph)
  assert.deepEqual(TEXTBOOK_REVIEW_REGISTRY.records.find(r => r.glyph === record.glyph), record)
  assert.deepEqual(record.sourceVideo, item.sourceVideo)
  assert.equal(record.manifestRow, item.manifest.manifestRow)
  assert.equal(record.videoFilename, item.manifest.videoFilename)
  assert.equal(record.expectedStrokes, item.strokes)
  const { verificationSource, ...published } = entry
  assert.equal(verificationSource, queue.publisher.id)
  assert.deepEqual(published, characters.find(e => e.glyph === record.glyph))
  validateTextbookReview(entry, item.strokes)
  assert.equal(record.strokeEndsSeconds.length, item.strokes)
  record.strokeEndsSeconds.forEach((time, index, all) => {
    assert.ok(time > (index ? all[index - 1] : 0) && time <= record.durationSeconds)
  })
}
for (const recipe of recipes) assert.deepEqual(TEXTBOOK_CORRECTIONS.find(r => r.id === recipe.id), recipe)
const zero = recipes.find(r => r.glyph === '零')
assert.deepEqual(zero.strokes.filter(s => s.sourceStroke === null).length, 3)
for (const glyph of ['劣', '淚']) {
  const original = json('./alternates.json').Ja.find(r => r.glyph === glyph)
  assert.deepEqual(characters.find(r => r.glyph === glyph).paths, normalizeMedians(original.medians))
  assert.equal(records.find(r => r.glyph === glyph).geometrySource, queue.geometry.Ja.sha256)
}
// In 鈍, XML outline IDs 1/3 become chronological strokes 9/11.
const dictionary = json('./sources.json').records
const dun = dictionary.find(r => r.glyph === '鈍')
const chronological = dun.animation.map(([start], i) => ({ start, index: i + 1 })).sort((a, b) => a.start - b.start)
assert.deepEqual(chronological.map(r => r.index), [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4])
for (const [file, before] of Object.entries(json('./baseline.json'))) {
  assert.equal(hash(json('../../' + file)[before.key].slice(0, before.count)), before.prefixSha256)
}
let freshSourcePins = 0
if (process.argv.includes('--sources')) {
  for (const pin of [...dictionary, ...observations.map(o => queue.entries.find(e => e.glyph === o.glyph).sourceVideo)]) {
    const response = await fetch(pin.svgUrl ?? pin.url)
    assert.ok(response.ok)
    const raw = Buffer.from(await response.arrayBuffer())
    assert.equal(raw.length, pin.bytes)
    assert.equal(sha(raw), pin.sha256)
    freshSourcePins++
  }
  for (const [key, originals] of Object.entries(json('./alternates.json'))) {
    if (!originals.length) continue
    const pin = queue.geometry[key]
    const response = await fetch(pin.url)
    assert.ok(response.ok)
    const raw = Buffer.from(await response.arrayBuffer())
    assert.equal(raw.length, pin.bytes)
    assert.equal(sha(raw), pin.sha256)
    const targets = new Map(raw.toString().trim().split('\n').map(line => JSON.parse(line)).map(r => [r.character, r.medians]))
    for (const original of originals) assert.deepEqual(targets.get(original.glyph), original.medians)
    freshSourcePins++
  }
}
const applied = new Set(HANJA_STROKES.map(r => r.glyph))
const grade3 = json('../../content/hanja/characters/g3.json').characters
const grade3Applied = grade3.filter(r => applied.has(r.glyph)).length
console.log(JSON.stringify({ result: 'pass', reviewedCharacters: 12, reviewedStrokes: 132,
  addedCharacters: 10, addedStrokes: 116, corrections: 7, alternateCorpusSelections: 2,
  heldCharacters: 2, heldStrokes: 16, heldGlyphs: '屯鈍', runtime: applied.size,
  remaining: 5978 - applied.size, grade3Applied, grade3Remaining: grade3.length - grade3Applied,
  existingPrefixesPreserved: true, freshSourcePins, proprietaryAssetsSaved: 0 }))
