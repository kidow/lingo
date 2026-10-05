import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),inventory=read('./whole-source-inventory.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"bd4f7b3d00e416616fcb053f5af8f44bb3ea5b939c88b0fec59742e1648a56ef")
assert.deepEqual(inventory.wholeNames,['u802d','u802d-k','u802d-var-001'])
assert.deepEqual(source,inventory.sources.find(s=>s.root==='u802d-k'))
const items=[{source,proof,trace},...['original','variant'].map((k,i)=>({source:inventory.sources.find(s=>s.root===(i?'u802d-var-001':'u802d')),proof:read('./'+k+'-engine-proof.json'),trace:read('./'+k+'-draw-trace.json')}))]
const groups=[[4],[5],[0],[2],[1],[3],[6,7],[8,9],[10],[11,12],[13,14],[15],[16],[17],[18],[19],[20],[21]]
assert.deepEqual(groups.flat().sort((a,b)=>a-b),Array.from({length:22},(_,i)=>i))
const gaps=t=>groups.flatMap((ids,i)=>{const calls=ids.flatMap(x=>t[x]);return calls.slice(1).flatMap((n,k)=>{const p=calls[k],a=p.args.slice(p.kind==='cdDrawLine'?2:p.kind==='cdDrawBezier'?6:4,p.kind==='cdDrawLine'?4:p.kind==='cdDrawBezier'?8:6),b=n.args.slice(0,2);return a.some((v,j)=>v!==b[j])?[{pen:i+1,end:a,start:b,gap:Math.hypot(a[0]-b[0],a[1]-b[1])}]:[]})})
for(const item of items){
 assert.equal(item.proof.groups.length,22)
 assert.deepEqual(item.proof.engineHashes,proof.engineHashes)
 assert.equal(item.source.archive.sha256,'7ee5614570cb89bcdc8a1617a4cfd0f4f2a96580b6d52c11c56d7bee32986f62')
 assert.equal(Object.keys(item.source.records).length,3)
 assert.deepEqual(item.source.missing,[]);assert.deepEqual(item.source.aliases,[]);assert.deepEqual(item.source.providerVersions,[])
 for(const r of Object.values(item.source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(item.source.records[row.split(':')[7]],'declared dependency missing')
 assert.deepEqual(gaps(item.trace).map(g=>g.pen),[7,8,10,11])
}
assert.equal(hanjaStrokeData({glyph:'耭',strokes:18}),null)
for(const[p,h]of Object.entries({"lib/hanja-strokes.ts":"fc81c15a39ee673bb33a0b7693e8814bf7bb6e3f26342adee4f7bce4f00f8a1a","lib/hanja-stroke-textbook.test.ts":"8d6da29f0810bb9da508c5837dd6d94b386ef38854b8256840ecb11a6f8830f6","public/hanja-strokes/dictionary-reviewed-glyphwiki-batch351.json":"d21d866ad5643e252901968a11b4cc083b7cfae32a70af3cc60a52fea5e1756c","public/hanja-strokes/glyphwiki/74b9.json":"5d3c436ce3eed5bf6a28bcd1eba5bef8f1a604aeb5b5f38ae56d450915f0f9bc"}))assert.equal(sha(readFileSync(new URL('../../'+p,import.meta.url))),h,'runtime changed')
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

console.log(JSON.stringify({passed:true,engineChecked,wholeSources:items.length,providerRecordsEach:3,gaps:items.map(i=>({root:i.source.root,gaps:gaps(i.trace)})),runtimeRegistered:0,privateMediaSaved:false}))
