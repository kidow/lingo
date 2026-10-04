import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"0a2869077a93922c116aa531d27fa98a3d43454558b4582bc07ab39c8933520a")
assert.equal(source.root,'u71a2-k')
assert.deepEqual(source.providerVersions.map(v=>v.name),['u9022@7'])
for(const v of source.providerVersions)assert.equal(sha(v.data),v.sha256)
for(const v of source.providerVersions)assert.equal(v.data,source.records[v.name].data)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared whole dependency missing')
assert.equal(proof.groups.length,18)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[10],[11,12],[13],[14],[15],[16],[17],[4],[5],[6,7],[8,9]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i))
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,10)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,1)
assert.deepEqual(source.aliases,[])
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(Object.keys(source.records).length,5)
assert.equal(trace.flat().length,19)
assert(trace.every(t=>t.length>0))
for(const [a,ai,b,bi,p] of [[2,0,2,1,[41.78,97]],[11,0,12,0,[164.39,32.64]],[6,0,7,0,[88.25,109.14]]]){const before=trace[a][ai];assert.deepEqual(before.args.slice(before.kind==='cdDrawLine'?2:4,before.kind==='cdDrawLine'?4:6),trace[b][bi].args.slice(0,2));assert.deepEqual(trace[b][bi].args.slice(0,2),p)}

const overlap=read('./original-overlap.json')
assert.equal(overlap.nativeSinglePenReviewPending,false)
assert.equal(overlap.nativeSinglePenReviewPassed,true)
assert.deepEqual(overlap.sourceRawGroups,[8,9])
assert.deepEqual(trace[8][0].args.slice(4,6),[91.775,157.08])
assert.deepEqual(trace[9][0].args.slice(0,2),[90.365,155.04])
assert.deepEqual(overlap.point,[91.25,157.75]);assert(overlap.interiorMargin>0)
assert.equal(overlap.noConnectorCreated,true)
assert.equal(overlap.noNewGeometry,true)

assert.equal(hanjaStrokeData({glyph:'熢',strokes:14}),null)
const runtime=hanjaStrokeData({glyph:'熢',strokes:15});assert(runtime)
assert.equal(runtime.verificationSource,'ehanja-crosschecked')
const outlines=compileProgressive(trace,proof);assert.deepEqual(runtime.outlines,outlines);assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/71a2.json',import.meta.url)),asset=JSON.parse(editable)
assert.equal(runtime.geometrySource,sha(editable));assert.equal(asset.root,source.root)
assert.deepEqual(asset.archive,source.archive);assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.providerVersions,source.providerVersions)
assert.deepEqual(asset.drawTrace,trace);assert.deepEqual(asset.sourceGroups,sourceGroups);assert.deepEqual(asset.engineHashes,proof.engineHashes)
assert.deepEqual(asset.enginePreset,{size:'default',style:'mincho'})
const reviewHash=sha(readFileSync(new URL('./progressive-review.json',import.meta.url)))
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],reviewHash)
assert.equal(runtime.pathsSha256,sha(JSON.stringify(runtime.paths)))
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:read("./primary-sources.json"),proof:read("./primary-engine-proof.json"),trace:read("./primary-draw-trace.json")}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,providerRecords:Object.keys(source.records).length,sourceCaptureHashVerified:true,engineChecked,engineWholes:engineChecked?2:0,rawGroups:proof.groups.length,strokeGroups:sourceGroups.length,quadraticPrimitives:trace.flat().filter(c=>c.kind==='cdDrawCurve').length,cubicPrimitives:trace.flat().filter(c=>c.kind==='cdDrawBezier').length,runtimeRegistered:1,privateMediaSaved:false}))
