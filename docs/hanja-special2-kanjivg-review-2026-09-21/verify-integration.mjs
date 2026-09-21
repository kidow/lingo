/** Current runtime validation; verify.mjs intentionally retains the pre-integration snapshot. */
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url)))
const generated = JSON.parse(execFileSync(process.execPath, [new URL('build.mjs', import.meta.url).pathname], {encoding:'utf8'}))
const bundled = read('../../public/hanja-strokes/dictionary-reviewed-special2-kanjivg-variants.json')
assert.deepEqual(bundled, generated)
const characters = readdirSync(new URL('../../content/hanja/characters/', import.meta.url))
  .filter(f => f.endsWith('.json')).flatMap(f => read('../../content/hanja/characters/' + f).characters)
for (const entry of bundled) {
  const character = characters.find(c => c.glyph === entry.glyph)
  assert.deepEqual(hanjaStrokeData(character)?.paths, entry.paths)
  assert.equal(character.strokes, entry.variant.catalogStrokes)
}
for (const glyph of [...'鱉宬篠']) assert.equal(hanjaStrokeData(characters.find(c => c.glyph === glyph)), null)
const applied = characters.filter(c => hanjaStrokeData(c)).length
const special2 = read('../../content/hanja/characters/special-2.json').characters
const runtime = {applied, total:characters.length, remaining:characters.length-applied,
  special2Applied:special2.filter(c => hanjaStrokeData(c)).length, special2Total:special2.length}
assert.deepEqual(runtime, {applied:4925,total:5978,remaining:1053,special2Applied:844,special2Total:1150})
console.log(JSON.stringify({pass:true,addedCharacters:3,addedStrokes:65,reproduction:true,runtime}, null, 2))
