import assert from 'node:assert/strict'
import{readFileSync}from'node:fs'
import{createHash}from'node:crypto'
const root=new URL('../../',import.meta.url)
const report=JSON.parse(readFileSync(new URL('./unchanged-body-hold.json',import.meta.url)))
const hash=b=>createHash('sha256').update(b).digest('hex')
const read=entry=>{const b=readFileSync(new URL(entry.path,root));assert.equal(hash(b),entry.SHA256);return JSON.parse(b)}
const old=read(report.oldFull),fresh=read(report.newFull),native=read(report.priorNative)
const body=full=>full.groups.slice(4).map(g=>({raw:g.raw,polygons:g.polygons.map(p=>p.map(v=>[v.x,v.y,v.off]))}))
assert.equal(old.groups.length,15);assert.equal(fresh.groups.length,15)
assert.deepEqual(body(old),body(fresh));assert.equal(hash(JSON.stringify(body(fresh))),report.bodySHA256)
const changed=old.groups.flatMap((g,i)=>JSON.stringify(g.polygons.map(p=>p.map(v=>[v.x,v.y,v.off])))===JSON.stringify(fresh.groups[i].polygons.map(p=>p.map(v=>[v.x,v.y,v.off])))?[]:[i+1])
assert.deepEqual(changed,[1,2,3,4])
const v=fresh.groups[11].raw,h=fresh.groups[12].raw
assert.equal(v[0],1);assert.equal(h[0],1);assert.equal(v[3],v[5]);assert.equal(h[4],h[6]);assert.equal(v[6],h[4]);assert(v[5]>=Math.min(h[3],h[5])&&v[5]<=Math.max(h[3],h[5]))
const entries=Object.entries(report.originalInputs).map(([path,SHA256])=>read({path,SHA256}))
assert.deepEqual(Object.fromEntries(['url','bytes','sha256'].map(k=>[k,entries[0].dictionary[k]])),report.originalSVG)
assert.deepEqual(Object.fromEntries(['url','bytes','sha256'].map(k=>[k,entries[1].domestic[k]])),report.originalSVG)
assert.equal(native.observations.families.find(x=>x.root==='u5ac2-g').compatible,false)
assert.equal(report.runs.newWholeObservations,0);assert.equal(report.runtimeApplied,false)
console.log(JSON.stringify({bodyRaw5to15Exact:true,changedFemaleRaw:changed,priorDirectBodyCounterexampleReused:true,originalSVGPinSame:true,newWhole:0,engine:0,sourceProjection:0}))
