import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {HANJA_STROKES,hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const sha=x=>createHash('sha256').update(x).digest('hex')
const bytes=n=>readFileSync(new URL(n,import.meta.url))
const read=n=>JSON.parse(bytes(n))
const expected={"sources.json":"92a18400378b223631faf40c529100fdaf7a049247414eb8df557fe64e59d5a8","engine-proof.json":"9ab98a3c70cdedd1e9fd00704f70dcedaa76cbb6e5c56c7d324c878c63323c07","draw-trace.json":"51a9299211b07198212d37fbd9def24d261d32a25bb007b13938990ec315fadd","whole-source-inventory.json":"18ef9d381e3a0dfc1ac4255bebaa6cb6cf6fc29eecee93c4961b748c551b9226","whole-engine-inventory.json":"1b30f7a51352da349e5b54f70832a6b172eb65df74fc1991f19a67ff9fe20140"}
for(const [name,hash] of Object.entries(expected))assert.equal(sha(bytes('./'+name)),hash)
const runtimeHashes={"lib/hanja-strokes.ts":"8b2fcecfc6e0b2d31a7582e5f04f5bd84ace75df0fe8f8e5124d8c425f11f6c8","lib/hanja-stroke-textbook.test.ts":"ae22903873ffc4ffc5fd2cf0e7b146481681dcafd2cf2807be48b08e81e84306","public/hanja-strokes/glyphwiki/9a08.json":"cec47ab584f7008594cc19dd07ffa5ba6a0ca086a9e89fa915a118d6565799f9","public/hanja-strokes/dictionary-reviewed-glyphwiki-batch357.json":"be48cf077eb58240f9f5c1d0c86603a991494a255cd18924b6ecddcbe68fd290"}
for(const [name,hash] of Object.entries(runtimeHashes))assert.equal(sha(bytes('../../'+name)),hash,'runtime changed')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),inventory=read('./whole-source-inventory.json'),engines=read('./whole-engine-inventory.json')
assert.equal(source.root,'u5b7c-k');assert.equal(Object.keys(source.records).length,7)
assert.deepEqual(source.providerVersions.map(v=>v.name),['u5c71-03@2'])
assert.deepEqual(inventory.wholeNames,['u5b7c','u5b7c-k','u5b7c-ue0100','u5b7c-ue0101','u5b7c-ue0102','u5b7c-ue0103'])
assert.deepEqual(engines.variants.map(v=>v.root),inventory.wholeNames)
for(const v of inventory.variants){
 assert.deepEqual(v.missing,[]);assert.deepEqual(v.aliases,[])
 for(const h of v.providerVersions){assert.equal(sha(h.data),h.sha256);assert.equal(h.data,v.records[h.name].data);assert.equal(h.version,Number(h.name.split('@')[1]));assert.equal(h.apiUrl,'https://glyphwiki.org/api/glyph?name='+encodeURIComponent(h.name))}
 for(const r of Object.values(v.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(v.records[row.split(':')[7]],'missing declared dependency')
 const e=engines.variants.find(e=>e.root===v.root);assert.equal(e.groups.length,23);assert.equal(e.trace.length,23)
 assert.equal(e.trace.flat().length,v.providerVersions.length?24:25)
 assert.deepEqual(e.defaults,proof.defaults)
 for(let i=0;i<23;i++)assert.deepEqual(e.trace[i].flatMap(c=>c.polygons),e.groups[i].polygons)
}
const primary=engines.variants.find(v=>v.root===source.root);assert.deepEqual(primary.groups,proof.groups);assert.deepEqual(primary.trace,trace)
assert.equal(hanjaStrokeData({glyph:'孼',strokes:19}),null);assert.equal(HANJA_STROKES.length,5190)
let engineChecked=false,archiveChecked=false
if(process.argv.includes('--engine')){
 const codes=[]
 for(const [file,hash] of Object.entries(engines.engineHashes)){
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+engines.engineRevision+'/'+file,{signal:AbortSignal.timeout(20000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes.push(code)
 }
 for(const source of inventory.variants){
  const ctx=vm.createContext({records:source.records,root:source.root})
  for(const code of codes)vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const k=new Kage();for(const[n,r]of Object.entries(records))k.kBuhin.push(n,r.data);const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:3000}))
  const expected=engines.variants.find(v=>v.root===source.root);assert.deepEqual(actual.groups,expected.groups);assert.deepEqual(actual.trace,expected.trace);assert.deepEqual(actual.defaults,expected.defaults)
 }
 engineChecked=true
}
if(process.argv.includes('--archive')){
 const response=await fetch(source.archive.url,{signal:AbortSignal.timeout(60000)});assert(response.ok)
 const archive=await response.text();assert.equal(sha(archive),source.archive.sha256);assert.equal(Buffer.byteLength(archive),source.archive.bytes)
 const map=new Map(archive.split('\n').map(line=>line.split('|').map(s=>s.trim())).filter(a=>a.length>=3).map(a=>[a[0],{name:a[0],related:a[1],data:a[2]}]))
 for(const v of inventory.variants)for(const [n,r] of Object.entries(v.records))if(!n.includes('@'))assert.deepEqual(r,map.get(n))
 archiveChecked=true
}
console.log(JSON.stringify({passed:true,wholeVariants:6,uniqueHistoricalVersions:1,engineChecked,archiveChecked,domesticStaticReviewed:19,progressiveFramesApproved:0,runtimeRegistered:0,runtimeUnchanged:true,privateMediaSaved:false}))
