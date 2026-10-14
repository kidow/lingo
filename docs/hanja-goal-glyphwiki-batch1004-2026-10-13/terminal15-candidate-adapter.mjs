
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const CANDIDATE_SHA = "85b024f2793949db175f4dac1b9b343b9ae1203b9c9593995e0f750433d82288"
const EXPECTED = {"u8af4":{"root":"u8af4","compiledSHA256":"278f3fae8aaf65fec4a6ecdfc119c43abe779c14a17018ee9eb1e8c706befbf6","pens":16,"masks":17}}
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

