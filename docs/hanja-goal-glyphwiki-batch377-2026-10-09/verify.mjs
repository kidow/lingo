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
assert.equal(sha(JSON.stringify(source,null,2)+'\n'),'1044faabcbe365b6e0c01adbfe3df34a5ba8bfe254389faf5a89b2740adc7ea3')
assert.equal(source.root,'u8f5d-k')
assert.deepEqual(Object.keys(source.records),["u8f5d-k","u8f5d","u8207-03@2","cdp-8ba8-var-008","cdp-8ba8-05-var-002","u8eca-14-var-001","u65e5"])
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[{"name":"u8207-03@2","version":2,"data":"99:0:0:0:2:200:202:cdp-8ba8-var-008$1:2:0:89:32:128:32$1:0:13:90:14:89:52$1:2:2:89:52:117:52$1:22:32:117:52:116:100$1:0:32:90:66:89:100","sha256":"ff5719f31d98472c6afc2a11a3e4f48c7cdf66bb31042bb1a34050bb9af8af97","responseSha256":"8c87ea6d129b9044430ad273608f438bd5d684ce2f5f734b8cb67f9923d9660b","apiUrl":"https://glyphwiki.org/api/glyph?name=u8207-03%402","sourceUrl":"https://glyphwiki.org/wiki/u8207-03@2","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"}])
for(const record of Object.values(source.records))for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing declared dependency')
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[11],[12],[13,14],[15],[4,5],[6],[7],[8],[9],[10],[16],[17],[18,19],[20],[21],[22],[23]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i))
assert.equal(trace.length,24);assert.equal(trace.flat().length,24)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,3)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
const compiled=compileProgressive(trace,proof),original=compilePrimitive(trace,proof)
assert.equal(compiled.length,21);assert.equal(compiled.flat().length,21)
assert.equal(original.flat().length,24)
for(let i=0;i<21;i++)assert.equal(compiled[i].map(s=>s.outline).join(' '),original[i].map(s=>s.outline).join(' '),'original contour union changed')
for(const n of [6,8,16]){assert.equal(compiled[n][0].revealPath.match(/M/g).length,1);assert(compiled[n][0].revealPath.includes(' L'))}
assert.equal(trace.filter(x=>!x.length).length,0)
for(let n=1;n<=21;n++)for(const progress of [0,.125,.25,.375,.5,.625,.75,.875,1])assert(renderProgressive(compiled,n,progress).includes('<svg'))
const broken=structuredClone(trace);broken[0][0].args[4]+=1;assert.throws(()=>compileProgressive(broken,proof))
const runtime=hanjaStrokeData({glyph:'轝',strokes:21});assert(runtime)
assert.deepEqual(runtime.outlines,compiled);assert.deepEqual(runtime.paths,compiled.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(hanjaStrokeData({glyph:'轝',strokes:20}),null);assert.equal(hanjaStrokeData({glyph:'轝',strokes:22}),null)
const review=read('./progressive-review.json');assert.equal(review.progressiveFramesApproved,189);assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups)
const assetBytes=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8f5d.json',import.meta.url)),asset=JSON.parse(assetBytes)
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
 // The API varies JSON property order between requests. Preserve the captured
 // response hash as provenance; reproduce the exact version, fields and data hash.
 for(const version of source.providerVersions){const response=await fetch(version.apiUrl,{signal:AbortSignal.timeout(20000)});assert(response.ok);const record=await response.json(),[base,n]=version.name.split('@');assert.deepEqual(Object.keys(record).sort(),['data','name','related','version']);assert.equal(record.name,base);assert.equal(Number(record.version),Number(n));assert.equal(record.related,source.records[version.name].related);assert.equal(record.data,source.records[version.name].data);assert.equal(sha(record.data),version.sha256);found.set(version.name,source.records[version.name]);}
 assert.deepEqual(Object.fromEntries(Object.keys(source.records).map(n=>[n,found.get(n)])),source.records)
 archiveChecked=true
}
console.log(JSON.stringify({passed:true,engineChecked,archiveChecked,providerRecords:7,pens:21,rawGroups:24,drawingPrimitives:24,masks:21,structuralSamples:189,nativeProgressiveFramesApproved:189,runtimeRegistered:1,privateMediaSaved:false}))
