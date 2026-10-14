import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u757d","sourceProofFile":"engine-whole-u757d.json","sourceProofFileSha256":"3af3b640106536e880d70516a9e5ae3b7e0ad6b1f91e802896d653d903918778","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"6dda7004316fccca44ab4e6e1e3babf27e0a27dd7fddf90dec96f08270a26a7c"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9,10],[11],[12],[13],[14],[15]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact whole file/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"37b0d1b375dc0d3b28b9b883ed2895ffd86076395a76922222ea01e763c5f4f0",'Complete original geometry and engine header are pinned')
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"7bce26ae84a94cd3621e8f5c0d1a51d89204c046ac37ac3321e2a395024765cb")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is not allowed')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof)
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"64a8e6c1f75c5098d55c3079605486c90f5ba0b1741f59097e6bf85423724b8a",'All original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
