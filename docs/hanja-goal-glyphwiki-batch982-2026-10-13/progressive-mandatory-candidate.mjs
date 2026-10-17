import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u8cb6","sourceProofFile":"./engine-whole-u8cb6.json","sourceProofFileSha256":"488c0f134823ad7a00cdf89d9a4f41d8cbbba770292da49d09b9fa895e16d05e","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"c6d079d7a0abab8e2ffccbb85fc26cf57ce9112e47fea0c6b32bcc1918fec3d1"})
export const selectedOuterIdentity=Object.freeze({"root":"u8cb6","sourceProofFile":"engine-whole-u8cb6.json","sourceProofFileSHA256":"488c0f134823ad7a00cdf89d9a4f41d8cbbba770292da49d09b9fa895e16d05e","engineHeaderSHA256":"c6d079d7a0abab8e2ffccbb85fc26cf57ce9112e47fea0c6b32bcc1918fec3d1","sourceFileSHA256":"062932cc003a13dacd36a66fd7c51b920f4826f26acb4ed6734eace780d3f6bc","compilerFileSHA256":"8aa92d8cc6d3ef1cca539da68fb54d35ce9832d988ad861d93faea295d6e64cc"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
assert.deepEqual(original.selectedProofIdentity,selectedProofIdentity,'Exact original inner5 casing and ./ prefixes')
for(const[file,pin]of Object.entries({'progressive.mjs':selectedOuterIdentity.compilerFileSHA256,'engine-proof.json':selectedOuterIdentity.engineHeaderSHA256,'sources.json':selectedOuterIdentity.sourceFileSHA256,[selectedOuterIdentity.sourceProofFile]:selectedOuterIdentity.sourceProofFileSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Original source/header/compiler bytes')
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'All three explicit arguments are required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact five-field inner identity, lowercase Sha256 and ./ prefixes')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'763098d1fd7fa9aa70fb0215d7c8101f13edc2c62afde3c379c42038d978d1bb','Complete full5 original proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,12);assert.equal(out.flat().length,12)
 assert.equal(sha(JSON.stringify(out)),'a1e7a486ffefd53f8d21eceea77dd3516316c1e27dfe6e1a8dcf42c3d4490231','Original complete masks unchanged')
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
