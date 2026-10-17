import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-native-adapter.mjs'
export * from './strict-native-adapter.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('./strict-native-adapter.mjs',import.meta.url))),"9f0f4d5b9f9ff096e204e474e745813962ca43b3583469d7af17291252fc5a24",'Original strict adapter bytes')
export const sourceOrderPermutation=Object.freeze([1,2,4,3,5,6,7,8,9,11,10,12])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileProgressive(trace,proof,identity){
 const before=JSON.stringify({trace,proof,identity})
 const base=original.compileProgressive(trace,proof,identity)
 assert.equal(base.length,12)
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:12},(_,i)=>i+1))
 assert.equal(out.flat().length,12)
 for(let i=0;i<12;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(JSON.stringify({trace,proof,identity}),before)
 return out
}
export const nativeApproval=false
export const runtimeApplied=false
