import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive,renderProgressive} from './primitive-reveal.mjs'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=x=>createHash('sha256').update(x).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(sha(JSON.stringify(source,null,2)+'\n'),'d363a8451e16608d31c138cd4354fc9e5ca8b7cf484b2d2b87171e9f25f0a1f7')
assert.equal(source.root,'u74c6-k')
assert.deepEqual(Object.keys(source.records),["u74c6-k","u74c6","u738b-01","u8cea","u8c9d-04"])
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const record of Object.values(source.records))for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing declared dependency')
assert.deepEqual(sourceGroups,[[0],[2],[1],[3],[5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19],[20]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:21},(_,i)=>i).filter(i=>i!==4))
assert.equal(proof.groups[4].raw[0],0);assert.deepEqual(proof.groups[4].polygons,[]);assert.deepEqual(trace[4],[])
assert.equal(trace.length,21);assert.equal(trace.flat().length,22)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7)
const compiled=compileProgressive(trace,proof),original=compilePrimitive(trace,proof)
assert.equal(compiled.length,19);assert.equal(compiled.flat().length,19)
assert.equal(original.flat().length,22)
for(let i=0;i<19;i++)assert.equal(compiled[i].map(s=>s.outline).join(' '),original[i].map(s=>s.outline).join(' '),'original contour union changed')
for(const n of [5,9,13]){assert.equal(compiled[n][0].revealPath.match(/M/g).length,1);assert(compiled[n][0].revealPath.includes(' L'))}
for(let n=1;n<=19;n++)for(const progress of [0,12,25,37,50,62,75,87,100])assert(renderProgressive(compiled,n,progress).includes('<svg'))
const broken=structuredClone(trace);broken[6][1].args[4]+=1;assert.throws(()=>compileProgressive(broken,proof))
const alteredProof=structuredClone(proof);alteredProof.groups[4].raw[0]=1;assert.throws(()=>compileProgressive(trace,alteredProof))
const runtime=hanjaStrokeData({glyph:'瓆',strokes:19});assert(runtime)
assert.deepEqual(runtime.outlines,compiled);assert.deepEqual(runtime.paths,compiled.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(hanjaStrokeData({glyph:'瓆',strokes:18}),null);assert.equal(hanjaStrokeData({glyph:'瓆',strokes:20}),null)
const review=read('./progressive-review.json');assert.equal(review.progressiveFramesApproved,171);assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups)
const assetBytes=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/74c6.json',import.meta.url)),asset=JSON.parse(assetBytes)
assert.equal(runtime.geometrySource,sha(assetBytes));assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.drawTrace,trace);assert.deepEqual(asset.sourceGroups,sourceGroups)
assert.deepEqual(asset.engineHashes,proof.engineHashes);assert.deepEqual(asset.archive,source.archive);assert.deepEqual(asset.enginePreset,{size:'default',style:'mincho'})
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],sha(readFileSync(new URL('./progressive-review.json',import.meta.url))))
assert.equal(runtime.pathsSha256,sha(JSON.stringify(runtime.paths)))
let engineChecked=false,archiveChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const [file,hash] of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(20000)})
  assert(response.ok);const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
 const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
 assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)
 engineChecked=true
}
if(process.argv.includes('--archive')){
 const response=await fetch(source.archive.url,{signal:AbortSignal.timeout(60000)})
 assert(response.ok);const archive=await response.text()
 assert.equal(sha(archive),source.archive.sha256);assert.equal(Buffer.byteLength(archive),source.archive.bytes)
 const found=new Map()
 for(const line of archive.split('\n')){const parts=line.split('|').map(p=>p.trim());if(source.records[parts[0]])found.set(parts[0],{name:parts[0],related:parts[1],data:parts[2]})}
 assert.deepEqual(Object.fromEntries(Object.keys(source.records).map(n=>[n,found.get(n)])),source.records)
 archiveChecked=true
}
console.log(JSON.stringify({passed:true,engineChecked,archiveChecked,providerRecords:5,pens:19,rawGroups:21,nonDrawingRawGroups:[4],drawingPrimitives:22,masks:19,structuralSamples:171,nativeProgressiveFramesApproved:171,runtimeRegistered:1,privateMediaSaved:false}))
