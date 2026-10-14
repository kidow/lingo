// Source-only complete-mask permutation requested after parent native direction review.
// Original authored geometry and the original compiler remain byte unchanged.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
export const sourceOrderPermutation=Object.freeze([1,2,4,3,5,6,7,9,10,11,8,12])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export const sourceGroupsByWhole=Object.freeze({[original.sourceRoot]:sourceGroups})
export const approvalStatus='source-only-parent-observed-order-candidate-native-replay-pending'
export const nativeApproval=false
export const runtimeApplied=false
export function compileSourceWhole(root,trace,proof,fileIdentity){
 assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),'e0a5fd78a241c9e5cabb6ac17b3764dd08a7e55056d2120bfaeb6e25d104fa44','Original compiler stays fixed')
 assert.equal(root,original.sourceRoot)
 assert(fileIdentity,'Explicit original root/file/fileSHA256 identity is required')
 const before=JSON.stringify(proof),beforeTrace=JSON.stringify(trace)
 const masks=original.compileSourceWhole(root,trace,proof,fileIdentity)
 assert.equal(masks.length,12)
 assert(masks.every(pen=>pen.length===1),'Only complete original singleton mask pens are permuted')
 const reordered=sourceOrderPermutation.map(n=>masks[n-1])
 assert.deepEqual(reordered.map(p=>hash(JSON.stringify(p))),sourceOrderPermutation.map(n=>hash(JSON.stringify(masks[n-1]))),'Complete original pen/mask bytes are only permuted')
 assert.equal(JSON.stringify(proof),before)
 assert.equal(JSON.stringify(trace),beforeTrace)
 return reordered
}
export function compileProgressive(trace,proof,fileIdentity){
 return compileSourceWhole(original.sourceRoot,trace,proof,fileIdentity)
}

