import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { HANJA_STROKES } from '../../lib/hanja-strokes.ts'
const read = p => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'))
const f = read('findings.json'), n = read('next-source.json')
const audit = JSON.parse(execFileSync('python3', [new URL('audit.py', import.meta.url).pathname], { encoding: 'utf8', timeout: 90000, maxBuffer: 4e6 }))
assert.equal(audit.files, 45)
assert.equal(audit.tokenIdentical, 42)
assert.deepEqual(audit.errors.map(e => e.path), ['kanji/09e91-KaishoHzFst.svg'])
assert(audit.errors[0].error.includes('404'))
assert.equal(audit.changed.length, 2)
assert(audit.changed.every(e => e.glyph === '麑' && JSON.stringify(e.changedStrokes) === '[14,15]'))
const mapping = JSON.parse(execFileSync('python3', [new URL('mapping.py', import.meta.url).pathname], { encoding: 'utf8', timeout: 45000 }))
assert.deepEqual(mapping, f.mapping)
for (const e of mapping) {
  assert.equal(e.onlyReorderedExistingPaths, true)
  assert(Object.values(e.unchangedBlockingPaths).every(Boolean))
  assert.deepEqual(e.oldStrokeToCurrentStroke, [1,2,3,4,5,6,7,8,9,10,11,12,13,15,14,16,17,18,19])
}
assert.equal(f.decision, 'retain-prior-hold')
assert.equal(HANJA_STROKES.some(e => e.glyph === '麑'), false)
assert.equal(n.matchingGlyphs, 173)
assert.equal(n.matchingFiles, 173)
assert.equal(n.revision, '7a74e442c4130cccc226a7e7c2b683ac94c0cccb')
console.log(JSON.stringify({ passed: true, files: 45, identical: 42, sameGeometryReordered: 3, newRuntimeGlyphs: 0, nextSourceFilenameMatches: 173 }))
