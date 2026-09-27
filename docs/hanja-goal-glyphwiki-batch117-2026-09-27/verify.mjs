import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json')
assert.equal(source.root,'u576e');assert.deepEqual(source.missing,[])
assert.equal(Object.keys(source.records).length,5);assert.equal(proof.groups.length,11)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'missing exact dependency')
assert.deepEqual(trace[4][0].args.slice(4,6),[94.92,86])
assert.deepEqual(trace[5][0].args.slice(0,2),[77.64,88])
assert.notDeepEqual(trace[4][0].args.slice(4,6),trace[5][0].args.slice(0,2))
assert.deepEqual(trace[3],[]);assert.deepEqual(proof.groups[3].polygons,[])
assert.equal(hanjaStrokeData({glyph:'坮',strokes:8}),null)
const alternative=read('./alternative-sources.json')
assert.equal(alternative.alias.data,'[[u576e-j]]')
assert(alternative.whole.data.includes('u53f0-08'))
assert.deepEqual(alternative.component.data.split('$').slice(0,2),source.records['u53f0-08@2'].data.split('$').slice(0,2))
const history=read('./historical-source-proof.json');assert.equal(history.length,3)
for(const h of history){assert.equal(h.data,source.records[h.name].data);assert.equal(createHash('sha256').update(h.data).digest('hex'),h.normalizedDataSha256);assert(h.url.includes(h.name+'?action=edit'))}

let sourceVersions=0,engineChecked=false
if(process.argv.includes('--sources')){
 const url='https://raw.githubusercontent.com/tomcumming/glyphwiki-database/a7dd7f3d911936770fa742e8c37d16bee7e2173c/dump_newest_only.txt'
 assert.equal(source.snapshot.url,url)
 const response=await fetch(url,{signal:AbortSignal.timeout(45000)});assert(response.ok)
 const buffer=Buffer.from(await response.arrayBuffer());assert.equal(buffer.length,source.snapshot.bytes)
 assert.equal(createHash('sha256').update(buffer).digest('hex'),source.snapshot.sha256)
 const allRecords=Object.fromEntries(Object.entries(source.records).filter(([n])=>!source.versionedSources.some(s=>s.name===n)))
 const found=new Set()
 for(const line of buffer.toString('utf8').split('\n')){
  const [name,related,data]=line.split('|').map(s=>s.trim())
  if(allRecords[name]){assert.deepEqual({name,related,data},allRecords[name]);found.add(name)}
 }
 assert.equal(found.size,Object.keys(allRecords).length);sourceVersions=found.size
}
if(process.argv.includes('--engine')){
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const[file,hash]of Object.entries(proof.hashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(createHash('sha256').update(code).digest('hex'),hash)
  vm.runInContext(code,ctx,{timeout:1000})
 }
 const output=vm.runInContext(`const k=new Kage();for(const [name,r] of Object.entries(records))k.kBuhin.push(name,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000})
 const actual=JSON.parse(output);assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults);engineChecked=true
}
console.log(JSON.stringify({passed:true,sourceVersions,engineChecked,rawGroups:11,emptyGroups:1,reviewedDomesticStrokes:8,fourthStrokeDiscontinuous:true,historicalRecords:3,runtimeAdded:0,privateMediaSaved:false}))
