import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u8743"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8743","sourceProofFile":"engine-whole-u8743.json","sourceProofFileSha256":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"2a7e21a81429e32455cc6749d8ad2d5c6a34950608289d2bc87ff7b58fdd0dcd"})
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7,8],[9],[10,11],[12],[13,14],[15],[16,17],[18]].map(g=>Object.freeze(g)))
export const blockedReason=null
const fullProofSHA256="84634608e382bea1da0938fcaa33276ded246abdfb34e1263d228f51318e1c19"
export function compileProgressive(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit whole root/file/body SHA/header SHA is required')
  assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
  assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original body, defaults and 8-engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Argument trace and all original polygons are fixed')
  assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"ee83c094984201cf44e713ebaa93567e768c54aca6ed87d3f8d0f9757af35aa8",'Original compiler remains unchanged')
  assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
  assert(sourceGroups.every(g=>g.every((raw,i)=>i===0||raw===g[i-1]+1)),'No nonconsecutive enclosure count fitting')
  const before=JSON.stringify(proof)
  const strokes=originalCompiler.compileProgressive(trace,proof,undefined)
  assert.equal(JSON.stringify(proof),before)
  assert.equal(sha(JSON.stringify(strokes)),"1c83f0df4bcb0a6b07f3a31528cb37c7a31ab61a1d8347882fbb93d6dc9063fa",'All original masks, coordinates, paths, widths, bounds and weights are unchanged')
  return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
