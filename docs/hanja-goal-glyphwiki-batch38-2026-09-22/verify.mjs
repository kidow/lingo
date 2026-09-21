import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const read=f=>JSON.parse(readFileSync(new URL(f,import.meta.url),'utf8'))
const sources=read('./sources.json'),finding=read('./findings.json')
assert.equal(finding.decision,'held')
assert.equal(finding.full15StrokeApproval,false)
assert.deepEqual(finding.primary.reviewedSteps,[11,12,13,14])
assert.deepEqual(finding.alternative.reviewedSteps,[11,13])
assert.equal(hanjaStrokeData({glyph:'蔗',strokes:15}),null)
const primary=sources.entries.find(e=>e.root==='u8517-k')
const alternative=sources.entries.find(e=>e.root==='gaijin_krcourt-08517')
const primaryBottom=primary.records['u5eb6@5'].data.split('$')[3].split(':').map(Number)
assert.deepEqual(primaryBottom,[1,2,2,83,124,131,124])
const longBottom=alternative.records['u9fb7-03'].data.split('$')[3].split(':').map(Number)
assert.deepEqual(longBottom,[1,0,0,14,72,186,72])
assert.equal(primary.records['u706c-04'].data,alternative.records['u706c-04'].data)
const dot=primary.records['u706c-04'].data.split('$')[1].split(':').map(Number)
assert.deepEqual(dot,[2,7,8,69,142,83,159,81,180])
assert(dot[7]>dot[3],'Source dot still ends right of its start; do not silently mirror it')
const toki=sources.entries.find(e=>e.root==='toki-01080170')
assert.equal(toki.records['u2c788-jv'].related,'U+2C788')
assert(toki.records['u5ebb-ue0100'].data.includes('u4ece-09'))
const unique=new Map(sources.entries.flatMap(s=>Object.values(s.records)).map(r=>[r.name+'@'+r.version,r]))
assert.equal(unique.size,20)
let checked=0
if(process.argv.includes('--sources'))for(const[key,r]of unique){
  const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(key))
  assert(response.ok);const a=await response.json()
  assert.equal(Number(a.version),r.version)
  for(const k of ['name','related','data'])assert.equal(a[k],r[k])
  checked++
}
console.log(JSON.stringify({passed:true,heldGlyph:'蔗',sourceVersions:checked,primaryReviewedSteps:4,alternativeReviewedSteps:2,full15StrokeApproval:false,runtimeChanged:false}))
