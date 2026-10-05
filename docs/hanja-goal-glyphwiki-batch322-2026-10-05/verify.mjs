import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
import {compileProgressive as compilePrimitive} from './primitive-reveal.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"e56763217b59bef274ca942ea1b05a483d35c8c640d3b650bec8cedc49a73c68")
assert.equal(source.root,'u6a52-k')
assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions.map(v=>v.name),['u96f2@9','u96e8-03@6','u4e91-04@1']);for(const v of source.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,source.records[v.name].data);assert(v.apiUrl.includes(encodeURIComponent(v.name)))};assert.deepEqual(source.missing,[])
assert.equal(Object.keys(source.records).length,6)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(proof.groups.length,18);assert.equal(trace.flat().length,18)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11],[12],[16],[17],[13,14],[15]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i))
const primitive=compilePrimitive(trace,proof),compiled=compileProgressive(trace,proof)
assert.equal(compiled.length,16);assert.equal(compiled.flat().length,17);assert.equal(primitive.flat().length,18)
for(let i=0;i<16;i++){
 assert.equal(compiled[i].map(p=>p.outline).join(' '),primitive[i].map(p=>p.outline).join(' '))
 if(![6].includes(i))assert.deepEqual(compiled[i],primitive[i])
 for(const p of compiled[i])if(p.revealPath)assert.equal((p.revealPath.match(/M/g)||[]).length,1)
}
assert.equal(hanjaStrokeData({glyph:'橒',strokes:16}),null)
assert.equal(findings.runtimeRegistered,0);assert.equal(findings.progressiveApprovalIssued,false)
assert.deepEqual(findings.failedStrokes,[15]);assert.equal(findings.progressiveFramesExamined,9)
assert.deepEqual(trace[13][0].args.slice(4,6),[98.46825000000001,174.4873])
assert.deepEqual(trace[14][0].args.slice(0,2),[79.321,176.2952])
assert.notDeepEqual(trace[13][0].args.slice(4,6),trace[14][0].args.slice(0,2))
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,deferred:true,engineChecked,rawGroups:18,drawingPrimitives:18,domesticPens:16,examinedFrames:9,failedCompoundGap:[15],runtimeRegistered:0,privateMediaSaved:false}))
