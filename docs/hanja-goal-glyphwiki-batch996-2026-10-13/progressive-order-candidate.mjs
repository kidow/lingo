import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex')
const PROFILES={"u506a":{"identity":{"sourceRoot":"u506a","sourceProofFile":"./engine-whole-u506a.json","sourceProofFileSha256":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38"},"fullProofSHA256":"eb0185e5d2cf757d7b246e5ff994a5ee75d2a8a8faee773dc77dc4ad89a3a2fa","originalCompiledSHA256":"ecaac486087a887c8f1a736010c1122461e7c1adb4139fb3e5b98945a5615ce9","originalSourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13]],"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[12],[11],[13]],"compiledSHA256":"364d689e33ead173c415e37bf9075b6a55b11a993da695cc149ab174c28ee3b0"},"u506a-ue0100":{"identity":{"sourceRoot":"u506a-ue0100","sourceProofFile":"./engine-whole-u506a-ue0100.json","sourceProofFileSha256":"2c1558cc69e18fbcd23a7e04026150142543687be1c05f5b0646e84ad1cf1d78","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"92fdafc3d0572dd22e2daafba2a718bc055d61b2b8e6dd56d47f863725c992a0","sourceMetadataFile":"./sources.json","sourceMetadataFileSha256":"e9676e69d3353367984b78fa3bac20186eac3c6d0d7a54a7acb809aadd3abe38"},"fullProofSHA256":"eb0185e5d2cf757d7b246e5ff994a5ee75d2a8a8faee773dc77dc4ad89a3a2fa","originalCompiledSHA256":"ecaac486087a887c8f1a736010c1122461e7c1adb4139fb3e5b98945a5615ce9","originalSourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[11],[12],[13]],"sourceGroups":[[0],[1,2],[3],[4],[5,6],[7],[8],[9,10],[12],[11],[13]],"compiledSHA256":"364d689e33ead173c415e37bf9075b6a55b11a993da695cc149ab174c28ee3b0"}}
export const sourceRoot='u506a'
export const selectedProofIdentity=Object.freeze(PROFILES[sourceRoot].identity)
export const sourceOrderPermutation=Object.freeze([1,2,3,4,5,6,7,8,10,9,11])
export const sourceGroups=Object.freeze(PROFILES[sourceRoot].sourceGroups.map(g=>Object.freeze([...g])))
export const candidateWholeProofs=Object.freeze(Object.entries(PROFILES).map(([root,p])=>Object.freeze({identity:Object.freeze({...p.identity}),sourceGroups:Object.freeze(p.sourceGroups.map(g=>Object.freeze([...g])))})))
assert.equal(sha(readFileSync(new URL('progressive.mjs',import.meta.url))),'e798ddf15dd133fb11601b1702d22b0ccc5bcbe84d7cd42bd9a4fb6a9629c3a8')
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit original identity7 is mandatory');assert(identity&&Object.hasOwn(PROFILES,identity.sourceRoot),'Only pinned original whole profiles');const profile=PROFILES[identity.sourceRoot]
 assert.deepEqual(identity,profile.identity,'Exact source/header/metadata identity7 with ./ and lowercase Sha256')
 for(const [file,pin]of [[identity.sourceProofFile,identity.sourceProofFileSha256],[identity.sourceHeaderFile,identity.sourceHeaderFileSha256],[identity.sourceMetadataFile,identity.sourceMetadataFileSha256]])assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin)
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),profile.fullProofSHA256);assert.deepEqual(trace,proof.trace)
 const originalProfile=original.candidateWholeProofs.find(p=>p.identity.sourceRoot===identity.sourceRoot);assert(originalProfile);assert.deepEqual(originalProfile.identity,identity);assert.deepEqual(originalProfile.sourceGroups,profile.originalSourceGroups)
 const before=JSON.stringify(proof),base=original.compileSourceWhole(identity.sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(base)),profile.originalCompiledSHA256)
 assert.deepEqual([...sourceOrderPermutation].sort((a,b)=>a-b),Array.from({length:11},(_,i)=>i+1));const out=sourceOrderPermutation.map(n=>base[n-1]);for(let i=0;i<11;i++)assert.equal(sha(JSON.stringify(out[i])),sha(JSON.stringify(base[sourceOrderPermutation[i]-1])))
 assert.equal(out.length,11);assert.equal(out.flat().length,11);assert.equal(sha(JSON.stringify(out)),profile.compiledSHA256);assert.deepEqual(profile.sourceGroups[1],[1,2]);assert.equal(proof.trace[2].length,0);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'All four explicit arguments required');assert(identity&&identity.sourceRoot===root);return compileProgressive(trace,proof,identity)}
export const nativeApproval=false
export const runtimeApplied=false
