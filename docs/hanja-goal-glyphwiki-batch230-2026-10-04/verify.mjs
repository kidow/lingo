import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
const read=n=>JSON.parse(readFileSync(new URL(n,import.meta.url)))
const source=read('sources.json'),engine=read('engine-proof.json'),trace=read('draw-trace.json'),findings=read('findings.json'),alternatives=read('alternatives.json')
const h=x=>createHash('sha256').update(x).digest('hex')
assert.equal(h(readFileSync(new URL('sources.json',import.meta.url))),'6b7558acb77d48559259be1bff3728ce99c6f50dd991eb797005b7f94ca77a87')
assert.equal(source.root,'u98e1-k')
assert.equal(Object.keys(source.records).length,4)
for(const s of [source,...alternatives]){assert.deepEqual(s.missing,[]);for(const r of Object.values(s.records))for(const row of r.data.split('$'))if(row.startsWith('99:'))assert(s.records[row.split(':')[7]])}
assert.equal(engine.engineRevision,'49232bac0348fe815f4200d4116ab7917e0db47f')
assert.equal(Object.keys(engine.engineHashes).length,8)
assert.equal(engine.groups.length,14)
assert.equal(trace.length,14)
assert.equal(trace.flat().length,14)
for(let i=0;i<14;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),engine.groups[i].polygons)
assert.deepEqual(findings.domesticReview.groups,[[0],[1,2],[3],[4],[5],[6,7],[8],[9],[10,11],[12],[13]])
for(const x of findings.originalJunctions){const p=trace[x.fromRawGroup].at(-1),n=trace[x.toRawGroup][0],end=p.args.slice(p.kind==='cdDrawLine'?2:4,p.kind==='cdDrawLine'?4:6),start=n.args.slice(0,2);assert.deepEqual(end,x.end);assert.deepEqual(start,x.start);assert.equal(Math.hypot(end[0]-start[0],end[1]-start[1]),x.gap);assert.equal(JSON.stringify(end)===JSON.stringify(start),x.continuous)}
assert.deepEqual(findings.originalJunctions.filter(x=>!x.continuous).map(x=>x.domesticStroke),[2,9])
assert.deepEqual(trace[1][0].args,[15.325,120,41.975,144,37.875,177,7,8])
assert.deepEqual(trace[2][0].args,[30.7,139,48.125,116,75.8,56,2,7])
assert.deepEqual(trace[10][0].args,[92,82,92,173,12,32])
assert.deepEqual(trace[11][0].args,[70.625,183,103.25,171,135.875,158,0,7])
assert.equal(alternatives.length,3)
for(const s of alternatives)for(const name of ['u98e1','u51ab-01','u98df-k02'])assert.equal(s.records[name].data,source.records[name].data)
assert.equal(read('metadata.json').dictionary.sha256,'71f3520e4b8730df9920acfbb98f3030a866a8839e08bea4b38df5fc609d394f')
assert.equal(findings.runtimeAdded,0)
assert.equal(findings.domesticReview.fullAnimationApproved,false)
console.log(JSON.stringify({passed:true,runtimeAdded:0,exactSourceClosure:true,alternativeWholeRoots:3,originalJunctions:findings.originalJunctions,privateMediaSaved:false}))
