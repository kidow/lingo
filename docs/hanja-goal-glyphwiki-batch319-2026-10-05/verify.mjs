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
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"dc18b4b8190ca40dfb3524ed056fce413254e274f494706b2ed3cd00b0fd8283")
assert.equal(source.root,'u6231-k')
assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[]);assert.deepEqual(source.missing,[])
assert.equal(Object.keys(source.records).length,4)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.equal(source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
assert.equal(proof.groups.length,18);assert.equal(trace.flat().length,21)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,6)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,1)
assert.deepEqual(sourceGroups,[[0],[1],[2,3],[4],[6],[5],[7],[10,11],[8],[12],[13],[9],[14],[16],[17],[15]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i))
const primitive=compilePrimitive(trace,proof),compiled=compileProgressive(trace,proof)
assert.equal(compiled.length,16);assert.equal(compiled.flat().length,16);assert.equal(primitive.flat().length,21)
for(let i=0;i<16;i++){
 assert.equal(compiled[i].map(p=>p.outline).join(' '),primitive[i].map(p=>p.outline).join(' '))
 if(![2,3,5,7].includes(i))assert.deepEqual(compiled[i],primitive[i])
 for(const p of compiled[i])if(p.revealPath)assert.equal((p.revealPath.match(/M/g)||[]).length,1)
}
assert.equal(hanjaStrokeData({glyph:'戱',strokes:16}),null)
assert.equal(findings.runtimeRegistered,0);assert.equal(findings.progressiveApprovalIssued,false)
assert.deepEqual(findings.failedStrokes,[6,14]);assert.equal(findings.progressiveFramesExamined,144)
assert.deepEqual(trace[5].at(-1).args.slice(2,4),[97.24,99])
assert.deepEqual(trace[16][0].args.slice(6,8),[181.35,180])
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
console.log(JSON.stringify({passed:true,deferred:true,engineChecked,rawGroups:18,drawingPrimitives:21,domesticPens:16,examinedFrames:144,failedTerminalHooks:[6,14],runtimeRegistered:0,privateMediaSaved:false}))
