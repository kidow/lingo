import assert from 'node:assert/strict'
import {readFileSync, readdirSync} from 'node:fs'
import {execFileSync} from 'node:child_process'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'

const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url)))
const generated = JSON.parse(execFileSync(process.execPath, [new URL('build.mjs', import.meta.url).pathname], {encoding:'utf8'}))
const bundled = read('../../public/hanja-strokes/dictionary-reviewed-special2-rabbit-variant.json')
assert.deepEqual(bundled, generated)
const grades = readdirSync(new URL('../../content/hanja/characters/', import.meta.url)).filter(f => f.endsWith('.json'))
  .map(file => ({file, characters: read('../../content/hanja/characters/' + file).characters}))
const characters = grades.flatMap(g => g.characters)
const rabbit = characters.find(c => c.glyph === '兎')
assert.equal(rabbit.strokes, 7)
assert.deepEqual(hanjaStrokeData(rabbit)?.paths, bundled[0].paths)
assert.equal(bundled[0].paths.length, 8)
const applied = characters.filter(c => hanjaStrokeData(c)).length
console.log(JSON.stringify({pass:true,addedCharacters:1,addedStrokes:8,reproduction:true,
  runtime:{applied,total:characters.length,remaining:characters.length-applied},
  grades:grades.map(g => {const applied=g.characters.filter(c => hanjaStrokeData(c)).length;return {
    grade:g.characters[0].readingGrade,applied,total:g.characters.length,remaining:g.characters.length-applied,
    percent:Number((100*applied/g.characters.length).toFixed(1))}})},null,2))
