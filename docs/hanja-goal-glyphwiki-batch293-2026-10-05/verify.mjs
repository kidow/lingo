import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),alternatives=read('./alternative-inventory.json'),review=read('./review.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"5cec3a6321db51a5063306cb28c31dea99890067bd4f433570288718a7948dc8")
assert.equal(source.root,'u9ae5-k')
assert.deepEqual(source.missing,[])
assert.deepEqual(source.providerVersions,[])
assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,6)
assert.equal(proof.groups.length,16)
assert.equal(trace.flat().length,17)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(proof.trace,trace)
assert.deepEqual(trace[5][0].args.slice(4,6),[34,100.82])
assert.deepEqual(trace[6][0].args.slice(0,2),[21,104])
assert.notDeepEqual(trace[5][0].args.slice(4,6),trace[6][0].args.slice(0,2))
assert.equal(Math.hypot(34-21,100.82-104),review.originalPenGap.distance)
assert.deepEqual(alternatives.alternatives.map(a=>a.root),['u9ae5','u9ae5-k','u9ae5-ue0100'])
for(const s of alternatives.alternatives){
 assert.deepEqual(s.missing,[])
 for(const n of ['u9ae5','u9adf-03','u5184','u5182','u20120'])assert.deepEqual(s.records[n],source.records[n])
 if(s.root!=='u9ae5')assert.equal(s.records[s.root].data,'99:0:0:0:0:200:200:u9ae5')
}
assert.equal(hanjaStrokeData({glyph:'髥',strokes:14}),null)
assert.equal(review.runtimeRegistered,0)
assert.equal(review.geometryReviewPassed,false)
assert.equal(review.progressiveFramesApproved,0)
assert.equal(review.privateMediaSaved,false)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const s of alternatives.alternatives){
  const ctx=vm.createContext({records:s.records,root:s.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual,{groups:proof.groups,trace,defaults:proof.defaults})
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,wholeSources:3,rawGroupsEach:16,drawingPrimitivesEach:17,quadraticPrimitives:7,cubicPrimitives:0,sourceCaptureHashVerified:true,originalPenGapConfirmed:true,runtimeRegistered:0,engineChecked,privateMediaSaved:false}))
