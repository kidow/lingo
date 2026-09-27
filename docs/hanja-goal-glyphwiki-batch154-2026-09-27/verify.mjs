import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),'87cd857ea2f0da22bc04941555be387f014ee70684e90b2f62f1e54fc4374c71')
assert.equal(source.root,'u5155-j')
assert.deepEqual(source.providerVersions.map(v=>[v.name,v.version]),[["u5155-j",1],["u51f9-j",2]])
for(const v of source.providerVersions)assert.equal(v.data,source.records[v.name].data)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared whole source dependency missing')
assert.equal(proof.groups.length,10)
assert.deepEqual(sourceGroups,[[5],[0,1,2],[3],[4,7],[6],[8],[9]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),[0,1,2,3,4,5,6,7,8,9])
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,2)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(source.aliases,[{"name":"u5155-k","version":1,"target":"u5155-j","url":"https://glyphwiki.org/wiki/u5155-k@1"}])
const runtime=hanjaStrokeData({glyph:'兕',strokes:8});assert(runtime)
assert.equal(runtime.verificationSource,'ehanja-crosschecked')
assert.equal(runtime.paths.length,7)
assert.deepEqual(runtime.variant,{catalogStrokes:8,playbackStrokes:7,form:'사전'})
assert.equal(hanjaStrokeData({glyph:'兕',strokes:7}),null)
const outlines=compileProgressive(trace,proof)
assert.deepEqual(runtime.outlines,outlines);assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/5155.json',import.meta.url)),asset=JSON.parse(editable)
assert.equal(runtime.geometrySource,sha(editable))
assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.providerVersions,source.providerVersions)
assert.deepEqual(asset.drawTrace,trace);assert.deepEqual(asset.sourceGroups,sourceGroups);assert.deepEqual(asset.engineHashes,proof.hashes)
assert.deepEqual(asset.enginePreset,{size:'default',style:'mincho'})
const reviewHash=sha(readFileSync(new URL('./progressive-review.json',import.meta.url)))
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],reviewHash)
assert.equal(runtime.pathsSha256,sha(JSON.stringify(runtime.paths)))
let engineChecked=false
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage();for(const [name,r] of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,providerRecords:2,sourceCaptureHashVerified:true,engineChecked,rawGroups:10,strokeGroups:7,quadraticPrimitives:2,runtimeRegistered:1,privateMediaSaved:false}))
