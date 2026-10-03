import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const hashes={
  "./sources.json": "284d564a0106355b04f13fd72df94833e77eef3cd42f6a905da5e93571313727",
  "./engine-proof.json": "9303408712e045f025c0123dc14b357861d87e85d430f530a56698111ea634da",
  "./draw-trace.json": "0a5ba6828296a724e379d42994ee148a8753a30a7b3de731d3be2d13d80e179b",
  "./metadata.json": "e41da7f9e51b5e9828e28d8c493fcf25a5fcc3cc62afecf4fb57f5f43758b168",
  "./serve.py": "136f0bd21873d3e77c8b7e9f823e62276cc1707142a360218eb603cace9019e0",
  "./latest/sources.json": "258547fae35e086a867ef909acbcfe8013e940cd4b26eee482f82b25b9de749d",
  "./latest/engine-proof.json": "ce520484ec7f224c1ddbb9b46e7c3739562d9e125eea9d5f65a5daf68a1770e5",
  "./latest/draw-trace.json": "68e5aaa5cc611e595754b9d6c33131f5141e6d2c33e929edb33543c21cd0a945",
  "./latest/metadata.json": "e41da7f9e51b5e9828e28d8c493fcf25a5fcc3cc62afecf4fb57f5f43758b168",
  "./latest/serve.py": "310ea38bc9c3f4b3c13b83649d783579332ebc97f8345a55edba9855401b5142",
  "./alternatives.json": "0ab01d5d2fff2bdac232176580ce80244ec627bf618c1274bc624f960da67356",
  "./findings.json": "0aabeca271fac166c9a491e310f354da65d8cfca00bd3a0bfb56425c84fd0668"
}
for(const[p,h]of Object.entries(hashes))assert.equal(sha(readFileSync(new URL(p,import.meta.url))),h,p)
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
const latest=read('./latest/sources.json'),latestProof=read('./latest/engine-proof.json'),latestTrace=read('./latest/draw-trace.json')
const findings=read('./findings.json'),alternatives=read('./alternatives.json')
assert.equal(source.root,'u637f-k');assert.equal(latest.root,'u637f-k')
assert.equal(Object.keys(source.records).length,4);assert.equal(Object.keys(latest.records).length,3)
for(const s of [source,latest,...Object.values(alternatives)])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]],'exact declared closure missing')
assert.deepEqual(source.providerVersions,[]);assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(latest.archive,undefined)
assert.deepEqual(latest.providerVersions.map(v=>[v.name,v.revision]),[['u637f-k',4],['u624c-01-var-002',1],['u59bb-02',7]])
for(const v of latest.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,latest.records[v.name].data);assert.equal(v.author,null);assert.equal(v.date,null)}
assert.equal(alternatives.u637f.records.u637f.data,source.records.u637f.data)
assert.equal(alternatives['u637f-ue0100'].records['u637f-ue0100'].data,'99:0:0:0:0:200:200:u637f')
for(const s of Object.values(alternatives))for(const[n,r]of Object.entries(s.records))if(n!=='u637f-ue0100')assert.equal(r.data,source.records[n].data)
assert.equal(proof.groups.length,14);assert.equal(latestProof.groups.length,13)
assert.equal(trace.flat().length,14);assert.equal(latestTrace.flat().length,14)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,4);assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawCurve').length,5)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0);assert.equal(latestTrace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(trace[3],[]);assert.deepEqual(proof.groups[3].polygons,[]);assert.deepEqual(proof.groups[3].raw.slice(0,4),[0,0,0,0])
for(const[g,t]of [[findings.sourceGroupsZeroBased,trace],[findings.latestSourceGroupsZeroBased,latestTrace]]){assert.equal(g.length,11);assert.deepEqual(g.flat().sort((a,b)=>a-b),Array.from({length:t.length},(_,i)=>i))}
const discontinuities=(groups,t)=>groups.flatMap((group,stroke)=>{const calls=group.flatMap(i=>t[i]);return calls.flatMap((c,i)=>{if(!i)return[];const prev=calls[i-1],from=prev.args.slice(prev.kind==='cdDrawLine'?2:4,prev.kind==='cdDrawLine'?4:6),to=c.args.slice(0,2);return JSON.stringify(from)===JSON.stringify(to)?[]:[{domesticStroke:stroke+1,from,to,distance:Math.hypot(from[0]-to[0],from[1]-to[1])}]})})
assert.deepEqual(discontinuities(findings.sourceGroupsZeroBased,trace),[findings.gap])
assert.deepEqual(discontinuities(findings.latestSourceGroupsZeroBased,latestTrace),[findings.latestGap])
assert.deepEqual(findings.gap.from,[95.07,156]);assert.deepEqual(findings.gap.to,[100.71,148])
assert.deepEqual(findings.latestGap.from,[81,161]);assert.deepEqual(findings.latestGap.to,[86.5,153])
assert.deepEqual(findings.domesticReviewed,Array.from({length:11},(_,i)=>i+1))
assert.equal(findings.fullFormAndDomesticStatesReviewedInBrowser,true);assert.equal(findings.latestFullFormAndDomesticStatesReviewedInBrowser,true)
assert.equal(findings.progressiveFramesApproved,0);assert.equal(findings.runtimeAdded,0);assert.equal(findings.geometryReviewPassed,false);assert.equal(findings.privateMediaSaved,false)
assert.equal(hanjaStrokeData({glyph:'捿',strokes:11}),null)
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
console.log(JSON.stringify({passed:true,status:'held',runtimeAdded:0,engineChecked,engineFiles:8,historicalRecords:4,latestRecords:3,historicalAlternatives:2,domesticReviewed:11,historicalGap:findings.gap.distance,latestGap:findings.latestGap.distance,progressiveFramesApproved:0,privateMediaSaved:false}))
