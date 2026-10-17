import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u794a","sourceProofFile":"./engine-whole-u794a.json","sourceProofFileSha256":"0943bb1ae686032ce63caf815dfc6100983a00ca2220a9713ae5269f95eb86b4","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"b03d16a9988456b6d2fbcd989951dc44fb15d9de88d10098181e17a51b07c458"})
export const selectedOuterIdentity=Object.freeze({"root":"u794a","sourceProofFile":"engine-whole-u794a.json","sourceProofFileSHA256":"0943bb1ae686032ce63caf815dfc6100983a00ca2220a9713ae5269f95eb86b4","engineHeaderSHA256":"b03d16a9988456b6d2fbcd989951dc44fb15d9de88d10098181e17a51b07c458","sourceFileSHA256":"c052f50abba68a194e8f64f7619702a987040fda93e39f60b6a151f083c1f44d","compilerFileSHA256":"e4fea1657932e3d468d2ef5a9df7626b0c918be41767e770bdaa7f68429aaba9"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
assert.deepEqual(original.selectedProofIdentity,selectedProofIdentity,'Exact original inner5 casing and ./ prefixes')
for(const[file,pin]of Object.entries({'progressive.mjs':selectedOuterIdentity.compilerFileSHA256,'engine-proof.json':selectedOuterIdentity.engineHeaderSHA256,'sources.json':selectedOuterIdentity.sourceFileSHA256,[selectedOuterIdentity.sourceProofFile]:selectedOuterIdentity.sourceProofFileSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Original source/header/compiler bytes')
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'All three explicit arguments are required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact five-field inner identity, lowercase Sha256 and ./ prefixes')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'8a023d1d677d5e4226eec041b7890782e268658b47dce598055eaa30eaf664a8','Complete full5 original proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,9);assert.equal(out.flat().length,10)
 assert.equal(sha(JSON.stringify(out)),'7b4449028143124303cc7742f688f7cfd3fa40a58eb86b1f48ab57fd663f9f72','Original complete masks unchanged')
 return out
}
export function compileSourceWhole(root,trace,proof,identity){
 assert.equal(arguments.length,4,'All four explicit arguments are required')
 assert(identity);assert.equal(root,identity.sourceRoot)
 return compileProgressive(trace,proof,identity)
}
export function compileWithOuterIdentity(trace,proof,identity){
 assert.equal(arguments.length,3,'Explicit outer-six identity is required')
 assert.deepEqual(identity,selectedOuterIdentity,'Exact original outer6 identity with uppercase SHA256')
 return compileProgressive(trace,proof,selectedProofIdentity)
}
export const nativeApproval=false
export const runtimeApplied=false
