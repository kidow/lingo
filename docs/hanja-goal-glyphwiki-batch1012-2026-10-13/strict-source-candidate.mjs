import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u8669","file":"engine-whole-u8669.json","fileSHA256":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade"})
export const selectedOuterIdentity=Object.freeze({"root":"u8669","sourceProofFile":"engine-whole-u8669.json","sourceProofFileSHA256":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade","engineHeaderSHA256":"e274549526f4c0899ff1e46234760891b0775f511cf30271d89d2a2b7d78cade","sourceFileSHA256":"7e9128e5e4dd764a610b1412b12e629534ac4e4d26d1e8843fa386c4732ca090","compilerFileSHA256":"0e2046a873dd5ae8610b4dd5b3fa6809849b50fac5d842cce47de19fe122c008"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),selectedOuterIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),selectedOuterIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),selectedOuterIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4,5],[6],[7],[8],[9],[10],[11],[12],[13],[14,15],[16],[17],[18],[19]])}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected original identity3 required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'6bf5aa4d0a1905ef3d023b8c7dc82c428b8929abdfea0d95c71e6efa049f819b','Complete selected full5 proof is pinned');assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,18);assert.equal(out.flat().length,21);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),54);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original whole/header/source/compiler outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
