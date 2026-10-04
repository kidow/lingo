import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import vm from 'node:vm'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),review=read('./hold-review.json'),alternatives=read('./alternative-sources.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"f635544d6f0e8c6ca97456dc6c1f870b9e62b77d271fb1148ffb0e2522cec31c")
assert.equal(source.root,'u83f9-k')
assert.equal(Object.keys(source.records).length,7)
assert.deepEqual(source.missing,[])
for(const s of [source,...alternatives.wholePrefixCandidates])for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])
assert.equal(proof.groups.length,14)
assert.equal(trace.flat().length,14)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,4)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawBezier').length,0)
const groups=[[0],[1],[3],[2],[4],[5],[6,7],[8],[9,10],[11],[12],[13]],gaps=[]
for(let n=0;n<groups.length;n++){const calls=groups[n].flatMap(i=>trace[i]);for(let j=1;j<calls.length;j++){const a=calls[j-1],b=calls[j],end=a.args.slice(a.kind==='cdDrawLine'?2:a.kind==='cdDrawBezier'?6:4,a.kind==='cdDrawLine'?4:a.kind==='cdDrawBezier'?8:6),start=b.args.slice(0,2);if(JSON.stringify(end)!==JSON.stringify(start))gaps.push({domesticStroke:n+1,rawGroups:groups[n],previousEnd:end,nextStart:start,gap:Math.hypot(start[0]-end[0],start[1]-end[1])})}}
assert.deepEqual(gaps,review.gaps)
assert.deepEqual(gaps.map(g=>g.domesticStroke),[7])
assert.equal(alternatives.wholePrefixCandidates.length,7)
for(const c of alternatives.wholePrefixCandidates)assert.equal(c.records['u6c35-01'].data,source.records['u6c35-01'].data)
assert.equal(hanjaStrokeData({glyph:'菹',strokes:12}),null)
assert.equal(review.progressiveFramesApproved,0)
assert.equal(review.progressiveReviewPassed,false)
let engineChecked=false
if(process.argv.includes('--engine')){
 const codes={}
 for(const[file,hash]of Object.entries(proof.engineHashes)){const r=await fetch('https://raw.githubusercontent.com/kamichikoichi/kage-engine/'+proof.engineRevision+'/'+file,{signal:AbortSignal.timeout(20000)});assert(r.ok);const c=await r.text();assert.equal(sha(c),hash);codes[file]=c}
 const ctx=vm.createContext({records:source.records,root:source.root})
 for(const c of Object.values(codes))vm.runInContext(c,ctx,{timeout:1000})
 const original=readFileSync(new URL('../hanja-goal-glyphwiki-batch242-2026-10-04/verify.mjs',import.meta.url),'utf8')
 const start=original.indexOf('vm.runInContext(`const resolve='),end=original.indexOf('`,ctx,{timeout:2000})',start)+'`,ctx,{timeout:2000})'.length
 assert(start>=0&&end>start)
 const actual=JSON.parse(new Function('vm','ctx','return '+original.slice(start,end))(vm,ctx))
 assert.deepEqual(actual.groups,proof.groups);assert.deepEqual(actual.trace,trace);assert.deepEqual(actual.defaults,proof.defaults)
 engineChecked=true
}
console.log(JSON.stringify({passed:true,held:true,runtimeRegistered:0,sourceCaptureHashVerified:true,providerRecords:7,engineChecked,domesticReviewed:12,progressiveFramesApproved:0,gaps,privateMediaSaved:false}))
