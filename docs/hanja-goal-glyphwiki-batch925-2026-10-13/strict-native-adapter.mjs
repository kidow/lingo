import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u9046-g"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u9046-g","sourceProofFile":"engine-whole-u9046-g.json","sourceProofFileSha256":"422f0241f3258bae0ede99f352491a433ac76644a43755893de16653c3aa39c9","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"86382f11953e50bb90ac2761136c8e35515df6811d6ad724917a6406a3b925aa"})
export const sourceGroups=Object.freeze([[0],[1,2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13,14],[15]].map(g=>Object.freeze(g)))
export const blockedReason=null
const fullProofSHA256="5aa49c5e1937457cd35f551ebea938da692c9fb0f778de77bf745e15f9b0bf77"
export function compileProgressive(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit whole root/file/body SHA/header SHA is required')
  assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
  assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original body, defaults and 8-engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Argument trace and all original polygons are fixed')
  assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"77f3da4814dcdc3ba09bd913973be3f849bedc737a973d10eecf2ca38078e14c",'Original compiler remains unchanged')
  assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
  assert(sourceGroups.every(g=>g.every((raw,i)=>i===0||raw===g[i-1]+1)),'No nonconsecutive enclosure count fitting')
  const before=JSON.stringify(proof)
  const strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u9046-g","file":"engine-whole-u9046-g.json","fileSHA256":"422f0241f3258bae0ede99f352491a433ac76644a43755893de16653c3aa39c9"})
  assert.equal(JSON.stringify(proof),before)
  assert.equal(sha(JSON.stringify(strokes)),"2d9f12cb574b1f4bc11c7bb9100c3e231d5df0646a3093c2a73d1c33a5ef4a00",'All original masks, coordinates, paths, widths, bounds and weights are unchanged')
  return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
