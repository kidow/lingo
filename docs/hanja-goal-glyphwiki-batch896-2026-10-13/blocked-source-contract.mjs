// Blocked source-only contract; preserves original gap and prior native hold.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
export const sourceRoot='u8fed'
export const sourceProofFile='./engine-whole-u8fed.json'
export const sourceProofFileSha256='7b3052e0508730fb029b881ba9bdb6fac298c2f2a0df0bb195ccdcc1f8e63b53'
export const selectedProofIdentity=Object.freeze({sourceRoot,sourceProofFile,sourceProofFileSha256})
export const blockedReason='prior-domestic9-continuous-boundary-original-gap-minus2-minus2-remains'
export const nativeApproved=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole identity required')
 const bytes=readFileSync(new URL(sourceProofFile,import.meta.url))
 assert.equal(createHash('sha256').update(bytes).digest('hex'),sourceProofFileSha256)
 const original=JSON.parse(bytes)
 assert.deepEqual(proof,original,'All original engine header, preset, trajectories and polygons immutable')
 assert.deepEqual(trace,original.trace)
 const last=trace[3].at(-1),end=last.args.slice(last.kind==='cdDrawLine'?2:last.kind==='cdDrawCurve'?4:6,last.kind==='cdDrawLine'?4:last.kind==='cdDrawCurve'?6:8),start=trace[4][0].args.slice(0,2)
 assert.deepEqual(end,[55,151]);assert.deepEqual(start,[53,149])
 assert.deepEqual(start.map((v,i)=>v-end[i]),[-2,-2])
 for(let i=0;i<trace.length;i++)assert.deepEqual(trace[i].flatMap(c=>c.polygons),proof.groups[i].polygons)
 const error=new Error(blockedReason);error.code='HANJA_SOURCE_CANDIDATE_BLOCKED';throw error
}
