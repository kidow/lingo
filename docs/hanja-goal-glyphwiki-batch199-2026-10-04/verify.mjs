import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8')),sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),findings=read('./findings.json')
for(const[file,hash]of Object.entries({"sources.json":"27bdbf8d3fcb35952576e6476a9ee568f8ad1416060d30bdda8fe916aa8d01f3","engine-proof.json":"98e8746d0ca7b8c498efe88f678c9b7fad7f44c34b98622da27c975601493e7b","draw-trace.json":"b318c4e48b51fbd71da2472ce723ea2ce2679ce593d1fe313d0c686fd38f5771"}))assert.equal(sha(readFileSync(new URL('./'+file,import.meta.url))),hash)
assert.equal(source.root,'u8339-k');assert.equal(Object.keys(source.records).length,5)
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]])
assert.equal(proof.groups.length,12);assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,2)
assert.equal(findings.runtimeAdded,0);assert.equal(findings.status,'held');assert.equal(findings.progressiveFramesApproved,0)
assert.deepEqual(findings.domesticReviewed,[1,2,3,4,5,6,7,8,9,10])
assert.deepEqual(findings.sourceGroupsZeroBased,[[0],[1],[3],[2],[4,5],[6],[7],[8],[9,10],[11]])
const end=trace[4][0].args.slice(2,4),start=trace[5][0].args.slice(0,2),gap=Math.hypot(end[0]-start[0],end[1]-start[1])
assert.deepEqual(end,[35,160.58]);assert.deepEqual(start,[40,142.05]);assert.equal(gap,findings.firstStrokeFailure.gap);assert(gap>19)
assert.equal(hanjaStrokeData({glyph:'茹',strokes:10}),null)
for(const alt of read('./additional-source-inventory.json')){assert.equal(alt.missing.length,0);assert.equal(alt.records['u5982-04'].data,source.records['u5982-04'].data)}
const live=read('./live-source-reads.json')
assert.equal(live.formSubmitted,false);assert.equal(live.securityBypass,false)
assert.equal(live.observations[1].data,source.records['koseki-346680'].data)
assert.equal(live.observations[2].data,source.records['u5982-04'].data)
const t=live.observations[3].data.split('$').map(r=>r.split(':'))
assert.deepEqual(t[1].slice(7,9),['34','140']);assert.deepEqual(t[3].slice(3,5),['33','139']);assert.equal(Math.hypot(34-33,140-139),Math.SQRT2)
const next=read('./next-source-inventory.json')
assert.equal(next.root,'u8347-k');assert.equal(next.missing.length,0);assert.equal(Object.keys(next.records).length,6)
assert.deepEqual(next.providerVersions.map(v=>v.name),['u884c@8','u5f73-01@2'])
for(const v of next.providerVersions){assert.equal(sha(v.data),v.sha256);assert.equal(next.records[v.name].data,v.data)}
for(const r of Object.values(next.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(next.records[row.split(':')[7]])
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

console.log(JSON.stringify({passed:true,sourceCaptureHashVerified:true,engineChecked,providerRecords:5,rawGroups:12,domesticReviewed:10,progressiveApproved:0,runtimeAdded:0,discontinuousGap:gap,nextSourceRecords:6,nextLiteralRevisions:2,privateMediaSaved:false}))
