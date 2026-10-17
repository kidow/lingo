import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export * from './progressive.mjs'
const sha=x=>createHash('sha256').update(x).digest('hex')
export const selectedProofIdentity=Object.freeze({"sourceRoot":"u5fa7-g","sourceProofFile":"./engine-whole-u5fa7-g.json","sourceProofFileSha256":"90b9b007c266cc38bb9a2e8bf5f8904c60c282c3a427f5a562924bbac47a26d0","sourceHeaderFile":"./engine-proof.json","sourceHeaderFileSha256":"65f407a46de41a235666d33630ca11f926f8a7d065c7a981fc9b941098625098"})
export const selectedOuterIdentity=Object.freeze({"root":"u5fa7-g","sourceProofFile":"engine-whole-u5fa7-g.json","sourceProofFileSHA256":"90b9b007c266cc38bb9a2e8bf5f8904c60c282c3a427f5a562924bbac47a26d0","engineHeaderSHA256":"65f407a46de41a235666d33630ca11f926f8a7d065c7a981fc9b941098625098","sourceFileSHA256":"3d2bbf1f286c0f8c153933f781a9734ce18b4e9b3b16dacdddb4090f5cec1d00","compilerFileSHA256":"470b36fcfd63c28981dc9ba05da8f6a5294ea605285bcff91fa215b1778f866f"})
export const sourceRoot=selectedProofIdentity.sourceRoot
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
assert.deepEqual(original.selectedProofIdentity,selectedProofIdentity,'Exact original inner5 casing and ./ prefixes')
for(const[file,pin]of Object.entries({'progressive.mjs':selectedOuterIdentity.compilerFileSHA256,'engine-proof.json':selectedOuterIdentity.engineHeaderSHA256,'sources.json':selectedOuterIdentity.sourceFileSHA256,[selectedOuterIdentity.sourceProofFile]:selectedOuterIdentity.sourceProofFileSHA256}))assert.equal(sha(readFileSync(new URL(file,import.meta.url))),pin,'Original source/header/compiler bytes')
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'All three explicit arguments are required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact five-field inner identity, lowercase Sha256 and ./ prefixes')
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'18600dfde11f1d680656bde3a929d1b2722d7dbe8d18a89524312d20b9fe743e','Complete full5 original proof')
 assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileProgressive(trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(out.length,12);assert.equal(out.flat().length,13)
 assert.equal(sha(JSON.stringify(out)),'aecc6542d9c665ef9218d202af456e71c6f112edcad5eeee05ed5e896d58b034','Original complete masks unchanged')
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
