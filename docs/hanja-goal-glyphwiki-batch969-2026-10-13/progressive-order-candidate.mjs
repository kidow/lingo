import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './strict-native-adapter.mjs'
export * from './strict-native-adapter.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('./strict-native-adapter.mjs',import.meta.url))),'d9c6f5de72ae09fb8751126ccde4565c2d89a77c133d201302ae437dc10ec535','Original strict adapter bytes')
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,7,6,8,9,10,11,13,12,14,15,16,17,18])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,original.selectedProofIdentity,'Exact five-field identity casing and file prefix are required')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'87ce02d64cee7e4e29a789ba8a973ed87f701b3ebd009777ecf703e88cc07cdc','Complete original full5 proof remains pinned')
 const before=JSON.stringify({trace,proof,identity})
 const base=original.compileProgressive(trace,proof,identity)
 assert.equal(base.length,18)
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:18},(_,i)=>i+1))
 const out=sourceOrderPermutation.map(n=>base[n-1])
 assert.equal(out.flat().length,21)
 for(let i=0;i<18;i++)assert.deepEqual(out[i],base[sourceOrderPermutation[i]-1])
 assert.equal(JSON.stringify({trace,proof,identity}),before)
 return out
}
export const nativeApproval=false
export const runtimeApplied=false
