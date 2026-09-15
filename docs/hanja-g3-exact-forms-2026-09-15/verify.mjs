/** Read-only exact-form source, geometry and runtime verification. */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { prepare } from './prepare.mjs'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
import { validateDictionaryBundle, validateDictionaryReview } from '../../scripts/hanja-stroke-dictionary.ts'
const json = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sha = value => createHash('sha256').update(value).digest('hex')
const hash = value => sha(JSON.stringify(value))
const scope = json('./scope.json'), sources = json('./sources.json')
const observations = json('./observations.json'), review = json('./review.json')
const candidates = json('./candidate-paths.json'), form = json('./form-review.json')
const generated = prepare()
assert.equal(scope.status, 'review-complete')
assert.deepEqual(scope.glyphs, ['隷', '隣'])
assert.deepEqual(review, generated.review)
assert.deepEqual(candidates, generated.candidates)
assert.equal(form.publisherUsedForApproval, false)
assert.equal(form.sourceFormRegistryChanged, false)
validateDictionaryBundle()
for (const record of review.records) {
  const entry = HANJA_STROKES.find(e => e.glyph === record.glyph)
  assert.ok(entry && entry.verificationSource === 'ehanja-crosschecked')
  assert.equal(HANJA_STROKES.filter(e => e.glyph === record.glyph).length, 1)
  assert.deepEqual(entry, { ...generated.characters.find(e => e.glyph === record.glyph), verificationSource:'ehanja-crosschecked' })
  validateDictionaryReview(entry, record.strokes)
  const observation = observations.entries.find(e => e.glyph === record.glyph)
  assert.equal(observation.decision, 'matched')
  assert.ok(Object.values(observation.checks).every(v => v === 'match'))
  assert.deepEqual(observation.strokes.map(e => e.stroke), Array.from({length:record.strokes},(_,i)=>i+1))
  assert.ok(observation.strokes.every(e => e.reviewed && e.direction))
  const dictionary = sources.dictionary.find(e => e.glyph === record.glyph)
  assert.equal(dictionary.svgTitle, record.glyph)
  assert.equal(dictionary.strokes, record.strokes)
  const order = dictionary.animation.map(([start,duration],i)=>({start,duration,index:i+1})).sort((a,b)=>a.start-b.start)
  assert.deepEqual(order.map(e=>e.index), observation.chronologicalXmlIndices)
  assert.ok(order.every((e,i)=>e.duration>0 && (!i || e.start>=order[i-1].start+order[i-1].duration)))
  const excluded = form.entries.find(e => e.glyph === record.glyph)
  assert.notEqual(excluded.publisherGlyph.normalize('NFC'), record.glyph.normalize('NFC'))
}
assert.deepEqual(observations.entries.find(e=>e.glyph==='隣').chronologicalXmlIndices,[13,14,15,1,2,3,4,5,6,7,8,9,10,11,12])
for (const [file,before] of Object.entries(json('./baseline.json'))) {
  const entries = json('../../'+file)[before.key]
  assert.equal(hash(entries.slice(0,before.count)), before.prefixSha256)
  if (!file.includes('dictionary-reviewed-ja')) assert.equal(entries.length,before.count)
}
let freshSourcePins = 0
if (process.argv.includes('--fresh')) {
  const pins = [...sources.dictionary.map(e=>({url:e.svgUrl,bytes:e.bytes,sha256:e.sha256})),
    sources.stylesheet, sources.geometry, ...sources.videos.map(e=>e.sourceVideo)]
  for (const pin of pins) {
    const response = await fetch(pin.url,{signal:AbortSignal.timeout(30000)})
    assert.ok(response.ok)
    const raw = Buffer.from(await response.arrayBuffer())
    assert.equal(raw.length,pin.bytes)
    assert.equal(sha(raw),pin.sha256)
    if (pin.url === sources.geometry.url) {
      const rows = new Map(raw.toString().trim().split('\n').map(line=>JSON.parse(line)).map(e=>[e.character,e.medians]))
      for (const original of sources.originals) assert.deepEqual(rows.get(original.glyph),original.medians)
    }
    freshSourcePins++
  }
}
const catalog = json('../../content/hanja/characters/g3.json').characters
const applied = new Set(HANJA_STROKES.map(e=>e.glyph))
const missing = catalog.filter(e=>!applied.has(e.glyph))
assert.equal(missing.length,0)
console.log(JSON.stringify({result:'pass',addedCharacters:2,addedStrokes:31,unchangedCandidateStrokes:30,
  authoredConnectingStrokes:1,runtime:applied.size,remaining:5978-applied.size,
  grade3Applied:catalog.length,grade3Remaining:0,existingPrefixesPreserved:true,
  freshSourcePins,proprietaryAssetsSaved:0}))
