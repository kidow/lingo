import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const hashes={
  "./sources.json": "74a3cfc5ad52e2fd82b522cc30f10274435cc2ff5419a8fbba036ac15dd03820",
  "./engine-proof.json": "ce2d5645ef8aabbb079df8487c7bb8985fdab545d43a33a7c02c81097a1a2c13",
  "./draw-trace.json": "6fe9782411a964bb7d573f692afbcdb5000d2886326c4edbec9d4dfae77d3932",
  "./metadata.json": "3b64605825953c32d12e1d401cfaf7d588f2c8d9c24b5b25d13fdcd81661807f",
  "./serve.py": "93db71ec08c19ab31aeeddc1818d6da3028e310e4a44d5b7718ac06ad3184f51",
  "./latest/sources.json": "6149a15ab22b2244a4c9375ae8d8b509eb68382856bb33d432cc2bcd802c61be",
  "./latest/engine-proof.json": "118726b8c6465370a5793116b3d13ed90deb30b2cc19b98a4279f3fd519a2377",
  "./latest/draw-trace.json": "39011852f132bf5a3c39c0c21733cae5ec7b89c522534dfd5c3730ff1dd94ba7",
  "./latest/metadata.json": "3b64605825953c32d12e1d401cfaf7d588f2c8d9c24b5b25d13fdcd81661807f",
  "./latest/serve.py": "9061969596ea7546b4a3a23b539676726453a1e114fdc454fb4f2a731c05db94",
  "./findings.json": "6389f6906cb96db5e29eaa1c45c0ff89b33dd04dc329bdbdcf303bbeeddaa2d7"
}
for(const[p,h]of Object.entries(hashes))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p)
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
const latest=read('./latest/sources.json'),latestProof=read('./latest/engine-proof.json'),latestTrace=read('./latest/draw-trace.json'),findings=read('./findings.json')
assert.equal(source.root,'u6dc3-k');assert.equal(latest.root,'u6dc3-k')
assert.equal(Object.keys(source.records).length,6);assert.equal(Object.keys(latest.records).length,6)
for(const s of [source,latest])for(const r of Object.values(s.records)){
 const alias=r.data.match(/^\[\[([^\]]+)\]\]$/);if(alias)assert(s.records[alias[1]],'missing alias target')
 for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]],'exact declared dependency missing')
}
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.deepEqual(source.providerVersions.map(v=>[v.name,v.revision,v.author,v.date]),[["u5377@9",9,"johotogoshinentai","2012年8月17日(金) 02:46"],["u20509-03@1",1,"mashabow","2009年2月1日(日) 12:39"],["u353e-14@1",1,"kamiyo","2012年6月1日(金) 16:58"]])
assert.deepEqual(latest.providerVersions.map(v=>[v.name,v.revision]),[["u6dc3-k",13],["u6dc3-j",4],["u6c35-01",21],["u5377-j",3],["u20509-03",3],["u353e-14",2]])
for(const s of [source,latest])for(const v of s.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,s.records[v.name].data)}
for(const v of latest.providerVersions){assert.equal(v.author,null);assert.equal(v.date,null)}
for(const[p,t]of [[proof,trace],[latestProof,latestTrace]]){
 assert.equal(p.groups.length,13);assert.equal(t.flat().length,16)
}
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,11)
assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawCurve').length,10)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawBezier').length,1)
for(const[g,t]of [[findings.sourceGroupsZeroBased,trace],[findings.latestSourceGroupsZeroBased,latestTrace]]){assert.equal(g.length,11);assert.deepEqual(g.flat().sort((a,b)=>a-b),Array.from({length:t.length},(_,i)=>i))}
const discontinuities=(groups,t)=>groups.flatMap((group,stroke)=>{const calls=group.flatMap(i=>t[i]);return calls.flatMap((c,i)=>{if(!i)return[];const prev=calls[i-1],off=prev.kind==='cdDrawLine'?2:prev.kind==='cdDrawCurve'?4:6,from=prev.args.slice(off,off+2),to=c.args.slice(0,2);return JSON.stringify(from)===JSON.stringify(to)?[]:[{domesticStroke:stroke+1,from,to,distance:Math.hypot(from[0]-to[0],from[1]-to[1])}]})})
assert.deepEqual(discontinuities(findings.sourceGroupsZeroBased,trace),[findings.gap])
assert.deepEqual(discontinuities(findings.latestSourceGroupsZeroBased,latestTrace),[findings.latestGap])
assert.deepEqual(findings.gap.from,[36.75,184]);assert.deepEqual(findings.gap.to,[33,150])
assert.deepEqual(findings.latestGap.from,[40.5,184]);assert.deepEqual(findings.latestGap.to,[37.5,145])
assert.deepEqual(findings.domesticReviewed,Array.from({length:11},(_,i)=>i+1))
assert.equal(findings.fullFormAndDomesticStatesReviewedInBrowser,true);assert.equal(findings.latestFullFormAndDomesticStatesReviewedInBrowser,true)
assert.equal(findings.progressiveFramesApproved,0);assert.equal(findings.runtimeAdded,0);assert.equal(findings.geometryReviewPassed,false);assert.equal(findings.privateMediaSaved,false)
assert.equal(hanjaStrokeData({glyph:'淃',strokes:11}),null)
assert.deepEqual(latestProof.engineHashes,proof.engineHashes);assert.equal(latestProof.engineRevision,proof.engineRevision)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:latest,proof:latestProof,trace:latestTrace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,status:'held',runtimeAdded:0,engineChecked,engineFiles:8,historicalRecords:6,latestRecords:6,historicalLiteralRevisions:3,latestRevisions:6,domesticReviewed:11,historicalGap:findings.gap.distance,latestGap:findings.latestGap.distance,progressiveFramesApproved:0,privateMediaSaved:false}))
