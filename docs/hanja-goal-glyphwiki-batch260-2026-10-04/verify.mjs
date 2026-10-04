import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),review=read('./hold-review.json'),alternatives=read('./alternative-sources.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"2144f1c71998064cf8f2772fd53d11da494e21aef38252365baa880fba74df8b")
assert.equal(source.root,'u6690-k')
assert.equal(Object.keys(source.records).length,4)
assert.deepEqual(source.missing,[])
assert.equal(alternatives.archiveSha256,source.archive.sha256)
for(const s of [source,...alternatives.wholePrefixCandidates]){
 const missing=new Set()
 for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:')){const name=row.split(':')[7];if(!s.records[name])missing.add(name)}
 assert.deepEqual([...missing].sort(),[...s.missing].sort())
}
assert.equal(proof.groups.length,17)
assert.equal(trace.flat().length,17)
assert(trace.flat().every(c=>c.kind==='cdDrawLine'))
assert.deepEqual(review.sourceGroups,[[0],[1,2],[3],[4],[7],[5,6],[8],[9],[10,11],[12],[13],[14,15],[16]])
const gapsOf=t=>{const gaps=[];for(let n=0;n<review.sourceGroups.length;n++){const calls=review.sourceGroups[n].flatMap(i=>t[i]);for(let j=1;j<calls.length;j++){const a=calls[j-1],b=calls[j],end=a.args.slice(2,4),start=b.args.slice(0,2);if(JSON.stringify(end)!==JSON.stringify(start))gaps.push({domesticStroke:n+1,rawGroups:review.sourceGroups[n],previousEnd:end,nextStart:start,gap:Math.hypot(start[0]-end[0],start[1]-end[1])})}}return gaps}
assert.deepEqual(gapsOf(trace),review.gaps)
assert.deepEqual(review.gaps.map(g=>g.domesticStroke),[12])
assert.equal(alternatives.wholePrefixCandidates.length,5)
const complete=alternatives.wholePrefixCandidates.filter(c=>!c.missing.length),incomplete=alternatives.wholePrefixCandidates.filter(c=>c.missing.length)
assert.equal(complete.length,4)
assert.deepEqual(incomplete.map(c=>({root:c.root,missing:c.missing})),review.incompleteWholeCandidates)
const same=complete.filter(c=>c.root!=='u6690-k')
assert.equal(same.length,3)
for(const c of same)assert.equal(c.records['u97cb-08'].data,same[0].records['u97cb-08'].data)
const altSource=read('./alternative-whole-source.json'),altProof=read('./alternative-engine-proof.json')
assert.equal(altSource.root,'u6690')
assert.deepEqual(altSource.records,same.find(c=>c.root===altSource.root).records)
assert.deepEqual(altProof.engineHashes,proof.engineHashes)
assert.deepEqual(gapsOf(altProof.trace),review.alternativeGaps)
assert.equal(hanjaStrokeData({glyph:'暐',strokes:13}),null)
assert.equal(review.progressiveFramesApproved,0)
assert.equal(review.progressiveReviewPassed,false)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:altSource,proof:altProof,trace:altProof.trace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,held:true,runtimeRegistered:0,sourceCaptureHashVerified:true,providerRecords:Object.keys(source.records).length,engineChecked,domesticReviewed:13,progressiveFramesApproved:0,gaps:review.gaps,alternativeGaps:review.alternativeGaps,privateMediaSaved:false}))
