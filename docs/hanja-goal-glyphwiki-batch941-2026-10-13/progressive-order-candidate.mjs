import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const ORIGINAL_COMPILER_SHA256="d98d39f2b2a5954b026ad0b01f1a5344ce804192587b304aa2321c9c5a6e8b3e"
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),ORIGINAL_COMPILER_SHA256)
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,10,9,11,12,13,14,15,16])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileProgressive(trace,proof){
 const before=JSON.stringify({trace,proof})
 const base=original.compileProgressive(trace,proof)
 assert.equal(base.length,16)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.equal(out.reduce((n,p)=>n+p.length,0),16)
 for(let i=0;i<16;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof}),before)
 return out
}
export const nativeApproval=false
export const runtimeApplied=false
