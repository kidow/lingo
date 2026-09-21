import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const read = name => JSON.parse(readFileSync(new URL(name, import.meta.url), 'utf8'))
const sources = read('sources.json'), findings = read('findings.json')
function leaves(source) {
  const out = []
  function visit(key, chain = []) {
    assert(!chain.includes(key), 'Cycle')
    const record = source.records[key]; assert(record)
    for (const row of record.data.split('$')) {
      const fields = row.split(':')
      if (fields[0] === '99') visit(fields[7], [...chain, key])
      else out.push(row)
    }
  }
  visit(source.root)
  return out
}
assert.equal(leaves(sources.primary).length, 13)
assert.equal(leaves(sources.alternative).length, 13)
assert.equal(findings.decision, 'held-at-source-boundary')
assert.equal(findings.fullGlyphReviewed, false)
assert.equal(findings.runtimeAdded, 0)
const water = sources.primary.records['u6c35-01@10'].data.split('$')
assert.deepEqual(water.slice(2).map(row => row.split(':').slice(0, 3)), [['2','7','8'],['2','32','7']])
const end = water[2].split(':').slice(-2).map(Number)
const start = water[3].split(':').slice(3, 5).map(Number)
assert.deepEqual(end, findings.connection.part1.end)
assert.deepEqual(start, findings.connection.part2.start)
assert.notDeepEqual(end, start)
const other = sources.alternative.records['u6c35-01@8'].data.split('$')
assert.deepEqual(other[2].split(':').slice(-2).map(Number), findings.alternative.part1End)
assert.deepEqual(other[3].split(':').slice(3,5).map(Number), findings.alternative.part2Start)
assert.notDeepEqual(findings.alternative.part1End, findings.alternative.part2Start)
let versions = 0
if (process.argv.includes('--sources')) {
  const seen = new Set()
  for (const source of Object.values(sources)) for (const rec of Object.values(source.records)) {
    const name = rec.name + '@' + rec.version
    if (seen.has(name)) continue
    seen.add(name)
    const res = await fetch('https://glyphwiki.org/api/glyph?name=' + encodeURIComponent(name))
    assert(res.ok, 'HTTP ' + res.status)
    const actual = await res.json()
    assert.equal(actual.name, rec.name)
    assert.equal(Number(actual.version), rec.version)
    assert.equal(actual.related, rec.related)
    assert.equal(actual.data, rec.data)
    versions++
  }
}
console.log(JSON.stringify({passed:true,sourceVersions:versions,primitives:[13,13],boundaryMismatch:true,runtimeAdded:0,fullGlyphReviewed:false,privateGraphicsSaved:false}))
