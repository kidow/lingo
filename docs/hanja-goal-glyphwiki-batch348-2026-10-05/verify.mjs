import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {hanjaStrokeData} from '../../lib/hanja-strokes.ts'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url),'utf8'))
const sha=b=>createHash('sha256').update(b).digest('hex')
const source=read('./sources.json'),proof=read('./engine-proof.json'),trace=read('./draw-trace.json'),metadata=read('./metadata.json')
assert.equal(sha(readFileSync(new URL('./sources.json',import.meta.url))),"5d36e2298d155ca0d4843c04324ea7f21cc69cbc4e40f6024584056214fce578")
assert.equal(source.root,'u6726-ue0102')
assert.equal(Object.keys(source.records).length,10)
assert.equal(source.providerVersions.length,7)
for(const v of source.providerVersions){assert.equal(v.data,source.records[v.name].data);assert.equal(sha(v.data),v.sha256)}
for(const r of Object.values(source.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(source.records[row.split(':')[7]],'declared dependency missing')
assert.deepEqual(source.aliases,[])
assert.equal(Object.keys(proof.engineHashes).length,8)
assert.equal(proof.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f')
assert.equal(proof.groups.length,21);assert.equal(trace.flat().length,24)
assert.equal(trace.flat().filter(c=>c.kind==='cdDrawCurve').length,11)
for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
assert.deepEqual(metadata.sourceGroups.flat().sort((a,b)=>a-b),Array.from({length:21},(_,i)=>i))
const cap=trace[14][0],body=trace[15][0]
assert.deepEqual(cap.args,[124.02000000000002,100.262619,134.98000000000002,100.262619,2,2])
assert.deepEqual(body.args,[128.815,100.262619,115.8,116.29988640000002,74.7,131.6081871,132,7])
assert.notDeepEqual(cap.args.slice(2,4),body.args.slice(0,2))
assert.equal(hanjaStrokeData({glyph:'朦',strokes:18}),null)
assert.equal(read('./whole-source-inventory.json').wholeNames.length,10)
console.log(JSON.stringify({passed:true,sourceHashVerified:true,records:10,history:7,pinnedEngineFiles:8,rawGroups:21,drawingPrimitives:24,Q:11,pen13OriginalTrajectoryGap:true,runtimeRegistered:false,privateMediaSaved:false}))
