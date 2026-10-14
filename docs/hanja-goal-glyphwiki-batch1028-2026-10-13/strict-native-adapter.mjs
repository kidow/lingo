import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u76a5","sourceProofFile":"engine-whole-u76a5.json","sourceProofFileSha256":"a3bac1b126c196d18e55ffe821152479b936b6ff76d5ed09e655bd741c7d5330","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"a3bac1b126c196d18e55ffe821152479b936b6ff76d5ed09e655bd741c7d5330"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1],[2,3],[4],[5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Explicit selected whole/header identity is mandatory')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"e92ed1c4b1048caa38a324e22dc4191e6579a98f2750fdc120f16e1a92de3b0f",'Entire original body, defaults and engine header are immutable')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"fa815f800df516775aa7dcbedf85c46f399963bc666b64895f6d4207db5ed8b7")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u76a5","file":"engine-whole-u76a5.json","fileSHA256":"a3bac1b126c196d18e55ffe821152479b936b6ff76d5ed09e655bd741c7d5330"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"5acd3f87b4df6a9d56cbb5453e2ef05d0d44d9262dfcff342c4d506964d53c96",'Every original complete mask is unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
