
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const CANDIDATE_SHA = "94026c85f62937e2414ad474c04efe7ddbdbf63e833b73a5d4d0f5abfa094d70"
const EXPECTED = {"u8337-k":{"root":"u8337-k","compiledSHA256":"e5d28cf49259607467dca1923daefeecfe1e3fd707cf615f58ac581fde63f2c2","pens":10,"masks":11},"u8337-ue0102":{"root":"u8337-ue0102","compiledSHA256":"e5d28cf49259607467dca1923daefeecfe1e3fd707cf615f58ac581fde63f2c2","pens":10,"masks":11}}
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

