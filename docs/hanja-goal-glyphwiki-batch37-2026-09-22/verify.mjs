import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import vm from 'node:vm'
import { hanjaStrokeData } from '../../lib/hanja-strokes.ts'
const read=file=>JSON.parse(readFileSync(new URL(file,import.meta.url),'utf8'))
const {source,aliases}=read('./sources.json'),proof=read('./reference.json'),finding=read('./findings.json')
assert.equal(finding.decision,'held')
assert.equal(finding.full18StrokeApproval,false)
assert.deepEqual(finding.reviewedStrokes,[11,13,14,15])
assert.equal(hanjaStrokeData({glyph:'薯',strokes:18}),null)
assert.equal(source.records['koseki-365350'].data.split('$')[1],finding.sourceStretch.raw)
assert.equal(proof.raw.length,20)
assert.equal(proof.paths.length,18)
assert.deepEqual(proof.groups.flat(),Array.from({length:20},(_,i)=>i+1))
assert.deepEqual(proof.order.slice().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1))
const point=(x,y)=>[x/2,y/2].map(v=>Math.round(v*1e6)/1e6).join(' ')
const grouped=proof.groups.map(g=>{
  const a=proof.raw[g[0]-1]
  assert([1,2].includes(a[0]))
  let p='M '+point(a[3],a[4])+(a[0]===1?' L ':' Q ')+point(a[5],a[6])
  if(a[0]===2)p+=' '+point(a[7],a[8])
  if(g.length===2){
    const b=proof.raw[g[1]-1]
    assert.equal(g[1],g[0]+1)
    assert.deepEqual(a.slice(0,3),[1,2,2])
    assert.deepEqual(b.slice(0,3),[1,22,23])
    assert.deepEqual(a.slice(5,7),b.slice(3,5))
    p+=' L '+point(b[5],b[6])
  }else assert.equal(g.length,1)
  return p
})
assert.deepEqual(proof.paths,proof.order.map(i=>grouped[i-1]))
// Keep the documented upper gap; do not silently move the vertical to the net.
assert.equal(Math.round((proof.raw[11][4]-proof.raw[9][4])*1e6)/1e6,4.95)
assert(proof.strokeWidth<(proof.raw[11][4]-proof.raw[9][4])/2)
let checked=0,engineChecked=false
if(process.argv.includes('--sources')){
  for(const r of [...Object.values(source.records),...aliases]){
    const response=await fetch('https://glyphwiki.org/api/glyph?name='+encodeURIComponent(r.name+'@'+r.version))
    assert(response.ok);const a=await response.json()
    assert.equal(Number(a.version),r.version)
    for(const k of ['name','related','data'])assert.equal(a[k],r[k])
    checked++
  }
}
if(process.argv.includes('--engine')){
  const response=await fetch(proof.url);assert(response.ok)
  const code=await response.text()
  assert.equal(createHash('sha256').update(code).digest('hex'),proof.engineSha256)
  const context=vm.createContext({Buhin:function(){this.search=name=>{
    assert(source.records[name]);return source.records[name].data
  }}})
  vm.runInContext(code,context,{timeout:1000})
  context.sourceData=source.records[source.root].data
  const raw=vm.runInContext('new Kage().getEachStrokes(sourceData).map(r=>r.slice(0,r[0]===1?7:r[0]===2?9:11))',context,{timeout:1000})
  assert.deepEqual(JSON.parse(JSON.stringify(raw)),proof.raw)
  engineChecked=true
}
console.log(JSON.stringify({passed:true,heldGlyph:'薯',sourceVersions:checked,engineChecked,reviewedSteps:4,full18StrokeApproval:false,runtimeChanged:false}))
