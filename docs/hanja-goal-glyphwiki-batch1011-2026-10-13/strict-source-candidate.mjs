import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u7103","file":"engine-whole-u7103.json","fileSHA256":"5917a1ef453d441ed1029b417c51f5f24a60b1666d1241b57a8dd7d9e554bfff"})
export const selectedOuterIdentity=Object.freeze({"root":"u7103","sourceProofFile":"engine-whole-u7103.json","sourceProofFileSHA256":"5917a1ef453d441ed1029b417c51f5f24a60b1666d1241b57a8dd7d9e554bfff","engineHeaderSHA256":"5917a1ef453d441ed1029b417c51f5f24a60b1666d1241b57a8dd7d9e554bfff","sourceFileSHA256":"ede742017d08f606ebd062b8a03bbc74e4f1219c241df27a38ac68a38bb5cc41","compilerFileSHA256":"9be73343c706d3a8cf7243d042ca0cbdae1f405d852e3b0297d5e2024430b356"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),selectedOuterIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),selectedOuterIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),selectedOuterIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]])}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected original identity3 required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'cc6500e01463687b51ef7fed7b55c4954385bd8c2a00093980fab8eb60d66f74','Complete selected full5 proof is pinned');assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,11);assert.equal(out.flat().length,12);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),29);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original whole/header/source/compiler outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
