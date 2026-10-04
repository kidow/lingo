import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"7e356cdb6198b4c383f191e89d8d6831ca2de1dd7acb8a95027a80f3e914a9a5")
assert.equal(sha(readFileSync(new URL('./primary-sources.json',import.meta.url))),"1a8747768a2d03ada475eb42c73bef780de171021daa441a079f788231109f7e")
assert.equal(source.root,'u66b3-ue0104')
assert.deepEqual(sourceGroups,[[0],[1,2],[3],[4],[5],[6],[8],[7],[9],[10],[11],[12],[13,14],[15],[16]])
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:17},(_,i)=>i))
assert.equal(compileProgressive(trace,proof).length,15)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,1)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
assert.deepEqual(trace[8][0].args,[69.35877500000001,97.2,93.3077,88.65,126.69104999999999,72.69,0,7])
assert.equal(trace[15][0].args[2],trace[14][0].args[0])
assert.equal(trace[13][0].args[2],trace[14][0].args[0])
assert.equal(hanjaStrokeData({glyph:'暳',strokes:15}),null)
const primary=read('./primary-sources.json')
assert.equal(Object.keys(primary.records).length,9)
assert.equal(primary.providerVersions.length,5)
assert.equal(primary.aliases.length,2)
for(const v of primary.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(v.data,primary.records[v.name].data)}
const findings=read('./findings.json')
assert.equal(findings.runtimeRegistered,0)
assert.equal(findings.progressiveFramesApproved,0)
assert.equal(findings.geometryReviewPassed,false)
assert.equal(findings.progressiveReviewPassed,false)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of [{source,proof,trace},{source:primary,proof:read('./primary-engine-proof.json'),trace:read('./primary-draw-trace.json')}]){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}
console.log(JSON.stringify({passed:true,engineChecked,exactWholesReproduced:engineChecked?2:0,runtimeRegistered:0,progressiveFramesApproved:0,privateMediaSaved:false}))
