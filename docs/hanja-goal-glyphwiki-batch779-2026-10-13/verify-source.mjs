const EXPECTED={"batch":779,"glyph":"諭","root":"u8aed","catalog":16,"domesticClips":16,"domesticStrokes":16,"sourceSHA":"ab70d774d87574f20c45850fa56b30a48a5d6c6cbcad5dbce0d3a2df1df1a73a","records":16,"versions":0,"wholes":["u8aed","u8aed-k","u8aed-ue0100","u8aed-ue0101","u8aed-ue0102","u8aed-ue0103","u8aed-ue0104","u8aed-ufe00","u8aed-ufe01"],"revision":"49232bac0348fe815f4200d4116ab7917e0db47f","engineHashes":{"2d.js":"dd17c52d85a6fcdf8a76e30189a24ba2f73856e0d298e80a72e0a562bcb70942","buhin.js":"6fa8e13bd964525299fa697dc40ea2c8b436d2ccb5952fe95f45d7fbf67b9456","curve.js":"77477845aff9c4d53616c91247510bd10daeb4282423bdfcde7a8bebcd21f0da","kage.js":"c36a60ff9ae7d392740d8aad62e823553dc25c991eba40482fcbc8a1a1db6d78","kagecd.js":"489fdd76e307642f6adaa99d280a41b1dda0760b4ca64b4711f0f49c08d9c860","kagedf.js":"e6d7cb5eeacda24705306302fd85a01c78f2adcdfdba43d1cac1d3616b6bf847","polygon.js":"f0afbe3b0c6f4723005ec927d2292eb991ecf5c598c16cfefb7bc55cfef75bf2","polygons.js":"111b9b0aaca536805cf92ab9d1e7be099f9e082a2169cc7c0bf49e3deee20b1a"},"dictionary":{"url":"http://img.e-hanja.kr/hanjaSvg/aniSVG/8A00/8AED.svg","status":200,"bytes":7699,"sha256":"97b50bde28804ff7c8806c485e2a3e13db3bc84d7bf7b34ca0d914a282e4d5cf","clips":16,"glyph":"諭","privateMediaSaved":false}}
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),meta=obj('metadata.json'),analysis=obj('source-join-analysis.json')
assert.equal(source.glyph,EXPECTED.glyph);assert.equal(source.root,EXPECTED.root)
assert.equal(sha(read('sources.json')),EXPECTED.sourceSHA);assert.deepEqual(source.missing,[])
assert.deepEqual(source.wholeNames,EXPECTED.wholes)
assert.equal(Object.keys(source.records).length,EXPECTED.records)
assert.equal(source.providerVersions.length,EXPECTED.versions)
assert.equal(proof.engineRevision,EXPECTED.revision);assert.deepEqual(proof.engineHashes,EXPECTED.engineHashes)
assert.equal(meta.glyph,EXPECTED.glyph);assert.equal(meta.candidate.strokes,EXPECTED.catalog)
assert.equal(meta.dictionaryStrokes,EXPECTED.domesticStrokes);assert.equal(meta.dictionary.clips,EXPECTED.domesticClips)
assert.equal(meta.privateMediaSaved,false);assert.equal(meta.dictionary.privateMediaSaved,false)
assert.equal(meta.dictionary.url,EXPECTED.dictionary.url);assert.equal(meta.dictionary.sha256,EXPECTED.dictionary.sha256);assert.equal(meta.dictionary.bytes,EXPECTED.dictionary.bytes)
assert.deepEqual(analysis.archive,source.archive);assert.equal(analysis.sourceFileSHA256,EXPECTED.sourceSHA)
assert.equal(analysis.engineRevision,EXPECTED.revision);assert.deepEqual(analysis.engineHashes,EXPECTED.engineHashes)
assert.equal(source.archive.repositoryRevision,'a7dd7f3d911936770fa742e8c37d16bee7e2173c')
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
// Same-process independent verifiers share public responses in RAM. Nothing is saved.
const cacheKey=Symbol.for('lingo.hanja.source-verifier.network-memory'),cache=globalThis[cacheKey]??=new Map()
async function bytes(url){
 if(!cache.has(url))cache.set(url,(async()=>{const r=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(r.ok,'source HTTP '+r.status);return Buffer.from(await r.arrayBuffer())})())
 return cache.get(url)
}
const archive=await bytes(source.archive.url);assert.equal(sha(archive),source.archive.sha256)
const wanted=new Set(Object.keys(source.records).filter(n=>!/@\d+$/.test(n))),map=new Map()
for(const line of archive.toString().split('\n')){const a=line.split('|').map(s=>s.trim());if(a.length>=3&&wanted.has(a[0]))map.set(a[0],{name:a[0],related:a[1],data:a[2]})}
await Promise.all(Object.entries(source.records).map(async([name,record])=>{
 if(!/@\d+$/.test(name)){assert.deepEqual(map.get(name),record);return}
 const version=source.providerVersions.find(v=>v.name===name);assert(version)
 const actual=JSON.parse((await bytes(version.apiUrl)).toString())
 assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(version.version))
 assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),version.sha256)
}))
// Private domestic SVG exists only in RAM for SHA and stroke-boundary identity checks.
const domestic=await bytes(meta.dictionary.url)
assert.equal(domestic.length,EXPECTED.dictionary.bytes);assert.equal(sha(domestic),EXPECTED.dictionary.sha256)
assert.equal((domestic.toString().match(/clip-path="url\(#/g)||[]).length,EXPECTED.domesticClips)
assert(domestic.toString().includes('<title>'+EXPECTED.glyph+'</title>'))
const codes={}
await Promise.all(Object.entries(proof.engineHashes).map(async([file,hash])=>{
 const b=await bytes('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file)
 assert.equal(sha(b),hash);codes[file]=b.toString()
}))
assert.deepEqual(Object.keys(proof.engineHashes).sort(),['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].sort())
const start=c=>c.args.slice(0,2),end=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawCurve'?4:6,c.kind==='cdDrawLine'?4:c.kind==='cdDrawCurve'?6:8)
const same=(a,b)=>a.every((n,i)=>n===b[i])
const roots=[];let matchedProofRoot=null
for(const root of source.wholeNames){
 const ctx=vm.createContext({records:source.records,root})
 for(const file of Object.keys(proof.engineHashes))vm.runInContext(codes[file],ctx,{timeout:1000})
 const actual=JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:2500})),original=obj('engine-whole-'+root+'.json')
 assert.deepEqual(actual.groups,original.groups);assert.deepEqual(actual.trace,original.trace);assert.deepEqual(actual.defaults,original.defaults)
 if(original.engineRevision!==undefined)assert.equal(original.engineRevision,EXPECTED.revision)
 if(original.engineHashes!==undefined)assert.deepEqual(original.engineHashes,EXPECTED.engineHashes)
 if(JSON.stringify(actual.groups)===JSON.stringify(proof.groups)&&JSON.stringify(actual.trace)===JSON.stringify(proof.trace)){
  assert.deepEqual(actual.defaults,proof.defaults);matchedProofRoot=root
 }
 const evidence=analysis.wholeResults.find(w=>w.root===root);assert(evidence)
 assert.equal(sha(read('engine-whole-'+root+'.json')),evidence.originalWholeFileSHA256)
 const flat=actual.trace.flat(),empty=actual.trace.flatMap((t,i)=>t.length?[]:[i])
 assert.equal(actual.groups.length,evidence.rawCount);assert.equal(flat.length,evidence.drawCalls)
 assert.equal(flat.filter(c=>c.kind==='cdDrawLine').length,evidence.L)
 assert.equal(flat.filter(c=>c.kind==='cdDrawCurve').length,evidence.Q)
 assert.equal(flat.filter(c=>c.kind==='cdDrawBezier').length,evidence.B)
 assert.equal(actual.groups.reduce((n,g)=>n+g.polygons.length,0),evidence.originalPolygonCount)
 const edges=[],internal=[]
 actual.trace.forEach((calls,i)=>{
  assert.deepEqual(calls.flatMap(c=>c.polygons),actual.groups[i].polygons)
  if(!calls.length){assert.deepEqual(actual.groups[i].polygons,[]);return}
  for(let j=1;j<calls.length;j++)if(!same(end(calls[j-1]),start(calls[j])))internal.push({raw:i,fromCall:j-1,toCall:j,fromEnd:end(calls[j-1]),toStart:start(calls[j])})
  actual.trace.forEach((next,k)=>{if(next.length&&i!==k&&same(end(calls.at(-1)),start(next[0])))edges.push({from:i,to:k,exact:true})})
 })
 assert.deepEqual(edges,evidence.exactDirectedJoins);assert.deepEqual(internal,evidence.internallyDisconnectedCalls)
 if(empty.length){
  assert.deepEqual(evidence.nonDrawingSourceRows.map(x=>x.raw),empty)
  for(const row of evidence.nonDrawingSourceRows){assert.deepEqual(row.originalRaw,actual.groups[row.raw].raw);assert.equal(row.drawCalls,0);assert.equal(row.polygons,0);assert.equal(row.countsAsVisiblePen,false)}
 }
 const adj=actual.trace.map((_,i)=>edges.filter(e=>e.from===i).map(e=>e.to)),state=[]
 function visit(i){assert.notEqual(state[i],1,'directed cycle');if(state[i]===2)return;state[i]=1;for(const k of adj[i])visit(k);state[i]=2}
 for(let i=0;i<actual.trace.length;i++)visit(i)
 const matching=new Map()
 function augment(i,seen){for(const k of adj[i]){if(seen.has(k))continue;seen.add(k);if(!matching.has(k)||augment(matching.get(k),seen)){matching.set(k,i);return true}}return false}
 for(let i=0;i<actual.trace.length;i++)augment(i,new Set())
 const minimum=actual.trace.length-empty.length-matching.size
 assert.equal(minimum,evidence.minimumPens.unconstrainedExactDirectedPathCover)
 assert.equal(evidence.minimumPens.cycle,false)
 assert.deepEqual(evidence.minimumPens.candidateRawGroups.flat().slice().sort((a,b)=>a-b),actual.trace.flatMap((calls,i)=>calls.length?[i]:[]))
 for(const group of evidence.minimumPens.candidateRawGroups)for(let i=1;i<group.length;i++)assert.deepEqual(end(actual.trace[group[i-1]].at(-1)),start(actual.trace[group[i]][0]))
 const gaps=[]
 for(let i=0;i<actual.trace.length-1;i++){
  if(!actual.trace[i].length||!actual.trace[i+1].length)continue
  const a=end(actual.trace[i].at(-1)),b=start(actual.trace[i+1][0]),distance=Math.hypot(b[0]-a[0],b[1]-a[1])
  if(distance>0&&distance<=25)gaps.push({from:i,to:i+1,fromEnd:a,toStart:b,gap:b.map((v,k)=>v-a[k]),distance})
 }
 assert.equal(gaps.length,evidence.nearSequentialNonexactGaps.length)
 for(let i=0;i<gaps.length;i++){
  const g=gaps[i],record=evidence.nearSequentialNonexactGaps[i]
  for(const key of ['from','to','fromEnd','toStart','gap'])assert.deepEqual(g[key],record[key])
  assert.equal(record.exactJoin,false)
  // Distance is diagnostic arithmetic; exact coordinate joins above use no tolerance.
  assert(Math.abs(g.distance-record.distance)<1e-12)
 }
 for(const terminal of evidence.terminalRisks){
  const call=actual.trace[terminal.raw][terminal.call];assert.equal(call.kind,terminal.kind)
  assert.equal(call.args.at(-2),terminal.startStyle);assert.equal(call.args.at(-1),terminal.terminal)
  assert.deepEqual(end(call),terminal.centerlineEnd);assert.equal(call.polygons.length,terminal.originalPolygonCount)
 }
 if(evidence.lowerFold){
  const a=actual.trace[13][0].args,b=actual.trace[14][0].args,f=evidence.lowerFold
  assert.deepEqual(a.slice(0,2),f.firstStart);assert.deepEqual(a.slice(2,4),f.firstEnd);assert.deepEqual(b.slice(0,2),f.secondStart);assert.deepEqual(b.slice(2,4),f.secondEnd)
  assert.equal(a[0]===a[2],f.firstIsVertical);assert.equal(same(a.slice(2,4),b.slice(0,2)),f.exactJoin)
 }
 roots.push({root,raw:evidence.rawCount,draws:evidence.drawCalls,minimumVisiblePaths:minimum,nonDrawingRows:empty,sourceGaps:gaps.map(g=>({raw:[g.from,g.to],gap:g.gap}))})
}
assert(matchedProofRoot,'Current proof must exactly match one of the verified whole roots')
if(existsSync(new URL('draw-trace.json',import.meta.url)))assert.deepEqual(obj('draw-trace.json'),proof.trace)
if(existsSync(new URL('whole-variant-inventory.json',import.meta.url))){
 const inventory=obj('whole-variant-inventory.json');assert.equal(inventory.archiveVerified,true);assert.equal(inventory.engineFiles,8)
 assert.deepEqual(inventory.wholeVariants.map(v=>v.root),source.wholeNames)
 for(const v of inventory.wholeVariants){assert.equal(v.rootData,source.records[v.root].data);const row=roots.find(w=>w.root===v.root);assert.equal(v.raw,row.raw);assert.equal(v.draw,row.draws)}
}
if(existsSync(new URL('review.json',import.meta.url))){
 const review=obj('review.json');assert.equal(review.glyph,EXPECTED.glyph)
 for(const v of review.wholeVariants??[])assert.deepEqual(v,source.records[v.name])
}
console.log(JSON.stringify({batch:EXPECTED.batch,glyph:EXPECTED.glyph,sourcePassed:true,catalogStrokes:EXPECTED.catalog,domesticClips:EXPECTED.domesticClips,matchedProofRoot,wholeSources:roots,nativeApprovalGranted:false,runtimeNotValidated:true,privateMediaSaved:false}))

