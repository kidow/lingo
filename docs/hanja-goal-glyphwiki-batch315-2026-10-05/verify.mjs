import assert from 'node:assert/strict'
import {readFileSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json'),rejected=read('./rejected-k-review.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),'5f563520c898359b30e6bf63c74ecca5f87d18472aed817ab2578449158fa1f8')
assert.equal(source.root,'u92cc-ue0102');assert.equal(Object.keys(source.records).length,6)
assert.deepEqual(source.missing,[]);assert.deepEqual(source.aliases,[]);assert.deepEqual(source.providerVersions,[])
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared dependency missing')
assert.equal(proof.groups.length,17);assert.equal(trace.flat().length,17);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,7);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,1)
assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[13],[14],[15],[16],[8,9],[10,11],[12]]);assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:17},(_,i)=>i))
const compiled=compileProgressive(trace,proof);assert.equal(compiled.length,15);assert.equal(compiled.flat().length,17)
assert.equal(findings.runtimeApproved,false);assert.equal(findings.progressiveReviewPassed,false);assert.equal(findings.failure.stroke,13);assert.equal(findings.failure.progress,.5);assert.equal(findings.progressiveFramesExamined,135)
assert.equal(rejected.failedStroke,15);assert.equal(rejected.root,'u92cc-k');assert.equal(sha(JSON.stringify(rejected.source,null,2)+'\n'),rejected.sourceSha256)
assert.equal(hanjaStrokeData({glyph:'鋌',strokes:15}),null)
assert.equal(existsSync(new URL('../../public/hanja-strokes/glyphwiki/92cc.json',import.meta.url)),false)
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
console.log(JSON.stringify({passed:true,engineChecked,providerRecords:6,rawGroups:17,drawingPrimitives:17,quadraticPrimitives:7,cubicPrimitives:1,domesticStaticReviewed:15,progressiveFramesExamined:135,progressiveReviewPassed:false,runtimeRegistered:0,privateMediaSaved:false}))
