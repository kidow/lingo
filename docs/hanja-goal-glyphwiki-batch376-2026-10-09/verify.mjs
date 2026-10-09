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
const variants=read('./whole-variant-inventory.json')
assert.equal(variants.selectedRoot,source.root)
assert.equal(variants.nativePanel,44)
assert.deepEqual(variants.wholeVariants.map(v=>v.root).sort(),source.wholeNames.slice().sort())
assert.equal(variants.wholeVariants.find(v=>v.root===source.root).raw,trace.length)
assert.equal(variants.wholeVariants.find(v=>v.root===source.root).draw,trace.flat().length)
assert.equal(variants.wholeVariants.find(v=>v.root===source.root).historicalNames.length,source.providerVersions.length)
assert.equal(sha(JSON.stringify(source,null,2)+'\n'),'dd7cdf99cea791e725729461e820cad2ab7a53241163dfd234557370eb1ebb0a')
assert.equal(source.root,'u8616-ue0102')
assert.deepEqual(Object.keys(source.records),["u8616-ue0102","koseki-369250","koseki-364230@3","ufa5e-03@3","u8fa5-itaiji-003@2","u2ff0-u200a4-u8f9b@2","u200a4-01","u8f9b","u6728-04"])
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[{"name":"koseki-364230@3","version":3,"data":"99:0:0:0:3:200:176:ufa5e-03@3$99:0:0:0:49:200:196:u8fa5-itaiji-003@2","sha256":"9e88182e640f3295d1e56233a648a02c7d86fbc6515172da6ae46b8b870909e4","responseSha256":"716a6875db8a7b2358d0476606e210f41ef1bb143cd4d99a115fbdaf519fdb00","apiUrl":"https://glyphwiki.org/api/glyph?name=koseki-364230%403","sourceUrl":"https://glyphwiki.org/wiki/koseki-364230@3","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"},{"name":"ufa5e-03@3","version":3,"data":"1:0:0:13:39:95:39$1:0:0:62:13:62:64$1:0:0:105:39:187:39$1:0:0:138:13:138:64","sha256":"7f8d5abd28310ccf1ef0ff81baf1a7f22b29d09f7cb5bcca34ee608df46d3b23","responseSha256":"165453be560ddc0c5ca1a58d52d86b19165572e5f63b36a2c4d947ffd6ac7275","apiUrl":"https://glyphwiki.org/api/glyph?name=ufa5e-03%403","sourceUrl":"https://glyphwiki.org/wiki/ufa5e-03@3","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"},{"name":"u8fa5-itaiji-003@2","version":2,"data":"99:0:0:0:0:200:200:u2ff0-u200a4-u8f9b@2","sha256":"a72dd25eb675f00483f725f6bba7888d9c0ac4caf9ce2048e9df2a7b89fcc8a9","responseSha256":"2b5ad4e5743c18e0c458215b388fdde2ef8bf963f8a4d8e24e0b862cb514f097","apiUrl":"https://glyphwiki.org/api/glyph?name=u8fa5-itaiji-003%402","sourceUrl":"https://glyphwiki.org/wiki/u8fa5-itaiji-003@2","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"},{"name":"u2ff0-u200a4-u8f9b@2","version":2,"data":"99:0:0:0:1:200:206:u200a4-01$99:0:0:75:0:195:200:u8f9b","sha256":"8106afa63f58ac406c64ffa42bbb1d617635183c9f07b7c071ab87a6ead8e5f0","responseSha256":"db183f8b8746bdf89ec9f4f3ae06093ffc0c04aafa9b31a4740483bf8c35b50f","apiUrl":"https://glyphwiki.org/api/glyph?name=u2ff0-u200a4-u8f9b%402","sourceUrl":"https://glyphwiki.org/wiki/u2ff0-u200a4-u8f9b@2","retrievedAt":"2026-10-09","status":"Exact named historical version; no latest substitution"}])
for(const record of Object.values(source.records))for(const row of record.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing declared dependency')
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7],[8],[9,10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:23},(_,i)=>i))
assert.equal(trace.length,23);assert.equal(trace.flat().length,23)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,5)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
const compiled=compileProgressive(trace,proof),original=compilePrimitive(trace,proof)
assert.equal(compiled.length,21);assert.equal(compiled.flat().length,21)
assert.equal(original.flat().length,23)
for(let i=0;i<21;i++)assert.equal(compiled[i].map(s=>s.outline).join(' '),original[i].map(s=>s.outline).join(' '),'original contour union changed')
for(const n of [6,8]){assert.equal(compiled[n][0].revealPath.match(/M/g).length,1);assert(compiled[n][0].revealPath.includes(' L'))}
assert.equal(trace.filter(x=>!x.length).length,0)
for(let n=1;n<=21;n++)for(const progress of [0,.125,.25,.375,.5,.625,.75,.875,1])assert(renderProgressive(compiled,n,progress).includes('<svg'))
const broken=structuredClone(trace);broken[4][0].args[4]+=1;assert.throws(()=>compileProgressive(broken,proof))
const runtime=hanjaStrokeData({glyph:'蘖',strokes:21});assert(runtime)
assert.deepEqual(runtime.outlines,compiled);assert.deepEqual(runtime.paths,compiled.map(s=>s.map(p=>p.outline).join(' ')))
assert.equal(hanjaStrokeData({glyph:'蘖',strokes:20}),null);assert.equal(hanjaStrokeData({glyph:'蘖',strokes:22}),null)
const review=read('./progressive-review.json');assert.equal(review.progressiveFramesApproved,189);assert.deepEqual(review.sourceGroupsZeroBased,sourceGroups)
const assetBytes=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/8616.json',import.meta.url)),asset=JSON.parse(assetBytes)
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
console.log(JSON.stringify({passed:true,engineChecked,archiveChecked,providerRecords:9,pens:21,rawGroups:23,drawingPrimitives:23,masks:21,structuralSamples:189,nativeProgressiveFramesApproved:189,runtimeRegistered:1,privateMediaSaved:false}))
