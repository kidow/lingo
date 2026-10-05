import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),inventory=read('./whole-source-inventory.json'),engines=read('./whole-engine-inventory.json')
assert.equal(sha(JSON.stringify(source,null,2)+'\n'),"6b7a384e4dfe15f182f75e3755114c07e4ba05bbe494be8eab5f81204b66e07c")
assert.deepEqual(inventory.wholeNames,["u9088","u9088-k","u9088-ue0100","u9088-ue0101","u9088-ue0102"])
assert.deepEqual(source,inventory.sources.find(s=>s.root==='u9088-k'))
const items=inventory.sources.map(source=>({source,proof:engines[source.root],trace:engines[source.root].trace}))
const end=c=>c.args.slice(c.kind==='cdDrawLine'?2:c.kind==='cdDrawBezier'?6:4,c.kind==='cdDrawLine'?4:c.kind==='cdDrawBezier'?8:6)
const gap=item=>{const i=item.trace.length===20?3:4,a=item.trace[i][0],b=item.trace[i+1][0],x=end(a),y=b.args.slice(0,2);return{root:item.source.root,rawGroups:[i,i+1],end:x,start:y,gap:Math.hypot(x[0]-y[0],x[1]-y[1])}}
for(const item of items){
 assert.deepEqual(item.proof.engineHashes,proof.engineHashes)
 assert.equal(item.source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
 assert.deepEqual(item.source.missing,[]);assert.deepEqual(item.source.aliases,[])
 assert.equal(item.source.providerVersions.length,2)
 for(const r of Object.values(item.source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(item.source.records[row.split(':')[7]],'declared dependency missing')
 for(const h of item.source.providerVersions)assert.equal(sha(item.source.records[h.name].data),h.sha256,'exact historical data')
 assert.equal(gap(item).gap,5,'domestic18 original path gap')
}
assert.equal(hanjaStrokeData({glyph:'邈',strokes:18}),null)
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

console.log(JSON.stringify({passed:true,engineChecked,wholeSources:items.length,historicalVersions:items.reduce((n,i)=>n+i.source.providerVersions.length,0),gaps:items.map(gap),runtimeRegistered:0,privateMediaSaved:false}))
