import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import * as original from './progressive.mjs'
export {renderProgressive} from './progressive.mjs'
const sha=v=>createHash('sha256').update(v).digest('hex'),read=f=>readFileSync(new URL(f,import.meta.url))
export const selectedProofIdentity=Object.freeze({"root":"u97b8-ue0102","file":"engine-whole-u97b8-ue0102.json","fileSHA256":"c47a7aee112e004c44272f97bc9f5ea120082151881395108f975729d1504af9"})
export const selectedOuterIdentity=Object.freeze({"root":"u97b8-ue0102","sourceProofFile":"engine-whole-u97b8-ue0102.json","sourceProofFileSHA256":"c47a7aee112e004c44272f97bc9f5ea120082151881395108f975729d1504af9","engineHeaderSHA256":"486ff4ace2b056fabe05f332a5a064b1210b6067fe7973f2740d6df7373eba12","sourceFileSHA256":"39012fe0236e0c3f57e6e4dff4595244b01439684c23bc51466877ac12a9451d","compilerFileSHA256":"4c711161210749b365718b482cf5ee5200bf55b54324352a3a1c71565285d6cc"})
export const sourceRoot=selectedProofIdentity.root
export const sourceGroups=Object.freeze(original.sourceGroups.map(g=>Object.freeze([...g])))
function sourcePins(){assert.equal(sha(read(selectedProofIdentity.file)),selectedProofIdentity.fileSHA256);assert.equal(sha(read('engine-proof.json')),selectedOuterIdentity.engineHeaderSHA256);assert.equal(sha(read('sources.json')),selectedOuterIdentity.sourceFileSHA256);assert.equal(sha(read('progressive.mjs')),selectedOuterIdentity.compilerFileSHA256);assert.deepEqual(original.wholeSourceIdentities[sourceRoot],selectedProofIdentity);assert.deepEqual(sourceGroups,[[0],[1],[2],[3],[4],[5],[6,7],[8],[9],[10],[11,12],[13],[14],[15],[16],[17],[18],[19],[20],[21]])}
sourcePins()
export function compileProgressive(trace,proof,identity){
 assert.equal(arguments.length,3,'Exactly three explicit arguments required');assert.deepEqual(identity,selectedProofIdentity,'Exact selected original identity3 required');sourcePins()
 assert.deepEqual(Object.keys(proof).sort(),['defaults','engineHashes','engineRevision','groups','trace']);assert.equal(sha(JSON.stringify(proof)),'3d5118c29cdcfb625160e6f1ffcb87b9d2f821639ed6bd88a4041c3ae65efc9f','Complete selected full5 proof is pinned');assert.deepEqual(trace,proof.trace)
 const before=JSON.stringify(proof),out=original.compileSourceWhole(sourceRoot,trace,proof,identity);assert.equal(JSON.stringify(proof),before);assert.equal(out.length,20);assert.equal(out.flat().length,20);assert.equal(proof.groups.reduce((n,g)=>n+g.polygons.length,0),34);return out
}
export function compileSourceWhole(root,trace,proof,identity){assert.equal(arguments.length,4,'Exactly four explicit arguments required');assert.equal(root,sourceRoot);return compileProgressive(trace,proof,identity)}
export function compileWithOuterIdentity(trace,proof,identity){assert.equal(arguments.length,3);assert.deepEqual(identity,selectedOuterIdentity,'Exact original whole/header/source/compiler outer6 required');return compileSourceWhole(sourceRoot,trace,proof,selectedProofIdentity)}
export const nativeApproval=false
export const runtimeApplied=false
