
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const CANDIDATE_SHA = "6efbe93671e7c8c0154714f5f665259f45c5003b0ee7c819cc25937ce177ef85"
const EXPECTED = {"u9863":{"root":"u9863","compiledSHA256":"66471ae61492b6da9c2c6f7b1fc486c5cdbe07c08c877139b53839d16ed99a64","pens":20,"masks":22}}
export const selectedProofIdentity=candidate.selectedProofIdentity
export const sourceRoot=candidate.sourceRoot
export const sourceProofFile=candidate.sourceProofFile
export const sourceWholeFileSHA256=candidate.sourceWholeFileSHA256
export const sourceGroups=candidate.sourceGroups
export const candidateWholeProofs=candidate.candidateWholeProofs
export const buildSourceProof=candidate.buildSourceProof
export const nativeApproval=false
export const runtimeApplied=false
export function compileProgressive(trace,proof,identity){
 assert.equal(hash(readFileSync(new URL('progressive-terminal15-candidate.mjs',import.meta.url))),CANDIDATE_SHA)
 assert(identity&&Object.hasOwn(EXPECTED,identity.sourceRoot),'Exact supported whole identity required')
 const before=JSON.stringify(proof),strokes=candidate.compileProgressive(trace,proof,identity),expected=EXPECTED[identity.sourceRoot]
 assert.equal(JSON.stringify(proof),before)
 assert.equal(strokes.length,expected.pens)
 assert.equal(strokes.flat().length,expected.masks)
 assert.equal(hash(JSON.stringify(strokes)),expected.compiledSHA256,'Complete original-only candidate masks')
 return strokes
}
export function compileSourceWhole(root,trace,proof,identity){
 assert(identity&&root===identity.sourceRoot,'Explicit root and file identity must agree')
 return compileProgressive(trace,proof,identity)
}

