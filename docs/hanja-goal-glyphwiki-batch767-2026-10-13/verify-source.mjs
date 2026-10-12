const EXPECTED={"batch":767,"glyph":"嫄","root":"u5ac4","strokes":13,"records":10,"versions":2,"wholes":["u5ac4","u5ac4-itaiji-001","u5ac4-k","u5ac4-ue0100"],"compatible":["u5ac4","u5ac4-k","u5ac4-ue0100"],"blockedPen":1,"blockedRaw":[0,1],"fromEnd":[27.97,135],"toStart":[29.66,118],"gap":[1.6900000000000013,-17],"main":{"raw":15,"calls":17,"L":10,"Q":7,"minimum":12,"joins":[[3,2],[7,11],[8,9]]},"alternative":{"raw":10,"calls":13,"L":8,"Q":5,"minimum":9,"joins":[[0,1]]}}
const engineCapture="\nconst resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const m=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return m?resolve(m[1],[...seen,name]):r.data};\nconst k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));\nconst groups=[],trace=[];let calls=[];\nfor(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}};\nconst orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};\nconst p=new Polygons();k.makeGlyph(p,root);\nJSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})\n"
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>readFileSync(new URL(n,import.meta.url)),obj=n=>JSON.parse(read(n)),sha=b=>createHash('sha256').update(b).digest('hex')
const source=obj('sources.json'),proof=obj('engine-proof.json'),trace=obj('draw-trace.json'),review=obj('review.json'),meta=obj('metadata.json'),analysis=obj('source-join-analysis.json')
// Cache responses in RAM only when both independent verifiers are imported in one process.
const cacheKey=Symbol.for('lingo.hanja.source-verifier.network-memory')
const cache=globalThis[cacheKey]??=new Map()
async function bytes(url){
 if(!cache.has(url))cache.set(url,(async()=>{const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(response.ok,'source HTTP '+response.status);return Buffer.from(await response.arrayBuffer())})())
 return cache.get(url)
}
assert.equal(source.glyph,EXPECTED.glyph);assert.equal(source.root,EXPECTED.root)
assert.equal(meta.glyph,EXPECTED.glyph);assert.equal(meta.root,EXPECTED.root)
assert.equal(meta.candidate.strokes,EXPECTED.strokes);assert.equal(meta.dictionaryStrokes,EXPECTED.strokes)
assert.equal(meta.dictionary.clips,EXPECTED.strokes);assert.equal(meta.dictionary.privateMediaSaved,false)
assert.equal(meta.privateMediaSaved,false);assert.equal(meta.runtimeApplied,false);assert.equal(meta.runtimeRegistered,0)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(source.records).length,EXPECTED.records);assert.equal(source.providerVersions.length,EXPECTED.versions)
assert.deepEqual(source.wholeNames,EXPECTED.wholes)
assert.equal(proof.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f')
assert.equal(source.archive.repositoryRevision,'a7dd7f3d911936770fa742e8c37d16bee7e2173c')
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.deepEqual(analysis.archive,source.archive);assert.equal(analysis.engineRevision,proof.engineRevision);assert.deepEqual(analysis.engineHashes,proof.engineHashes)
const archiveBytes=await bytes(source.archive.url);assert.equal(sha(archiveBytes),source.archive.sha256)
const wanted=new Set(Object.keys(source.records).filter(n=>!/@\d+$/.test(n))),map=new Map()
for(const line of archiveBytes.toString().split('\n')){const a=line.split('|').map(s=>s.trim());if(a.length>=3&&wanted.has(a[0]))map.set(a[0],{name:a[0],related:a[1],data:a[2]})}
for(const [name,record] of Object.entries(source.records)){
 if(/@\d+$/.test(name)){
  const version=source.providerVersions.find(v=>v.name===name);assert(version)
  const actual=JSON.parse((await bytes(version.apiUrl)).toString())
  assert.equal(actual.name,name.split('@')[0]);assert.equal(Number(actual.version),Number(version.version))
  assert.equal(actual.related,record.related);assert.equal(actual.data,record.data);assert.equal(sha(actual.data),version.sha256)
 }else assert.deepEqual(map.get(name),record)
}
// Domestic media is fetched for identity/count checks in RAM; no bytes or path data are written.
const dictionaryBytes=await bytes(meta.dictionary.url)
assert.equal(dictionaryBytes.length,meta.dictionary.bytes);assert.equal(sha(dictionaryBytes),meta.dictionary.sha256)
assert.equal((dictionaryBytes.toString().match(/clip-path="url\(#/g)||[]).length,EXPECTED.strokes)
assert(dictionaryBytes.toString().includes('<title>'+EXPECTED.glyph+'</title>'))
const codes={}
assert.deepEqual(Object.keys(proof.engineHashes).sort(),['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].sort())
for(const [file,hash] of Object.entries(proof.engineHashes)){
 const codeBytes=await bytes('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file)
 assert.equal(sha(codeBytes),hash);codes[file]=codeBytes.toString()
}
const start=c=>c.args.slice(0,2),end=c=>c.kind==='cdDrawLine'?c.args.slice(2,4):c.kind==='cdDrawCurve'?c.args.slice(4,6):c.args.slice(6,8)
const same=(a,b)=>a.every((n,i)=>n===b[i])
const summary=[]
for(const root of source.wholeNames){
 const ctx=vm.createContext({records:source.records,root});for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
 const actual=JSON.parse(vm.runInContext(engineCapture,ctx,{timeout:2000})),original=obj('engine-whole-'+root+'.json')
 assert.deepEqual(actual,original)
 if(root===source.root){assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,proof.trace);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)}
 const evidence=analysis.wholeResults.find(w=>w.root===root);assert(evidence)
 assert.equal(sha(JSON.stringify(original)),evidence.engineWholeCanonicalSHA256)
 const alt=root.endsWith('-itaiji-001'),expected=alt?EXPECTED.alternative:EXPECTED.main
 assert.equal(actual.groups.length,expected.raw);assert.equal(actual.trace.flat().length,expected.calls)
 assert.equal(actual.trace.flat().filter(c=>c.kind==='cdDrawLine').length,expected.L)
 assert.equal(actual.trace.flat().filter(c=>c.kind==='cdDrawCurve').length,expected.Q)
 assert.equal(actual.trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
 assert.equal(evidence.rawCount,expected.raw);assert.equal(evidence.drawCalls,expected.calls)
 const edges=[]
 actual.trace.forEach((calls,i)=>{
  assert(calls.length>0);assert.deepEqual(calls.flatMap(c=>c.polygons),actual.groups[i].polygons)
  for(let j=1;j<calls.length;j++)assert.deepEqual(end(calls[j-1]),start(calls[j]))
  actual.trace.forEach((next,k)=>{if(i!==k&&same(end(calls.at(-1)),start(next[0])))edges.push({from:i,to:k,point:end(calls.at(-1)),exact:true})})
 })
 assert.deepEqual(edges,evidence.exactDirectedJoins);assert.deepEqual(edges.map(e=>[e.from,e.to]),expected.joins)
 // Exact directed path cover is a geometric count, never a domestic order approval.
 const adjacency=actual.trace.map((_,i)=>edges.filter(e=>e.from===i).map(e=>e.to)),states=[]
 function visit(i){assert.notEqual(states[i],1,'directed cycle');if(states[i]===2)return;states[i]=1;for(const n of adjacency[i])visit(n);states[i]=2}
 actual.trace.forEach((_,i)=>visit(i))
 const matching=new Map()
 function augment(i,seen){for(const k of adjacency[i]){if(seen.has(k))continue;seen.add(k);if(!matching.has(k)||augment(matching.get(k),seen)){matching.set(k,i);return true}}return false}
 for(let i=0;i<actual.trace.length;i++)augment(i,new Set())
 const minimum=actual.trace.length-matching.size
 assert.equal(minimum,expected.minimum);assert.equal(evidence.minimumPens.unconstrainedExactDirectedPathCover,minimum)
 if(!alt){
  const [from,to]=EXPECTED.blockedRaw,fromEnd=end(actual.trace[from].at(-1)),toStart=start(actual.trace[to][0])
  assert.deepEqual(fromEnd,EXPECTED.fromEnd);assert.deepEqual(toStart,EXPECTED.toStart);assert(!same(fromEnd,toStart))
  const gap=toStart.map((v,i)=>v-fromEnd[i])
  assert.deepEqual(gap,EXPECTED.gap);assert.equal(evidence.potentialDomesticJoinGaps.length,1)
  const recorded=evidence.potentialDomesticJoinGaps[0]
  assert.equal(recorded.from,from);assert.equal(recorded.to,to);assert.deepEqual(recorded.fromEnd,fromEnd);assert.deepEqual(recorded.toStart,toStart);assert.deepEqual(recorded.gap,gap);assert.equal(recorded.exactJoin,false)
 }else{
  assert.deepEqual(evidence.potentialDomesticJoinGaps,[])
  assert.notDeepEqual(original.groups,proof.groups);assert.notDeepEqual(original.trace,proof.trace)
  assert(!review.compatibleWholeRoots.includes(root))
 }
 summary.push({root,raw:expected.raw,draws:expected.calls,minimumOriginalPens:minimum})
}
assert.equal(review.glyph,EXPECTED.glyph);assert.equal(review.batch,EXPECTED.batch)
assert.equal(review.runtimeApplied,false);assert.equal(review.compiledPens,0);assert.equal(review.masks,0)
assert.equal(review.allStrokesReviewed,false);assert.equal(review.replayApproved,false);assert.equal(review.privateMediaSaved,false)
assert.equal(review.progressiveFramesReviewed,0);assert.equal(review.progressiveFramesApproved,0)
assert.deepEqual(review.sourceGroupsZeroBased,[]);assert.deepEqual(review.progressivePensReviewed,[])
assert.equal(review.wholeVariantsReviewed,source.wholeNames.length)
assert.deepEqual(review.wholeVariants.map(v=>v.name),source.wholeNames)
for(const variant of review.wholeVariants)assert.deepEqual(variant,source.records[variant.name])
assert.deepEqual(review.compatibleWholeRoots,EXPECTED.compatible)
assert.deepEqual(review.dictionaryDirectionStrokes,[EXPECTED.blockedPen])
assert.deepEqual(review.blockedPens.map(v=>v.pen),[EXPECTED.blockedPen])
assert.deepEqual(review.blockedPens[0].raw,EXPECTED.blockedRaw)
assert.deepEqual(review.unreviewedProgressivePens,Array.from({length:EXPECTED.strokes},(_,i)=>i+1))
assert.deepEqual(review.unreviewedDictionaryDirectionStrokes,Array.from({length:EXPECTED.strokes},(_,i)=>i+1).filter(i=>i!==EXPECTED.blockedPen))
assert.equal(hanjaStrokeData({glyph:EXPECTED.glyph,strokes:EXPECTED.strokes}),null)
console.log(JSON.stringify({glyph:EXPECTED.glyph,sourcePassed:true,capturedRecords:Object.keys(source.records).length,requiredPens:EXPECTED.strokes,blockedPens:[EXPECTED.blockedPen],wholeSources:summary,runtimeApplied:false,nativeReviewOwner:'parent browser review; no new visual approval by verifier'}))

