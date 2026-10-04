import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const review=read('./review.json'),meta=read('./metadata.json'),alternatives=read('./alternative-inventory.json')
const cases=[{source:read('./sources.json'),proof:read('./engine-proof.json'),trace:read('./draw-trace.json'),sha:"f0914a07edc08e77f16bfb326074e8273d5eaf17f9b06d9261747bf090bfd886",file:'./sources.json',raw:18,draw:21},{source:read('./historical-sources.json'),proof:read('./historical-engine-proof.json'),trace:read('./historical-draw-trace.json'),sha:"68b1eab3fed16b6c57e615b268bb2e46d6b6ba58a14d922d11b1cf7fc06a2095",file:'./historical-sources.json',raw:20,draw:23}]
assert.equal(meta.dictionary.assignedStrokeCount,15)
assert.equal(meta.dictionary.strokeCount,16)
assert.equal(meta.dictionary.clipIds.length,16)
assert.equal(alternatives.alternatives.length,15)
for(const c of cases){
 assert.equal(sha(readFileSync(new URL(c.file,import.meta.url))),c.sha)
 assert.deepEqual(c.source.missing,[])
 assert.equal(c.proof.groups.length,c.raw)
 assert.equal(c.trace.flat().length,c.draw)
 assert.equal(c.trace.flat().filter(t=>t.kind==='cdDrawCurve').length,9)
 assert.equal(c.trace.flat().filter(t=>t.kind==='cdDrawBezier').length,0)
 assert.deepEqual(c.proof.trace,c.trace)
}
assert.equal(cases[1].source.records['u268dd-itaiji-001@3'].data,'[[u2ff0-u4e3f-u81e3@2]]')
assert.equal(cases[1].source.providerVersions.length,3)
const gap=review.historical.originalPenGap,t=cases[1].trace
assert.deepEqual(t[1][0].args.slice(4,6),gap.beforeEnd)
assert.deepEqual(t[2][0].args.slice(0,2),gap.afterStart)
assert.notDeepEqual(gap.beforeEnd,gap.afterStart)
assert.equal(Math.hypot(...gap.beforeEnd.map((v,i)=>v-gap.afterStart[i])),gap.distance)
assert.deepEqual(review.domesticReviewedStrokes,Array.from({length:16},(_,i)=>i+1))
assert.equal(review.runtimeRegistered,0)
assert.equal(review.progressiveFramesApproved,0)
assert.equal(review.privateMediaSaved,false)
for(const strokes of [15,16])assert.equal(hanjaStrokeData({glyph:'凞',strokes}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={},proof=cases[0].proof
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const c of cases){
  const ctx=vm.createContext({records:c.source.records,root:c.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual,{groups:c.proof.groups,trace:c.trace,defaults:c.proof.defaults})
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,wholeSourcesReproduced:2,archiveAlternatives:15,rawGroups:[18,20],drawingPrimitives:[21,23],QEach:9,C:0,historicalVersions:3,domesticReviewed:16,assignedStrokesRetained:15,originalPenGapConfirmed:true,runtimeRegistered:0,engineChecked,privateMediaSaved:false}))
