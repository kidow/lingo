import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url)))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('sources.json'),proof=read('engine-proof.json'),trace=read('draw-trace.json')
const alternate=read('alternate-sources.json'),alternateProof=read('alternate-engine-proof.json'),alternateTrace=read('alternate-draw-trace.json')
const findings=read('findings.json'),alternatives=read('alternatives.json'),metadata=read('metadata.json')
assert.equal(sha(readFileSync(new URL('sources.json',import.meta.url))),'2c09cb8980633080c07369f3390d4f6ef74411876ca2a65e41d556b0f2e7c06f')
assert.equal(sha(readFileSync(new URL('alternate-sources.json',import.meta.url))),'87c917eaba03a6a8d69e71edad95b29110e894442fb9d0cc1d535969acda2404')
assert.equal(source.root,'u6e36-k');assert.equal(alternate.root,'u6e36-ue0102')
assert.equal(Object.keys(source.records).length,4);assert.equal(Object.keys(alternate.records).length,5)
for(const s of [source,...alternatives]){assert.deepEqual(s.missing,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
assert.deepEqual(alternate.providerVersions.map(v=>v.name),['u82f1-02-var-001@3','ufa5e-03@3'])
for(const v of alternate.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(sha(v.textarea),v.textareaSha256);assert.equal(v.data,v.textarea.replaceAll('\n','$'));assert.equal(v.data,alternate.records[v.name].data);assert.equal(v.saved,false)}
assert.deepEqual(alternate.records['ufa5e-03@3'].data.split('$').map(r=>r.split(':').slice(0,3)),Array.from({length:4},()=>['1','0','0']))
assert.equal(alternatives.length,4)
for(const s of alternatives.filter(s=>s.root!=='u6e36-ue0102')){assert.equal(s.records[s.root].data,'99:0:0:0:0:200:200:u6e36');assert.equal(s.records['u6e36'].data,source.records.u6e36.data)}
for(const [p,t,n] of [[proof,trace,13],[alternateProof,alternateTrace,14]]){
 assert.equal(p.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f');assert.equal(Object.keys(p.engineHashes).length,8)
 assert.equal(p.groups.length,n);assert.equal(t.length,n);assert.equal(t.flat().length,n+1)
 assert.equal(t.flat().filter(c=>c.kind==='cdDrawCurve').length,6);assert.equal(t.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
 for(let i=0;i<n;i++)assert.deepEqual(t[i].flatMap(c=>c.polygons),p.groups[i].polygons)
 assert.deepEqual(t[2][0].args.slice(4,6),[37.875,183.32])
 assert.deepEqual(t[3][0].args.slice(0,2),[34,150])
 assert.notDeepEqual(t[2][0].args.slice(4,6),t[3][0].args.slice(0,2),'water trajectory continuity must not be falsely approved')
}
assert.deepEqual(findings.domesticReview.alternativeGroups,[[0],[1],[2,3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13]])
assert.deepEqual(findings.domesticReview.alternativeGroups.flat(),Array.from({length:14},(_,i)=>i))
assert.equal(metadata.dictionary.sha256,'2db03c078f2a740f9b028001d238ecc8cff0899f4627cf084ab64d5e1debec67')
assert.equal(metadata.dictionary.strokeCount,12);assert.equal(findings.catalogStrokes,12);assert.equal(findings.dictionaryStrokes,12)
assert.equal(findings.domesticReview.progressiveFramesApproved,0);assert.equal(findings.domesticReview.fullAnimationApproved,false)
assert.equal(findings.runtimeAdded,0);assert.equal(hanjaStrokeData({glyph:'渶',strokes:12}),null)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:alternate,proof:alternateProof,trace:alternateTrace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,engineChecked,runtimeAdded:0,exactSourceClosure:true,literalRevisions:2,wholeRoots:4,domesticReviewed:12,privateMediaSaved:false}))
