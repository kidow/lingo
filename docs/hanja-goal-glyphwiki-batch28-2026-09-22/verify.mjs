import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const root = new URL('../../', import.meta.url)
const read = path => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const expected = read('public/hanja-strokes/dictionary-reviewed-glyphwiki-batch28.json')
const built = JSON.parse(execFileSync(process.execPath, [fileURLToPath(new URL('./build.mjs', import.meta.url))], { encoding: 'utf8' }))
assert.deepEqual(built, expected)
assert.deepEqual(hanjaStrokeData({ glyph: '茸', strokes: 10 })?.paths, built[0].paths)
assert.equal(hanjaStrokeData({ glyph: '茸', strokes: 7 }), null)
let versions = 0
if (process.argv.includes('--sources')) {
  const source = read('public/hanja-strokes/glyphwiki/8338.json')
  for (const record of Object.values(source.records)) {
    const response = await fetch('https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(record.name + '@' + record.version))
    assert(response.ok, 'GlyphWiki API ' + response.status)
    const actual = await response.json()
    assert.equal(actual.name, record.name)
    assert.equal(Number(actual.version), record.version)
    assert.equal(actual.related, record.related)
    assert.equal(actual.data, record.data)
    versions++
  }
}
console.log(JSON.stringify({ passed: true, approvedGlyphs: 1, strokes: 10, sourceVersions: versions, privateGraphicsSaved: false }))
