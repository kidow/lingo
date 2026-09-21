import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { hanjaStrokeData, HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const root = new URL('../../', import.meta.url)
const read = p => JSON.parse(readFileSync(new URL(p, root), 'utf8'))
const output = JSON.parse(execFileSync(process.execPath, [new URL('build.mjs', import.meta.url).pathname], { encoding: 'utf8' }))
assert.deepEqual(output, read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch26.json'))
assert.deepEqual(hanjaStrokeData({glyph:'芥',strokes:8}).paths, output[0].paths)
assert.equal(HANJA_STROKES.filter(e=>e.glyph==='芥').length,1)
assert.equal(hanjaStrokeData({glyph:'庾',strokes:11}),null)
assert.equal(hanjaStrokeData({glyph:'庾',strokes:12}),null)
let sourceVersions = 0
if (process.argv.includes('--sources')) {
  for (const record of Object.values(read('public/hanja-strokes/glyphwiki/82a5.json').records)) {
    const url = 'https://glyphwiki.org/api/glyph?name='+encodeURIComponent(record.name+'@'+record.version)
    const response = await fetch(url)
    assert.equal(response.status,200)
    const actual = await response.json()
    assert.equal(actual.name,record.name)
    assert.equal(Number(actual.version),record.version)
    assert.equal(actual.data,record.data)
    sourceVersions++
  }
}
console.log(JSON.stringify({passed:true,approvedGlyphs:1,approvedStrokes:8,heldGlyphs:1,heldDomesticStrokes:12,sourceVersions,privateGraphicsSaved:false}))
