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
assert.equal(sha(JSON.stringify(source,null,2)+'\n'),'ad25416d926028ea448dd4e8d6b02ec11fe554df1dfc210152508ade2120c20a')
assert.equal(source.root,'u8617-k')
assert.deepEqual(Object.keys(source.records),["u8617-k","koseki-369260","ufa5e-03","u8279-k03","u6a97@1"])
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[{"name":"u6a97@1","version":1,"data":"7:12:7:31:27:31:58:30:105:14:124$1:2:2:31:27:81:27$1:22:23:81:27:81:58$1:2:2:31:58:81:58$0:0:0:0$1:12:13:40:83:40:112$1:2:2:40:83:83:83$1:22:23:83:83:83:112$1:2:2:40:112:83:112$0:0:0:0$1:0:0:94:38:180:38$1:0:32:136:17:136:38$2:7:8:110:40:122:55:124:72$2:0:7:158:43:150:60:141:74$1:0:0:96:74:183:74$1:32:0:136:74:136:128$1:0:0:100:102:179:102$0:0:0:0$1:0:0:18:136:180:136$1:0:0:99:116:99:189$2:32:7:92:139:74:166:18:184$2:7:0:103:136:128:165:173:177","sha256":"1188d46070b78641503649142f75c74b7efae72d9f53b3b85b4207df5daa16cf","responseSha256":"de7c8ec9ac8a22c929a2670f6640d6867d8e914dfeadb48df58da592b57dc260","apiUrl":"https://glyphwiki.org/api/glyph?name=u6a97%401","sourceUrl":"https://glyphwiki.org/wiki/u6a97@1","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"}])
for(const record of Object.values(source.records))for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing declared dependency')
assert.deepEqual(sourceGroups,[[0],[1],[3],[2],[5,6],[7],[4],[9],[10,11],[12],[15],[14],[16],[17],[18],[20],[19],[22],[23],[24],[25]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:26},(_,i)=>i).filter(i=>![8,13,21].includes(i)))
assert.equal(trace.length,26);assert.equal(trace.flat().length,24)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,5)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
const compiled=compileProgressive(trace,proof),original=compilePrimitive(trace,proof)
assert.equal(compiled.length,21);assert.equal(compiled.flat().length,21)
assert.equal(original.flat().length,24)
for(let i=0;i<21;i++)assert.equal(compiled[i].map(s=>s.outline).join(' '),original[i].map(s=>s.outline).join(' '),'original contour union changed')
for(const n of [4,6,8]){assert.equal(compiled[n][0].revealPath.match(/M/g).length,1);assert(compiled[n][0].revealPath.includes(' L'))}
for(const n of [8,13,21]){assert.deepEqual(trace[n],[]);assert.deepEqual(proof.groups[n].polygons,[])}
for(let n=1;n<=21;n++)for(const progress of [0,.125,.25,.375,.5,.625,.75,.875,1])assert(renderProgressive(compiled,n,progress).includes('<svg'))
const broken=structuredClone(trace);broken[4][1].args[4]+=1;assert.throws(()=>compileProgressive(broken,proof))
const runtime=hanjaStrokeData({glyph:'蘗',strokes:21});assert(runtime)
assert.deepEqual(runtime.outlines,compiled);assert.deepEqual(runtime.paths,compiled.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(hanjaStrokeData({glyph:'蘗',strokes:20}),null);assert.equal(hanjaStrokeData({glyph:'蘗',strokes:22}),null)
const review=read('./progressive-review.json');assert.equal(review.progressiveFramesApproved,189);assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups)
const assetBytes=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8617.json',import.meta.url)),asset=JSON.parse(assetBytes)
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
console.log(JSON.stringify({passed:true,engineChecked,archiveChecked,providerRecords:5,pens:21,rawGroups:26,drawingPrimitives:24,masks:21,structuralSamples:189,nativeProgressiveFramesApproved:189,runtimeRegistered:1,privateMediaSaved:false}))
