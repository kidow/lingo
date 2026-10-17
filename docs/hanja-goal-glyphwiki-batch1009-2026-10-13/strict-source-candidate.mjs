import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u7381","file":"engine-whole-u7381.json","fileSHA256":"42d552960a85ae67834b020f1bdd688bb131492b71b90003d473af681b0ff974"})
export const selectedOuterIdentity=Object.freeze({"root":"u7381","sourceProofFile":"engine-whole-u7381.json","sourceProofFileSHA256":"42d552960a85ae67834b020f1bdd688bb131492b71b90003d473af681b0ff974","engineHeaderSHA256":"42d552960a85ae67834b020f1bdd688bb131492b71b90003d473af681b0ff974","sourceFileSHA256":"4de7d3d258c609be0d9887af1a158bdc95cb0eb1bd886938b5d1b2221e86caa3","compilerFileSHA256":"c852ff21bd660a05a0276b7da939e34856d443f3eccfda1032f6dfa770cc48fb"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),selectedOuterIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),selectedOuterIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),selectedOuterIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4,5],[6],[7],[8,9],[10],[11],[12],[13],[14],[15],[16],[17],[18],[19],[20],[21],[22],[23],[24]])}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected original identity3 required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'056066d2aa957ddc21b7561da9caceccb15fb902bc4146aced5b280769bc5339','Complete selected full5 proof is pinned');assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,23);assert.equal(out.flat().length,24);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),43);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original whole/header/source/compiler outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
