import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const ORIGINAL_COMPILER_SHA256="2e931cdafc6ae029de7987bcf6d309f72a9329cf4feeadac3834a81ebb96def2"
assert.equal(sha(readFileSync(new URL('./progressive.mjs',import.meta.url))),ORIGINAL_COMPILER_SHA256)
export const sourceOrderPermutation=Object.freeze([2,3,1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileProgressive(trace,proof){
 const before=JSON.stringify({trace,proof})
 const base=original.compileProgressive(trace,proof)
 assert.equal(base.length,18)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1))
 assert.equal(out.reduce((n,p)=>n+p.length,0),18)
 for(let i=0;i<18;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof}),before)
 return out
}
export const nativeApproval=false
export const runtimeApplied=false
