
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as candidate from './progressive-terminal15-candidate.mjs'
export {renderProgressive} from '../hanja-goal-glyphwiki-batch43-2026-09-22/progressive.mjs'
const hash=x=>createHash('sha256').update(x).digest('hex')
const CANDIDATE_SHA = "20c6bc65cb215271c65ea60f62081f81f4cc6ed06d2fc9b47ce7cf6a735fbb07"
const EXPECTED = {"u9a56":{"root":"u9a56","compiledSHA256":"6a5110d09873e0d83dda15b185641ca78f886c8b6ab442b97672191b53ee5759","pens":23,"masks":25}}
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

