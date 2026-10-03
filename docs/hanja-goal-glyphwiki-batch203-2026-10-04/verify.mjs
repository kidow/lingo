import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json'),inventory=read('./additional-source-inventory.json'),live=read('./live-source-reads.json'),next=read('./next-source-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"c04390b7bbae4983de03e3c5887e2fe149ecf67efdd0a33a233c3d7c4459301e")
assert.equal(sha(readFileSync(new URL('./engine-proof.json',import.meta.url))),"3688b1df3f79e037e4cf1d9644888f012aa5503d3a4cfde693c06269506ca0c0")
assert.equal(sha(readFileSync(new URL('./draw-trace.json',import.meta.url))),"6d6937e1f6fba83a4f3f07bc86f19f95ad41d08f500ef6e0cfe02515e9c8bd5d")
assert.equal(source.root,'u9002-k');assert.equal(Object.keys(source.records).length,4)
assert.equal(proof.groups.length,13);assert.equal(trace.flat().length,13)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,4)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,1)
const closure=s=>{assert.deepEqual(s.missing,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]],'declared dependency missing')}
closure(source);for(const s of inventory.alternatives)closure(s);closure(next)
assert.equal(inventory.alternatives.length,7);assert.equal(next.root,'u5808-k');assert.equal(Object.keys(next.records).length,5)
for(const s of [source,...inventory.alternatives,next])assert.equal(s.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
for(const s of inventory.alternatives)if(s.records.u8fb6)assert.equal(s.records.u8fb6.data,source.records.u8fb6.data)
assert.deepEqual(trace[4][0].args.slice(4,6),[55,154]);assert.deepEqual(trace[5][0].args.slice(0,2),[53,152])
assert.equal(findings.gap.distance,Math.hypot(2,2));assert.equal(findings.progressiveFramesApproved,0);assert.equal(findings.runtimeAdded,0)
assert.deepEqual(findings.domesticReviewed,[1,2,3,4,5,6,7,8,9,10]);assert.equal(findings.geometryReviewPassed,false);assert.equal(hanjaStrokeData({glyph:'适',strokes:10}),null)
assert.equal(live.records.length,4);for(const r of live.records)assert.equal(sha(r.data),r.sha256)
assert.equal(live.records.find(r=>r.name==='u8fb6-j').data,source.records.u8fb6.data)
assert.equal(live.records.find(r=>r.name==='u9002-k').data,'[[u9002-jn]]')
assert.equal(live.records.find(r=>r.name==='u9002-jn').data,'99:0:0:0:0:200:200:u8fb6-j$99:0:0:0:3:197:172:u820c-02')
assert.equal(live.formSubmitted,false);assert.equal(live.securityBypassed,false)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,providerRecords:4,engineChecked,rawGroups:13,domesticReviewed:10,progressiveFramesApproved:0,runtimeAdded:0,gap:Math.hypot(2,2),historicalAlternatives:7,latestRecordsRead:4,nextProviderRecords:5,privateMediaSaved:false}))
