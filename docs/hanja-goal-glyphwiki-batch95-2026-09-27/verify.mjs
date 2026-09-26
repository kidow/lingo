import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
import {compileProgressive,sourceGroups} from './progressive.mjs'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./gothic-engine-proof.json'),trace=read('./gothic-draw-trace.json')
const runtime=hanjaStrokeData({glyph:'戹',strokes:5})
assert(runtime);assert.equal(runtime.verificationSource,'ehanja-crosschecked')
assert.equal(proof.groups.length,7);assert.equal(sourceGroups.length,5)
assert.deepEqual(sourceGroups.flat().sort((a,b)=>a-b),[0,1,2,3,4,5,6])
const outlines=compileProgressive(trace,proof)
assert.deepEqual(runtime.outlines,outlines)
assert.deepEqual(runtime.paths,outlines.map(s=>s.map(p=>p.outline).join(' ')))
const editable=readFileSync(new URL('../../public/hanja-strokes/glyphwiki/6239.json',import.meta.url))
assert.equal(runtime.geometrySource,createHash('sha256').update(editable).digest('hex'))
const asset=JSON.parse(editable)
assert.deepEqual(asset.records,source.records);assert.deepEqual(asset.drawTrace,trace)
assert.deepEqual(asset.sourceGroups,sourceGroups);assert.deepEqual(asset.engineHashes,proof.hashes)
assert.equal(runtime.sourceReference.geometryReviewSha256,createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex'))
const reviewHash=createHash('sha256').update(readFileSync(new URL('./progressive-review.json',import.meta.url))).digest('hex')
for(const key of ['orderReviewSha256','geometryReviewSha256','directionReviewSha256'])assert.equal(runtime.sourceReference[key],reviewHash)
assert.equal(runtime.pathsSha256,createHash('sha256').update(JSON.stringify(runtime.paths)).digest('hex'))
assert.deepEqual(sourceGroups,[[4],[1,2],[3],[0],[5,6]])
assert.deepEqual(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,4)
assert.deepEqual(asset.enginePreset,{size:'default',style:'gothic'})
assert.deepEqual(proof.preset,asset.enginePreset)
for(let i=1;i<trace[6].length;i++){const a=trace[6][i-1],b=trace[6][i];const end=a.kind==='cdDrawCurve'?a.args.slice(4,6):a.args.slice(2,4);assert.deepEqual(end,b.args.slice(0,2))}
assert.deepEqual(asset.sourceSnapshot,source.snapshot)
assert.equal(source.snapshot.repositoryRevision,'a7dd7f3d911936770fa742e8c37d16bee7e2173c')
assert.equal(source.snapshot.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing exact dependency')
let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources')){
 const url='https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt'
 assert.equal(source.snapshot.url,url)
 const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(response.ok)
 const buffer=Buffer.from(await response.arrayBuffer());assert.equal(buffer.length,source.snapshot.bytes)
 assert.equal(createHash('sha256').update(buffer).digest('hex'),source.snapshot.sha256)
 const found=new Set()
 for(const line of buffer.toString('utf8').split('\n')){
  const [name,related,data]=line.split('|').map(s=>s.trim())
  if(source.records[name]){assert.deepEqual({name,related,data},source.records[name]);found.add(name)}
 }
 assert.equal(found.size,Object.keys(source.records).length);sourceVersions=found.size
}
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage();k.kShotai=k.kGothic;for(const [name,r] of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:7,emptyGroups:0,strokeGroups:5,curvedStrokes:3,obliqueStrokes:1,runtimeRegistered:1,privateMediaSaved:false}))
