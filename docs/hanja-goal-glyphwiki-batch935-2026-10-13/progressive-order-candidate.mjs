// Source-only complete original-mask permutation requested after parent native direction review.
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,16,19])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>original.sourceGroups[n-1]))
export const approvalStatus='source-only-parent-observed-order-candidate-native-review-pending'
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof){
 assert.equal(hash(readFileSync(new URL('./progressive.mjs',import.meta.url))),'41bf88a6f0dc6d23f548245776c44d1e2b4e09f2e04401681d55ad3e22565ab2','Original compiler remains fixed')
 const before=JSON.stringify(proof),beforeTrace=JSON.stringify(trace)
 const old=original.compileProgressive(trace,proof)
 assert.equal(old.length,19);assert.equal(old.flat().length,20)
 const reordered=sourceOrderPermutation.map(n=>old[n-1])
 assert.deepEqual(reordered.map(p=>hash(JSON.stringify(p))),sourceOrderPermutation.map(n=>hash(JSON.stringify(old[n-1]))),'Complete original masks only permuted')
 assert.deepEqual(reordered[6],old[6],'Original same-pen7 body/lefttail weights and boundaries unchanged')
 assert.equal(JSON.stringify(proof),before);assert.equal(JSON.stringify(trace),beforeTrace)
 return reordered
}

