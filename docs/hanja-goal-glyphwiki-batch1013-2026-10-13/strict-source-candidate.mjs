import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u884b","file":"engine-whole-u884b.json","fileSHA256":"047593a6511d9aec0c7556fd2156bfa4003073fc69ba5e9ece0b507803139de6"})
export const selectedOuterIdentity=Object.freeze({"root":"u884b","sourceProofFile":"engine-whole-u884b.json","sourceProofFileSHA256":"047593a6511d9aec0c7556fd2156bfa4003073fc69ba5e9ece0b507803139de6","engineHeaderSHA256":"047593a6511d9aec0c7556fd2156bfa4003073fc69ba5e9ece0b507803139de6","sourceFileSHA256":"f4c803c0235e847dab3acfa06cd30d19fb4334c8846099e862e7beba703fb811","compilerFileSHA256":"d98673d1ae13f32c88fbe6cc3c75a67229b977d7692359f525e8da1e8d713388"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),selectedOuterIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),selectedOuterIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),selectedOuterIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity);assert.deepEqual(sourceGroups,[[0,1],[2],[3],[4],[5],[6],[7],[8],[9],[10,11],[12],[13],[14],[15],[16],[17,18],[19],[20],[21],[22,23],[24],[25],[26],[27]])}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected original identity3 required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'56533c1a8f4ffc540a4d940800bae9bfe23ffd32b382ffa8ea470575f01af05a','Complete selected full5 proof is pinned');assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,24);assert.equal(out.flat().length,24);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),41);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original whole/header/source/compiler outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
