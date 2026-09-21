import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
import { makeRequest, validateResponse } from '../../scripts/hanja-jev-review.mjs'
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const source = read('./sources.json'), findings = read('./findings.json')
assert.equal(findings.approved, false)
assert.equal(findings.runtimeAdded, 0)
assert.equal(findings.reviewedSteps.length, 17)
assert.equal(hanjaStrokeData({ glyph: '薪', strokes: 17 }), null)
const rows = source.records['u4eb2-01'].data.split('$').map(row => row.split(':').map(Number))
assert.equal(rows[5][4], 112)
assert.equal(rows[7][4], rows[5][4])
assert(rows[7][3] > rows[5][3] && rows[7][3] < rows[5][5])
const request = makeRequest(read('./jev-input.json')), result = read('./jev-result.json')
validateResponse(result, request)
assert.equal(result.requestSha256, createHash('sha256').update(JSON.stringify(request)).digest('hex'))
assert.equal(result.runtimeApproval, false)
let versions = 0
if (process.argv.includes('--sources')) {
  for (const record of Object.values(source.records)) {
    const response = await fetch('https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(record.name + '@' + record.version), { signal: AbortSignal.timeout(15000) })
    assert(response.ok, 'GlyphWiki HTTP ' + response.status)
    const actual = await response.json()
    for (const key of ['name', 'related', 'data']) assert.equal(actual[key], record[key])
    assert.equal(Number(actual.version), record.version)
    versions++
  }
}
console.log(JSON.stringify({ passed: true, heldGlyphs: 1, inspectedStrokes: 17, sourceVersions: versions, runtimeAdded: 0, jevResponseVerified: true, privateGraphicsSaved: false }))
