import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const read = file => JSON.parse(readFileSync(new URL(file,import.meta.url),'utf8'))
const sources=read('./sources.json').entries, finding=read('./findings.json')
assert.equal(finding.decision,'held')
assert.equal(finding.fullGlyphReviewed,false)
assert.deepEqual(finding.domesticVisualSteps,[5,6])
assert.equal(hanjaStrokeData({glyph:'苔',strokes:9}),null)
for(const b of finding.sourceBoundaries){
  const s=sources.find(s=>s.root===b.root),r=s.records[b.record]
  assert.equal(r.version,b.version)
  const rows=r.data.split('$').map(row=>row.split(':'))
  assert.deepEqual(rows[b.firstRow-1].slice(-2).map(Number),b.end)
  assert.deepEqual(rows[b.secondRow-1].slice(3,5).map(Number),b.start)
  assert.notDeepEqual(b.end,b.start,'Must not imply an exact shared endpoint')
}
let checked=0
const unique=new Map(sources.flatMap(s=>Object.values(s.records)).map(r=>[r.name+'@'+r.version,r]))
assert.equal(unique.size,13)
if(process.argv.includes('--sources'))for(const[key,r]of unique){
  const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(key))
  assert(response.ok);const a=await response.json()
  assert.equal(Number(a.version),r.version)
  for(const k of ['name','related','data'])assert.equal(a[k],r[k])
  checked++
}
console.log(JSON.stringify({passed:true,heldGlyph:'苔',sourceVersions:checked,fullGlyphReviewed:false,runtimeChanged:false}))
