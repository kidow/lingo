import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const hashes={
  "./sources.json": "f935476a6b1596d177dfc1559e6ca4e5c201fb30b5a0db1289ed8bbc597c8aee",
  "./engine-proof.json": "db3bd621052adf4a0babbdf9f31a2ad630024bcca0595911f26da7e067b4a719",
  "./draw-trace.json": "912019ebd95e90b86a0202ba3b50171279cc39fb9af3f8ba82bc56a37995425a",
  "./metadata.json": "4f0e09e171708df7b6937d19f263d855430e189d7668e36affd00ae9c4df94fd",
  "./serve.py": "944688ac56a70c90fe3bef3fd58ff74fdf33c68287e85e1cad2c2dc918df4a8e",
  "./latest/sources.json": "f2daf4695c20d382b15e8bbaabb5b68c143840b9ef40c90229c5da987ff81435",
  "./latest/engine-proof.json": "6e6228102489e4b23d19c427c2f70ac509c37ee515f0055e542c634e733351f5",
  "./latest/draw-trace.json": "368e49d75e1328dc2e589b351c5835b75995767027496c281d5b905a05fb5690",
  "./latest/metadata.json": "4f0e09e171708df7b6937d19f263d855430e189d7668e36affd00ae9c4df94fd",
  "./latest/serve.py": "b95702d922769f94a17f091293a9158deab82e843fb721316543aed35e381f64",
  "./alternatives.json": "2335051e69546bfca879db548d7bfadc123e6d94389241187be7d16164720394",
  "./findings.json": "0a00f8116db4d7561437e6d5a3dd8707bb52945b08f74f7e9692aef2b6a9d996",
  "./alternative-engine-proof.json": "a79186bc103550a809dd4891fa4e8e6bb96dbe6b077b52f26e7515d26c5e89ad",
  "./alternative-draw-trace.json": "25715aa01561a94dc839bb766ea952ae1bcd657c0708bd7bf8a0d63a9ccb39c3"
}
for(const[p,h]of Object.entries(hashes))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p)
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
const latest=read('./latest/sources.json'),latestProof=read('./latest/engine-proof.json'),latestTrace=read('./latest/draw-trace.json')
const findings=read('./findings.json'),alternatives=read('./alternatives.json')
const altProof=read('./alternative-engine-proof.json'),altTrace=read('./alternative-draw-trace.json')
assert.deepEqual(altProof.groups.map(g=>g.polygons),proof.groups.map(g=>g.polygons))
assert.equal(altTrace[9][0].args[2],119.71000000000001)
assert.equal(trace[9][0].args[2],119.71)
assert.deepEqual(altTrace[8][0].args.slice(2,4),findings.gap.from);assert.deepEqual(altTrace[9][0].args.slice(0,2),findings.gap.to)
assert.equal(source.root,'u686d-k');assert.equal(latest.root,'u686d-k')
assert.equal(Object.keys(source.records).length,4);assert.equal(Object.keys(latest.records).length,3)
for(const s of [source,latest,...Object.values(alternatives)])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]],'exact declared closure missing')
assert.deepEqual(source.providerVersions,[]);assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(latest.archive,undefined)
assert.deepEqual(latest.providerVersions.map(v=>[v.name,v.revision]),[['u686d-k',6],['u6728-01',14],['u8fb0-02-var-007',1]])
for(const v of latest.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,latest.records[v.name].data);assert.equal(v.author,null);assert.equal(v.date,null)}
assert.equal(alternatives.u686d.records.u686d.data,source.records.u686d.data)
for(const s of Object.values(alternatives))for(const[n,r]of Object.entries(s.records))assert.equal(r.data,source.records[n].data)
assert.equal(proof.groups.length,12);assert.equal(latestProof.groups.length,12)
assert.equal(trace.flat().length,13);assert.equal(latestTrace.flat().length,13)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,6);assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawCurve').length,6)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0);assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
for(const[g,t]of [[findings.sourceGroupsZeroBased,trace],[findings.latestSourceGroupsZeroBased,latestTrace]]){assert.equal(g.length,11);assert.deepEqual(g.flat().sort((a,b)=>a-b),Array.from({length:t.length},(_,i)=>i))}
const discontinuities=(groups,t)=>groups.flatMap((group,stroke)=>{const calls=group.flatMap(i=>t[i]);return calls.flatMap((c,i)=>{if(!i)return[];const prev=calls[i-1],from=prev.args.slice(prev.kind==='cdDrawLine'?2:4,prev.kind==='cdDrawLine'?4:6),to=c.args.slice(0,2);return JSON.stringify(from)===JSON.stringify(to)?[]:[{domesticStroke:stroke+1,from,to,distance:Math.hypot(from[0]-to[0],from[1]-to[1])}]})})
assert.deepEqual(discontinuities(findings.sourceGroupsZeroBased,trace),[findings.gap])
assert.deepEqual(discontinuities(findings.latestSourceGroupsZeroBased,latestTrace),[findings.latestGap])
assert.deepEqual(findings.gap.from,[116.45500000000001,170]);assert.deepEqual(findings.gap.to,[91.5,182])
assert.deepEqual(findings.latestGap.from,[116.45500000000001,170]);assert.deepEqual(findings.latestGap.to,[91.5,182])
assert.deepEqual(findings.domesticReviewed,Array.from({length:11},(_,i)=>i+1))
assert.equal(findings.fullFormAndDomesticStatesReviewedInBrowser,true);assert.equal(findings.latestFullFormAndDomesticStatesReviewedInBrowser,true)
assert.equal(findings.progressiveFramesApproved,0);assert.equal(findings.runtimeAdded,0);assert.equal(findings.geometryReviewPassed,false);assert.equal(findings.privateMediaSaved,false)
assert.equal(hanjaStrokeData({glyph:'桭',strokes:11}),null)
assert.deepEqual(latestProof.engineHashes,proof.engineHashes);assert.equal(latestProof.engineRevision,proof.engineRevision)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:alternatives.u686d,proof:altProof,trace:altTrace},{source:latest,proof:latestProof,trace:latestTrace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,status:'held',runtimeAdded:0,engineChecked,engineFiles:8,historicalRecords:4,latestRecords:3,historicalAlternatives:1,domesticReviewed:11,historicalGap:findings.gap.distance,latestGap:findings.latestGap.distance,progressiveFramesApproved:0,privateMediaSaved:false}))
