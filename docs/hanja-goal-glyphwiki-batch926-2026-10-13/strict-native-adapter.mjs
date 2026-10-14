import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as originalCompiler from './progressive.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const sha=value=>createHash('sha256').update(value).digest('hex')
export const sourceRoot="u63e5"
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u63e5","sourceProofFile":"engine-whole-u63e5.json","sourceProofFileSha256":"c409428d268f1f0f60f00b9b4dc2d8f24c6f1692e24e03820f936dfa89cb6550","sourceHeaderFile":"engine-proof.json","sourceHeaderFileSha256":"c00171b9e4075f1b0fc96e350ef3cccb0d98cfaa09361dfc3cafec68d5a1eb81"})
export const sourceGroups=Object.freeze([[0],[1],[2],[3],[4],[5],[6],[7],[8,9],[10],[11,12],[13]].map(g=>Object.freeze(g)))
export const blockedReason=null
const fullProofSHA256="0636305d5ab60ae739794bf2b9a58a9147e05bdae8f2f568fca28c81e9899ec5"
export function compileProgressive(trace,proof,identity) {
  assert.deepEqual(identity,selectedProofIdentity,'Explicit whole root/file/body SHA/header SHA is required')
  assert.equal(sha(readFileSync(new URL(identity.sourceProofFile,import.meta.url))),identity.sourceProofFileSha256)
  assert.equal(sha(readFileSync(new URL(identity.sourceHeaderFile,import.meta.url))),identity.sourceHeaderFileSha256)
  assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
  assert.equal(sha(JSON.stringify(proof)),fullProofSHA256,'Complete original body, defaults and 8-engine header are fixed')
  assert.deepEqual(trace,proof.trace,'Argument trace and all original polygons are fixed')
  assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),"54d229a9e9ac16b1b7e83efcd6f5ee1040815d2cbacf773b1c96d367b95c2250",'Original compiler remains unchanged')
  assert.deepEqual(originalCompiler.sourceGroups,sourceGroups)
  assert(sourceGroups.every(g=>g.every((raw,i)=>i===0||raw===g[i-1]+1)),'No nonconsecutive enclosure count fitting')
  const before=JSON.stringify(proof)
  const strokes=originalCompiler.compileProgressive(trace,proof,{"root":"u63e5","file":"engine-whole-u63e5.json","fileSHA256":"c409428d268f1f0f60f00b9b4dc2d8f24c6f1692e24e03820f936dfa89cb6550"})
  assert.equal(JSON.stringify(proof),before)
  assert.equal(sha(JSON.stringify(strokes)),"ef7754370b859689368c1f6597e03b56bdac0f4ccfc398ec2fb8ba44e880f880",'All original masks, coordinates, paths, widths, bounds and weights are unchanged')
  return strokes
}
export const nativeApproval=false
export const runtimeApplied=false
