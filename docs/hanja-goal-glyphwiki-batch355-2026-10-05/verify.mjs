import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),inventory=read('./whole-source-inventory.json'),engines=read('./whole-engine-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"14ff701d9c7a872877673d7a190a64ecc7d90c04401eac7ff40d6fa96d9f5c8c")
assert.deepEqual(inventory.wholeNames,["u8b41","u8b41-k","u8b41-ue0100","u8b41-ue0101","u8b41-ue0102","u8b41-ue0103","u8b41-ue0104"])
assert.deepEqual(source,inventory.sources.find(s=>s.root==='u8b41-k'))
const items=inventory.sources.map(source=>({source,proof:engines[source.root],trace:engines[source.root].trace}))
const line=(item,i)=>{const t=item.trace[i];assert.equal(t.length,1);assert.equal(t[0].kind,'cdDrawLine');return t[0].args}
for(const item of items){
 assert.deepEqual(item.proof.engineHashes,proof.engineHashes)
 assert.equal(item.source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
 assert.deepEqual(item.source.missing,[]);assert.deepEqual(item.source.aliases,[])
 for(const r of Object.values(item.source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(item.source.records[row.split(':')[7]],'declared dependency missing')
 for(const h of item.source.providerVersions)assert.equal(sha(item.source.records[h.name].data),h.sha256,'exact historical data')
 if(item.source.root==='u8b41-ue0103'){
  assert.equal(item.trace.length,20)
  const a=line(item,15),b=line(item,19)
  assert.equal(a[1],b[1]);assert.equal(a[3],b[3])
  assert(b[0]>a[2]);assert(Math.abs(b[0]-a[2]-17.28)<1e-9,'domestic13 gap')
 }else{
  assert([18,19].includes(item.trace.length))
  const a=line(item,8),b=line(item,9),c=line(item,10)
  assert.equal(a[1],a[3]);assert.equal(b[0],b[2]);assert.equal(c[0],c[2])
  assert(a[0]<b[0]&&a[2]>c[0],'single horizontal crosses both 艹 verticals')
 }
}
assert.equal(hanjaStrokeData({glyph:'譁',strokes:18}),null)
for(const[p,h]of Object.entries({"lib/hanja-strokes.ts":"09d668b01d217fb090d84e32ee43e735b0d53870b0ce7136721207afee3efccb","lib/hanja-stroke-textbook.test.ts":"8bb2d22490a4f30343e95ac08119b935678ec36464312bb24e52a63b9b1b59b2","public/hanja-strokes/dictionary-reviewed-glyphwiki-batch354.json":"588b27291fea571568c5ee8f894d0d5f71b04779ccbf8c90a50c087d295da5aa","public/hanja-strokes/glyphwiki/85ce.json":"1f46f98afd9c7e3cc4e38b2ddf16cb402c58312088b8d79ea9cfec0cc72ee898"}))assert.equal(sha(readFileSync(new URL('../../'+p,import.meta.url))),h,'runtime changed')
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){
  assert(['2d.js','buhin.js','curve.js','kage.js','kagecd.js','kagedf.js','polygon.js','polygons.js'].includes(file))
  const response=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(15000)});assert(response.ok)
  const code=await response.text();assert.equal(sha(code),hash);codes[file]=code
 }
 for(const item of items){
  const ctx=vm.createContext({records:item.source.records,root:item.source.root})
  for(const code of Object.values(codes))vm.runInContext(code,ctx,{timeout:1000})
  const actual=JSON.parse(vm.runInContext(`const resolve=(name,seen=[])=>{if(seen.includes(name))throw Error('alias cycle');const r=records[name];if(!r)throw Error('missing dependency');const match=r.data.match(/^\\[\\[([^\\]]+)\\]\\]$/);return match?resolve(match[1],[...seen,name]):r.data};const k=new Kage();for(const n of Object.keys(records))k.kBuhin.push(n,resolve(n));const groups=[],trace=[];let calls=[];for(const name of ['cdDrawLine','cdDrawCurve','cdDrawBezier']){const orig=globalThis[name];globalThis[name]=function(...args){const start=args[1].array.length;orig(...args);calls.push({kind:name,args:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});}}const orig=dfDrawFont;dfDrawFont=function(...args){calls=[];const start=args[1].array.length;orig(...args);trace.push(calls);groups.push({raw:args.slice(2),polygons:args[1].array.slice(start).map(p=>p.array)});};const p=new Polygons();k.makeGlyph(p,root);JSON.stringify({groups,trace,defaults:{kMage:k.kMage,kWidth:k.kWidth,kMinWidthT:k.kMinWidthT,kAdjustMageStep:k.kAdjustMageStep}})`,ctx,{timeout:2000}))
  assert.deepEqual(actual.groups,item.proof.groups);assert.deepEqual(actual.trace,item.trace);assert.deepEqual(actual.defaults,item.proof.defaults)
 }
 engineChecked=true
}

console.log(JSON.stringify({passed:true,engineChecked,wholeSources:items.length,historicalVersions:items.reduce((n,i)=>n+i.source.providerVersions.length,0),runtimeRegistered:0,privateMediaSaved:false}))

