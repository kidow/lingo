
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const CANDIDATE_SHA = "9a2797e9dbca6c851d62021c873567db9dd51c4914f86e8ce47e0e315563e2bc"
const EXPECTED = {"u993c":{"root":"u993c","compiledSHA256":"bf3c532c6371c4d202695c3153baa8170741769f3afc1146727247cca26a78ab","pens":19,"masks":20},"u993c-ue0100":{"root":"u993c-ue0100","compiledSHA256":"5b8794f8fd52096deb542929703a611344967664ce3935991a5f06203d9805fe","pens":19,"masks":20},"u993c-ue0101":{"root":"u993c-ue0101","compiledSHA256":"5b8794f8fd52096deb542929703a611344967664ce3935991a5f06203d9805fe","pens":19,"masks":20},"u993c-ue0102":{"root":"u993c-ue0102","compiledSHA256":"d102baf14ffb8d2640875be7119d1621d61d3ed127123425a9616eb11257e09a","pens":19,"masks":20}}
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

