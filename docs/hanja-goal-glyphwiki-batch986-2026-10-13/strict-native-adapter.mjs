import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u70b0","sourceProofFile":"engine-whole-u70b0.json","sourceProofFileSha256":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze([[0],[1,2],[3,4],[5],[6],[7],[8],[9],[10]].map(g=>Object.freeze(g)))
export const blockedReason=null
export function compileProgressive(trace,proof,identity){
 assert.deepEqual(identity,selectedProofIdentity,'Exact original whole/header identity is required')
 assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
 assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),"253bb7c9de58bf4252045b40b2e6cceddb4badbd3d6c611682506a6a7d76743c")
 assert.deepEqual(trace,proof.trace)
 assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"f9e82549e16dcfd93c79489affc2c675fa93388800e91c6457fd9b6dca23d178")
 assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
 assert(sourceGroups.every(g=>g.every((v,i)=>i===0||v===g[i-1]+1)),'Nonconsecutive enclosure number fitting is blocked')
 const before=JSON.stringify(proof),strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u70b0","file":"engine-whole-u70b0.json","fileSHA256":"f00703bb86224068e9b1811dfcbb868e27be0152c4e0bc873b77f6179bce8ae8"})
 assert.equal(JSON.stringify(proof),before)
 assert.equal(sha(JSON.stringify(strokes)),"e008042921ebb3d819d42d647ec2095b3ca6882646cabb82cbf8823016515e8b",'Original masks, bounds, weights, paths and widths are unchanged')
 return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
