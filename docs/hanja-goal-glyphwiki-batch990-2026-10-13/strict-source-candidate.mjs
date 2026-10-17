import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u8a56","file":"engine-whole-u8a56.json","fileSHA256":"805508af6e0ff2d15b54637d00ce36865d44815e79c323dd38ffd4297517f440"})
export const outerProofIdentity=Object.freeze({"root":"u8a56","sourceProofFile":"engine-whole-u8a56.json","sourceProofFileSHA256":"805508af6e0ff2d15b54637d00ce36865d44815e79c323dd38ffd4297517f440","engineHeaderSHA256":"805508af6e0ff2d15b54637d00ce36865d44815e79c323dd38ffd4297517f440","sourceFileSHA256":"382d62c1c00db22cdca1f7427da9500f3cb8c6418db8061179b7f4d77434e0cf","compilerFileSHA256":"412cf5aa8f530745044acdd1aa503c1e3128063abd3b2640c327401d37b7bf18"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),outerProofIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),outerProofIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),outerProofIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity)}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required')
 assert.deepEqual(identity,selectedProofIdentity,'Exact original inner3 identity required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace'])
 assert.equal(sha(JSON.stringify(proof)),'e64cad65217b0a32e9a63ffef2678e61d0d0dc221ae3ba51d0021f247477db96','Complete full5 source payload is fixed')
 assert.deepEqual(trace,proof.trace);const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity)
 assert.equal(JSON.stringify(proof),before);assert.equal(sha(JSON.stringify(out)),'4ca2072d3f3a8f738f19b5155d390a42d8892a1909ed5e13a4ad9d02fa1a0e9f');assert.equal(out.length,12);assert.equal(out.flat().length,12);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,outerProofIdentity,'Exact whole/header/source/compiler outer6 identity required');return compileProgressive(trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
