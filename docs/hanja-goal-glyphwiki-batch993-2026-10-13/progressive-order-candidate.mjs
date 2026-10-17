import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as base from './strict-source-candidate.mjs'
export {selectedProofIdentity,selectedOuterIdentity,sourceRoot,renderProgressive} from './strict-source-candidate.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
assert.equal(sha(readFileSync(new URL('strict-source-candidate.mjs',import.meta.url))),'4a30b3615b6764ad981e797fc3162f71939c2b339c952c8037ad3cf50b7e00ce')
assert.equal(sha(readFileSync(new URL('strict-source-preparation.json',import.meta.url))),'c7bd5e6da141fd542a1f23f5902df86d88d65ed119a874216f56b9d45464867b')
export const sourceOrderPermutation=Object.freeze([1,2,3,4,6,7,8,9,5,10,11,12,20,13,14,15,16,17,18,19])
export const sourceGroups=Object.freeze(sourceOrderPermutation.map(n=>Object.freeze([...base.sourceGroups[n-1]])))
export function compileProgressive(trace,proof,identity){assert.equal(arguments.length,3);const before=JSON.stringify(proof),original=base.compileProgressive(trace,proof,identity);assert.equal(sha(JSON.stringify(original)),'e8235e294f9240bb46b6ac0c771dc05fd23513ea3813ba1b9747fece1374dbb6');assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:20},(_,i)=>i+1));const out=sourceOrderPermutation.map(n=>original[n-1]);for(let i=0;i<20;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(original[sourceOrderPermutation[i]-1])));assert.equal(out.length,20);assert.equal(out.flat().length,20);assert.equal(JSON.stringify(proof),before);return out}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4);assert.equal(root,base.sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,base.selectedOuterIdentity);return compileProgressive(trace,proof,base.selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
